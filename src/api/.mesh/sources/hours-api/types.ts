// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HoursApiTypes {
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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  ObjMap: any;
};

export type Query = {
  dummy?: Maybe<Scalars['String']>;
};

export type Mutation = {
  hours: hoursMutation;
};

export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export type hoursMutation = {
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/add-client`
   *
   *
   */
  addClient?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/remove-client`
   *
   *
   */
  removeClient?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/rename-client`
   *
   *
   */
  renameClient?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/start-entry`
   *
   *
   */
  startEntry?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/stop-entry`
   *
   *
   */
  stopEntry?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/remove-entry`
   *
   *
   */
  removeEntry?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/set-entry-start`
   *
   *
   */
  setEntryStart?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/set-entry-description`
   *
   *
   */
  setEntryDescription?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/set-entry-duration`
   *
   *
   */
  setEntryDuration?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/set-entry-project`
   *
   *
   */
  setEntryProject?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/add-entry-tag`
   *
   *
   */
  addEntryTag?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/remove-entry-tag`
   *
   *
   */
  removeEntryTag?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/add-project`
   *
   *
   */
  addProject?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/remove-project`
   *
   *
   */
  removeProject?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/rename-project`
   *
   *
   */
  renameProject?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/set-project-client`
   *
   *
   */
  setProjectClient?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/add-tag`
   *
   *
   */
  addTag?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/remove-tag`
   *
   *
   */
  removeTag?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://127.0.0.1:3000`
   * >**Path**: `/rename-tag`
   *
   *
   */
  renameTag?: Maybe<Scalars['JSON']>;
};


export type hoursMutationaddClientArgs = {
  name: Scalars['String'];
};


export type hoursMutationremoveClientArgs = {
  id: Scalars['String'];
};


export type hoursMutationrenameClientArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type hoursMutationstopEntryArgs = {
  id: Scalars['String'];
};


export type hoursMutationremoveEntryArgs = {
  id: Scalars['String'];
};


export type hoursMutationsetEntryStartArgs = {
  id: Scalars['String'];
  start: Scalars['String'];
};


export type hoursMutationsetEntryDescriptionArgs = {
  id: Scalars['String'];
  description: Scalars['String'];
};


export type hoursMutationsetEntryDurationArgs = {
  id: Scalars['String'];
  duration: Scalars['String'];
};


export type hoursMutationsetEntryProjectArgs = {
  id: Scalars['String'];
  projectId: Scalars['String'];
};


export type hoursMutationaddEntryTagArgs = {
  id: Scalars['String'];
  tagId: Scalars['String'];
};


export type hoursMutationremoveEntryTagArgs = {
  id: Scalars['String'];
  tagId: Scalars['String'];
};


export type hoursMutationaddProjectArgs = {
  name: Scalars['String'];
};


export type hoursMutationremoveProjectArgs = {
  id: Scalars['String'];
};


export type hoursMutationrenameProjectArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type hoursMutationsetProjectClientArgs = {
  id: Scalars['String'];
  clientId: Scalars['String'];
};


export type hoursMutationaddTagArgs = {
  name: Scalars['String'];
};


export type hoursMutationremoveTagArgs = {
  id: Scalars['String'];
};


export type hoursMutationrenameTagArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};

  export type QuerySdk = {
      /** undefined **/
  dummy: InContextSdkMethod<Query['dummy'], {}, MeshContext>
  };

  export type MutationSdk = {
      /** undefined **/
  hours: InContextSdkMethod<Mutation['hours'], {}, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["hours-api"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
