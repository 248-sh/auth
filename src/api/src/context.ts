import { ReadApi } from "@ory/keto-client";
import { IdentityApi } from "@ory/kratos-client";

export type GraphQLContext = { keto: ReadApi; kratos: IdentityApi };

export const createContext = async (): Promise<GraphQLContext> => {
  const keto = new ReadApi(undefined, process.env.KETO_READ_ENDPOINT);
  const kratos = new IdentityApi(undefined, process.env.KRATOS_ADMIN_ENDPOINT);

  return {
    keto,
    kratos,
  };
};
