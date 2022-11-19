import { ReadApi } from "@ory/keto-client";
import { V0alpha2Api } from "@ory/kratos-client";
// import { ApiApi } from "@ory/oathkeeper-client";
// import { JwkApi, OidcApi, OAuth2Api } from "@ory/hydra-client";

export const keto = new ReadApi(undefined, "http://localhost:4466");
export const kratos = new V0alpha2Api(undefined, "http://localhost:4434");
// export const oathkeeper = new ApiApi(undefined, "http://localhost:4456");

// new JwkApi().
// new OidcApi().
// new OAuth2Api().