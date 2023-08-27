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
import { PasswordLogin } from "./login/PasswordLogin";
import { SocialLogin } from "./login/SocialLogin";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader = async ({
  context,
  params,
  request,
}: LoaderArgs): Promise<TypedJsonResponse<LoaderData>> => {
  const guard = await loaderGuard(request);

  console.log("login url", guard.url);

  if (guard.state === "with-identity") {
    return redirectToHome(guard);
  }

  const { url, session, csrf } = guard;

  console.log("session", session.data);

  const flow = url.searchParams.get("flow");

  if (flow === null) {
    const response = await kratos["/self-service/login/api"].get({
      query: { aal: "aal1", return_session_token_exchange_code: true },
    });

    if (response.ok === false) {
      const body = await response.json();

      console.log(
        "login loader",
        response.status,
        JSON.stringify(body, null, 2)
      );

      throw serverError(body.error.message);
    }

    const body = await response.json();

    console.log("login loader", response.status, JSON.stringify(body, null, 2));

    session.set(
      "session_token_exchange_code",
      body.session_token_exchange_code
    );

    url.searchParams.set("flow", body.id);

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }

  const response = await kratos["/self-service/login/flows"].get({
    query: { id: flow },
  });

  if (response.ok === false) {
    url.searchParams.delete("flow");

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }

  const body = await response.json();

  console.log("login loader", response.status, JSON.stringify(body, null, 2));

  const { messages = [] } = body.ui;

  if (messages.length > 0) {
    switch (messages[0].type) {
      case "error": {
        throw serverError(messages[0].text);
      }
    }
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
    case "login": {
      const response = await kratos["/self-service/login"].post({
        query: { flow },
        json: {
          method: "password",
          identifier: data.email,
          password: data.password,
        },
      });

      switch (response.status) {
        case 200: {
          const body = await response.json();

          console.log(
            "login password",
            response.status,
            JSON.stringify(body, null, 2)
          );

          session.set("session_token", body.session_token);

          return redirect(url.searchParams.get("from") || "/", {
            status: 303,
            headers: {
              "set-cookie": await sessionStorage.commitSession(session),
            },
          });
        }
        case 400: {
          const body = await response.json();

          console.log(
            "login password",
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
            "login password",
            response.status,
            JSON.stringify(body, null, 2)
          );

          if (body.redirect_browser_to !== undefined) {
            return redirect(body.redirect_browser_to, {
              status: 303,
              headers: {
                "set-cookie": await sessionStorage.commitSession(session),
              },
            });
          }

          if (body.error !== undefined) {
            return json<ActionData>({
              state: "failure",
              // TODO: figure out why openapi + fets produce the incorrect type
              // @ts-ignore
              message: body.error.message,

              defaultValues: guard.defaultValues,
            });
          }

          break;
        }
        case 410:
        // 403?
        default: {
          const body = await response.json();

          console.log(
            "login password",
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
    case "google": {
      const response = await kratos["/self-service/login"].post({
        query: { flow },
        json: {
          method: "oidc",
          provider: "google",
        },
      });

      switch (response.status) {
        case 200: {
          const body = await response.json();

          console.log(
            "login google",
            response.status,
            JSON.stringify(body, null, 2)
          );

          session.set("session_token", body.session_token);

          return redirect(url.searchParams.get("from") || "/", {
            status: 303,
            headers: {
              "set-cookie": await sessionStorage.commitSession(session),
            },
          });
        }
        case 400: {
          const body = await response.json();

          console.log(
            "login google",
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
            "login google",
            response.status,
            JSON.stringify(body, null, 2)
          );

          if (body.redirect_browser_to !== undefined) {
            return redirect(body.redirect_browser_to, {
              status: 303,
              headers: {
                "set-cookie": await sessionStorage.commitSession(session),
              },
            });
          }

          if (body.error !== undefined) {
            return json<ActionData>({
              state: "failure",
              // TODO: figure out why openapi + fets produce the incorrect type
              // @ts-ignore
              message: body.error.message,

              defaultValues: guard.defaultValues,
            });
          }

          break;
        }
        case 410:
        // 403?
        default: {
          const body = await response.json();

          console.log(
            "login google",
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
    case "github": {
      const response = await kratos["/self-service/login"].post({
        query: { flow },
        json: {
          method: "oidc",
          provider: "github",
        },
      });

      switch (response.status) {
        case 200: {
          const body = await response.json();

          console.log(
            "login github",
            response.status,
            JSON.stringify(body, null, 2)
          );

          session.set("session_token", body.session_token);

          return redirect(url.searchParams.get("from") || "/", {
            status: 303,
            headers: {
              "set-cookie": await sessionStorage.commitSession(session),
            },
          });
        }
        case 400: {
          const body = await response.json();

          console.log(
            "login github",
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
            "login github",
            response.status,
            JSON.stringify(body, null, 2)
          );

          if (body.redirect_browser_to !== undefined) {
            return redirect(body.redirect_browser_to, {
              status: 303,
              headers: {
                "set-cookie": await sessionStorage.commitSession(session),
              },
            });
          }

          if (body.error !== undefined) {
            return json<ActionData>({
              state: "failure",
              // TODO: figure out why openapi + fets produce the incorrect type
              // @ts-ignore
              message: body.error.message,

              defaultValues: guard.defaultValues,
            });
          }

          break;
        }
        case 410:
        // 403?
        default: {
          const body = await response.json();

          console.log(
            "login github",
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
    case "facebook": {
      const response = await kratos["/self-service/login"].post({
        query: { flow },
        json: {
          method: "oidc",
          provider: "facebook",
        },
      });

      switch (response.status) {
        case 200: {
          const body = await response.json();

          console.log(
            "facebook",
            response.status,
            JSON.stringify(body, null, 2)
          );

          session.set("session_token", body.session_token);

          return redirect(url.searchParams.get("from") || "/", {
            status: 303,
            headers: {
              "set-cookie": await sessionStorage.commitSession(session),
            },
          });
        }
        case 400: {
          const body = await response.json();

          console.log(
            "facebook",
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
            "facebook",
            response.status,
            JSON.stringify(body, null, 2)
          );

          if (body.redirect_browser_to !== undefined) {
            return redirect(body.redirect_browser_to, {
              status: 303,
              headers: {
                "set-cookie": await sessionStorage.commitSession(session),
              },
            });
          }

          if (body.error !== undefined) {
            return json<ActionData>({
              state: "failure",
              // TODO: figure out why openapi + fets produce the incorrect type
              // @ts-ignore
              message: body.error.message,

              defaultValues: guard.defaultValues,
            });
          }

          break;
        }
        case 410:
        // 403?
        default: {
          const body = await response.json();

          console.log(
            "facebook",
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
    case "apple": {
      const response = await kratos["/self-service/login"].post({
        query: { flow },
        json: {
          method: "oidc",
          provider: "apple",
        },
      });

      switch (response.status) {
        case 200: {
          const body = await response.json();

          console.log(
            "login apple",
            response.status,
            JSON.stringify(body, null, 2)
          );

          session.set("session_token", body.session_token);

          return redirect(url.searchParams.get("from") || "/", {
            status: 303,
            headers: {
              "set-cookie": await sessionStorage.commitSession(session),
            },
          });
        }
        case 400: {
          const body = await response.json();

          console.log(
            "login apple",
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
            "login apple",
            response.status,
            JSON.stringify(body, null, 2)
          );

          if (body.redirect_browser_to !== undefined) {
            return redirect(body.redirect_browser_to, {
              status: 303,
              headers: {
                "set-cookie": await sessionStorage.commitSession(session),
              },
            });
          }

          if (body.error !== undefined) {
            return json<ActionData>({
              state: "failure",
              // TODO: figure out why openapi + fets produce the incorrect type
              // @ts-ignore
              message: body.error.message,

              defaultValues: guard.defaultValues,
            });
          }

          break;
        }
        case 410:
        // 403?
        default: {
          const body = await response.json();

          console.log(
            "login apple",
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
