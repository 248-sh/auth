import { OASRequestParams, Simplify } from "fets";
import { Kratos, KratosIdentity } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
  identity: KratosIdentity;
};
type Failure = { type: "failure"; message: string };

export const getIdentity = async (
  request: Simplify<OASRequestParams<Kratos, "/admin/identities/{id}", "get">>
): Promise<Success | Failure> => {
  const response = await kratos["/admin/identities/{id}"].get(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log("getIdentity", response.status, JSON.stringify(body, null, 2));

    return { type: "failure", message: body.error.message };
  }

  const body = await response.json();

  console.log("getIdentity", response.status, JSON.stringify(body, null, 2));

  return { type: "success", identity: body };
};
