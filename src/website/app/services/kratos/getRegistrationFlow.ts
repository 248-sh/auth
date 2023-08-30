import { OASRequestParams, Simplify } from "fets";
import { Kratos } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
};
type Failure = { type: "failure" };

export const getRegistrationFlow = async (
  request: Simplify<
    OASRequestParams<Kratos, "/self-service/registration/flows", "get">
  >
): Promise<Success | Failure> => {
  const response = await kratos["/self-service/registration/flows"].get(
    request
  );

  if (response.ok === false) {
    const body = await response.json();

    console.log(
      "getRegistrationFlow",
      response.status,
      JSON.stringify(body, null, 2)
    );

    return {
      type: "failure",
    };
  }

  const body = await response.json();

  console.log(
    "getRegistrationFlow",
    response.status,
    JSON.stringify(body, null, 2)
  );

  return {
    type: "success",
  };
};
