import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { serverError } from "remix-utils";
import { z } from "zod";
import { Footer } from "~/layout/Footer";
import { Page } from "~/layout/Page";
import { kratos } from "~/ory.server";
import { sessionStorage } from "~/session.server";
import { actionGuard, actionResponse, loaderGuard } from "~/utils";
import { PasswordRegister } from "./register/PasswordRegister";
import { SocialRegister } from "./register/SocialRegister";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const { session, me, csrf, url, query } = await loaderGuard(request, false);

  if (me !== undefined) {
    return redirect(query.from || "/", { status: 303 });
  }

  if ("flow" in query === false) {
    const response = await kratos["/self-service/registration/api"].get();

    if (response.ok === false) {
      const json = await response.json();

      throw serverError(json.error);
    }

    const flow = await response.json();

    url.searchParams.set("flow", flow.id);

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }

  const response = await kratos["/self-service/registration/flows"].get({
    query: { id: query.flow },
  });

  if (response.ok === false) {
    url.searchParams.delete("flow");

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }

  return json(
    { csrf },
    { headers: { "set-cookie": await sessionStorage.commitSession(session) } }
  );
};

export default () => {
  return (
    <Page>
      <SocialRegister />
      <PasswordRegister />
      <Footer />
    </Page>
  );
};

const actionSchema = z.intersection(
  z.object({ csrf: z.string() }),
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("register"),
      email: z.string().email(),
      password: z.string().min(4),
    }),
    z.object({ type: z.literal("google") }),
    z.object({ type: z.literal("github") }),
    z.object({ type: z.literal("facebook") }),
    z.object({ type: z.literal("apple") }),
  ])
);
export const action: ActionFunction = async ({ params, request }) => {
  const { session, receivedValues, errors, data, query } = await actionGuard(
    request,
    actionSchema
  );

  if (errors) {
    return actionResponse(errors, receivedValues);
  }

  switch (data.type) {
    case "register": {
      const response = await kratos["/self-service/registration"].post({
        query: { flow: query.flow },
        json: {
          method: "password",
          traits: { email: data.email },
          password: data.password,
        },
      });

      if (response.ok === false) {
        const text = await response.text();

        return serverError({ message: text });
      }

      // if (response.status === 303) {
      //   return;
      // }
      // if (response.status === 400) {
      //   type Type = OASOutput<
      //     KratosNormalized,
      //     "/self-service/registration",
      //     "post",
      //     "400"
      //   >;
      //   const json = (await response.json()) as Type;

      //   return;
      // }
      // if (response.status === 410) {
      //   type Type = OASOutput<
      //     KratosNormalized,
      //     "/self-service/registration",
      //     "post",
      //     "410"
      //   >;
      //   const json = (await response.json()) as Type;

      //   return actionResponse(
      //     { serverError: json.error.message },
      //     receivedValues
      //   );
      // }
      // if (response.status === 422) {
      //   type Type = OASOutput<
      //     KratosNormalized,
      //     "/self-service/registration",
      //     "post",
      //     "422"
      //   >;
      //   const json = (await response.json()) as Type;

      //   return actionResponse(
      //     {
      //       serverError:
      //         json.error === undefined ? "" : json.error.error.message,
      //     },
      //     receivedValues
      //   );
      // }

      const flow = await response.json();

      session.set("session", flow.session_token);

      return redirect(query.from || "/", {
        status: 303,
        headers: {
          "set-cookie": await sessionStorage.commitSession(session),
        },
      });
    }
    case "google": {
      return actionResponse({ serverError: "Not implemented" }, receivedValues);
    }
    case "github": {
      return actionResponse({ serverError: "Not implemented" }, receivedValues);
    }
    case "facebook": {
      return actionResponse({ serverError: "Not implemented" }, receivedValues);
    }
    case "apple": {
      return actionResponse({ serverError: "Not implemented" }, receivedValues);
    }
  }

  return actionResponse(
    { serverError: "Unsupported operation" },
    receivedValues
  );
};
