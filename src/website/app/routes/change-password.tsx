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
import { kratos } from "~/ory.server";
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

  if (guard.state === "with-identity") {
    return redirectToHome(guard);
  }

  const { url, session, csrf } = guard;

  const flow = url.searchParams.get("flow");

  if (flow === null) {
    const response = await kratos["/self-service/recovery/api"].get();

    if (response.ok === false) {
      const body = await response.json();

      console.log(
        "change-password loader",
        response.status,
        JSON.stringify(body, null, 2)
      );

      throw serverError(body.error.message);
    }

    const body = await response.json();

    console.log(
      "change-password loader",
      response.status,
      JSON.stringify(body, null, 2)
    );

    url.searchParams.set("flow", body.id);

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }

  const response = await kratos["/self-service/recovery/flows"].get({
    query: { id: flow },
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

  if (guard.state === "not-valid") {
    return json<ActionData>({
      state: "not-valid",
      messages: guard.messages,

      defaultValues: guard.defaultValues,
    });
  }

  const { url, session, data } = guard;

  const flow = url.searchParams.get("flow");

  if (flow === null) {
    return json<ActionData>({
      state: "failure",
      message: "Missing required parameter",

      defaultValues: guard.defaultValues,
    });
  }

  switch (data.type) {
    case "request-change-password": {
      const response = await kratos["/self-service/recovery"].post({
        query: { flow },
        json: {
          method: "code",
          email: data.email,
        },
      });

      switch (response.status) {
        case 200:
        case 400: {
          const body = await response.json();

          console.log(
            "request-change-password",
            response.status,
            JSON.stringify(body, null, 2)
          );

          const { messages = [] } = body.ui;

          if (messages.length > 0) {
            switch (messages[0].type) {
              case "error": {
                return json<ActionData>({
                  state: "failure",
                  message: messages[0].text,

                  defaultValues: guard.defaultValues,
                });
              }
              case "info":
              case "success": {
                return json<ActionData>({
                  state: "success",
                  message: messages[0].text,

                  defaultValues: guard.defaultValues,
                });
              }
            }
          }

          break;
        }
        case 422: {
          const body = await response.json();

          console.log(
            "request-change-password",
            response.status,
            JSON.stringify(body, null, 2)
          );

          // return json<ActionData>({
          //   state: "failure",
          //   message: body.error.message,

          //   defaultValues: guard.defaultValues,
          // });

          break;
        }
        case 410:
        // 403?
        default: {
          const body = await response.json();

          console.log(
            "request-change-password",
            response.status,
            JSON.stringify(body, null, 2)
          );

          return json<ActionData>({
            state: "failure",
            message: body.error.message,

            defaultValues: guard.defaultValues,
          });
        }
      }

      break;
    }
    case "change-password": {
      const response = await kratos["/self-service/recovery"].post({
        query: { flow },
        json: {
          method: "code",
          code: data.code,
        },
      });

      switch (response.status) {
        case 200:
        case 400: {
          const body = await response.json();

          console.log(
            "change-password",
            response.status,
            JSON.stringify(body, null, 2)
          );

          const { messages = [] } = body.ui;

          if (messages.length > 0) {
            switch (messages[0].type) {
              case "error": {
                return json<ActionData>({
                  state: "failure",
                  message: messages[0].text,

                  defaultValues: guard.defaultValues,
                });
              }
              case "info":
              case "success": {
                return json<ActionData>({
                  state: "success",
                  message: messages[0].text,

                  defaultValues: guard.defaultValues,
                });
              }
            }
          }

          break;
        }
        case 422: {
          const body = await response.json();

          console.log(
            "change-password",
            response.status,
            JSON.stringify(body, null, 2)
          );

          // return json<ActionData>({
          //   state: "failure",
          //   message: body.error.message,

          //   defaultValues: guard.defaultValues,
          // });

          break;
        }
        case 410:
        // 403?
        default: {
          const body = await response.json();

          console.log(
            "change-password",
            response.status,
            JSON.stringify(body, null, 2)
          );

          return json<ActionData>({
            state: "failure",
            message: body.error.message,

            defaultValues: guard.defaultValues,
          });
        }
      }

      break;
    }
  }

  return json<ActionData>({
    state: "failure",
    message: "Unsupported operation",

    defaultValues: guard.defaultValues,
  });
};
