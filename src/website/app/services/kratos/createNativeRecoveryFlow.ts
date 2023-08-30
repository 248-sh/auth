import { OASRequestParams, Simplify } from "fets";
import { Kratos } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
  flow: string;
};
type Failure = { type: "failure"; message: string };

export const createNativeRecoveryFlow = async (
  request: Simplify<
    OASRequestParams<Kratos, "/self-service/recovery/api", "get">
  >
): Promise<Success | Failure> => {
  const response = await kratos["/self-service/recovery/api"].get(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log(
      "createNativeRecoveryFlow",
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
    "createNativeRecoveryFlow",
    response.status,
    JSON.stringify(body, null, 2)
  );

  return {
    type: "success",
    flow: body.id,
  };
};
