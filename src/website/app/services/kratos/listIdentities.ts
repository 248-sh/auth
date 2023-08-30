import { OASRequestParams, Simplify } from "fets";
import { Kratos, KratosIdentity } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
  identities: KratosIdentity[];
};
type Failure = { type: "failure"; message: string };

export const listIdentities = async (
  request: Simplify<OASRequestParams<Kratos, "/admin/identities", "get">>
): Promise<Success | Failure> => {
  const response = await kratos["/admin/identities"].get(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log(
      "listIdentities",
      response.status,
      JSON.stringify(body, null, 2)
    );

    return { type: "failure", message: body.error.message };
  }

  const body = await response.json();

  console.log("listIdentities", response.status, JSON.stringify(body, null, 2));

  return { type: "success", identities: body };
};
