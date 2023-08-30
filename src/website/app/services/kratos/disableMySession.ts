import { OASRequestParams, Simplify } from "fets";
import { Kratos } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
  message: string;
};
type Failure = { type: "failure"; message: string };

export const disableMySession = async (
  request: Simplify<OASRequestParams<Kratos, "/sessions/{id}", "delete">>
): Promise<Success | Failure> => {
  const response = await kratos["/sessions/{id}"].delete(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log(
      "disableMySession",
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
    "disableMySession",
    response.status,
    JSON.stringify(body, null, 2)
  );

  return {
    type: "success",
    message: "Session revoked",
  };
};
