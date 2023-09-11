import { OASRequestParams, Simplify } from "fets";
import { Kratos, KratosSession } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

type Success = {
  type: "success";
  identities: KratosSession[];
};
type Failure = { type: "failure"; message: string };

export type ListMySessions = Success | Failure;
export const listMySessions = async (
  request: Simplify<OASRequestParams<Kratos, "/sessions", "get">>
): Promise<ListMySessions> => {
  const response = await kratos["/sessions"].get(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log(
      "listMySessions",
      response.status,
      JSON.stringify(body, null, 2)
    );

    return { type: "failure", message: body.error.message };
  }

  const body = await response.json();

  console.log("listMySessions", response.status, JSON.stringify(body, null, 2));

  return { type: "success", identities: body };
};