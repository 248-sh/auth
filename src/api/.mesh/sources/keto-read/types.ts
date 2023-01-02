// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace KetoReadTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** Represents empty values */
  Void: void;
  ObjMap: any;
};

export type Query = {
  auth: authQuery;
};

export type isAlive_response = isAlive_200_response | genericError;

export type isAlive_200_response = {
  /** Always "ok". */
  status: Scalars['String'];
};

/** The standard error format */
export type genericError = {
  code?: Maybe<Scalars['Int']>;
  details?: Maybe<Scalars['JSON']>;
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  request?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type isReady_response = isReady_200_response | isReady_503_response;

export type isReady_200_response = {
  /** Always "ok". */
  status: Scalars['String'];
};

export type isReady_503_response = {
  /** Errors contains a list of errors that caused the not ready status. */
  errors: Scalars['JSON'];
};

export type getRelationTuples_response = getRelationTuplesResponse | genericError;

export type getRelationTuplesResponse = {
  /**
   * The opaque token to provide in a subsequent request
   * to get the next page. It is the empty string iff this is
   * the last page.
   */
  next_page_token?: Maybe<Scalars['String']>;
  relation_tuples?: Maybe<Array<Maybe<relationTuple>>>;
};

export type relationTuple = {
  /** Namespace of the Relation Tuple */
  namespace: Scalars['String'];
  /** Object of the Relation Tuple */
  object: Scalars['String'];
  /** Relation of the Relation Tuple */
  relation: Scalars['String'];
  /**
   * SubjectID of the Relation Tuple
   *
   * Either SubjectSet or SubjectID can be provided.
   */
  subject_id?: Maybe<Scalars['String']>;
  subject_set?: Maybe<subjectSet>;
};

export type subjectSet = {
  /** Namespace of the Subject Set */
  namespace: Scalars['String'];
  /** Object of the Subject Set */
  object: Scalars['String'];
  /** Relation of the Subject Set */
  relation: Scalars['String'];
};

export type getCheckMirrorStatus_response = RESTResponse_represents_the_response_for_a_check_request_ | genericError;

/** The content of the allowed field is mirrored in the HTTP status code. */
export type RESTResponse_represents_the_response_for_a_check_request_ = {
  /** whether the relation tuple is allowed */
  allowed: Scalars['Boolean'];
};

export type getCheck_response = RESTResponse_represents_the_response_for_a_check_request_ | genericError;

export type getExpand_response = expandTree | genericError;

export type expandTree = {
  /** The children of the node, possibly none. */
  children?: Maybe<Array<Maybe<expandTree>>>;
  tuple?: Maybe<relationTuple>;
  type: query_getExpand_oneOf_0_type;
};

/**
 * The type of the node.
 * union TreeNodeUnion
 * exclusion TreeNodeExclusion
 * intersection TreeNodeIntersection
 * leaf TreeNodeLeaf
 * tuple_to_subject_set TreeNodeTupleToSubjectSet
 * computed_subject_set TreeNodeComputedSubjectSet
 * not TreeNodeNot
 * unspecified TreeNodeUnspecified
 */
export type query_getExpand_oneOf_0_type =
  | 'union'
  | 'exclusion'
  | 'intersection'
  | 'leaf'
  | 'tuple_to_subject_set'
  | 'computed_subject_set'
  | 'not'
  | 'unspecified';

export type getVersion_200_response = {
  /** The version of Ory Kratos. */
  version: Scalars['String'];
};

export type Mutation = {
  auth: authMutation;
};

export type deleteRelationTuples_response = Void_container | genericError;

export type Void_container = {
  Void?: Maybe<Scalars['Void']>;
};

export type patchRelationTuples_response = Void_container | genericError;

export type patchDelta_Input = {
  action?: InputMaybe<mutationInput_patchRelationTuples_input_items_action>;
  relation_tuple?: InputMaybe<relationTuple_Input>;
};

export type mutationInput_patchRelationTuples_input_items_action =
  | 'insert'
  | 'delete';

export type relationTuple_Input = {
  /** Namespace of the Relation Tuple */
  namespace: Scalars['String'];
  /** Object of the Relation Tuple */
  object: Scalars['String'];
  /** Relation of the Relation Tuple */
  relation: Scalars['String'];
  /**
   * SubjectID of the Relation Tuple
   *
   * Either SubjectSet or SubjectID can be provided.
   */
  subject_id?: InputMaybe<Scalars['String']>;
  subject_set?: InputMaybe<subjectSet_Input>;
};

export type subjectSet_Input = {
  /** Namespace of the Subject Set */
  namespace: Scalars['String'];
  /** Object of the Subject Set */
  object: Scalars['String'];
  /** Relation of the Subject Set */
  relation: Scalars['String'];
};

export type createRelationTuple_response = relationQuery | genericError;

export type relationQuery = {
  /** Namespace to query */
  namespace?: Maybe<Scalars['String']>;
  /** Object to query */
  object?: Maybe<Scalars['String']>;
  /** Relation to query */
  relation?: Maybe<Scalars['String']>;
  /**
   * SubjectID to query
   *
   * Either SubjectSet or SubjectID can be provided.
   */
  subject_id?: Maybe<Scalars['String']>;
  subject_set?: Maybe<subjectSet>;
};

export type relationQuery_Input = {
  /** Namespace to query */
  namespace?: InputMaybe<Scalars['String']>;
  /** Object to query */
  object?: InputMaybe<Scalars['String']>;
  /** Relation to query */
  relation?: InputMaybe<Scalars['String']>;
  /**
   * SubjectID to query
   *
   * Either SubjectSet or SubjectID can be provided.
   */
  subject_id?: InputMaybe<Scalars['String']>;
  subject_set?: InputMaybe<subjectSet_Input>;
};

export type postCheckMirrorStatus_response = RESTResponse_represents_the_response_for_a_check_request_ | genericError;

export type postCheck_response = RESTResponse_represents_the_response_for_a_check_request_ | genericError;

export type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export type authQuery = {
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/health/alive`
   * This endpoint returns a HTTP 200 status code when Ory Keto is accepting incoming
   * HTTP requests. This status does currently not include checks whether the database connection is working.
   *
   * If the service supports TLS Edge Termination, this endpoint does not require the
   * `X-Forwarded-Proto` header to be set.
   *
   * Be aware that if you are running multiple nodes of this service, the health status will never
   * refer to the cluster state, only to a single instance.
   *
   */
  isAlive?: Maybe<isAlive_response>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/health/ready`
   * This endpoint returns a HTTP 200 status code when Ory Keto is up running and the environment dependencies (e.g.
   * the database) are responsive as well.
   *
   * If the service supports TLS Edge Termination, this endpoint does not require the
   * `X-Forwarded-Proto` header to be set.
   *
   * Be aware that if you are running multiple nodes of Ory Keto, the health status will never
   * refer to the cluster state, only to a single instance.
   *
   */
  isReady?: Maybe<isReady_response>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/relation-tuples`
   * Get all relation tuples that match the query. Only the namespace field is required.
   *
   */
  getRelationTuples?: Maybe<getRelationTuples_response>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/relation-tuples/check`
   * To learn how relation tuples and the check works, head over to [the documentation](../concepts/relation-tuples.mdx).
   *
   */
  getCheckMirrorStatus?: Maybe<getCheckMirrorStatus_response>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/relation-tuples/check/openapi`
   * To learn how relation tuples and the check works, head over to [the documentation](../concepts/relation-tuples.mdx).
   *
   */
  getCheck?: Maybe<getCheck_response>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/relation-tuples/expand`
   * Use this endpoint to expand a relation tuple.
   *
   */
  getExpand?: Maybe<getExpand_response>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/version`
   * This endpoint returns the version of Ory Keto.
   *
   * If the service supports TLS Edge Termination, this endpoint does not require the
   * `X-Forwarded-Proto` header to be set.
   *
   * Be aware that if you are running multiple nodes of this service, the version will never
   * refer to the cluster state, only to a single instance.
   *
   */
  getVersion?: Maybe<getVersion_200_response>;
};


export type authQuerygetRelationTuplesArgs = {
  page_token?: InputMaybe<Scalars['String']>;
  page_size?: InputMaybe<Scalars['Int']>;
  namespace?: InputMaybe<Scalars['String']>;
  object?: InputMaybe<Scalars['String']>;
  relation?: InputMaybe<Scalars['String']>;
  subject_id?: InputMaybe<Scalars['String']>;
  subject_set_namespace?: InputMaybe<Scalars['String']>;
  subject_set_object?: InputMaybe<Scalars['String']>;
  subject_set_relation?: InputMaybe<Scalars['String']>;
};


export type authQuerygetCheckArgs = {
  namespace?: InputMaybe<Scalars['String']>;
  object?: InputMaybe<Scalars['String']>;
  relation?: InputMaybe<Scalars['String']>;
  subject_id?: InputMaybe<Scalars['String']>;
  subject_set_namespace?: InputMaybe<Scalars['String']>;
  subject_set_object?: InputMaybe<Scalars['String']>;
  subject_set_relation?: InputMaybe<Scalars['String']>;
  max_depth?: InputMaybe<Scalars['Int']>;
};


export type authQuerygetExpandArgs = {
  namespace: Scalars['String'];
  object: Scalars['String'];
  relation: Scalars['String'];
  max_depth?: InputMaybe<Scalars['Int']>;
};

export type authMutation = {
  /**
   *
   * >**Method**: `DELETE`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/admin/relation-tuples`
   * Use this endpoint to delete relation tuples
   *
   */
  deleteRelationTuples?: Maybe<deleteRelationTuples_response>;
  /**
   *
   * >**Method**: `PATCH`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/admin/relation-tuples`
   * Use this endpoint to patch one or more relation tuples.
   *
   */
  patchRelationTuples?: Maybe<patchRelationTuples_response>;
  /**
   *
   * >**Method**: `PUT`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/admin/relation-tuples`
   * Use this endpoint to create a relation tuple.
   *
   */
  createRelationTuple?: Maybe<createRelationTuple_response>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/relation-tuples/check`
   * To learn how relation tuples and the check works, head over to [the documentation](../concepts/relation-tuples.mdx).
   *
   */
  postCheckMirrorStatus?: Maybe<postCheckMirrorStatus_response>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://localhost:4466`
   * >**Path**: `/relation-tuples/check/openapi`
   * To learn how relation tuples and the check works, head over to [the documentation](../concepts/relation-tuples.mdx).
   *
   */
  postCheck?: Maybe<postCheck_response>;
};


export type authMutationdeleteRelationTuplesArgs = {
  namespace?: InputMaybe<Scalars['String']>;
  object?: InputMaybe<Scalars['String']>;
  relation?: InputMaybe<Scalars['String']>;
  subject_id?: InputMaybe<Scalars['String']>;
  subject_set_namespace?: InputMaybe<Scalars['String']>;
  subject_set_object?: InputMaybe<Scalars['String']>;
  subject_set_relation?: InputMaybe<Scalars['String']>;
};


export type authMutationpatchRelationTuplesArgs = {
  input?: InputMaybe<Array<InputMaybe<patchDelta_Input>>>;
};


export type authMutationcreateRelationTupleArgs = {
  input?: InputMaybe<relationQuery_Input>;
};


export type authMutationpostCheckArgs = {
  max_depth?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<relationQuery_Input>;
};

  export type QuerySdk = {
      /** undefined **/
  auth: InContextSdkMethod<Query['auth'], {}, MeshContext>
  };

  export type MutationSdk = {
      /** undefined **/
  auth: InContextSdkMethod<Mutation['auth'], {}, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["keto-read"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
