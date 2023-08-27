import { createClient } from "fets";
import { serverError } from "remix-utils";
import { Kratos } from "~/openapi/kratos";

// export const keto = new RelationshipApi(
//   undefined,
//   process.env.KETO_READ_ENDPOINT
// );
// export const identity = new IdentityApi(
//   undefined,
//   process.env.KRATOS_ADMIN_URL
// );
// export const frontend = new FrontendApi(
//   undefined,
//   process.env.KRATOS_PUBLIC_URL
// );
// export const oathkeeper = new ApiApi(undefined, "http://localhost:4456");

export const kratos = createClient<Kratos>({
  // endpoint: process.env.KRATOS_ADMIN_URL,
  endpoint: process.env.KRATOS_PUBLIC_URL,
});

// admin
export const listIdentities = async (page: number) => {
  const response = await kratos["/admin/identities"].get({
    headers: { Authorization: "" },
    query: { per_page: 100, page },
  });
  if (response.ok === false) {
    const body = await response.json();
    throw serverError(body.error.message);
  }
  const body = await response.json();
  return body;
};
export const getIdentity = async (id: string) => {
  const response = await kratos["/admin/identities/{id}"].get({
    headers: { Authorization: "" },
    params: { id },
  });
  if (response.ok === false) {
    const body = await response.json();
    throw serverError(body.error.message);
  }
  const body = await response.json();
  return body;
};
export const listIdentitySessions = async (id: string) => {
  const response = await kratos["/admin/identities/{id}/sessions"].get({
    headers: { Authorization: "" },
    params: { id },
  });
  if (response.ok === false) {
    const body = await response.json();
    throw serverError(body.error.message);
  }
  const body = await response.json();
  return body;
};

// public
// export const toSession = async (sessionToken: string | undefined) => {
//   const response = await kratos["/sessions/whoami"].get({
//     headers: { "X-Session-Token": sessionToken },
//   });
//   if (response.ok === false) {
//     const body = await response.json();
//     throw serverError(body.error.message);
//   }
//   const body = await response.json();
//   return body;
// };
export const listMySessions = async (
  sessionToken: string | undefined,
  page: number
) => {
  const response = await kratos["/sessions"].get({
    headers: { "X-Session-Token": sessionToken },
    query: { per_page: 100, page },
  });
  if (response.ok === false) {
    const body = await response.json();
    throw serverError(body.error.message);
  }
  const body = await response.json();
  return body;
};
