// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HoursTypes {
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
  Cursor: any;
  Datetime: any;
  BigInt: any;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `Client`. */
  clients?: Maybe<ClientsConnection>;
  /** Reads and enables pagination through a set of `Entry`. */
  entries?: Maybe<EntriesConnection>;
  /** Reads and enables pagination through a set of `EntryTag`. */
  entryTags?: Maybe<EntryTagsConnection>;
  /** Reads and enables pagination through a set of `Project`. */
  projects?: Maybe<ProjectsConnection>;
  /** Reads and enables pagination through a set of `SchemaMigration`. */
  schemaMigrations?: Maybe<SchemaMigrationsConnection>;
  /** Reads and enables pagination through a set of `Tag`. */
  tags?: Maybe<TagsConnection>;
  client?: Maybe<Client>;
  clientByName?: Maybe<Client>;
  entry?: Maybe<Entry>;
  entryTag?: Maybe<EntryTag>;
  project?: Maybe<Project>;
  projectByName?: Maybe<Project>;
  schemaMigration?: Maybe<SchemaMigration>;
  tag?: Maybe<Tag>;
  tagByName?: Maybe<Tag>;
  /** Reads a single `Client` using its globally unique `ID`. */
  clientByNodeId?: Maybe<Client>;
  /** Reads a single `Entry` using its globally unique `ID`. */
  entryByNodeId?: Maybe<Entry>;
  /** Reads a single `EntryTag` using its globally unique `ID`. */
  entryTagByNodeId?: Maybe<EntryTag>;
  /** Reads a single `Project` using its globally unique `ID`. */
  projectByNodeId?: Maybe<Project>;
  /** Reads a single `SchemaMigration` using its globally unique `ID`. */
  schemaMigrationByNodeId?: Maybe<SchemaMigration>;
  /** Reads a single `Tag` using its globally unique `ID`. */
  tagByNodeId?: Maybe<Tag>;
};


/** The root query type which gives access points into the data universe. */
export type QuerynodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryclientsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<ClientsOrderBy>>;
  condition?: InputMaybe<ClientCondition>;
  filter?: InputMaybe<ClientFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryentriesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
  condition?: InputMaybe<EntryCondition>;
  filter?: InputMaybe<EntryFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryentryTagsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<EntryTagsOrderBy>>;
  condition?: InputMaybe<EntryTagCondition>;
  filter?: InputMaybe<EntryTagFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryprojectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryschemaMigrationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<SchemaMigrationsOrderBy>>;
  condition?: InputMaybe<SchemaMigrationCondition>;
  filter?: InputMaybe<SchemaMigrationFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerytagsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<TagsOrderBy>>;
  condition?: InputMaybe<TagCondition>;
  filter?: InputMaybe<TagFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryclientArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryclientByNameArgs = {
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryentryArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryentryTagArgs = {
  userId: Scalars['String'];
  entryId: Scalars['String'];
  tagId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryprojectArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryprojectByNameArgs = {
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryschemaMigrationArgs = {
  version: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type QuerytagArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerytagByNameArgs = {
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryclientByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryentryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryentryTagByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryprojectByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryschemaMigrationByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerytagByNodeIdArgs = {
  nodeId: Scalars['ID'];
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** A connection to a list of `Client` values. */
export type ClientsConnection = {
  /** A list of `Client` objects. */
  nodes: Array<Maybe<Client>>;
  /** A list of edges which contains the `Client` and cursor to aid in pagination. */
  edges: Array<ClientsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Client` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type Client = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  /** Reads and enables pagination through a set of `Project`. */
  projectsByUserIdAndClientId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByUserIdAndClientIdList: Array<Project>;
};


export type ClientprojectsByUserIdAndClientIdArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
};


export type ClientprojectsByUserIdAndClientIdListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
};

/** A connection to a list of `Project` values. */
export type ProjectsConnection = {
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project` and cursor to aid in pagination. */
  edges: Array<ProjectsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type Project = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  /** Reads a single `Client` that is related to this `Project`. */
  userClient?: Maybe<Client>;
};

/** A `Project` edge in the connection. */
export type ProjectsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** Methods to use when ordering `Project`. */
export type ProjectsOrderBy =
  | 'NATURAL'
  | 'USER_ID_ASC'
  | 'USER_ID_DESC'
  | 'ID_ASC'
  | 'ID_DESC'
  | 'NAME_ASC'
  | 'NAME_DESC'
  | 'CLIENT_ID_ASC'
  | 'CLIENT_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Project` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProjectCondition = {
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `clientId` field. */
  clientId?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `Project` object types. All fields are combined with a logical ‘and.’ */
export type ProjectFilter = {
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Filter by the object’s `clientId` field. */
  clientId?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectFilter>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']>>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
};

/** A `Client` edge in the connection. */
export type ClientsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Client` at the end of the edge. */
  node?: Maybe<Client>;
};

/** Methods to use when ordering `Client`. */
export type ClientsOrderBy =
  | 'NATURAL'
  | 'USER_ID_ASC'
  | 'USER_ID_DESC'
  | 'ID_ASC'
  | 'ID_DESC'
  | 'NAME_ASC'
  | 'NAME_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Client` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ClientCondition = {
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `Client` object types. All fields are combined with a logical ‘and.’ */
export type ClientFilter = {
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ClientFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ClientFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<ClientFilter>;
};

/** A connection to a list of `Entry` values. */
export type EntriesConnection = {
  /** A list of `Entry` objects. */
  nodes: Array<Maybe<Entry>>;
  /** A list of edges which contains the `Entry` and cursor to aid in pagination. */
  edges: Array<EntriesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Entry` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type Entry = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId: Scalars['String'];
  id: Scalars['String'];
  start: Scalars['Datetime'];
  status: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  lastStart: Scalars['Datetime'];
  lastStop?: Maybe<Scalars['Datetime']>;
  lastDuration: Scalars['Int'];
  totalDuration: Scalars['Int'];
  projectId?: Maybe<Scalars['String']>;
};

/** A `Entry` edge in the connection. */
export type EntriesEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Entry` at the end of the edge. */
  node?: Maybe<Entry>;
};

/** Methods to use when ordering `Entry`. */
export type EntriesOrderBy =
  | 'NATURAL'
  | 'USER_ID_ASC'
  | 'USER_ID_DESC'
  | 'ID_ASC'
  | 'ID_DESC'
  | 'START_ASC'
  | 'START_DESC'
  | 'STATUS_ASC'
  | 'STATUS_DESC'
  | 'DESCRIPTION_ASC'
  | 'DESCRIPTION_DESC'
  | 'LAST_START_ASC'
  | 'LAST_START_DESC'
  | 'LAST_STOP_ASC'
  | 'LAST_STOP_DESC'
  | 'LAST_DURATION_ASC'
  | 'LAST_DURATION_DESC'
  | 'TOTAL_DURATION_ASC'
  | 'TOTAL_DURATION_DESC'
  | 'PROJECT_ID_ASC'
  | 'PROJECT_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Entry` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EntryCondition = {
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `start` field. */
  start?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `lastStart` field. */
  lastStart?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `lastStop` field. */
  lastStop?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `lastDuration` field. */
  lastDuration?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `totalDuration` field. */
  totalDuration?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `Entry` object types. All fields are combined with a logical ‘and.’ */
export type EntryFilter = {
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `start` field. */
  start?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<IntFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lastStart` field. */
  lastStart?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `lastStop` field. */
  lastStop?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `lastDuration` field. */
  lastDuration?: InputMaybe<IntFilter>;
  /** Filter by the object’s `totalDuration` field. */
  totalDuration?: InputMaybe<IntFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EntryFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EntryFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<EntryFilter>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']>>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']>>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of `EntryTag` values. */
export type EntryTagsConnection = {
  /** A list of `EntryTag` objects. */
  nodes: Array<Maybe<EntryTag>>;
  /** A list of edges which contains the `EntryTag` and cursor to aid in pagination. */
  edges: Array<EntryTagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EntryTag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type EntryTag = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId: Scalars['String'];
  entryId: Scalars['String'];
  tagId: Scalars['String'];
};

/** A `EntryTag` edge in the connection. */
export type EntryTagsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EntryTag` at the end of the edge. */
  node?: Maybe<EntryTag>;
};

/** Methods to use when ordering `EntryTag`. */
export type EntryTagsOrderBy =
  | 'NATURAL'
  | 'USER_ID_ASC'
  | 'USER_ID_DESC'
  | 'ENTRY_ID_ASC'
  | 'ENTRY_ID_DESC'
  | 'TAG_ID_ASC'
  | 'TAG_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/**
 * A condition to be used against `EntryTag` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EntryTagCondition = {
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `entryId` field. */
  entryId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `tagId` field. */
  tagId?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `EntryTag` object types. All fields are combined with a logical ‘and.’ */
export type EntryTagFilter = {
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `entryId` field. */
  entryId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tagId` field. */
  tagId?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EntryTagFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EntryTagFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<EntryTagFilter>;
};

/** A connection to a list of `SchemaMigration` values. */
export type SchemaMigrationsConnection = {
  /** A list of `SchemaMigration` objects. */
  nodes: Array<Maybe<SchemaMigration>>;
  /** A list of edges which contains the `SchemaMigration` and cursor to aid in pagination. */
  edges: Array<SchemaMigrationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SchemaMigration` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type SchemaMigration = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  version: Scalars['BigInt'];
  dirty: Scalars['Boolean'];
};

/** A `SchemaMigration` edge in the connection. */
export type SchemaMigrationsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SchemaMigration` at the end of the edge. */
  node?: Maybe<SchemaMigration>;
};

/** Methods to use when ordering `SchemaMigration`. */
export type SchemaMigrationsOrderBy =
  | 'NATURAL'
  | 'VERSION_ASC'
  | 'VERSION_DESC'
  | 'DIRTY_ASC'
  | 'DIRTY_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/**
 * A condition to be used against `SchemaMigration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SchemaMigrationCondition = {
  /** Checks for equality with the object’s `version` field. */
  version?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `dirty` field. */
  dirty?: InputMaybe<Scalars['Boolean']>;
};

/** A filter to be used against `SchemaMigration` object types. All fields are combined with a logical ‘and.’ */
export type SchemaMigrationFilter = {
  /** Filter by the object’s `version` field. */
  version?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `dirty` field. */
  dirty?: InputMaybe<BooleanFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SchemaMigrationFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SchemaMigrationFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<SchemaMigrationFilter>;
};

/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type BigIntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigInt']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigInt']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigInt']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigInt']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigInt']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigInt']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigInt']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigInt']>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
};

/** A connection to a list of `Tag` values. */
export type TagsConnection = {
  /** A list of `Tag` objects. */
  nodes: Array<Maybe<Tag>>;
  /** A list of edges which contains the `Tag` and cursor to aid in pagination. */
  edges: Array<TagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type Tag = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

/** A `Tag` edge in the connection. */
export type TagsEdge = {
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Tag` at the end of the edge. */
  node?: Maybe<Tag>;
};

/** Methods to use when ordering `Tag`. */
export type TagsOrderBy =
  | 'NATURAL'
  | 'USER_ID_ASC'
  | 'USER_ID_DESC'
  | 'ID_ASC'
  | 'ID_DESC'
  | 'NAME_ASC'
  | 'NAME_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Tag` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TagCondition = {
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `Tag` object types. All fields are combined with a logical ‘and.’ */
export type TagFilter = {
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TagFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TagFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<TagFilter>;
};

/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type Subscription = {
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form. (live)
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. (live) */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. (live) */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `Client`. (live) */
  clients?: Maybe<ClientsConnection>;
  /** Reads a set of `Client`. (live) */
  clientsList?: Maybe<Array<Client>>;
  /** Reads and enables pagination through a set of `Entry`. (live) */
  entries?: Maybe<EntriesConnection>;
  /** Reads a set of `Entry`. (live) */
  entriesList?: Maybe<Array<Entry>>;
  /** Reads and enables pagination through a set of `EntryTag`. (live) */
  entryTags?: Maybe<EntryTagsConnection>;
  /** Reads a set of `EntryTag`. (live) */
  entryTagsList?: Maybe<Array<EntryTag>>;
  /** Reads and enables pagination through a set of `Project`. (live) */
  projects?: Maybe<ProjectsConnection>;
  /** Reads a set of `Project`. (live) */
  projectsList?: Maybe<Array<Project>>;
  /** Reads and enables pagination through a set of `SchemaMigration`. (live) */
  schemaMigrations?: Maybe<SchemaMigrationsConnection>;
  /** Reads a set of `SchemaMigration`. (live) */
  schemaMigrationsList?: Maybe<Array<SchemaMigration>>;
  /** Reads and enables pagination through a set of `Tag`. (live) */
  tags?: Maybe<TagsConnection>;
  /** Reads a set of `Tag`. (live) */
  tagsList?: Maybe<Array<Tag>>;
  /**  (live) */
  client?: Maybe<Client>;
  /**  (live) */
  clientByName?: Maybe<Client>;
  /**  (live) */
  entry?: Maybe<Entry>;
  /**  (live) */
  entryTag?: Maybe<EntryTag>;
  /**  (live) */
  project?: Maybe<Project>;
  /**  (live) */
  projectByName?: Maybe<Project>;
  /**  (live) */
  schemaMigration?: Maybe<SchemaMigration>;
  /**  (live) */
  tag?: Maybe<Tag>;
  /**  (live) */
  tagByName?: Maybe<Tag>;
  /** Reads a single `Client` using its globally unique `ID`. (live) */
  clientByNodeId?: Maybe<Client>;
  /** Reads a single `Entry` using its globally unique `ID`. (live) */
  entryByNodeId?: Maybe<Entry>;
  /** Reads a single `EntryTag` using its globally unique `ID`. (live) */
  entryTagByNodeId?: Maybe<EntryTag>;
  /** Reads a single `Project` using its globally unique `ID`. (live) */
  projectByNodeId?: Maybe<Project>;
  /** Reads a single `SchemaMigration` using its globally unique `ID`. (live) */
  schemaMigrationByNodeId?: Maybe<SchemaMigration>;
  /** Reads a single `Tag` using its globally unique `ID`. (live) */
  tagByNodeId?: Maybe<Tag>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionnodeArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionclientsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<ClientsOrderBy>>;
  condition?: InputMaybe<ClientCondition>;
  filter?: InputMaybe<ClientFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionclientsListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ClientsOrderBy>>;
  condition?: InputMaybe<ClientCondition>;
  filter?: InputMaybe<ClientFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionentriesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
  condition?: InputMaybe<EntryCondition>;
  filter?: InputMaybe<EntryFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionentriesListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EntriesOrderBy>>;
  condition?: InputMaybe<EntryCondition>;
  filter?: InputMaybe<EntryFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionentryTagsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<EntryTagsOrderBy>>;
  condition?: InputMaybe<EntryTagCondition>;
  filter?: InputMaybe<EntryTagFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionentryTagsListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EntryTagsOrderBy>>;
  condition?: InputMaybe<EntryTagCondition>;
  filter?: InputMaybe<EntryTagFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionprojectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionprojectsListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionschemaMigrationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<SchemaMigrationsOrderBy>>;
  condition?: InputMaybe<SchemaMigrationCondition>;
  filter?: InputMaybe<SchemaMigrationFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionschemaMigrationsListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SchemaMigrationsOrderBy>>;
  condition?: InputMaybe<SchemaMigrationCondition>;
  filter?: InputMaybe<SchemaMigrationFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptiontagsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  after?: InputMaybe<Scalars['Cursor']>;
  orderBy?: InputMaybe<Array<TagsOrderBy>>;
  condition?: InputMaybe<TagCondition>;
  filter?: InputMaybe<TagFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptiontagsListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TagsOrderBy>>;
  condition?: InputMaybe<TagCondition>;
  filter?: InputMaybe<TagFilter>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionclientArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionclientByNameArgs = {
  name: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionentryArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionentryTagArgs = {
  userId: Scalars['String'];
  entryId: Scalars['String'];
  tagId: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionprojectArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionprojectByNameArgs = {
  name: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionschemaMigrationArgs = {
  version: Scalars['BigInt'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptiontagArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptiontagByNameArgs = {
  name: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionclientByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionentryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionentryTagByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionprojectByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionschemaMigrationByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptiontagByNodeIdArgs = {
  nodeId: Scalars['ID'];
};

  export type QuerySdk = {
      /** Exposes the root query type nested one level down. This is helpful for Relay 1
which can only query top level fields if they are in a particular form. **/
  query: InContextSdkMethod<Query['query'], {}, MeshContext>,
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. **/
  nodeId: InContextSdkMethod<Query['nodeId'], {}, MeshContext>,
  /** Fetches an object given its globally unique `ID`. **/
  node: InContextSdkMethod<Query['node'], QuerynodeArgs, MeshContext>,
  /** Reads and enables pagination through a set of `Client`. **/
  clients: InContextSdkMethod<Query['clients'], QueryclientsArgs, MeshContext>,
  /** Reads and enables pagination through a set of `Entry`. **/
  entries: InContextSdkMethod<Query['entries'], QueryentriesArgs, MeshContext>,
  /** Reads and enables pagination through a set of `EntryTag`. **/
  entryTags: InContextSdkMethod<Query['entryTags'], QueryentryTagsArgs, MeshContext>,
  /** Reads and enables pagination through a set of `Project`. **/
  projects: InContextSdkMethod<Query['projects'], QueryprojectsArgs, MeshContext>,
  /** Reads and enables pagination through a set of `SchemaMigration`. **/
  schemaMigrations: InContextSdkMethod<Query['schemaMigrations'], QueryschemaMigrationsArgs, MeshContext>,
  /** Reads and enables pagination through a set of `Tag`. **/
  tags: InContextSdkMethod<Query['tags'], QuerytagsArgs, MeshContext>,
  /** undefined **/
  client: InContextSdkMethod<Query['client'], QueryclientArgs, MeshContext>,
  /** undefined **/
  clientByName: InContextSdkMethod<Query['clientByName'], QueryclientByNameArgs, MeshContext>,
  /** undefined **/
  entry: InContextSdkMethod<Query['entry'], QueryentryArgs, MeshContext>,
  /** undefined **/
  entryTag: InContextSdkMethod<Query['entryTag'], QueryentryTagArgs, MeshContext>,
  /** undefined **/
  project: InContextSdkMethod<Query['project'], QueryprojectArgs, MeshContext>,
  /** undefined **/
  projectByName: InContextSdkMethod<Query['projectByName'], QueryprojectByNameArgs, MeshContext>,
  /** undefined **/
  schemaMigration: InContextSdkMethod<Query['schemaMigration'], QueryschemaMigrationArgs, MeshContext>,
  /** undefined **/
  tag: InContextSdkMethod<Query['tag'], QuerytagArgs, MeshContext>,
  /** undefined **/
  tagByName: InContextSdkMethod<Query['tagByName'], QuerytagByNameArgs, MeshContext>,
  /** Reads a single `Client` using its globally unique `ID`. **/
  clientByNodeId: InContextSdkMethod<Query['clientByNodeId'], QueryclientByNodeIdArgs, MeshContext>,
  /** Reads a single `Entry` using its globally unique `ID`. **/
  entryByNodeId: InContextSdkMethod<Query['entryByNodeId'], QueryentryByNodeIdArgs, MeshContext>,
  /** Reads a single `EntryTag` using its globally unique `ID`. **/
  entryTagByNodeId: InContextSdkMethod<Query['entryTagByNodeId'], QueryentryTagByNodeIdArgs, MeshContext>,
  /** Reads a single `Project` using its globally unique `ID`. **/
  projectByNodeId: InContextSdkMethod<Query['projectByNodeId'], QueryprojectByNodeIdArgs, MeshContext>,
  /** Reads a single `SchemaMigration` using its globally unique `ID`. **/
  schemaMigrationByNodeId: InContextSdkMethod<Query['schemaMigrationByNodeId'], QueryschemaMigrationByNodeIdArgs, MeshContext>,
  /** Reads a single `Tag` using its globally unique `ID`. **/
  tagByNodeId: InContextSdkMethod<Query['tagByNodeId'], QuerytagByNodeIdArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** Exposes the root query type nested one level down. This is helpful for Relay 1
which can only query top level fields if they are in a particular form. (live) **/
  query: InContextSdkMethod<Subscription['query'], {}, MeshContext>,
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. (live) **/
  nodeId: InContextSdkMethod<Subscription['nodeId'], {}, MeshContext>,
  /** Fetches an object given its globally unique `ID`. (live) **/
  node: InContextSdkMethod<Subscription['node'], SubscriptionnodeArgs, MeshContext>,
  /** Reads and enables pagination through a set of `Client`. (live) **/
  clients: InContextSdkMethod<Subscription['clients'], SubscriptionclientsArgs, MeshContext>,
  /** Reads a set of `Client`. (live) **/
  clientsList: InContextSdkMethod<Subscription['clientsList'], SubscriptionclientsListArgs, MeshContext>,
  /** Reads and enables pagination through a set of `Entry`. (live) **/
  entries: InContextSdkMethod<Subscription['entries'], SubscriptionentriesArgs, MeshContext>,
  /** Reads a set of `Entry`. (live) **/
  entriesList: InContextSdkMethod<Subscription['entriesList'], SubscriptionentriesListArgs, MeshContext>,
  /** Reads and enables pagination through a set of `EntryTag`. (live) **/
  entryTags: InContextSdkMethod<Subscription['entryTags'], SubscriptionentryTagsArgs, MeshContext>,
  /** Reads a set of `EntryTag`. (live) **/
  entryTagsList: InContextSdkMethod<Subscription['entryTagsList'], SubscriptionentryTagsListArgs, MeshContext>,
  /** Reads and enables pagination through a set of `Project`. (live) **/
  projects: InContextSdkMethod<Subscription['projects'], SubscriptionprojectsArgs, MeshContext>,
  /** Reads a set of `Project`. (live) **/
  projectsList: InContextSdkMethod<Subscription['projectsList'], SubscriptionprojectsListArgs, MeshContext>,
  /** Reads and enables pagination through a set of `SchemaMigration`. (live) **/
  schemaMigrations: InContextSdkMethod<Subscription['schemaMigrations'], SubscriptionschemaMigrationsArgs, MeshContext>,
  /** Reads a set of `SchemaMigration`. (live) **/
  schemaMigrationsList: InContextSdkMethod<Subscription['schemaMigrationsList'], SubscriptionschemaMigrationsListArgs, MeshContext>,
  /** Reads and enables pagination through a set of `Tag`. (live) **/
  tags: InContextSdkMethod<Subscription['tags'], SubscriptiontagsArgs, MeshContext>,
  /** Reads a set of `Tag`. (live) **/
  tagsList: InContextSdkMethod<Subscription['tagsList'], SubscriptiontagsListArgs, MeshContext>,
  /**  (live) **/
  client: InContextSdkMethod<Subscription['client'], SubscriptionclientArgs, MeshContext>,
  /**  (live) **/
  clientByName: InContextSdkMethod<Subscription['clientByName'], SubscriptionclientByNameArgs, MeshContext>,
  /**  (live) **/
  entry: InContextSdkMethod<Subscription['entry'], SubscriptionentryArgs, MeshContext>,
  /**  (live) **/
  entryTag: InContextSdkMethod<Subscription['entryTag'], SubscriptionentryTagArgs, MeshContext>,
  /**  (live) **/
  project: InContextSdkMethod<Subscription['project'], SubscriptionprojectArgs, MeshContext>,
  /**  (live) **/
  projectByName: InContextSdkMethod<Subscription['projectByName'], SubscriptionprojectByNameArgs, MeshContext>,
  /**  (live) **/
  schemaMigration: InContextSdkMethod<Subscription['schemaMigration'], SubscriptionschemaMigrationArgs, MeshContext>,
  /**  (live) **/
  tag: InContextSdkMethod<Subscription['tag'], SubscriptiontagArgs, MeshContext>,
  /**  (live) **/
  tagByName: InContextSdkMethod<Subscription['tagByName'], SubscriptiontagByNameArgs, MeshContext>,
  /** Reads a single `Client` using its globally unique `ID`. (live) **/
  clientByNodeId: InContextSdkMethod<Subscription['clientByNodeId'], SubscriptionclientByNodeIdArgs, MeshContext>,
  /** Reads a single `Entry` using its globally unique `ID`. (live) **/
  entryByNodeId: InContextSdkMethod<Subscription['entryByNodeId'], SubscriptionentryByNodeIdArgs, MeshContext>,
  /** Reads a single `EntryTag` using its globally unique `ID`. (live) **/
  entryTagByNodeId: InContextSdkMethod<Subscription['entryTagByNodeId'], SubscriptionentryTagByNodeIdArgs, MeshContext>,
  /** Reads a single `Project` using its globally unique `ID`. (live) **/
  projectByNodeId: InContextSdkMethod<Subscription['projectByNodeId'], SubscriptionprojectByNodeIdArgs, MeshContext>,
  /** Reads a single `SchemaMigration` using its globally unique `ID`. (live) **/
  schemaMigrationByNodeId: InContextSdkMethod<Subscription['schemaMigrationByNodeId'], SubscriptionschemaMigrationByNodeIdArgs, MeshContext>,
  /** Reads a single `Tag` using its globally unique `ID`. (live) **/
  tagByNodeId: InContextSdkMethod<Subscription['tagByNodeId'], SubscriptiontagByNodeIdArgs, MeshContext>
  };

  export type Context = {
      ["hours"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
