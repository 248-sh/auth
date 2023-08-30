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
import { createNativeRecoveryFlow } from "~/services/kratos/createNativeRecoveryFlow";
import { getRecoveryFlow } from "~/services/kratos/getRecoveryFlow";
import { updateRecoveryFlow } from "~/services/kratos/updateRecoveryFlow";
import { sessionStorage } from "~/session.server";
import {
  ActionData,
  actionGuard,
  LoaderData,
  loaderGuard,
  redirectToHome,
} from "~/utils";
import { ChangePassword } from "./change-password/ChangePassword";
import { RequestChangePassword } from "./change-password/RequestChangePassword";

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
    const response = await createNativeRecoveryFlow({});

    switch (response.type) {
      case "failure":
        throw serverError(response.message);
      case "success":
        url.searchParams.set("flow", response.flow);

        return redirect(url.toString(), {
          status: 303,
          headers: {
            "set-cookie": await sessionStorage.commitSession(session),
          },
        });
    }
  }

  const response = await getRecoveryFlow({
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
      <RequestChangePassword />
      <ChangePassword />
      <Footer />
    </Page>
  );
};

const actionSchema = z.intersection(
  z.object({ csrf: z.string() }),
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("request-change-password"),
      email: z.string().email(),
    }),
    z.object({
      type: z.literal("change-password"),
      code: z.string().length(6),
      password: z.string(),
    }),
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

  switch (data.type) {
    case "request-change-password": {
      const response = await updateRecoveryFlow({
        query: { flow },
        json: {
          method: "code",
          email: data.email,
        },
      });

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
          return json({
            type: "success",
            message: response.message,

            defaultValues: guard.defaultValues,
          });
        case "redirect":
          return redirect(response.redirect_browser_to, {
            status: 303,
            headers: {
              "set-cookie": await sessionStorage.commitSession(session),
            },
          });
      }

      break;
    }
    case "change-password": {
      const response = await updateRecoveryFlow({
        query: { flow },
        json: {
          method: "code",
          code: data.code,
        },
      });

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
          return json({
            type: "success",
            message: response.message,

            defaultValues: guard.defaultValues,
          });
        case "redirect":
          return redirect(response.redirect_browser_to, {
            status: 303,
            headers: {
              "set-cookie": await sessionStorage.commitSession(session),
            },
          });
      }

      break;
    }
  }

  return json({
    type: "failure",
    message: "Unsupported operation",

    defaultValues: guard.defaultValues,
  });
};
