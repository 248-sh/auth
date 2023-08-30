import { OASRequestParams, Simplify } from "fets";
import { Kratos, KratosSession } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
  identities: KratosSession[];
};
type Failure = { type: "failure"; message: string };

export const listIdentitySessions = async (
  request: Simplify<
    OASRequestParams<Kratos, "/admin/identities/{id}/sessions", "get">
  >
): Promise<Success | Failure> => {
  const response = await kratos["/admin/identities/{id}/sessions"].get(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log(
      "listIdentitySessions",
      response.status,
      JSON.stringify(body, null, 2)
    );

    return { type: "failure", message: body.error.message };
  }

  const body = await response.json();

  console.log(
    "listIdentitySessions",
    response.status,
    JSON.stringify(body, null, 2)
  );

  return { type: "success", identities: body };
};
