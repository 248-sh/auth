import { OASRequestParams, Simplify } from "fets";
import { Kratos } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
};
type Failure = { type: "failure" };

export const getLoginFlow = async (
  request: Simplify<
    OASRequestParams<Kratos, "/self-service/login/flows", "get">
  >
): Promise<Success | Failure> => {
  const response = await kratos["/self-service/login/flows"].get(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log("getLoginFlow", response.status, JSON.stringify(body, null, 2));

    return {
      type: "failure",
    };
  }

  const body = await response.json();

  console.log("getLoginFlow", response.status, JSON.stringify(body, null, 2));

  return {
    type: "success",
  };
};
