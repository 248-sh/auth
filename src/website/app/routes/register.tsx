import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { z } from "zod";
import { Footer } from "~/layout/Footer";
import { Page } from "~/layout/Page";
import { frontend } from "~/ory.server";
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
    const flow = await frontend.createNativeRegistrationFlow();
    url.searchParams.set("flow", flow.data.id);

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }

  let flow;
  try {
    flow = await frontend.getRegistrationFlow({ id: query.flow });

    return json(
      { csrf },
      { headers: { "set-cookie": await sessionStorage.commitSession(session) } }
    );
  } catch (error: any) {
    console.error(
      "register getRegistrationFlow error",
      JSON.stringify(error.response?.data || error, null, 2)
    );

    flow = await frontend.createNativeRegistrationFlow();
    url.searchParams.set("flow", flow.data.id);

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }
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
      try {
        const flow = await frontend.updateRegistrationFlow({
          flow: query.flow,
          updateRegistrationFlowBody: {
            method: "password",
            traits: { email: data.email },
            password: data.password,
          },
        });

        session.set("session", flow.data.session_token);

        return redirect(query.from || "/", {
          status: 303,
          headers: {
            "set-cookie": await sessionStorage.commitSession(session),
          },
        });
      } catch (error: any) {
        console.error(
          "register action error",
          error.response.data,
        );
        console.error(
          "register action error",
          JSON.stringify(error.response?.data || error, null, 2)
        );

        return actionResponse(
          { serverError: "Account already exists" },
          receivedValues
        );
      }
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
