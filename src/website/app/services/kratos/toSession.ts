import { OASRequestParams, Simplify } from "fets";
import { Kratos, KratosSession } from "~/openapi/kratos";
import { kratos } from "~/services/kratos/client";

export type WithoutIdentity = {
  type: "without-identity";
  message: string;
};
export type WithIdentity = {
  type: "with-identity";
  identity: KratosSession;
};

export const toSession = async (
  request: Simplify<OASRequestParams<Kratos, "/sessions/whoami", "get">>
): Promise<WithoutIdentity | WithIdentity> => {
  const response = await kratos["/sessions/whoami"].get(request);

  if (response.ok === false) {
    const body = await response.json();

    console.log("toSession", response.status, JSON.stringify(body, null, 2));

    return { type: "without-identity", message: body.error.message };
  }

  const body = await response.json();

  console.log("toSession", response.status, JSON.stringify(body, null, 2));

  return { type: "with-identity", identity: body };
};
