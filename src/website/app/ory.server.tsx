import { RelationshipApi } from "@ory/keto-client";
import { IdentityApi, FrontendApi } from "@ory/kratos-client";
// import { ApiApi } from "@ory/oathkeeper-client";
// import { JwkApi, OidcApi, OAuth2Api } from "@ory/hydra-client";

export const keto = new RelationshipApi(undefined, process.env.KETO_READ_ENDPOINT);
export const identity = new IdentityApi(undefined, process.env.KRATOS_ADMIN_URL);
export const frontend = new FrontendApi(undefined, process.env.KRATOS_PUBLIC_URL);
// export const oathkeeper = new ApiApi(undefined, "http://localhost:4456");
