import { OASRequestParams, Simplify } from "fets";
import { Kratos } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
  flow: string;
  session_token_exchange_code: string;
};
type Failure = { type: "failure"; message: string };

export const createNativeLoginFlow = async (
  request: Simplify<
    OASRequestParams<Kratos, "/self-service/login/api", "get">
  >
): Promise<Success | Failure> => {
  const response = await kratos["/self-service/login/api"].get(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log(
      "createNativeLoginFlow",
      response.status,
      JSON.stringify(body, null, 2)
    );

    return {
      type: "failure",
      message: body.error.message,
    };
  }

  const body = await response.json();

  console.log(
    "createNativeLoginFlow",
    response.status,
    JSON.stringify(body, null, 2)
  );

  if (body.session_token_exchange_code === undefined) {
    return {
      type: "failure",
      message: "Something went wrong",
    };
  }

  return {
    type: "success",
    flow: body.id,
    session_token_exchange_code: body.session_token_exchange_code,
  };
};
