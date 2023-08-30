import { OASRequestParams, Simplify } from "fets";
import { Kratos } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
  message: string;
};
type Failure = { type: "failure" };

export const performNativeLogout = async (
  request: Simplify<
    OASRequestParams<Kratos, "/self-service/logout/api", "delete">
  >
): Promise<Success | Failure> => {
  const response = await kratos["/self-service/logout/api"].delete(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log(
      "performNativeLogout",
      response.status,
      JSON.stringify(body, null, 2)
    );

    return {
      type: "failure",
    };
  }

  const body = await response.json();

  console.log(
    "performNativeLogout",
    response.status,
    JSON.stringify(body, null, 2)
  );

  return {
    type: "success",
    message: "Logged out",
  };
};
