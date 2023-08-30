import { OASRequestParams, Simplify } from "fets";
import { Kratos } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = { type: "success"; message: string };
type Failure = { type: "failure"; message: string };
type Info = { type: "info"; message: string };
type Redirect = { type: "redirect"; redirect_browser_to: string };

export const updateRecoveryFlow = async (
  request: Simplify<OASRequestParams<Kratos, "/self-service/recovery", "post">>
): Promise<Success | Failure | Info | Redirect> => {
  const response = await kratos["/self-service/recovery"].post(request);

  switch (response.status) {
    case 200:
    case 400: {
      const body = await response.json();

      console.log(
        "updateRecoveryFlow",
        response.status,
        JSON.stringify(body, null, 2)
      );

      const { messages = [] } = body.ui;

      if (messages.length > 0) {
        switch (messages[0].type) {
          case "error":
            return {
              type: "failure",
              message: messages[0].text,
            };
          case "info":
          case "success":
            return {
              type: "success",
              message: messages[0].text,
            };
        }
      }

      return {
        type: "success",
        message: "Account recovered",
      };
    }
    case 422: {
      const body = await response.json();

      console.log(
        "updateRecoveryFlow",
        response.status,
        JSON.stringify(body, null, 2)
      );

      if (body.redirect_browser_to !== undefined) {
        return {
          type: "redirect",
          redirect_browser_to: body.redirect_browser_to,
        };
      }

      if (body.error !== undefined) {
        return {
          type: "failure",
          // TODO: figure out why openapi + fets produce the incorrect type
          // @ts-ignore
          message: body.error.message,
        };
      }

      break;
    }
    case 410:
    // 403?
    default: {
      const body = await response.json();

      console.log(
        "updateRecoveryFlow",
        response.status,
        JSON.stringify(body, null, 2)
      );

      return {
        type: "failure",
        message: body.error.message,
      };
    }
  }

  return {
    type: "failure",
    message: "Unsupported operation",
  };
};
