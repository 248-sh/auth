// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace KratosIdentityTraitsTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  ObjMap: any;
};

export type Query = {
  auth: authQuery;
};

export type KratosIdentity = {
  traits?: Maybe<query_identityTraits_traits>;
};

export type query_identityTraits_traits = {
  email: Scalars['EmailAddress'];
  name?: Maybe<query_identityTraits_traits_name>;
  additionalProperties?: Maybe<Scalars['JSON']>;
};

export type query_identityTraits_traits_name = {
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
};

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
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/identities`
   *
   *
   */
  identityTraits?: Maybe<KratosIdentity>;
};

  export type QuerySdk = {
      /** undefined **/
  auth: InContextSdkMethod<Query['auth'], {}, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["kratos-identity-traits"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
