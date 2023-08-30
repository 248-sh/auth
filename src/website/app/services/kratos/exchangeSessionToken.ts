import { OASRequestParams, Simplify } from "fets";
import { Kratos } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
  session_token: string;
};
type Failure = { type: "failure"; message: string };

export const exchangeSessionToken = async (
  request: Simplify<OASRequestParams<Kratos, "/sessions/token-exchange", "get">>
): Promise<Success | Failure> => {
  const response = await kratos["/sessions/token-exchange"].get(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log(
      "exchangeSessionToken",
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
    "exchangeSessionToken",
    response.status,
    JSON.stringify(body, null, 2)
  );

  if (body.session_token === undefined) {
    return {
      type: "failure",
      message: "Something went wrong",
    };
  }

  return {
    type: "success",
    session_token: body.session_token,
  };
};
