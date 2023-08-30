import { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  redirect,
  typedjson as json,
  TypedJsonResponse,
} from "remix-typedjson";
import { serverError } from "remix-utils";
import { z } from "zod";
import { Footer } from "~/layout/Footer";
import { Page } from "~/layout/Page";
import { createNativeLoginFlow } from "~/services/kratos/createNativeLoginFlow";
import { getLoginFlow } from "~/services/kratos/getLoginFlow";
import { updateLoginFlow } from "~/services/kratos/updateLoginFlow";
import { sessionStorage } from "~/session.server";
import {
  ActionData,
  actionGuard,
  LoaderData,
  loaderGuard,
  redirectToHome,
} from "~/utils";
import { PasswordLogin } from "./login/PasswordLogin";
import { SocialLogin } from "./login/SocialLogin";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader = async ({
  context,
  params,
  request,
}: LoaderArgs): Promise<TypedJsonResponse<LoaderData>> => {
  const guard = await loaderGuard(request);

  if (guard.type === "with-identity") {
    return redirectToHome(guard);
  }

  const { url, session, csrf } = guard;

  const flow = url.searchParams.get("flow");

  if (flow === null) {
    const response = await createNativeLoginFlow({
      query: { aal: "aal1", return_session_token_exchange_code: true },
    });

    switch (response.type) {
      case "failure":
        throw serverError(response.message);
      case "success":
        session.set(
          "session_token_exchange_code",
          response.session_token_exchange_code
        );

        url.searchParams.set("flow", response.flow);

        return redirect(url.toString(), {
          status: 303,
          headers: {
            "set-cookie": await sessionStorage.commitSession(session),
          },
        });
    }
  }

  const response = await getLoginFlow({
    query: { id: flow },
  });

  switch (response.type) {
    case "failure":
      url.searchParams.delete("flow");

      return redirect(url.toString(), {
        status: 303,
        headers: { "set-cookie": await sessionStorage.commitSession(session) },
      });
    case "success":
      return json(
        { csrf },
        {
          headers: {
            "set-cookie": await sessionStorage.commitSession(session),
          },
        }
      );
  }
};

export type LoaderResponse = typeof loader;

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
export const action = async ({
  params,
  request,
}: ActionArgs): Promise<TypedJsonResponse<ActionData>> => {
  const guard = await actionGuard(request, actionSchema);

  if (guard.type === "not-valid") {
    return json({
      type: "not-valid",
      messages: guard.messages,

      defaultValues: guard.defaultValues,
    });
  }

  const { url, session, data } = guard;

  const flow = url.searchParams.get("flow");

  if (flow === null) {
    return json({
      type: "failure",
      message: "Missing required parameter",

      defaultValues: guard.defaultValues,
    });
  }

  let response;

  switch (data.type) {
    case "login":
      response = await updateLoginFlow({
        query: { flow },
        json: {
          method: "password",
          identifier: data.email,
          password: data.password,
        },
      });

      break;
    case "google":
      response = await updateLoginFlow({
        query: { flow },
        json: { method: "oidc", provider: "google" },
      });

      break;
    case "github":
      response = await updateLoginFlow({
        query: { flow },
        json: { method: "oidc", provider: "github" },
      });

      break;
    case "facebook":
      response = await updateLoginFlow({
        query: { flow },
        json: { method: "oidc", provider: "facebook" },
      });

      break;
    case "apple":
      response = await updateLoginFlow({
        query: { flow },
        json: { method: "oidc", provider: "apple" },
      });

      break;
  }

  switch (response.type) {
    case "failure":
      return json({
        type: "failure",
        message: response.message,

        defaultValues: guard.defaultValues,
      });
    case "info":
      return json({
        type: "info",
        message: response.message,

        defaultValues: guard.defaultValues,
      });
    case "success":
      session.set("session_token", response.session_token);

      return redirectToHome(guard);
    case "redirect":
      return redirect(response.redirect_browser_to, {
        status: 303,
        headers: {
          "set-cookie": await sessionStorage.commitSession(session),
        },
      });
  }
};
