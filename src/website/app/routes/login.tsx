import { ActionArgs, json, LoaderFunction, redirect } from "@remix-run/node";
import { useRouteError } from "@remix-run/react";
import { serverError } from "remix-utils";
import { z } from "zod";
import { Footer } from "~/layout/Footer";
import { Page } from "~/layout/Page";
import { frontend, kratos } from "~/ory.server";
import { sessionStorage } from "~/session.server";
import { actionGuard, actionResponse, loaderGuard } from "~/utils";
import { PasswordLogin } from "./login/PasswordLogin";
import { SocialLogin } from "./login/SocialLogin";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const { session, me, csrf, url, query } = await loaderGuard(request);

  if (me !== undefined) {
    return redirect(query.from || "/", { status: 303 });
  }

  if ("flow" in query === false) {
    const response = await kratos["/self-service/login/api"].get({
      query: { aal: "aal1" },
    });

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

  const response = await kratos["/self-service/login/flows"].get({
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
      <SocialLogin />
      <PasswordLogin />
      <Footer />
    </Page>
  );
};

const actionSchema = z.intersection(
  z.object({ csrf: z.string() }),
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("login"),
      email: z.string().email(),
      password: z.string().min(4),
    }),
    z.object({ type: z.literal("google") }),
    z.object({ type: z.literal("github") }),
    z.object({ type: z.literal("facebook") }),
    z.object({ type: z.literal("apple") }),
  ])
);
export const action = async ({ params, request }: ActionArgs) => {
  const { session, receivedValues, errors, data, query } = await actionGuard(
    request,
    actionSchema
  );

  if (errors) {
    return actionResponse(errors, receivedValues);
  }

  switch (data.type) {
    case "login": {
      const response = await kratos["/self-service/login"].post({
        query: { flow: query.flow },
        json: {
          method: "password",
          identifier: data.email,
          password: data.password,
        },
      });

      if (response.ok === false) {
        const text = await response.text();

        console.log("login action text", text);

        return serverError({ message: text });
      }

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
      // try {
      //   // const flow1 = await frontend.createNativeLoginFlow({
      //   //   aal: "aal1",
      //   // });
      //   const flow1 = await frontend.createBrowserLoginFlow({
      //     aal: "aal1",
      //   });
      //   const flow2 = await frontend.updateLoginFlow({
      //     flow: flow1.data.id,
      //     updateLoginFlowBody: {
      //       method: "oidc",
      //       provider: "google",
      //     },
      //   });

      //   console.log("login action google", flow2.data);
      // } catch (error: any) {
      //   console.log(
      //     "login action google error",
      //     error.response.data.constructor.name
      //   );
      //   console.log(
      //     "login action google error",
      //     JSON.stringify(error.response?.data || error, null, 2)
      //   );
      // }

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
