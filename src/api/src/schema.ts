import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLContext } from "./context";

const typeDefinitions = /* GraphQL */ `
  type RelationTuple {
    "Namespace of the Relation Tuple"
    namespace: String!
    "Object of the Relation Tuple"
    object: String!
    "Relation of the Relation Tuple"
    relation: String!
    "SubjectID of the Relation Tuple  Either SubjectSet or SubjectID can be provided."
    subject_id: String
    subject_set: SubjectSet
  }
  type SubjectSet {
    "Namespace of the Subject Set"
    namespace: String!
    "Object of the Subject Set"
    object: String!
    "Relation of the Subject Set"
    relation: String!
  }

  type Identity {
    "CreatedAt is a helper struct field for gobuffalo.pop."
    created_at: String
    # "Credentials represents all credentials that can be used for authenticating this identity."
    # credentials: {
    #     [key: String]: IdentityCredentials
    # }
    "ID is the identity's unique identifier.  The Identity ID can not be changed and can not be chosen. This ensures future compatibility and optimization for distributed stores such as CockroachDB."
    id: String!
    # "NullJSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger and is NULLable-"
    # metadata_admin: any
    # "NullJSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger and is NULLable-"
    # metadata_public: any
    # "RecoveryAddresses contains all the addresses that can be used to recover an identity."
    recovery_addresses: [RecoveryIdentityAddress]
    "SchemaID is the ID of the JSON Schema to be used for validating the identity's traits."
    schema_id: String!
    "SchemaURL is the URL of the endpoint where the identity's traits schema can be fetched from.  format: url"
    schema_url: String!
    # state: IdentityState
    state_changed_at: String
    # "Traits represent an identity's traits. The identity is able to create, modify, and delete traits in a self-service manner. The input will always be validated against the JSON Schema defined in \`schema_url\`."
    # traits: any!
    "UpdatedAt is a helper struct field for gobuffalo.pop."
    updated_at: String
    # "VerifiableAddresses contains all the addresses that can be verified by the user."
    verifiable_addresses: [VerifiableIdentityAddress]
  }
  type RecoveryIdentityAddress {
    "CreatedAt is a helper struct field for gobuffalo.pop."
    created_at: String
    id: String!
    "UpdatedAt is a helper struct field for gobuffalo.pop."
    updated_at: String
    value: String!
    via: String!
  }
  type VerifiableIdentityAddress {
    "When this entry was created"
    created_at: String
    "The ID"
    id: String
    "VerifiableAddressStatus must not exceed 16 characters as that is the limitation in the SQL Schema"
    status: String!
    "When this entry was last updated"
    updated_at: String
    "The address value  example foo@user.com"
    value: String!
    "Indicates if the address has already been verified"
    verified: Boolean!
    verified_at: String
    "VerifiableAddressType must not exceed 16 characters as that is the limitation in the SQL Schema"
    via: String!
  }

  type Query {
    tuples: [RelationTuple]
    identities: [Identity]
  }
`;

const resolvers = {
  Query: {
    tuples: async (parent: unknown, args: {}, context: GraphQLContext) => {
      const tuples = await context.keto.getRelationTuples();
      return tuples.data.relation_tuples!;
    },
    identities: async (parent: unknown, args: {}, context: GraphQLContext) => {
      const identities = await context.kratos.listIdentities();
      console.log(
        "identities.data",
        identities.data.map((d) => d.traits)
      );
      return identities.data;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
