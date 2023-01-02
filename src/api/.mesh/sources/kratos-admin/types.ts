// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace KratosAdminTypes {
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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date | string;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: string;
  /** Integers that will have a value greater than 0. */
  PositiveInt: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** Represents empty values */
  Void: void;
  mutationInput_createRecoveryCodeForIdentity_input_expires_in: string;
  mutationInput_createRecoveryLinkForIdentity_input_expires_in: string;
  ObjMap: any;
};

export type Query = {
  auth: authQuery;
};

export type message = {
  body?: Maybe<Scalars['String']>;
  /** CreatedAt is a helper struct field for gobuffalo.pop. */
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['UUID']>;
  recipient?: Maybe<Scalars['String']>;
  send_count?: Maybe<Scalars['Int']>;
  status?: Maybe<courierMessageStatus>;
  subject?: Maybe<Scalars['String']>;
  template_type?: Maybe<query_listCourierMessages_items_template_type>;
  type?: Maybe<A_Message_SINGLE_QUOTE_s_Type>;
  /** UpdatedAt is a helper struct field for gobuffalo.pop. */
  updated_at?: Maybe<Scalars['DateTime']>;
};

/** A Message's Status */
export type courierMessageStatus =
  | 'queued'
  | 'sent'
  | 'processing'
  | 'abandoned';

export type query_listCourierMessages_items_template_type =
  | 'recovery_invalid'
  | 'recovery_valid'
  | 'recovery_code_invalid'
  | 'recovery_code_valid'
  | 'verification_invalid'
  | 'verification_valid'
  | 'verification_code_invalid'
  | 'verification_code_valid'
  | 'otp'
  | 'stub';

/** It can either be `email` or `phone` */
export type A_Message_SINGLE_QUOTE_s_Type =
  | 'email'
  | 'phone';

/** An [identity](https://www.ory.sh/docs/kratos/concepts/identity-user-model) represents a (human) user in Ory. */
export type KratosIdentity = {
  /** CreatedAt is a helper struct field for gobuffalo.pop. */
  created_at?: Maybe<Scalars['DateTime']>;
  credentials?: Maybe<query_listIdentities_items_credentials>;
  /**
   * ID is the identity's unique identifier.
   *
   * The Identity ID can not be changed and can not be chosen. This ensures future
   * compatibility and optimization for distributed stores such as CockroachDB.
   */
  id: Scalars['UUID'];
  /** NullJSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger and is NULLable- */
  metadata_admin?: Maybe<Scalars['String']>;
  /** NullJSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger and is NULLable- */
  metadata_public?: Maybe<Scalars['String']>;
  /** RecoveryAddresses contains all the addresses that can be used to recover an identity. */
  recovery_addresses?: Maybe<Array<Maybe<recoveryIdentityAddress>>>;
  /** SchemaID is the ID of the JSON Schema to be used for validating the identity's traits. */
  schema_id: Scalars['String'];
  /**
   * SchemaURL is the URL of the endpoint where the identity's traits schema can be fetched from.
   *
   * format: url
   */
  schema_url: Scalars['String'];
  state?: Maybe<An_Identity_SINGLE_QUOTE_s_State>;
  state_changed_at?: Maybe<Scalars['DateTime']>;
  /** UpdatedAt is a helper struct field for gobuffalo.pop. */
  updated_at?: Maybe<Scalars['DateTime']>;
  /** VerifiableAddresses contains all the addresses that can be verified by the user. */
  verifiable_addresses?: Maybe<Array<Maybe<verifiableIdentityAddress>>>;
};

/** Credentials represents all credentials that can be used for authenticating this identity. */
export type query_listIdentities_items_credentials = {
  additionalProperties?: Maybe<Array<Maybe<identityCredentials_entry>>>;
};

export type identityCredentials_entry = {
  key: Scalars['ID'];
  value?: Maybe<identityCredentials>;
};

/** Credentials represents a specific credential type */
export type identityCredentials = {
  config?: Maybe<Scalars['JSON']>;
  /** CreatedAt is a helper struct field for gobuffalo.pop. */
  created_at?: Maybe<Scalars['DateTime']>;
  /** Identifiers represents a list of unique identifiers this credential type matches. */
  identifiers?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<CredentialsType__represents_several_different_credential_types_COMMA__like_password_credentials_COMMA__passwordless_credentials_COMMA_>;
  /** UpdatedAt is a helper struct field for gobuffalo.pop. */
  updated_at?: Maybe<Scalars['DateTime']>;
  /** Version refers to the version of the credential. Useful when changing the config schema. */
  version?: Maybe<Scalars['Int']>;
};

/** and so on. */
export type CredentialsType__represents_several_different_credential_types_COMMA__like_password_credentials_COMMA__passwordless_credentials_COMMA_ =
  | 'password'
  | 'totp'
  | 'oidc'
  | 'webauthn'
  | 'lookup_secret';

export type recoveryIdentityAddress = {
  /** CreatedAt is a helper struct field for gobuffalo.pop. */
  created_at?: Maybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  /** UpdatedAt is a helper struct field for gobuffalo.pop. */
  updated_at?: Maybe<Scalars['DateTime']>;
  value: Scalars['String'];
  via: Scalars['String'];
};

/** The state can either be `active` or `inactive`. */
export type An_Identity_SINGLE_QUOTE_s_State =
  | 'active'
  | 'inactive';

/** VerifiableAddress is an identity's verifiable address */
export type verifiableIdentityAddress = {
  /** When this entry was created */
  created_at?: Maybe<Scalars['DateTime']>;
  /** The ID */
  id?: Maybe<Scalars['UUID']>;
  /** VerifiableAddressStatus must not exceed 16 characters as that is the limitation in the SQL Schema */
  status: Scalars['String'];
  /** When this entry was last updated */
  updated_at?: Maybe<Scalars['DateTime']>;
  /**
   * The address value
   *
   * example foo@user.com
   */
  value: Scalars['String'];
  /** Indicates if the address has already been verified */
  verified: Scalars['Boolean'];
  verified_at?: Maybe<Scalars['DateTime']>;
  /** VerifiableAddressType must not exceed 16 characters as that is the limitation in the SQL Schema */
  via: Scalars['String'];
};

/** A Session */
export type session = {
  /** Active state. If false the session is no longer active. */
  active?: Maybe<Scalars['Boolean']>;
  /**
   * The Session Authentication Timestamp
   *
   * When this session was authenticated at. If multi-factor authentication was used this
   * is the time when the last factor was authenticated (e.g. the TOTP code challenge was completed).
   */
  authenticated_at?: Maybe<Scalars['DateTime']>;
  /** A list of authenticators which were used to authenticate the session. */
  authentication_methods?: Maybe<Array<Maybe<AuthenticationMethod_identifies_an_authentication_method>>>;
  authenticator_assurance_level?: Maybe<Authenticator_Assurance_Level_AAL>;
  /** Devices has history of all endpoints where the session was used */
  devices?: Maybe<Array<Maybe<sessionDevice>>>;
  /**
   * The Session Expiry
   *
   * When this session expires at.
   */
  expires_at?: Maybe<Scalars['DateTime']>;
  /** Session ID */
  id: Scalars['UUID'];
  identity: KratosIdentity;
  /**
   * The Session Issuance Timestamp
   *
   * When this session was issued at. Usually equal or close to `authenticated_at`.
   */
  issued_at?: Maybe<Scalars['DateTime']>;
};

/** A singular authenticator used during authentication / login. */
export type AuthenticationMethod_identifies_an_authentication_method = {
  aal?: Maybe<Authenticator_Assurance_Level_AAL>;
  /** When the authentication challenge was completed. */
  completed_at?: Maybe<Scalars['DateTime']>;
  method?: Maybe<The_method_used>;
};

/**
 * The authenticator assurance level can be one of "aal1", "aal2", or "aal3". A higher number means that it is harder
 * for an attacker to compromise the account.
 *
 * Generally, "aal1" implies that one authentication factor was used while AAL2 implies that two factors (e.g.
 * password + TOTP) have been used.
 *
 * To learn more about these levels please head over to: https://www.ory.sh/kratos/docs/concepts/credentials
 */
export type Authenticator_Assurance_Level_AAL =
  | 'aal0'
  | 'aal1'
  | 'aal2'
  | 'aal3';

export type The_method_used =
  | 'link_recovery'
  | 'code_recovery'
  | 'password'
  | 'totp'
  | 'oidc'
  | 'webauthn'
  | 'lookup_secret'
  | 'v0_6_legacy_session';

/** Device corresponding to a Session */
export type sessionDevice = {
  /** Device record ID */
  id: Scalars['UUID'];
  /** IPAddress of the client */
  ip_address?: Maybe<Scalars['String']>;
  /** Geo Location corresponding to the IP Address */
  location?: Maybe<Scalars['String']>;
  /** UserAgent of the client */
  user_agent?: Maybe<Scalars['String']>;
};

export type queryInput_listSessions_expand_items =
  | 'Devices'
  | 'Identity';

export type queryInput_getSession_expand_items =
  | 'Devices'
  | 'Identity';

export type isAlive_200_response = {
  /** Always "ok". */
  status: Scalars['String'];
};

export type isReady_200_response = {
  /** Always "ok". */
  status: Scalars['String'];
};

/** An Identity JSON Schema Container */
export type identitySchemaContainer = {
  /** The ID of the Identity JSON Schema */
  id?: Maybe<Scalars['String']>;
  schema?: Maybe<Scalars['JSON']>;
};

export type flowError = {
  /** CreatedAt is a helper struct field for gobuffalo.pop. */
  created_at?: Maybe<Scalars['DateTime']>;
  error?: Maybe<Scalars['JSON']>;
  /** ID of the error container. */
  id: Scalars['UUID'];
  /** UpdatedAt is a helper struct field for gobuffalo.pop. */
  updated_at?: Maybe<Scalars['DateTime']>;
};

/**
 * This object represents a login flow. A login flow is initiated at the "Initiate Login API / Browser Flow"
 * endpoint by a client.
 *
 * Once a login flow is completed successfully, a session cookie or session token will be issued.
 */
export type Login_Flow = {
  active?: Maybe<CredentialsType__represents_several_different_credential_types_COMMA__like_password_credentials_COMMA__passwordless_credentials_COMMA_>;
  /** CreatedAt is a helper struct field for gobuffalo.pop. */
  created_at?: Maybe<Scalars['DateTime']>;
  /**
   * ExpiresAt is the time (UTC) when the flow expires. If the user still wishes to log in,
   * a new flow has to be initiated.
   */
  expires_at: Scalars['DateTime'];
  /**
   * ID represents the flow's unique ID. When performing the login flow, this
   * represents the id in the login UI's query parameter: http://<selfservice.flows.login.ui_url>/?flow=<flow_id>
   */
  id: Scalars['UUID'];
  /** IssuedAt is the time (UTC) when the flow started. */
  issued_at: Scalars['DateTime'];
  oauth2_login_challenge?: Maybe<Scalars['String']>;
  oauth2_login_request?: Maybe<OAuth2LoginRequest>;
  /** Refresh stores whether this login flow should enforce re-authentication. */
  refresh?: Maybe<Scalars['Boolean']>;
  /**
   * RequestURL is the initial URL that was requested from Ory Kratos. It can be used
   * to forward information contained in the URL's path or query for example.
   */
  request_url: Scalars['String'];
  requested_aal?: Maybe<Authenticator_Assurance_Level_AAL>;
  /** ReturnTo contains the requested return_to URL. */
  return_to?: Maybe<Scalars['String']>;
  /** The flow type can either be `api` or `browser`. */
  type: Scalars['String'];
  ui: uiContainer;
  /** UpdatedAt is a helper struct field for gobuffalo.pop. */
  updated_at?: Maybe<Scalars['DateTime']>;
};

/** OAuth2LoginRequest struct for OAuth2LoginRequest */
export type OAuth2LoginRequest = {
  /** ID is the identifier (\"login challenge\") of the login request. It is used to identify the session. */
  challenge?: Maybe<Scalars['String']>;
  client?: Maybe<OAuth2Client_OAuth_2_0_Clients_are_used_to_perform_OAuth_2_0_and_OpenID_Connect_flows__Usually_COMMA__OAuth_2_0_clients_are_generated_for_applications_which_want_to_consume_your_OAuth_2_0_or_OpenID_Connect_capabilities_>;
  oidc_context?: Maybe<OAuth2ConsentRequestOpenIDConnectContext>;
  /** RequestURL is the original OAuth 2.0 Authorization URL requested by the OAuth 2.0 client. It is the URL which initiates the OAuth 2.0 Authorization Code or OAuth 2.0 Implicit flow. This URL is typically not needed, but might come in handy if you want to deal with additional request parameters. */
  request_url?: Maybe<Scalars['String']>;
  requested_access_token_audience?: Maybe<Array<Maybe<Scalars['String']>>>;
  requested_scope?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** SessionID is the login session ID. If the user-agent reuses a login session (via cookie / remember flag) this ID will remain the same. If the user-agent did not have an existing authentication session (e.g. remember is false) this will be a new random value. This value is used as the \"sid\" parameter in the ID Token and in OIDC Front-/Back- channel logout. It's value can generally be used to associate consecutive login requests by a certain user. */
  session_id?: Maybe<Scalars['String']>;
  /** Skip, if true, implies that the client has requested the same scopes from the same user previously. If true, you can skip asking the user to grant the requested scopes, and simply forward the user to the redirect URL.  This feature allows you to update / set session information. */
  skip?: Maybe<Scalars['Boolean']>;
  /** Subject is the user ID of the end-user that authenticated. Now, that end user needs to grant or deny the scope requested by the OAuth 2.0 client. If this value is set and `skip` is true, you MUST include this subject type when accepting the login request, or the request will fail. */
  subject?: Maybe<Scalars['String']>;
};

export type OAuth2Client_OAuth_2_0_Clients_are_used_to_perform_OAuth_2_0_and_OpenID_Connect_flows__Usually_COMMA__OAuth_2_0_clients_are_generated_for_applications_which_want_to_consume_your_OAuth_2_0_or_OpenID_Connect_capabilities_ = {
  allowed_cors_origins?: Maybe<Array<Maybe<Scalars['String']>>>;
  audience?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify a time duration in milliseconds, seconds, minutes, hours. */
  authorization_code_grant_access_token_lifespan?: Maybe<Scalars['String']>;
  /** Specify a time duration in milliseconds, seconds, minutes, hours. */
  authorization_code_grant_id_token_lifespan?: Maybe<Scalars['String']>;
  /** Specify a time duration in milliseconds, seconds, minutes, hours. */
  authorization_code_grant_refresh_token_lifespan?: Maybe<Scalars['String']>;
  /** OpenID Connect Back-Channel Logout Session Required  Boolean value specifying whether the RP requires that a sid (session ID) Claim be included in the Logout Token to identify the RP session with the OP when the backchannel_logout_uri is used. If omitted, the default value is false. */
  backchannel_logout_session_required?: Maybe<Scalars['Boolean']>;
  /** OpenID Connect Back-Channel Logout URI  RP URL that will cause the RP to log itself out when sent a Logout Token by the OP. */
  backchannel_logout_uri?: Maybe<Scalars['String']>;
  /** Specify a time duration in milliseconds, seconds, minutes, hours. */
  client_credentials_grant_access_token_lifespan?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Client ID  The ID is autogenerated and immutable. */
  client_id?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Client Name  The human-readable name of the client to be presented to the end-user during authorization. */
  client_name?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Client Secret  The secret will be included in the create request as cleartext, and then never again. The secret is kept in hashed format and is not recoverable once lost. */
  client_secret?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Client Secret Expires At  The field is currently not supported and its value is always 0. */
  client_secret_expires_at?: Maybe<Scalars['Int']>;
  /** OAuth 2.0 Client URI  ClientURI is a URL string of a web page providing information about the client. If present, the server SHOULD display this URL to the end-user in a clickable fashion. */
  client_uri?: Maybe<Scalars['String']>;
  contacts?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** OAuth 2.0 Client Creation Date  CreatedAt returns the timestamp of the client's creation. */
  created_at?: Maybe<Scalars['DateTime']>;
  /** OpenID Connect Front-Channel Logout Session Required  Boolean value specifying whether the RP requires that iss (issuer) and sid (session ID) query parameters be included to identify the RP session with the OP when the frontchannel_logout_uri is used. If omitted, the default value is false. */
  frontchannel_logout_session_required?: Maybe<Scalars['Boolean']>;
  /** OpenID Connect Front-Channel Logout URI  RP URL that will cause the RP to log itself out when rendered in an iframe by the OP. An iss (issuer) query parameter and a sid (session ID) query parameter MAY be included by the OP to enable the RP to validate the request and to determine which of the potentially multiple sessions is to be logged out; if either is included, both MUST be. */
  frontchannel_logout_uri?: Maybe<Scalars['String']>;
  grant_types?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify a time duration in milliseconds, seconds, minutes, hours. */
  implicit_grant_access_token_lifespan?: Maybe<Scalars['String']>;
  /** Specify a time duration in milliseconds, seconds, minutes, hours. */
  implicit_grant_id_token_lifespan?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Client JSON Web Key Set  Client's JSON Web Key Set [JWK] document, passed by value. The semantics of the jwks parameter are the same as the jwks_uri parameter, other than that the JWK Set is passed by value, rather than by reference. This parameter is intended only to be used by Clients that, for some reason, are unable to use the jwks_uri parameter, for instance, by native applications that might not have a location to host the contents of the JWK Set. If a Client can use jwks_uri, it MUST NOT use jwks. One significant downside of jwks is that it does not enable key rotation (which jwks_uri does, as described in Section 10 of OpenID Connect Core 1.0 [OpenID.Core]). The jwks_uri and jwks parameters MUST NOT be used together. */
  jwks?: Maybe<Scalars['JSON']>;
  /** OAuth 2.0 Client JSON Web Key Set URL  URL for the Client's JSON Web Key Set [JWK] document. If the Client signs requests to the Server, it contains the signing key(s) the Server uses to validate signatures from the Client. The JWK Set MAY also contain the Client's encryption keys(s), which are used by the Server to encrypt responses to the Client. When both signing and encryption keys are made available, a use (Key Use) parameter value is REQUIRED for all keys in the referenced JWK Set to indicate each key's intended usage. Although some algorithms allow the same key to be used for both signatures and encryption, doing so is NOT RECOMMENDED, as it is less secure. The JWK x5c parameter MAY be used to provide X.509 representations of keys provided. When used, the bare key values MUST still be present and MUST match those in the certificate. */
  jwks_uri?: Maybe<Scalars['String']>;
  /** Specify a time duration in milliseconds, seconds, minutes, hours. */
  jwt_bearer_grant_access_token_lifespan?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Client Logo URI  A URL string referencing the client's logo. */
  logo_uri?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  /** OAuth 2.0 Client Owner  Owner is a string identifying the owner of the OAuth 2.0 Client. */
  owner?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Client Policy URI  PolicyURI is a URL string that points to a human-readable privacy policy document that describes how the deployment organization collects, uses, retains, and discloses personal data. */
  policy_uri?: Maybe<Scalars['String']>;
  post_logout_redirect_uris?: Maybe<Array<Maybe<Scalars['String']>>>;
  redirect_uris?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Specify a time duration in milliseconds, seconds, minutes, hours. */
  refresh_token_grant_access_token_lifespan?: Maybe<Scalars['String']>;
  /** Specify a time duration in milliseconds, seconds, minutes, hours. */
  refresh_token_grant_id_token_lifespan?: Maybe<Scalars['String']>;
  /** Specify a time duration in milliseconds, seconds, minutes, hours. */
  refresh_token_grant_refresh_token_lifespan?: Maybe<Scalars['String']>;
  /** OpenID Connect Dynamic Client Registration Access Token  RegistrationAccessToken can be used to update, get, or delete the OAuth2 Client. It is sent when creating a client using Dynamic Client Registration. */
  registration_access_token?: Maybe<Scalars['String']>;
  /** OpenID Connect Dynamic Client Registration URL  RegistrationClientURI is the URL used to update, get, or delete the OAuth2 Client. */
  registration_client_uri?: Maybe<Scalars['String']>;
  /** OpenID Connect Request Object Signing Algorithm  JWS [JWS] alg algorithm [JWA] that MUST be used for signing Request Objects sent to the OP. All Request Objects from this Client MUST be rejected, if not signed with this algorithm. */
  request_object_signing_alg?: Maybe<Scalars['String']>;
  request_uris?: Maybe<Array<Maybe<Scalars['String']>>>;
  response_types?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** OAuth 2.0 Client Scope  Scope is a string containing a space-separated list of scope values (as described in Section 3.3 of OAuth 2.0 [RFC6749]) that the client can use when requesting access tokens. */
  scope?: Maybe<Scalars['String']>;
  /** OpenID Connect Sector Identifier URI  URL using the https scheme to be used in calculating Pseudonymous Identifiers by the OP. The URL references a file with a single JSON array of redirect_uri values. */
  sector_identifier_uri?: Maybe<Scalars['String']>;
  /** OpenID Connect Subject Type  The `subject_types_supported` Discovery parameter contains a list of the supported subject_type values for this server. Valid types include `pairwise` and `public`. */
  subject_type?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Token Endpoint Authentication Method  Requested Client Authentication method for the Token Endpoint. The options are:  `client_secret_post`: (default) Send `client_id` and `client_secret` as `application/x-www-form-urlencoded` in the HTTP body. `client_secret_basic`: Send `client_id` and `client_secret` as `application/x-www-form-urlencoded` encoded in the HTTP Authorization header. `private_key_jwt`: Use JSON Web Tokens to authenticate the client. `none`: Used for public clients (native apps, mobile apps) which can not have secrets. */
  token_endpoint_auth_method?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Token Endpoint Signing Algorithm  Requested Client Authentication signing algorithm for the Token Endpoint. */
  token_endpoint_auth_signing_alg?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Client Terms of Service URI  A URL string pointing to a human-readable terms of service document for the client that describes a contractual relationship between the end-user and the client that the end-user accepts when authorizing the client. */
  tos_uri?: Maybe<Scalars['String']>;
  /** OAuth 2.0 Client Last Update Date  UpdatedAt returns the timestamp of the last update. */
  updated_at?: Maybe<Scalars['DateTime']>;
  /** OpenID Connect Request Userinfo Signed Response Algorithm  JWS alg algorithm [JWA] REQUIRED for signing UserInfo Responses. If this is specified, the response will be JWT [JWT] serialized, and signed using JWS. The default, if omitted, is for the UserInfo Response to return the Claims as a UTF-8 encoded JSON object using the application/json content-type. */
  userinfo_signed_response_alg?: Maybe<Scalars['String']>;
};

/** OAuth2ConsentRequestOpenIDConnectContext struct for OAuth2ConsentRequestOpenIDConnectContext */
export type OAuth2ConsentRequestOpenIDConnectContext = {
  /** ACRValues is the Authentication AuthorizationContext Class Reference requested in the OAuth 2.0 Authorization request. It is a parameter defined by OpenID Connect and expresses which level of authentication (e.g. 2FA) is required.  OpenID Connect defines it as follows: > Requested Authentication AuthorizationContext Class Reference values. Space-separated string that specifies the acr values that the Authorization Server is being requested to use for processing this Authentication Request, with the values appearing in order of preference. The Authentication AuthorizationContext Class satisfied by the authentication performed is returned as the acr Claim Value, as specified in Section 2. The acr Claim is requested as a Voluntary Claim by this parameter. */
  acr_values?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Display is a string value that specifies how the Authorization Server displays the authentication and consent user interface pages to the End-User. The defined values are: page: The Authorization Server SHOULD display the authentication and consent UI consistent with a full User Agent page view. If the display parameter is not specified, this is the default display mode. popup: The Authorization Server SHOULD display the authentication and consent UI consistent with a popup User Agent window. The popup User Agent window should be of an appropriate size for a login-focused dialog and should not obscure the entire window that it is popping up over. touch: The Authorization Server SHOULD display the authentication and consent UI consistent with a device that leverages a touch interface. wap: The Authorization Server SHOULD display the authentication and consent UI consistent with a \"feature phone\" type display.  The Authorization Server MAY also attempt to detect the capabilities of the User Agent and present an appropriate display. */
  display?: Maybe<Scalars['String']>;
  /** IDTokenHintClaims are the claims of the ID Token previously issued by the Authorization Server being passed as a hint about the End-User's current or past authenticated session with the Client. */
  id_token_hint_claims?: Maybe<Scalars['JSON']>;
  /** LoginHint hints about the login identifier the End-User might use to log in (if necessary). This hint can be used by an RP if it first asks the End-User for their e-mail address (or other identifier) and then wants to pass that value as a hint to the discovered authorization service. This value MAY also be a phone number in the format specified for the phone_number Claim. The use of this parameter is optional. */
  login_hint?: Maybe<Scalars['String']>;
  /** UILocales is the End-User'id preferred languages and scripts for the user interface, represented as a space-separated list of BCP47 [RFC5646] language tag values, ordered by preference. For instance, the value \"fr-CA fr en\" represents a preference for French as spoken in Canada, then French (without a region designation), followed by English (without a region designation). An error SHOULD NOT result if some or all of the requested locales are not supported by the OpenID Provider. */
  ui_locales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Container represents a HTML Form. The container can work with both HTTP Form and JSON requests */
export type uiContainer = {
  /** Action should be used as the form action URL `<form action="{{ .Action }}" method="post">`. */
  action: Scalars['String'];
  messages?: Maybe<Array<Maybe<uiText>>>;
  /** Method is the form method (e.g. POST) */
  method: Scalars['String'];
  nodes: Array<Maybe<Node_represents_a_flow_SINGLE_QUOTE_s_nodes>>;
};

export type uiText = {
  context?: Maybe<Scalars['JSON']>;
  id: Scalars['Int'];
  /** The message text. Written in american english. */
  text: Scalars['String'];
  type: query_createNativeLoginFlow_ui_messages_items_type;
};

/**
 * The message type.
 * info Info
 * error Error
 * success Success
 */
export type query_createNativeLoginFlow_ui_messages_items_type =
  | 'info'
  | 'error'
  | 'success';

/**
 * Nodes are represented as HTML elements or their native UI equivalents. For example,
 * a node can be an `<img>` tag, or an `<input element>` but also `some plain text`.
 */
export type Node_represents_a_flow_SINGLE_QUOTE_s_nodes = {
  attributes: Attributes_represents_a_list_of_attributes_e_g___BACKTICK_href_EQUALS__QUOTATION_MARK_foo_QUOTATION_MARK__BACKTICK__for_links_;
  group: query_createNativeLoginFlow_ui_nodes_items_group;
  messages: Array<Maybe<uiText>>;
  meta: A_Node_SINGLE_QUOTE_s_Meta_Information;
  type: query_createNativeLoginFlow_ui_nodes_items_type;
};

export type Attributes_represents_a_list_of_attributes_e_g___BACKTICK_href_EQUALS__QUOTATION_MARK_foo_QUOTATION_MARK__BACKTICK__for_links_ = uiNodeInputAttributes | TextAttributes_represents_the_attributes_of_a_text_node_ | ImageAttributes_represents_the_attributes_of_an_image_node_ | AnchorAttributes_represents_the_attributes_of_an_anchor_node_ | ScriptAttributes_represent_script_nodes_which_load_javascript_;

/** InputAttributes represents the attributes of an input node */
export type uiNodeInputAttributes = {
  autocomplete?: Maybe<query_createNativeLoginFlow_ui_nodes_items_attributes_oneOf_0_autocomplete>;
  /** Sets the input's disabled field to true or false. */
  disabled: Scalars['Boolean'];
  label?: Maybe<uiText>;
  /** The input's element name. */
  name: Scalars['String'];
  /**
   * NodeType represents this node's types. It is a mirror of `node.type` and
   * is primarily used to allow compatibility with OpenAPI 3.0.  In this struct it technically always is "input".
   */
  node_type: Scalars['String'];
  /**
   * OnClick may contain javascript which should be executed on click. This is primarily
   * used for WebAuthn.
   */
  onclick?: Maybe<Scalars['String']>;
  /** The input's pattern. */
  pattern?: Maybe<Scalars['String']>;
  /** Mark this input field as required. */
  required?: Maybe<Scalars['Boolean']>;
  type: query_createNativeLoginFlow_ui_nodes_items_attributes_oneOf_0_type;
  /** The input's value. */
  value?: Maybe<Scalars['String']>;
};

/**
 * The autocomplete attribute for the input.
 * email InputAttributeAutocompleteEmail
 * tel InputAttributeAutocompleteTel
 * url InputAttributeAutocompleteUrl
 * current-password InputAttributeAutocompleteCurrentPassword
 * new-password InputAttributeAutocompleteNewPassword
 * one-time-code InputAttributeAutocompleteOneTimeCode
 */
export type query_createNativeLoginFlow_ui_nodes_items_attributes_oneOf_0_autocomplete =
  | 'email'
  | 'tel'
  | 'url'
  | 'current_password'
  | 'new_password'
  | 'one_time_code';

/**
 * The input's element type.
 * text InputAttributeTypeText
 * password InputAttributeTypePassword
 * number InputAttributeTypeNumber
 * checkbox InputAttributeTypeCheckbox
 * hidden InputAttributeTypeHidden
 * email InputAttributeTypeEmail
 * tel InputAttributeTypeTel
 * submit InputAttributeTypeSubmit
 * button InputAttributeTypeButton
 * datetime-local InputAttributeTypeDateTimeLocal
 * date InputAttributeTypeDate
 * url InputAttributeTypeURI
 */
export type query_createNativeLoginFlow_ui_nodes_items_attributes_oneOf_0_type =
  | 'text'
  | 'password'
  | 'number'
  | 'checkbox'
  | 'hidden'
  | 'email'
  | 'tel'
  | 'submit'
  | 'button'
  | 'datetime_local'
  | 'date'
  | 'url';

export type TextAttributes_represents_the_attributes_of_a_text_node_ = {
  /** A unique identifier */
  id: Scalars['String'];
  /**
   * NodeType represents this node's types. It is a mirror of `node.type` and
   * is primarily used to allow compatibility with OpenAPI 3.0.  In this struct it technically always is "text".
   */
  node_type: Scalars['String'];
  text: uiText;
};

export type ImageAttributes_represents_the_attributes_of_an_image_node_ = {
  /** Height of the image */
  height: Scalars['Int'];
  /** A unique identifier */
  id: Scalars['String'];
  /**
   * NodeType represents this node's types. It is a mirror of `node.type` and
   * is primarily used to allow compatibility with OpenAPI 3.0.  In this struct it technically always is "img".
   */
  node_type: Scalars['String'];
  /**
   * The image's source URL.
   *
   * format: uri
   */
  src: Scalars['String'];
  /** Width of the image */
  width: Scalars['Int'];
};

export type AnchorAttributes_represents_the_attributes_of_an_anchor_node_ = {
  /**
   * The link's href (destination) URL.
   *
   * format: uri
   */
  href: Scalars['String'];
  /** A unique identifier */
  id: Scalars['String'];
  /**
   * NodeType represents this node's types. It is a mirror of `node.type` and
   * is primarily used to allow compatibility with OpenAPI 3.0.  In this struct it technically always is "a".
   */
  node_type: Scalars['String'];
  title: uiText;
};

export type ScriptAttributes_represent_script_nodes_which_load_javascript_ = {
  /** The script async type */
  async: Scalars['Boolean'];
  /** The script cross origin policy */
  crossorigin: Scalars['String'];
  /** A unique identifier */
  id: Scalars['String'];
  /** The script's integrity hash */
  integrity: Scalars['String'];
  /**
   * NodeType represents this node's types. It is a mirror of `node.type` and
   * is primarily used to allow compatibility with OpenAPI 3.0. In this struct it technically always is "script".
   */
  node_type: Scalars['String'];
  /**
   * Nonce for CSP
   *
   * A nonce you may want to use to improve your Content Security Policy.
   * You do not have to use this value but if you want to improve your CSP
   * policies you may use it. You can also choose to use your own nonce value!
   */
  nonce: Scalars['String'];
  /** The script referrer policy */
  referrerpolicy: Scalars['String'];
  /** The script source */
  src: Scalars['String'];
  /** The script MIME type */
  type: Scalars['String'];
};

/**
 * Group specifies which group (e.g. password authenticator) this node belongs to.
 * default DefaultGroup
 * password PasswordGroup
 * oidc OpenIDConnectGroup
 * profile ProfileGroup
 * link LinkGroup
 * code CodeGroup
 * totp TOTPGroup
 * lookup_secret LookupGroup
 * webauthn WebAuthnGroup
 */
export type query_createNativeLoginFlow_ui_nodes_items_group =
  | 'default'
  | 'password'
  | 'oidc'
  | 'profile'
  | 'link'
  | 'code'
  | 'totp'
  | 'lookup_secret'
  | 'webauthn';

/**
 * This might include a label and other information that can optionally
 * be used to render UIs.
 */
export type A_Node_SINGLE_QUOTE_s_Meta_Information = {
  label?: Maybe<uiText>;
};

/**
 * The node's type
 * text Text
 * input Input
 * img Image
 * a Anchor
 * script Script
 */
export type query_createNativeLoginFlow_ui_nodes_items_type =
  | 'text'
  | 'input'
  | 'img'
  | 'a'
  | 'script';

/** Logout Flow */
export type logoutFlow = {
  /** LogoutToken can be used to perform logout using AJAX. */
  logout_token: Scalars['String'];
  /**
   * LogoutURL can be opened in a browser to sign the user out.
   *
   * format: uri
   */
  logout_url: Scalars['String'];
};

/**
 * This request is used when an identity wants to recover their account.
 *
 * We recommend reading the [Account Recovery Documentation](../self-service/flows/password-reset-account-recovery)
 */
export type A_Recovery_Flow = {
  /**
   * Active, if set, contains the recovery method that is being used. It is initially
   * not set.
   */
  active?: Maybe<Scalars['String']>;
  /**
   * ExpiresAt is the time (UTC) when the request expires. If the user still wishes to update the setting,
   * a new request has to be initiated.
   */
  expires_at: Scalars['DateTime'];
  /**
   * ID represents the request's unique ID. When performing the recovery flow, this
   * represents the id in the recovery ui's query parameter: http://<selfservice.flows.recovery.ui_url>?request=<id>
   */
  id: Scalars['UUID'];
  /** IssuedAt is the time (UTC) when the request occurred. */
  issued_at: Scalars['DateTime'];
  /**
   * RequestURL is the initial URL that was requested from Ory Kratos. It can be used
   * to forward information contained in the URL's path or query for example.
   */
  request_url: Scalars['String'];
  /** ReturnTo contains the requested return_to URL. */
  return_to?: Maybe<Scalars['String']>;
  state: Recovery_Flow_State;
  /** The flow type can either be `api` or `browser`. */
  type: Scalars['String'];
  ui: uiContainer;
};

/**
 * The state represents the state of the recovery flow.
 *
 * choose_method: ask the user to choose a method (e.g. recover account via email)
 * sent_email: the email has been sent to the user
 * passed_challenge: the request was successful and the recovery challenge was passed.
 */
export type Recovery_Flow_State =
  | 'choose_method'
  | 'sent_email'
  | 'passed_challenge';

export type registrationFlow = {
  active?: Maybe<CredentialsType__represents_several_different_credential_types_COMMA__like_password_credentials_COMMA__passwordless_credentials_COMMA_>;
  /**
   * ExpiresAt is the time (UTC) when the flow expires. If the user still wishes to log in,
   * a new flow has to be initiated.
   */
  expires_at: Scalars['DateTime'];
  /**
   * ID represents the flow's unique ID. When performing the registration flow, this
   * represents the id in the registration ui's query parameter: http://<selfservice.flows.registration.ui_url>/?flow=<id>
   */
  id: Scalars['UUID'];
  /** IssuedAt is the time (UTC) when the flow occurred. */
  issued_at: Scalars['DateTime'];
  oauth2_login_challenge?: Maybe<Scalars['String']>;
  oauth2_login_request?: Maybe<OAuth2LoginRequest>;
  /**
   * RequestURL is the initial URL that was requested from Ory Kratos. It can be used
   * to forward information contained in the URL's path or query for example.
   */
  request_url: Scalars['String'];
  /** ReturnTo contains the requested return_to URL. */
  return_to?: Maybe<Scalars['String']>;
  /** The flow type can either be `api` or `browser`. */
  type: Scalars['String'];
  ui: uiContainer;
};

/**
 * This flow is used when an identity wants to update settings
 * (e.g. profile data, passwords, ...) in a selfservice manner.
 *
 * We recommend reading the [User Settings Documentation](../self-service/flows/user-settings)
 */
export type Flow_represents_a_Settings_Flow = {
  /**
   * Active, if set, contains the registration method that is being used. It is initially
   * not set.
   */
  active?: Maybe<Scalars['String']>;
  /**
   * ExpiresAt is the time (UTC) when the flow expires. If the user still wishes to update the setting,
   * a new flow has to be initiated.
   */
  expires_at: Scalars['DateTime'];
  /**
   * ID represents the flow's unique ID. When performing the settings flow, this
   * represents the id in the settings ui's query parameter: http://<selfservice.flows.settings.ui_url>?flow=<id>
   */
  id: Scalars['UUID'];
  identity: KratosIdentity;
  /** IssuedAt is the time (UTC) when the flow occurred. */
  issued_at: Scalars['DateTime'];
  /**
   * RequestURL is the initial URL that was requested from Ory Kratos. It can be used
   * to forward information contained in the URL's path or query for example.
   */
  request_url: Scalars['String'];
  /** ReturnTo contains the requested return_to URL. */
  return_to?: Maybe<Scalars['String']>;
  state: State_represents_the_state_of_this_flow__It_knows_two_states_;
  /** The flow type can either be `api` or `browser`. */
  type: Scalars['String'];
  ui: uiContainer;
};

/**
 * show_form: No user data has been collected, or it is invalid, and thus the form should be shown.
 * success: Indicates that the settings flow has been updated successfully with the provided data.
 * Done will stay true when repeatedly checking. If set to true, done will revert back to false only
 * when a flow with invalid (e.g. "please use a valid phone number") data was sent.
 */
export type State_represents_the_state_of_this_flow__It_knows_two_states_ =
  | 'show_form'
  | 'success';

/**
 * Used to verify an out-of-band communication
 * channel such as an email address or a phone number.
 *
 * For more information head over to: https://www.ory.sh/docs/kratos/selfservice/flows/verify-email-account-activation
 */
export type A_Verification_Flow = {
  /**
   * Active, if set, contains the registration method that is being used. It is initially
   * not set.
   */
  active?: Maybe<Scalars['String']>;
  /**
   * ExpiresAt is the time (UTC) when the request expires. If the user still wishes to verify the address,
   * a new request has to be initiated.
   */
  expires_at?: Maybe<Scalars['DateTime']>;
  /**
   * ID represents the request's unique ID. When performing the verification flow, this
   * represents the id in the verify ui's query parameter: http://<selfservice.flows.verification.ui_url>?request=<id>
   *
   * type: string
   * format: uuid
   */
  id: Scalars['UUID'];
  /** IssuedAt is the time (UTC) when the request occurred. */
  issued_at?: Maybe<Scalars['DateTime']>;
  /**
   * RequestURL is the initial URL that was requested from Ory Kratos. It can be used
   * to forward information contained in the URL's path or query for example.
   */
  request_url?: Maybe<Scalars['String']>;
  /** ReturnTo contains the requested return_to URL. */
  return_to?: Maybe<Scalars['String']>;
  state: Verification_Flow_State;
  /** The flow type can either be `api` or `browser`. */
  type: Scalars['String'];
  ui: uiContainer;
};

/**
 * The state represents the state of the verification flow.
 *
 * choose_method: ask the user to choose a method (e.g. recover account via email)
 * sent_email: the email has been sent to the user
 * passed_challenge: the request was successful and the recovery challenge was passed.
 */
export type Verification_Flow_State =
  | 'choose_method'
  | 'sent_email'
  | 'passed_challenge';

export type getVersion_200_response = {
  /** The version of Ory Kratos. */
  version: Scalars['String'];
};

export type Mutation = {
  auth: authMutation;
};

/** Create Identity Body */
export type createIdentityBody_Input = {
  credentials?: InputMaybe<identityWithCredentials_Input>;
  /** Store metadata about the user which is only accessible through admin APIs such as `GET /admin/identities/<id>`. */
  metadata_admin?: InputMaybe<Scalars['JSON']>;
  /**
   * Store metadata about the identity which the identity itself can see when calling for example the
   * session endpoint. Do not store sensitive information (e.g. credit score) about the identity in this field.
   */
  metadata_public?: InputMaybe<Scalars['JSON']>;
  /**
   * RecoveryAddresses contains all the addresses that can be used to recover an identity.
   *
   * Use this structure to import recovery addresses for an identity. Please keep in mind
   * that the address needs to be represented in the Identity Schema or this field will be overwritten
   * on the next identity update.
   */
  recovery_addresses?: InputMaybe<Array<InputMaybe<recoveryIdentityAddress_Input>>>;
  /** SchemaID is the ID of the JSON Schema to be used for validating the identity's traits. */
  schema_id: Scalars['String'];
  state?: InputMaybe<An_Identity_SINGLE_QUOTE_s_State>;
  traits: Scalars['JSON'];
  /**
   * VerifiableAddresses contains all the addresses that can be verified by the user.
   *
   * Use this structure to import verified addresses for an identity. Please keep in mind
   * that the address needs to be represented in the Identity Schema or this field will be overwritten
   * on the next identity update.
   */
  verifiable_addresses?: InputMaybe<Array<InputMaybe<verifiableIdentityAddress_Input>>>;
};

/** Create Identity and Import Credentials */
export type identityWithCredentials_Input = {
  oidc?: InputMaybe<identityWithCredentialsOidc_Input>;
  password?: InputMaybe<identityWithCredentialsPassword_Input>;
};

/** Create Identity and Import Social Sign In Credentials */
export type identityWithCredentialsOidc_Input = {
  config?: InputMaybe<identityWithCredentialsOidcConfig_Input>;
};

export type identityWithCredentialsOidcConfig_Input = {
  config?: InputMaybe<identityWithCredentialsPasswordConfig_Input>;
  /** A list of OpenID Connect Providers */
  providers?: InputMaybe<Array<InputMaybe<identityWithCredentialsOidcConfigProvider_Input>>>;
};

/** Create Identity and Import Password Credentials Configuration */
export type identityWithCredentialsPasswordConfig_Input = {
  /** The hashed password in [PHC format]( https://www.ory.sh/docs/kratos/concepts/credentials/username-email-password#hashed-password-format) */
  hashed_password?: InputMaybe<Scalars['String']>;
  /** The password in plain text if no hash is available. */
  password?: InputMaybe<Scalars['String']>;
};

/** Create Identity and Import Social Sign In Credentials Configuration */
export type identityWithCredentialsOidcConfigProvider_Input = {
  /** The OpenID Connect provider to link the subject to. Usually something like `google` or `github`. */
  provider: Scalars['String'];
  /** The subject (`sub`) of the OpenID Connect connection. Usually the `sub` field of the ID Token. */
  subject: Scalars['String'];
};

/** Create Identity and Import Password Credentials */
export type identityWithCredentialsPassword_Input = {
  config?: InputMaybe<identityWithCredentialsPasswordConfig_Input>;
};

export type recoveryIdentityAddress_Input = {
  /** CreatedAt is a helper struct field for gobuffalo.pop. */
  created_at?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  /** UpdatedAt is a helper struct field for gobuffalo.pop. */
  updated_at?: InputMaybe<Scalars['DateTime']>;
  value: Scalars['String'];
  via: Scalars['String'];
};

/** VerifiableAddress is an identity's verifiable address */
export type verifiableIdentityAddress_Input = {
  /** When this entry was created */
  created_at?: InputMaybe<Scalars['DateTime']>;
  /** The ID */
  id?: InputMaybe<Scalars['UUID']>;
  /** VerifiableAddressStatus must not exceed 16 characters as that is the limitation in the SQL Schema */
  status: Scalars['String'];
  /** When this entry was last updated */
  updated_at?: InputMaybe<Scalars['DateTime']>;
  /**
   * The address value
   *
   * example foo@user.com
   */
  value: Scalars['String'];
  /** Indicates if the address has already been verified */
  verified: Scalars['Boolean'];
  verified_at?: InputMaybe<Scalars['DateTime']>;
  /** VerifiableAddressType must not exceed 16 characters as that is the limitation in the SQL Schema */
  via: Scalars['String'];
};

/** A JSONPatch document as defined by RFC 6902 */
export type jsonPatch_Input = {
  /**
   * This field is used together with operation "move" and uses JSON Pointer notation.
   *
   * Learn more [about JSON Pointers](https://datatracker.ietf.org/doc/html/rfc6901#section-5).
   */
  from?: InputMaybe<Scalars['String']>;
  /** The operation to be performed. One of "add", "remove", "replace", "move", "copy", or "test". */
  op: Scalars['String'];
  /**
   * The path to the target path. Uses JSON pointer notation.
   *
   * Learn more [about JSON Pointers](https://datatracker.ietf.org/doc/html/rfc6901#section-5).
   */
  path: Scalars['String'];
  /**
   * The value to be used within the operations.
   *
   * Learn more [about JSON Pointers](https://datatracker.ietf.org/doc/html/rfc6901#section-5).
   */
  value?: InputMaybe<Scalars['String']>;
};

/** Update Identity Body */
export type updateIdentityBody_Input = {
  credentials?: InputMaybe<identityWithCredentials_Input>;
  /** Store metadata about the user which is only accessible through admin APIs such as `GET /admin/identities/<id>`. */
  metadata_admin?: InputMaybe<Scalars['JSON']>;
  /**
   * Store metadata about the identity which the identity itself can see when calling for example the
   * session endpoint. Do not store sensitive information (e.g. credit score) about the identity in this field.
   */
  metadata_public?: InputMaybe<Scalars['JSON']>;
  /**
   * SchemaID is the ID of the JSON Schema to be used for validating the identity's traits. If set
   * will update the Identity's SchemaID.
   */
  schema_id: Scalars['String'];
  state: An_Identity_SINGLE_QUOTE_s_State;
  traits: Scalars['JSON'];
};

/** Used when an administrator creates a recovery code for an identity. */
export type Recovery_Code_for_Identity = {
  /**
   * Expires At is the timestamp of when the recovery flow expires
   *
   * The timestamp when the recovery link expires.
   */
  expires_at?: Maybe<Scalars['DateTime']>;
  /** RecoveryCode is the code that can be used to recover the account */
  recovery_code: Scalars['String'];
  /**
   * RecoveryLink with flow
   *
   * This link opens the recovery UI with an empty `code` field.
   */
  recovery_link: Scalars['String'];
};

/** Create Recovery Code for Identity Request Body */
export type createRecoveryCodeForIdentityBody_Input = {
  expires_in?: InputMaybe<Scalars['mutationInput_createRecoveryCodeForIdentity_input_expires_in']>;
  /**
   * Identity to Recover
   *
   * The identity's ID you wish to recover.
   */
  identity_id: Scalars['UUID'];
};

/** Used when an administrator creates a recovery link for an identity. */
export type Identity_Recovery_Link = {
  /**
   * Recovery Link Expires At
   *
   * The timestamp when the recovery link expires.
   */
  expires_at?: Maybe<Scalars['DateTime']>;
  /**
   * Recovery Link
   *
   * This link can be used to recover the account.
   */
  recovery_link: Scalars['String'];
};

/** Create Recovery Link for Identity Request Body */
export type createRecoveryLinkForIdentityBody_Input = {
  expires_in?: InputMaybe<Scalars['mutationInput_createRecoveryLinkForIdentity_input_expires_in']>;
  /**
   * Identity to Recover
   *
   * The identity's ID you wish to recover.
   */
  identity_id: Scalars['UUID'];
};

/** The Response for Login Flows via API */
export type successfulNativeLogin = {
  session: session;
  /**
   * The Session Token
   *
   * A session token is equivalent to a session cookie, but it can be sent in the HTTP Authorization
   * Header:
   *
   * Authorization: bearer ${session-token}
   *
   * The session token is only issued for API flows, not for Browser flows!
   */
  session_token?: Maybe<Scalars['String']>;
};

export type updateLoginFlowBody_Input =
  { updateLoginFlowWithPasswordMethod_Input: updateLoginFlowWithPasswordMethod_Input; updateLoginFlowWithOidcMethod_Input?: never; updateLoginFlowWithTotpMethod_Input?: never; updateLoginFlowWithWebAuthnMethod_Input?: never; updateLoginFlowWithLookupSecretMethod_Input?: never; }
  |  { updateLoginFlowWithPasswordMethod_Input?: never; updateLoginFlowWithOidcMethod_Input: updateLoginFlowWithOidcMethod_Input; updateLoginFlowWithTotpMethod_Input?: never; updateLoginFlowWithWebAuthnMethod_Input?: never; updateLoginFlowWithLookupSecretMethod_Input?: never; }
  |  { updateLoginFlowWithPasswordMethod_Input?: never; updateLoginFlowWithOidcMethod_Input?: never; updateLoginFlowWithTotpMethod_Input: updateLoginFlowWithTotpMethod_Input; updateLoginFlowWithWebAuthnMethod_Input?: never; updateLoginFlowWithLookupSecretMethod_Input?: never; }
  |  { updateLoginFlowWithPasswordMethod_Input?: never; updateLoginFlowWithOidcMethod_Input?: never; updateLoginFlowWithTotpMethod_Input?: never; updateLoginFlowWithWebAuthnMethod_Input: updateLoginFlowWithWebAuthnMethod_Input; updateLoginFlowWithLookupSecretMethod_Input?: never; }
  |  { updateLoginFlowWithPasswordMethod_Input?: never; updateLoginFlowWithOidcMethod_Input?: never; updateLoginFlowWithTotpMethod_Input?: never; updateLoginFlowWithWebAuthnMethod_Input?: never; updateLoginFlowWithLookupSecretMethod_Input: updateLoginFlowWithLookupSecretMethod_Input; };

/** Update Login Flow with Password Method */
export type updateLoginFlowWithPasswordMethod_Input = {
  /** Sending the anti-csrf token is only required for browser login flows. */
  csrf_token?: InputMaybe<Scalars['String']>;
  /** Identifier is the email or username of the user trying to log in. */
  identifier: Scalars['String'];
  /** Method should be set to "password" when logging in using the identifier and password strategy. */
  method: Scalars['String'];
  /** The user's password. */
  password: Scalars['String'];
  /**
   * Identifier is the email or username of the user trying to log in.
   * This field is deprecated!
   */
  password_identifier?: InputMaybe<Scalars['String']>;
};

/** Update Login Flow with OpenID Connect Method */
export type updateLoginFlowWithOidcMethod_Input = {
  /** The CSRF Token */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Method to use
   *
   * This field must be set to `oidc` when using the oidc method.
   */
  method: Scalars['String'];
  /** The provider to register with */
  provider: Scalars['String'];
  traits?: InputMaybe<Scalars['JSON']>;
};

/** Update Login Flow with TOTP Method */
export type updateLoginFlowWithTotpMethod_Input = {
  /** Sending the anti-csrf token is only required for browser login flows. */
  csrf_token?: InputMaybe<Scalars['String']>;
  /** Method should be set to "totp" when logging in using the TOTP strategy. */
  method: Scalars['String'];
  /** The TOTP code. */
  totp_code: Scalars['String'];
};

/** Update Login Flow with WebAuthn Method */
export type updateLoginFlowWithWebAuthnMethod_Input = {
  /** Sending the anti-csrf token is only required for browser login flows. */
  csrf_token?: InputMaybe<Scalars['String']>;
  /** Identifier is the email or username of the user trying to log in. */
  identifier: Scalars['String'];
  /** Method should be set to "webAuthn" when logging in using the WebAuthn strategy. */
  method: Scalars['String'];
  /**
   * Login a WebAuthn Security Key
   *
   * This must contain the ID of the WebAuthN connection.
   */
  webauthn_login?: InputMaybe<Scalars['String']>;
};

/** Update Login Flow with Lookup Secret Method */
export type updateLoginFlowWithLookupSecretMethod_Input = {
  /** Sending the anti-csrf token is only required for browser login flows. */
  csrf_token?: InputMaybe<Scalars['String']>;
  /** The lookup secret. */
  lookup_secret: Scalars['String'];
  /** Method should be set to "lookup_secret" when logging in using the lookup_secret strategy. */
  method: Scalars['String'];
};

/** nolint:deadcode,unused */
export type Perform_Native_Logout_Request_Body_Input = {
  /**
   * The Session Token
   *
   * Invalidate this session token.
   */
  session_token: Scalars['String'];
};

export type updateRecoveryFlowBody_Input =
  { updateRecoveryFlowWithLinkMethod_Input: updateRecoveryFlowWithLinkMethod_Input; updateRecoveryFlowWithCodeMethod_Input?: never; }
  |  { updateRecoveryFlowWithLinkMethod_Input?: never; updateRecoveryFlowWithCodeMethod_Input: updateRecoveryFlowWithCodeMethod_Input; };

/** Update Recovery Flow with Link Method */
export type updateRecoveryFlowWithLinkMethod_Input = {
  /** Sending the anti-csrf token is only required for browser login flows. */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Email to Recover
   *
   * Needs to be set when initiating the flow. If the email is a registered
   * recovery email, a recovery link will be sent. If the email is not known,
   * a email with details on what happened will be sent instead.
   *
   * format: email
   */
  email: Scalars['String'];
  /** Method supports `link` only right now. */
  method: Scalars['String'];
};

/** Update Recovery Flow with Code Method */
export type updateRecoveryFlowWithCodeMethod_Input = {
  /**
   * Code from recovery email
   *
   * Sent to the user once a recovery has been initiated and is used to prove
   * that the user is in possession of the email
   */
  code?: InputMaybe<Scalars['String']>;
  /** Sending the anti-csrf token is only required for browser login flows. */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Email to Recover
   *
   * Needs to be set when initiating the flow. If the email is a registered
   * recovery email, a recovery link will be sent. If the email is not known,
   * a email with details on what happened will be sent instead.
   *
   * format: email
   */
  email?: InputMaybe<Scalars['String']>;
  /** Method supports `link` and `code` only right now. */
  method: Scalars['String'];
};

/** The Response for Registration Flows via API */
export type successfulNativeRegistration = {
  identity: KratosIdentity;
  session?: Maybe<session>;
  /**
   * The Session Token
   *
   * This field is only set when the session hook is configured as a post-registration hook.
   *
   * A session token is equivalent to a session cookie, but it can be sent in the HTTP Authorization
   * Header:
   *
   * Authorization: bearer ${session-token}
   *
   * The session token is only issued for API flows, not for Browser flows!
   */
  session_token?: Maybe<Scalars['String']>;
};

export type updateRegistrationFlowBody_Input =
  { updateRegistrationFlowWithPasswordMethod_Input: updateRegistrationFlowWithPasswordMethod_Input; updateRegistrationFlowWithOidcMethod_Input?: never; updateRegistrationFlowWithWebAuthnMethod_Input?: never; }
  |  { updateRegistrationFlowWithPasswordMethod_Input?: never; updateRegistrationFlowWithOidcMethod_Input: updateRegistrationFlowWithOidcMethod_Input; updateRegistrationFlowWithWebAuthnMethod_Input?: never; }
  |  { updateRegistrationFlowWithPasswordMethod_Input?: never; updateRegistrationFlowWithOidcMethod_Input?: never; updateRegistrationFlowWithWebAuthnMethod_Input: updateRegistrationFlowWithWebAuthnMethod_Input; };

/** Update Registration Flow with Password Method */
export type updateRegistrationFlowWithPasswordMethod_Input = {
  /** The CSRF Token */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Method to use
   *
   * This field must be set to `password` when using the password method.
   */
  method: Scalars['String'];
  /** Password to sign the user up with */
  password: Scalars['String'];
  traits: Scalars['JSON'];
};

/** Update Registration Flow with OpenID Connect Method */
export type updateRegistrationFlowWithOidcMethod_Input = {
  /** The CSRF Token */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Method to use
   *
   * This field must be set to `oidc` when using the oidc method.
   */
  method: Scalars['String'];
  /** The provider to register with */
  provider: Scalars['String'];
  traits?: InputMaybe<Scalars['JSON']>;
};

/** Update Registration Flow with WebAuthn Method */
export type updateRegistrationFlowWithWebAuthnMethod_Input = {
  /** CSRFToken is the anti-CSRF token */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Method
   *
   * Should be set to "webauthn" when trying to add, update, or remove a webAuthn pairing.
   */
  method: Scalars['String'];
  traits: Scalars['JSON'];
  /**
   * Register a WebAuthn Security Key
   *
   * It is expected that the JSON returned by the WebAuthn registration process
   * is included here.
   */
  webauthn_register?: InputMaybe<Scalars['String']>;
  /**
   * Name of the WebAuthn Security Key to be Added
   *
   * A human-readable name for the security key which will be added.
   */
  webauthn_register_displayname?: InputMaybe<Scalars['String']>;
};

export type updateSettingsFlowBody_Input =
  { updateSettingsFlowWithPasswordMethod_Input: updateSettingsFlowWithPasswordMethod_Input; Update_Settings_Flow_with_Profile_Method_Input?: never; Update_Settings_Flow_with_OpenID_Connect_Method_Input?: never; updateSettingsFlowWithTotpMethod_Input?: never; updateSettingsFlowWithWebAuthnMethod_Input?: never; updateSettingsFlowWithLookupMethod_Input?: never; }
  |  { updateSettingsFlowWithPasswordMethod_Input?: never; Update_Settings_Flow_with_Profile_Method_Input: Update_Settings_Flow_with_Profile_Method_Input; Update_Settings_Flow_with_OpenID_Connect_Method_Input?: never; updateSettingsFlowWithTotpMethod_Input?: never; updateSettingsFlowWithWebAuthnMethod_Input?: never; updateSettingsFlowWithLookupMethod_Input?: never; }
  |  { updateSettingsFlowWithPasswordMethod_Input?: never; Update_Settings_Flow_with_Profile_Method_Input?: never; Update_Settings_Flow_with_OpenID_Connect_Method_Input: Update_Settings_Flow_with_OpenID_Connect_Method_Input; updateSettingsFlowWithTotpMethod_Input?: never; updateSettingsFlowWithWebAuthnMethod_Input?: never; updateSettingsFlowWithLookupMethod_Input?: never; }
  |  { updateSettingsFlowWithPasswordMethod_Input?: never; Update_Settings_Flow_with_Profile_Method_Input?: never; Update_Settings_Flow_with_OpenID_Connect_Method_Input?: never; updateSettingsFlowWithTotpMethod_Input: updateSettingsFlowWithTotpMethod_Input; updateSettingsFlowWithWebAuthnMethod_Input?: never; updateSettingsFlowWithLookupMethod_Input?: never; }
  |  { updateSettingsFlowWithPasswordMethod_Input?: never; Update_Settings_Flow_with_Profile_Method_Input?: never; Update_Settings_Flow_with_OpenID_Connect_Method_Input?: never; updateSettingsFlowWithTotpMethod_Input?: never; updateSettingsFlowWithWebAuthnMethod_Input: updateSettingsFlowWithWebAuthnMethod_Input; updateSettingsFlowWithLookupMethod_Input?: never; }
  |  { updateSettingsFlowWithPasswordMethod_Input?: never; Update_Settings_Flow_with_Profile_Method_Input?: never; Update_Settings_Flow_with_OpenID_Connect_Method_Input?: never; updateSettingsFlowWithTotpMethod_Input?: never; updateSettingsFlowWithWebAuthnMethod_Input?: never; updateSettingsFlowWithLookupMethod_Input: updateSettingsFlowWithLookupMethod_Input; };

/** Update Settings Flow with Password Method */
export type updateSettingsFlowWithPasswordMethod_Input = {
  /** CSRFToken is the anti-CSRF token */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Method
   *
   * Should be set to password when trying to update a password.
   */
  method: Scalars['String'];
  /** Password is the updated password */
  password: Scalars['String'];
};

/** nolint:deadcode,unused */
export type Update_Settings_Flow_with_Profile_Method_Input = {
  /**
   * The Anti-CSRF Token
   *
   * This token is only required when performing browser flows.
   */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Method
   *
   * Should be set to profile when trying to update a profile.
   */
  method: Scalars['String'];
  traits: Scalars['JSON'];
};

/** nolint:deadcode,unused */
export type Update_Settings_Flow_with_OpenID_Connect_Method_Input = {
  /**
   * Flow ID is the flow's ID.
   *
   * in: query
   */
  flow?: InputMaybe<Scalars['String']>;
  /**
   * Link this provider
   *
   * Either this or `unlink` must be set.
   *
   * type: string
   * in: body
   */
  link?: InputMaybe<Scalars['String']>;
  /**
   * Method
   *
   * Should be set to profile when trying to update a profile.
   */
  method: Scalars['String'];
  traits?: InputMaybe<Scalars['JSON']>;
  /**
   * Unlink this provider
   *
   * Either this or `link` must be set.
   *
   * type: string
   * in: body
   */
  unlink?: InputMaybe<Scalars['String']>;
};

/** Update Settings Flow with TOTP Method */
export type updateSettingsFlowWithTotpMethod_Input = {
  /** CSRFToken is the anti-CSRF token */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Method
   *
   * Should be set to "totp" when trying to add, update, or remove a totp pairing.
   */
  method: Scalars['String'];
  /** ValidationTOTP must contain a valid TOTP based on the */
  totp_code?: InputMaybe<Scalars['String']>;
  /**
   * UnlinkTOTP if true will remove the TOTP pairing,
   * effectively removing the credential. This can be used
   * to set up a new TOTP device.
   */
  totp_unlink?: InputMaybe<Scalars['Boolean']>;
};

/** Update Settings Flow with WebAuthn Method */
export type updateSettingsFlowWithWebAuthnMethod_Input = {
  /** CSRFToken is the anti-CSRF token */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Method
   *
   * Should be set to "webauthn" when trying to add, update, or remove a webAuthn pairing.
   */
  method: Scalars['String'];
  /**
   * Register a WebAuthn Security Key
   *
   * It is expected that the JSON returned by the WebAuthn registration process
   * is included here.
   */
  webauthn_register?: InputMaybe<Scalars['String']>;
  /**
   * Name of the WebAuthn Security Key to be Added
   *
   * A human-readable name for the security key which will be added.
   */
  webauthn_register_displayname?: InputMaybe<Scalars['String']>;
  /**
   * Remove a WebAuthn Security Key
   *
   * This must contain the ID of the WebAuthN connection.
   */
  webauthn_remove?: InputMaybe<Scalars['String']>;
};

/** Update Settings Flow with Lookup Method */
export type updateSettingsFlowWithLookupMethod_Input = {
  /** CSRFToken is the anti-CSRF token */
  csrf_token?: InputMaybe<Scalars['String']>;
  /** If set to true will save the regenerated lookup secrets */
  lookup_secret_confirm?: InputMaybe<Scalars['Boolean']>;
  /** Disables this method if true. */
  lookup_secret_disable?: InputMaybe<Scalars['Boolean']>;
  /** If set to true will regenerate the lookup secrets */
  lookup_secret_regenerate?: InputMaybe<Scalars['Boolean']>;
  /** If set to true will reveal the lookup secrets */
  lookup_secret_reveal?: InputMaybe<Scalars['Boolean']>;
  /**
   * Method
   *
   * Should be set to "lookup" when trying to add, update, or remove a lookup pairing.
   */
  method: Scalars['String'];
};

/** Update Verification Flow with Link Method */
export type updateVerificationFlowWithLinkMethod_Input = {
  /** Sending the anti-csrf token is only required for browser login flows. */
  csrf_token?: InputMaybe<Scalars['String']>;
  /**
   * Email to Verify
   *
   * Needs to be set when initiating the flow. If the email is a registered
   * verification email, a verification link will be sent. If the email is not known,
   * a email with details on what happened will be sent instead.
   *
   * format: email
   */
  email: Scalars['String'];
  /** Method supports `link` only right now. */
  method: Scalars['String'];
};

/** Deleted Session Count */
export type deleteMySessionsCount = {
  /** The number of sessions that were revoked. */
  count?: Maybe<Scalars['Int']>;
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
   * >**Path**: `/.well-known/ory/webauthn.js`
   * This endpoint provides JavaScript which is needed in order to perform WebAuthn login and registration.
   *
   * If you are building a JavaScript Browser App (e.g. in ReactJS or AngularJS) you will need to load this file:
   *
   * ```html
   * <script src="https://public-kratos.example.org/.well-known/ory/webauthn.js" type="script" async />
   * ```
   *
   * More information can be found at [Ory Kratos User Login](https://www.ory.sh/docs/kratos/self-service/flows/user-login) and [User Registration Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-registration).
   *
   */
  getWebAuthnJavaScript?: Maybe<Scalars['String']>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/courier/messages`
   * Lists all messages by given status and recipient.
   *
   */
  listCourierMessages?: Maybe<Array<Maybe<message>>>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/identities`
   * Lists all [identities](https://www.ory.sh/docs/kratos/concepts/identity-user-model) in the system.
   *
   */
  listIdentities?: Maybe<Array<Maybe<KratosIdentity>>>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/identities/{args.id}`
   * Return an [identity](https://www.ory.sh/docs/kratos/concepts/identity-user-model) by its ID. You can optionally
   * include credentials (e.g. social sign in connections) in the response by using the `include_credential` query parameter.
   *
   */
  getIdentity?: Maybe<KratosIdentity>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/identities/{args.id}/sessions`
   * This endpoint returns all sessions that belong to the given Identity.
   *
   */
  listIdentitySessions?: Maybe<Array<Maybe<session>>>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/sessions`
   * Listing all sessions that exist.
   *
   */
  listSessions?: Maybe<Array<Maybe<session>>>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/sessions/{args.id}`
   * This endpoint is useful for:
   *
   * Getting a session object with all specified expandables that exist in an administrative context.
   *
   */
  getSession?: Maybe<session>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/health/alive`
   * This endpoint returns a HTTP 200 status code when Ory Kratos is accepting incoming
   * HTTP requests. This status does currently not include checks whether the database connection is working.
   *
   * If the service supports TLS Edge Termination, this endpoint does not require the
   * `X-Forwarded-Proto` header to be set.
   *
   * Be aware that if you are running multiple nodes of this service, the health status will never
   * refer to the cluster state, only to a single instance.
   *
   */
  isAlive?: Maybe<isAlive_200_response>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/health/ready`
   * This endpoint returns a HTTP 200 status code when Ory Kratos is up running and the environment dependencies (e.g.
   * the database) are responsive as well.
   *
   * If the service supports TLS Edge Termination, this endpoint does not require the
   * `X-Forwarded-Proto` header to be set.
   *
   * Be aware that if you are running multiple nodes of Ory Kratos, the health status will never
   * refer to the cluster state, only to a single instance.
   *
   */
  isReady?: Maybe<isReady_200_response>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/schemas`
   * Returns a list of all identity schemas currently in use.
   *
   */
  listIdentitySchemas?: Maybe<Array<Maybe<identitySchemaContainer>>>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/schemas/{args.id}`
   * Return a specific identity schema.
   *
   */
  getIdentitySchema?: Maybe<Scalars['JSON']>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/errors`
   * This endpoint returns the error associated with a user-facing self service errors.
   *
   * This endpoint supports stub values to help you implement the error UI:
   *
   * `?id=stub:500` - returns a stub 500 (Internal Server Error) error.
   *
   * More information can be found at [Ory Kratos User User Facing Error Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-facing-errors).
   *
   */
  getFlowError?: Maybe<flowError>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/login/api`
   * This endpoint initiates a login flow for native apps that do not use a browser, such as mobile devices, smart TVs, and so on.
   *
   * If a valid provided session cookie or session token is provided, a 400 Bad Request error
   * will be returned unless the URL query parameter `?refresh=true` is set.
   *
   * To fetch an existing login flow call `/self-service/login/flows?flow=<flow_id>`.
   *
   * You MUST NOT use this endpoint in client-side (Single Page Apps, ReactJS, AngularJS) nor server-side (Java Server
   * Pages, NodeJS, PHP, Golang, ...) browser applications. Using this endpoint in these applications will make
   * you vulnerable to a variety of CSRF attacks, including CSRF login attacks.
   *
   * In the case of an error, the `error.id` of the JSON response body can be one of:
   *
   * `session_already_available`: The user is already signed in.
   * `session_aal1_required`: Multi-factor auth (e.g. 2fa) was requested but the user has no session yet.
   * `security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.
   *
   * This endpoint MUST ONLY be used in scenarios such as native mobile apps (React Native, Objective C, Swift, Java, ...).
   *
   * More information can be found at [Ory Kratos User Login](https://www.ory.sh/docs/kratos/self-service/flows/user-login) and [User Registration Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-registration).
   *
   */
  createNativeLoginFlow?: Maybe<Login_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/login/browser`
   * This endpoint initializes a browser-based user login flow. This endpoint will set the appropriate
   * cookies and anti-CSRF measures required for browser-based flows.
   *
   * If this endpoint is opened as a link in the browser, it will be redirected to
   * `selfservice.flows.login.ui_url` with the flow ID set as the query parameter `?flow=`. If a valid user session
   * exists already, the browser will be redirected to `urls.default_redirect_url` unless the query parameter
   * `?refresh=true` was set.
   *
   * If this endpoint is called via an AJAX request, the response contains the flow without a redirect. In the
   * case of an error, the `error.id` of the JSON response body can be one of:
   *
   * `session_already_available`: The user is already signed in.
   * `session_aal1_required`: Multi-factor auth (e.g. 2fa) was requested but the user has no session yet.
   * `security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.
   * `security_identity_mismatch`: The requested `?return_to` address is not allowed to be used. Adjust this in the configuration!
   *
   * The optional query parameter login_challenge is set when using Kratos with
   * Hydra in an OAuth2 flow. See the oauth2_provider.url configuration
   * option.
   *
   * This endpoint is NOT INTENDED for clients that do not have a browser (Chrome, Firefox, ...) as cookies are needed.
   *
   * More information can be found at [Ory Kratos User Login](https://www.ory.sh/docs/kratos/self-service/flows/user-login) and [User Registration Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-registration).
   *
   */
  createBrowserLoginFlow?: Maybe<Login_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/login/flows`
   * This endpoint returns a login flow's context with, for example, error details and other information.
   *
   * Browser flows expect the anti-CSRF cookie to be included in the request's HTTP Cookie Header.
   * For AJAX requests you must ensure that cookies are included in the request or requests will fail.
   *
   * If you use the browser-flow for server-side apps, the services need to run on a common top-level-domain
   * and you need to forward the incoming HTTP Cookie header to this endpoint:
   *
   * ```js
   * pseudo-code example
   * router.get('/login', async function (req, res) {
   * const flow = await client.getLoginFlow(req.header('cookie'), req.query['flow'])
   *
   * res.render('login', flow)
   * })
   * ```
   *
   * This request may fail due to several reasons. The `error.id` can be one of:
   *
   * `session_already_available`: The user is already signed in.
   * `self_service_flow_expired`: The flow is expired and you should request a new one.
   *
   * More information can be found at [Ory Kratos User Login](https://www.ory.sh/docs/kratos/self-service/flows/user-login) and [User Registration Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-registration).
   *
   */
  getLoginFlow?: Maybe<Login_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/logout`
   * This endpoint logs out an identity in a self-service manner.
   *
   * If the `Accept` HTTP header is not set to `application/json`, the browser will be redirected (HTTP 303 See Other)
   * to the `return_to` parameter of the initial request or fall back to `urls.default_return_to`.
   *
   * If the `Accept` HTTP header is set to `application/json`, a 204 No Content response
   * will be sent on successful logout instead.
   *
   * This endpoint is NOT INTENDED for API clients and only works
   * with browsers (Chrome, Firefox, ...). For API clients you can
   * call the `/self-service/logout/api` URL directly with the Ory Session Token.
   *
   * More information can be found at [Ory Kratos User Logout Documentation](https://www.ory.sh/docs/next/kratos/self-service/flows/user-logout).
   *
   */
  updateLogoutFlow?: Maybe<Scalars['Void']>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/logout/browser`
   * This endpoint initializes a browser-based user logout flow and a URL which can be used to log out the user.
   *
   * This endpoint is NOT INTENDED for API clients and only works
   * with browsers (Chrome, Firefox, ...). For API clients you can
   * call the `/self-service/logout/api` URL directly with the Ory Session Token.
   *
   * The URL is only valid for the currently signed in user. If no user is signed in, this endpoint returns
   * a 401 error.
   *
   * When calling this endpoint from a backend, please ensure to properly forward the HTTP cookies.
   *
   */
  createBrowserLogoutFlow?: Maybe<logoutFlow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/recovery/api`
   * This endpoint initiates a recovery flow for API clients such as mobile devices, smart TVs, and so on.
   *
   * If a valid provided session cookie or session token is provided, a 400 Bad Request error.
   *
   * To fetch an existing recovery flow call `/self-service/recovery/flows?flow=<flow_id>`.
   *
   * You MUST NOT use this endpoint in client-side (Single Page Apps, ReactJS, AngularJS) nor server-side (Java Server
   * Pages, NodeJS, PHP, Golang, ...) browser applications. Using this endpoint in these applications will make
   * you vulnerable to a variety of CSRF attacks.
   *
   * This endpoint MUST ONLY be used in scenarios such as native mobile apps (React Native, Objective C, Swift, Java, ...).
   *
   * More information can be found at [Ory Kratos Account Recovery Documentation](../self-service/flows/account-recovery).
   *
   */
  createNativeRecoveryFlow?: Maybe<A_Recovery_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/recovery/browser`
   * This endpoint initializes a browser-based account recovery flow. Once initialized, the browser will be redirected to
   * `selfservice.flows.recovery.ui_url` with the flow ID set as the query parameter `?flow=`. If a valid user session
   * exists, the browser is returned to the configured return URL.
   *
   * If this endpoint is called via an AJAX request, the response contains the recovery flow without any redirects
   * or a 400 bad request error if the user is already authenticated.
   *
   * This endpoint is NOT INTENDED for clients that do not have a browser (Chrome, Firefox, ...) as cookies are needed.
   *
   * More information can be found at [Ory Kratos Account Recovery Documentation](../self-service/flows/account-recovery).
   *
   */
  createBrowserRecoveryFlow?: Maybe<A_Recovery_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/recovery/flows`
   * This endpoint returns a recovery flow's context with, for example, error details and other information.
   *
   * Browser flows expect the anti-CSRF cookie to be included in the request's HTTP Cookie Header.
   * For AJAX requests you must ensure that cookies are included in the request or requests will fail.
   *
   * If you use the browser-flow for server-side apps, the services need to run on a common top-level-domain
   * and you need to forward the incoming HTTP Cookie header to this endpoint:
   *
   * ```js
   * pseudo-code example
   * router.get('/recovery', async function (req, res) {
   * const flow = await client.getRecoveryFlow(req.header('Cookie'), req.query['flow'])
   *
   * res.render('recovery', flow)
   * })
   * ```
   *
   * More information can be found at [Ory Kratos Account Recovery Documentation](../self-service/flows/account-recovery).
   *
   */
  getRecoveryFlow?: Maybe<A_Recovery_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/registration/api`
   * This endpoint initiates a registration flow for API clients such as mobile devices, smart TVs, and so on.
   *
   * If a valid provided session cookie or session token is provided, a 400 Bad Request error
   * will be returned unless the URL query parameter `?refresh=true` is set.
   *
   * To fetch an existing registration flow call `/self-service/registration/flows?flow=<flow_id>`.
   *
   * You MUST NOT use this endpoint in client-side (Single Page Apps, ReactJS, AngularJS) nor server-side (Java Server
   * Pages, NodeJS, PHP, Golang, ...) browser applications. Using this endpoint in these applications will make
   * you vulnerable to a variety of CSRF attacks.
   *
   * In the case of an error, the `error.id` of the JSON response body can be one of:
   *
   * `session_already_available`: The user is already signed in.
   * `security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.
   *
   * This endpoint MUST ONLY be used in scenarios such as native mobile apps (React Native, Objective C, Swift, Java, ...).
   *
   * More information can be found at [Ory Kratos User Login](https://www.ory.sh/docs/kratos/self-service/flows/user-login) and [User Registration Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-registration).
   *
   */
  createNativeRegistrationFlow?: Maybe<registrationFlow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/registration/browser`
   * This endpoint initializes a browser-based user registration flow. This endpoint will set the appropriate
   * cookies and anti-CSRF measures required for browser-based flows.
   *
   * :::info
   *
   * This endpoint is EXPERIMENTAL and subject to potential breaking changes in the future.
   *
   * :::
   *
   * If this endpoint is opened as a link in the browser, it will be redirected to
   * `selfservice.flows.registration.ui_url` with the flow ID set as the query parameter `?flow=`. If a valid user session
   * exists already, the browser will be redirected to `urls.default_redirect_url`.
   *
   * If this endpoint is called via an AJAX request, the response contains the flow without a redirect. In the
   * case of an error, the `error.id` of the JSON response body can be one of:
   *
   * `session_already_available`: The user is already signed in.
   * `security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.
   * `security_identity_mismatch`: The requested `?return_to` address is not allowed to be used. Adjust this in the configuration!
   *
   * If this endpoint is called via an AJAX request, the response contains the registration flow without a redirect.
   *
   * This endpoint is NOT INTENDED for clients that do not have a browser (Chrome, Firefox, ...) as cookies are needed.
   *
   * More information can be found at [Ory Kratos User Login](https://www.ory.sh/docs/kratos/self-service/flows/user-login) and [User Registration Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-registration).
   *
   */
  createBrowserRegistrationFlow?: Maybe<registrationFlow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/registration/flows`
   * This endpoint returns a registration flow's context with, for example, error details and other information.
   *
   * Browser flows expect the anti-CSRF cookie to be included in the request's HTTP Cookie Header.
   * For AJAX requests you must ensure that cookies are included in the request or requests will fail.
   *
   * If you use the browser-flow for server-side apps, the services need to run on a common top-level-domain
   * and you need to forward the incoming HTTP Cookie header to this endpoint:
   *
   * ```js
   * pseudo-code example
   * router.get('/registration', async function (req, res) {
   * const flow = await client.getRegistrationFlow(req.header('cookie'), req.query['flow'])
   *
   * res.render('registration', flow)
   * })
   * ```
   *
   * This request may fail due to several reasons. The `error.id` can be one of:
   *
   * `session_already_available`: The user is already signed in.
   * `self_service_flow_expired`: The flow is expired and you should request a new one.
   *
   * More information can be found at [Ory Kratos User Login](https://www.ory.sh/docs/kratos/self-service/flows/user-login) and [User Registration Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-registration).
   *
   */
  getRegistrationFlow?: Maybe<registrationFlow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/settings/api`
   * This endpoint initiates a settings flow for API clients such as mobile devices, smart TVs, and so on.
   * You must provide a valid Ory Kratos Session Token for this endpoint to respond with HTTP 200 OK.
   *
   * To fetch an existing settings flow call `/self-service/settings/flows?flow=<flow_id>`.
   *
   * You MUST NOT use this endpoint in client-side (Single Page Apps, ReactJS, AngularJS) nor server-side (Java Server
   * Pages, NodeJS, PHP, Golang, ...) browser applications. Using this endpoint in these applications will make
   * you vulnerable to a variety of CSRF attacks.
   *
   * Depending on your configuration this endpoint might return a 403 error if the session has a lower Authenticator
   * Assurance Level (AAL) than is possible for the identity. This can happen if the identity has password + webauthn
   * credentials (which would result in AAL2) but the session has only AAL1. If this error occurs, ask the user
   * to sign in with the second factor or change the configuration.
   *
   * In the case of an error, the `error.id` of the JSON response body can be one of:
   *
   * `security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.
   * `session_inactive`: No Ory Session was found - sign in a user first.
   *
   * This endpoint MUST ONLY be used in scenarios such as native mobile apps (React Native, Objective C, Swift, Java, ...).
   *
   * More information can be found at [Ory Kratos User Settings & Profile Management Documentation](../self-service/flows/user-settings).
   *
   */
  createNativeSettingsFlow?: Maybe<Flow_represents_a_Settings_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/settings/browser`
   * This endpoint initializes a browser-based user settings flow. Once initialized, the browser will be redirected to
   * `selfservice.flows.settings.ui_url` with the flow ID set as the query parameter `?flow=`. If no valid
   * Ory Kratos Session Cookie is included in the request, a login flow will be initialized.
   *
   * If this endpoint is opened as a link in the browser, it will be redirected to
   * `selfservice.flows.settings.ui_url` with the flow ID set as the query parameter `?flow=`. If no valid user session
   * was set, the browser will be redirected to the login endpoint.
   *
   * If this endpoint is called via an AJAX request, the response contains the settings flow without any redirects
   * or a 401 forbidden error if no valid session was set.
   *
   * Depending on your configuration this endpoint might return a 403 error if the session has a lower Authenticator
   * Assurance Level (AAL) than is possible for the identity. This can happen if the identity has password + webauthn
   * credentials (which would result in AAL2) but the session has only AAL1. If this error occurs, ask the user
   * to sign in with the second factor (happens automatically for server-side browser flows) or change the configuration.
   *
   * If this endpoint is called via an AJAX request, the response contains the flow without a redirect. In the
   * case of an error, the `error.id` of the JSON response body can be one of:
   *
   * `security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.
   * `session_inactive`: No Ory Session was found - sign in a user first.
   * `security_identity_mismatch`: The requested `?return_to` address is not allowed to be used. Adjust this in the configuration!
   *
   * This endpoint is NOT INTENDED for clients that do not have a browser (Chrome, Firefox, ...) as cookies are needed.
   *
   * More information can be found at [Ory Kratos User Settings & Profile Management Documentation](../self-service/flows/user-settings).
   *
   */
  createBrowserSettingsFlow?: Maybe<Flow_represents_a_Settings_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/settings/flows`
   * When accessing this endpoint through Ory Kratos' Public API you must ensure that either the Ory Kratos Session Cookie
   * or the Ory Kratos Session Token are set.
   *
   * Depending on your configuration this endpoint might return a 403 error if the session has a lower Authenticator
   * Assurance Level (AAL) than is possible for the identity. This can happen if the identity has password + webauthn
   * credentials (which would result in AAL2) but the session has only AAL1. If this error occurs, ask the user
   * to sign in with the second factor or change the configuration.
   *
   * You can access this endpoint without credentials when using Ory Kratos' Admin API.
   *
   * If this endpoint is called via an AJAX request, the response contains the flow without a redirect. In the
   * case of an error, the `error.id` of the JSON response body can be one of:
   *
   * `security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.
   * `session_inactive`: No Ory Session was found - sign in a user first.
   * `security_identity_mismatch`: The flow was interrupted with `session_refresh_required` but apparently some other
   * identity logged in instead.
   *
   * More information can be found at [Ory Kratos User Settings & Profile Management Documentation](../self-service/flows/user-settings).
   *
   */
  getSettingsFlow?: Maybe<Flow_represents_a_Settings_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/verification/api`
   * This endpoint initiates a verification flow for API clients such as mobile devices, smart TVs, and so on.
   *
   * To fetch an existing verification flow call `/self-service/verification/flows?flow=<flow_id>`.
   *
   * You MUST NOT use this endpoint in client-side (Single Page Apps, ReactJS, AngularJS) nor server-side (Java Server
   * Pages, NodeJS, PHP, Golang, ...) browser applications. Using this endpoint in these applications will make
   * you vulnerable to a variety of CSRF attacks.
   *
   * This endpoint MUST ONLY be used in scenarios such as native mobile apps (React Native, Objective C, Swift, Java, ...).
   *
   * More information can be found at [Ory Email and Phone Verification Documentation](https://www.ory.sh/docs/kratos/self-service/flows/verify-email-account-activation).
   *
   */
  createNativeVerificationFlow?: Maybe<A_Verification_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/verification/browser`
   * This endpoint initializes a browser-based account verification flow. Once initialized, the browser will be redirected to
   * `selfservice.flows.verification.ui_url` with the flow ID set as the query parameter `?flow=`.
   *
   * If this endpoint is called via an AJAX request, the response contains the recovery flow without any redirects.
   *
   * This endpoint is NOT INTENDED for API clients and only works with browsers (Chrome, Firefox, ...).
   *
   * More information can be found at [Ory Kratos Email and Phone Verification Documentation](https://www.ory.sh/docs/kratos/selfservice/flows/verify-email-account-activation).
   *
   */
  createBrowserVerificationFlow?: Maybe<A_Verification_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/verification/flows`
   * This endpoint returns a verification flow's context with, for example, error details and other information.
   *
   * Browser flows expect the anti-CSRF cookie to be included in the request's HTTP Cookie Header.
   * For AJAX requests you must ensure that cookies are included in the request or requests will fail.
   *
   * If you use the browser-flow for server-side apps, the services need to run on a common top-level-domain
   * and you need to forward the incoming HTTP Cookie header to this endpoint:
   *
   * ```js
   * pseudo-code example
   * router.get('/recovery', async function (req, res) {
   * const flow = await client.getVerificationFlow(req.header('cookie'), req.query['flow'])
   *
   * res.render('verification', flow)
   * })
   *
   * More information can be found at [Ory Kratos Email and Phone Verification Documentation](https://www.ory.sh/docs/kratos/selfservice/flows/verify-email-account-activation).
   *
   */
  getVerificationFlow?: Maybe<A_Verification_Flow>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/sessions`
   * This endpoints returns all other active sessions that belong to the logged-in user.
   * The current session can be retrieved by calling the `/sessions/whoami` endpoint.
   *
   */
  listMySessions?: Maybe<Array<Maybe<session>>>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/sessions/whoami`
   * Uses the HTTP Headers in the GET request to determine (e.g. by using checking the cookies) who is authenticated.
   * Returns a session object in the body or 401 if the credentials are invalid or no credentials were sent.
   * When the request it successful it adds the user ID to the 'X-Kratos-Authenticated-Identity-Id' header
   * in the response.
   *
   * If you call this endpoint from a server-side application, you must forward the HTTP Cookie Header to this endpoint:
   *
   * ```js
   * pseudo-code example
   * router.get('/protected-endpoint', async function (req, res) {
   * const session = await client.toSession(undefined, req.header('cookie'))
   *
   * console.log(session)
   * })
   * ```
   *
   * When calling this endpoint from a non-browser application (e.g. mobile app) you must include the session token:
   *
   * ```js
   * pseudo-code example
   * ...
   * const session = await client.toSession("the-session-token")
   *
   * console.log(session)
   * ```
   *
   * Depending on your configuration this endpoint might return a 403 status code if the session has a lower Authenticator
   * Assurance Level (AAL) than is possible for the identity. This can happen if the identity has password + webauthn
   * credentials (which would result in AAL2) but the session has only AAL1. If this error occurs, ask the user
   * to sign in with the second factor or change the configuration.
   *
   * This endpoint is useful for:
   *
   * AJAX calls. Remember to send credentials and set up CORS correctly!
   * Reverse proxies and API Gateways
   * Server-side calls - use the `X-Session-Token` header!
   *
   * This endpoint authenticates users by checking:
   *
   * if the `Cookie` HTTP header was set containing an Ory Kratos Session Cookie;
   * if the `Authorization: bearer <ory-session-token>` HTTP header was set with a valid Ory Kratos Session Token;
   * if the `X-Session-Token` HTTP header was set with a valid Ory Kratos Session Token.
   *
   * If none of these headers are set or the cooke or token are invalid, the endpoint returns a HTTP 401 status code.
   *
   * As explained above, this request may fail due to several reasons. The `error.id` can be one of:
   *
   * `session_inactive`: No active session was found in the request (e.g. no Ory Session Cookie / Ory Session Token).
   * `session_aal2_required`: An active session was found but it does not fulfil the Authenticator Assurance Level, implying that the session must (e.g.) authenticate the second factor.
   *
   */
  toSession?: Maybe<session>;
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/version`
   * This endpoint returns the version of Ory Kratos.
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


export type authQuerylistCourierMessagesArgs = {
  per_page?: InputMaybe<Scalars['PositiveInt']>;
  page?: InputMaybe<Scalars['PositiveInt']>;
  status?: InputMaybe<courierMessageStatus>;
  recipient?: InputMaybe<Scalars['String']>;
};


export type authQuerylistIdentitiesArgs = {
  per_page?: InputMaybe<Scalars['PositiveInt']>;
  page?: InputMaybe<Scalars['PositiveInt']>;
};


export type authQuerygetIdentityArgs = {
  id: Scalars['String'];
  include_credential?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type authQuerylistIdentitySessionsArgs = {
  id: Scalars['String'];
  per_page?: InputMaybe<Scalars['PositiveInt']>;
  page?: InputMaybe<Scalars['PositiveInt']>;
  active?: InputMaybe<Scalars['Boolean']>;
};


export type authQuerylistSessionsArgs = {
  page_size?: InputMaybe<Scalars['PositiveInt']>;
  page_token?: InputMaybe<Scalars['String']>;
  active?: InputMaybe<Scalars['Boolean']>;
  expand?: InputMaybe<Array<InputMaybe<queryInput_listSessions_expand_items>>>;
};


export type authQuerygetSessionArgs = {
  id: Scalars['String'];
  expand?: InputMaybe<Array<InputMaybe<queryInput_getSession_expand_items>>>;
};


export type authQuerylistIdentitySchemasArgs = {
  per_page?: InputMaybe<Scalars['PositiveInt']>;
  page?: InputMaybe<Scalars['PositiveInt']>;
};


export type authQuerygetIdentitySchemaArgs = {
  id: Scalars['String'];
};


export type authQuerygetFlowErrorArgs = {
  id: Scalars['String'];
};


export type authQuerycreateNativeLoginFlowArgs = {
  X_Session_Token?: InputMaybe<Scalars['String']>;
  refresh?: InputMaybe<Scalars['Boolean']>;
  aal?: InputMaybe<Scalars['String']>;
};


export type authQuerycreateBrowserLoginFlowArgs = {
  Cookie?: InputMaybe<Scalars['String']>;
  refresh?: InputMaybe<Scalars['Boolean']>;
  aal?: InputMaybe<Scalars['String']>;
  return_to?: InputMaybe<Scalars['String']>;
  login_challenge?: InputMaybe<Scalars['String']>;
};


export type authQuerygetLoginFlowArgs = {
  Cookie?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};


export type authQueryupdateLogoutFlowArgs = {
  token?: InputMaybe<Scalars['String']>;
  return_to?: InputMaybe<Scalars['String']>;
};


export type authQuerycreateBrowserLogoutFlowArgs = {
  cookie?: InputMaybe<Scalars['String']>;
};


export type authQuerycreateBrowserRecoveryFlowArgs = {
  return_to?: InputMaybe<Scalars['String']>;
};


export type authQuerygetRecoveryFlowArgs = {
  Cookie?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};


export type authQuerycreateBrowserRegistrationFlowArgs = {
  return_to?: InputMaybe<Scalars['String']>;
  login_challenge?: InputMaybe<Scalars['String']>;
};


export type authQuerygetRegistrationFlowArgs = {
  Cookie?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};


export type authQuerycreateNativeSettingsFlowArgs = {
  X_Session_Token?: InputMaybe<Scalars['String']>;
};


export type authQuerycreateBrowserSettingsFlowArgs = {
  Cookie?: InputMaybe<Scalars['String']>;
  return_to?: InputMaybe<Scalars['String']>;
};


export type authQuerygetSettingsFlowArgs = {
  X_Session_Token?: InputMaybe<Scalars['String']>;
  Cookie?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};


export type authQuerycreateBrowserVerificationFlowArgs = {
  return_to?: InputMaybe<Scalars['String']>;
};


export type authQuerygetVerificationFlowArgs = {
  cookie?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};


export type authQuerylistMySessionsArgs = {
  X_Session_Token?: InputMaybe<Scalars['String']>;
  Cookie?: InputMaybe<Scalars['String']>;
  per_page?: InputMaybe<Scalars['PositiveInt']>;
  page?: InputMaybe<Scalars['PositiveInt']>;
};


export type authQuerytoSessionArgs = {
  X_Session_Token?: InputMaybe<Scalars['String']>;
  Cookie?: InputMaybe<Scalars['String']>;
};

export type authMutation = {
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/identities`
   * Create an [identity](https://www.ory.sh/docs/kratos/concepts/identity-user-model).  This endpoint can also be used to
   * [import credentials](https://www.ory.sh/docs/kratos/manage-identities/import-user-accounts-identities)
   * for instance passwords, social sign in configurations or multifactor methods.
   *
   */
  createIdentity?: Maybe<KratosIdentity>;
  /**
   *
   * >**Method**: `DELETE`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/identities/{args.id}`
   * Calling this endpoint irrecoverably and permanently deletes the [identity](https://www.ory.sh/docs/kratos/concepts/identity-user-model) given its ID. This action can not be undone.
   * This endpoint returns 204 when the identity was deleted or when the identity was not found, in which case it is
   * assumed that is has been deleted already.
   *
   */
  deleteIdentity?: Maybe<Scalars['Void']>;
  /**
   *
   * >**Method**: `PATCH`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/identities/{args.id}`
   * Partially updates an [identity's](https://www.ory.sh/docs/kratos/concepts/identity-user-model) field using [JSON Patch](https://jsonpatch.com/).
   * The fields `id`, `stateChangedAt` and `credentials` can not be updated using this method.
   *
   */
  patchIdentity?: Maybe<KratosIdentity>;
  /**
   *
   * >**Method**: `PUT`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/identities/{args.id}`
   * This endpoint updates an [identity](https://www.ory.sh/docs/kratos/concepts/identity-user-model). The full identity
   * payload (except credentials) is expected. It is possible to update the identity's credentials as well.
   *
   */
  updateIdentity?: Maybe<KratosIdentity>;
  /**
   *
   * >**Method**: `DELETE`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/identities/{args.id}/sessions`
   * Calling this endpoint irrecoverably and permanently deletes and invalidates all sessions that belong to the given Identity.
   *
   */
  deleteIdentitySessions?: Maybe<Scalars['Void']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/recovery/code`
   * This endpoint creates a recovery code which should be given to the user in order for them to recover
   * (or activate) their account.
   *
   */
  createRecoveryCodeForIdentity?: Maybe<Recovery_Code_for_Identity>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/recovery/link`
   * This endpoint creates a recovery link which should be given to the user in order for them to recover
   * (or activate) their account.
   *
   */
  createRecoveryLinkForIdentity?: Maybe<Identity_Recovery_Link>;
  /**
   *
   * >**Method**: `DELETE`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/sessions/{args.id}`
   * Calling this endpoint deactivates the specified session. Session data is not deleted.
   *
   */
  disableSession?: Maybe<Scalars['Void']>;
  /**
   *
   * >**Method**: `PATCH`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/admin/sessions/{args.id}/extend`
   * Calling this endpoint extends the given session ID. If `session.earliest_possible_extend` is set it
   * will only extend the session after the specified time has passed.
   *
   * Retrieve the session ID from the `/sessions/whoami` endpoint / `toSession` SDK method.
   *
   */
  extendSession?: Maybe<session>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/login`
   * :::info
   *
   * This endpoint is EXPERIMENTAL and subject to potential breaking changes in the future.
   *
   * :::
   *
   * Use this endpoint to complete a login flow. This endpoint
   * behaves differently for API and browser flows.
   *
   * API flows expect `application/json` to be sent in the body and responds with
   * HTTP 200 and a application/json body with the session token on success;
   * HTTP 410 if the original flow expired with the appropriate error messages set and optionally a `use_flow_id` parameter in the body;
   * HTTP 400 on form validation errors.
   *
   * Browser flows expect a Content-Type of `application/x-www-form-urlencoded` or `application/json` to be sent in the body and respond with
   * a HTTP 303 redirect to the post/after login URL or the `return_to` value if it was set and if the login succeeded;
   * a HTTP 303 redirect to the login UI URL with the flow ID containing the validation errors otherwise.
   *
   * Browser flows with an accept header of `application/json` will not redirect but instead respond with
   * HTTP 200 and a application/json body with the signed in identity and a `Set-Cookie` header on success;
   * HTTP 303 redirect to a fresh login flow if the original flow expired with the appropriate error messages set;
   * HTTP 400 on form validation errors.
   *
   * If this endpoint is called with `Accept: application/json` in the header, the response contains the flow without a redirect. In the
   * case of an error, the `error.id` of the JSON response body can be one of:
   *
   * `session_already_available`: The user is already signed in.
   * `security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.
   * `security_identity_mismatch`: The requested `?return_to` address is not allowed to be used. Adjust this in the configuration!
   * `browser_location_change_required`: Usually sent when an AJAX request indicates that the browser needs to open a specific URL.
   * Most likely used in Social Sign In flows.
   *
   * More information can be found at [Ory Kratos User Login](https://www.ory.sh/docs/kratos/self-service/flows/user-login) and [User Registration Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-registration).
   *
   */
  updateLoginFlow?: Maybe<successfulNativeLogin>;
  /**
   *
   * >**Method**: `DELETE`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/logout/api`
   * Use this endpoint to log out an identity using an Ory Session Token. If the Ory Session Token was successfully
   * revoked, the server returns a 204 No Content response. A 204 No Content response is also sent when
   * the Ory Session Token has been revoked already before.
   *
   * If the Ory Session Token is malformed or does not exist a 403 Forbidden response will be returned.
   *
   * This endpoint does not remove any HTTP
   * Cookies - use the Browser-Based Self-Service Logout Flow instead.
   *
   */
  performNativeLogout?: Maybe<Scalars['Void']>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/recovery`
   * Use this endpoint to complete a recovery flow. This endpoint
   * behaves differently for API and browser flows and has several states:
   *
   * `choose_method` expects `flow` (in the URL query) and `email` (in the body) to be sent
   * and works with API- and Browser-initiated flows.
   * For API clients and Browser clients with HTTP Header `Accept: application/json` it either returns a HTTP 200 OK when the form is valid and HTTP 400 OK when the form is invalid.
   * and a HTTP 303 See Other redirect with a fresh recovery flow if the flow was otherwise invalid (e.g. expired).
   * For Browser clients without HTTP Header `Accept` or with `Accept: text/*` it returns a HTTP 303 See Other redirect to the Recovery UI URL with the Recovery Flow ID appended.
   * `sent_email` is the success state after `choose_method` for the `link` method and allows the user to request another recovery email. It
   * works for both API and Browser-initiated flows and returns the same responses as the flow in `choose_method` state.
   * `passed_challenge` expects a `token` to be sent in the URL query and given the nature of the flow ("sending a recovery link")
   * does not have any API capabilities. The server responds with a HTTP 303 See Other redirect either to the Settings UI URL
   * (if the link was valid) and instructs the user to update their password, or a redirect to the Recover UI URL with
   * a new Recovery Flow ID which contains an error message that the recovery link was invalid.
   *
   * More information can be found at [Ory Kratos Account Recovery Documentation](../self-service/flows/account-recovery).
   *
   */
  updateRecoveryFlow?: Maybe<A_Recovery_Flow>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/registration`
   * Use this endpoint to complete a registration flow by sending an identity's traits and password. This endpoint
   * behaves differently for API and browser flows.
   *
   * API flows expect `application/json` to be sent in the body and respond with
   * HTTP 200 and a application/json body with the created identity success - if the session hook is configured the
   * `session` and `session_token` will also be included;
   * HTTP 410 if the original flow expired with the appropriate error messages set and optionally a `use_flow_id` parameter in the body;
   * HTTP 400 on form validation errors.
   *
   * Browser flows expect a Content-Type of `application/x-www-form-urlencoded` or `application/json` to be sent in the body and respond with
   * a HTTP 303 redirect to the post/after registration URL or the `return_to` value if it was set and if the registration succeeded;
   * a HTTP 303 redirect to the registration UI URL with the flow ID containing the validation errors otherwise.
   *
   * Browser flows with an accept header of `application/json` will not redirect but instead respond with
   * HTTP 200 and a application/json body with the signed in identity and a `Set-Cookie` header on success;
   * HTTP 303 redirect to a fresh login flow if the original flow expired with the appropriate error messages set;
   * HTTP 400 on form validation errors.
   *
   * If this endpoint is called with `Accept: application/json` in the header, the response contains the flow without a redirect. In the
   * case of an error, the `error.id` of the JSON response body can be one of:
   *
   * `session_already_available`: The user is already signed in.
   * `security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.
   * `security_identity_mismatch`: The requested `?return_to` address is not allowed to be used. Adjust this in the configuration!
   * `browser_location_change_required`: Usually sent when an AJAX request indicates that the browser needs to open a specific URL.
   * Most likely used in Social Sign In flows.
   *
   * More information can be found at [Ory Kratos User Login](https://www.ory.sh/docs/kratos/self-service/flows/user-login) and [User Registration Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-registration).
   *
   */
  updateRegistrationFlow?: Maybe<successfulNativeRegistration>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/settings`
   * Use this endpoint to complete a settings flow by sending an identity's updated password. This endpoint
   * behaves differently for API and browser flows.
   *
   * API-initiated flows expect `application/json` to be sent in the body and respond with
   * HTTP 200 and an application/json body with the session token on success;
   * HTTP 303 redirect to a fresh settings flow if the original flow expired with the appropriate error messages set;
   * HTTP 400 on form validation errors.
   * HTTP 401 when the endpoint is called without a valid session token.
   * HTTP 403 when `selfservice.flows.settings.privileged_session_max_age` was reached or the session's AAL is too low.
   * Implies that the user needs to re-authenticate.
   *
   * Browser flows without HTTP Header `Accept` or with `Accept: text/*` respond with
   * a HTTP 303 redirect to the post/after settings URL or the `return_to` value if it was set and if the flow succeeded;
   * a HTTP 303 redirect to the Settings UI URL with the flow ID containing the validation errors otherwise.
   * a HTTP 303 redirect to the login endpoint when `selfservice.flows.settings.privileged_session_max_age` was reached or the session's AAL is too low.
   *
   * Browser flows with HTTP Header `Accept: application/json` respond with
   * HTTP 200 and a application/json body with the signed in identity and a `Set-Cookie` header on success;
   * HTTP 303 redirect to a fresh login flow if the original flow expired with the appropriate error messages set;
   * HTTP 401 when the endpoint is called without a valid session cookie.
   * HTTP 403 when the page is accessed without a session cookie or the session's AAL is too low.
   * HTTP 400 on form validation errors.
   *
   * Depending on your configuration this endpoint might return a 403 error if the session has a lower Authenticator
   * Assurance Level (AAL) than is possible for the identity. This can happen if the identity has password + webauthn
   * credentials (which would result in AAL2) but the session has only AAL1. If this error occurs, ask the user
   * to sign in with the second factor (happens automatically for server-side browser flows) or change the configuration.
   *
   * If this endpoint is called with a `Accept: application/json` HTTP header, the response contains the flow without a redirect. In the
   * case of an error, the `error.id` of the JSON response body can be one of:
   *
   * `session_refresh_required`: The identity requested to change something that needs a privileged session. Redirect
   * the identity to the login init endpoint with query parameters `?refresh=true&return_to=<the-current-browser-url>`,
   * or initiate a refresh login flow otherwise.
   * `security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.
   * `session_inactive`: No Ory Session was found - sign in a user first.
   * `security_identity_mismatch`: The flow was interrupted with `session_refresh_required` but apparently some other
   * identity logged in instead.
   * `security_identity_mismatch`: The requested `?return_to` address is not allowed to be used. Adjust this in the configuration!
   * `browser_location_change_required`: Usually sent when an AJAX request indicates that the browser needs to open a specific URL.
   * Most likely used in Social Sign In flows.
   *
   * More information can be found at [Ory Kratos User Settings & Profile Management Documentation](../self-service/flows/user-settings).
   *
   */
  updateSettingsFlow?: Maybe<Flow_represents_a_Settings_Flow>;
  /**
   *
   * >**Method**: `POST`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/self-service/verification`
   * Use this endpoint to complete a verification flow. This endpoint
   * behaves differently for API and browser flows and has several states:
   *
   * `choose_method` expects `flow` (in the URL query) and `email` (in the body) to be sent
   * and works with API- and Browser-initiated flows.
   * For API clients and Browser clients with HTTP Header `Accept: application/json` it either returns a HTTP 200 OK when the form is valid and HTTP 400 OK when the form is invalid
   * and a HTTP 303 See Other redirect with a fresh verification flow if the flow was otherwise invalid (e.g. expired).
   * For Browser clients without HTTP Header `Accept` or with `Accept: text/*` it returns a HTTP 303 See Other redirect to the Verification UI URL with the Verification Flow ID appended.
   * `sent_email` is the success state after `choose_method` when using the `link` method and allows the user to request another verification email. It
   * works for both API and Browser-initiated flows and returns the same responses as the flow in `choose_method` state.
   * `passed_challenge` expects a `token` to be sent in the URL query and given the nature of the flow ("sending a verification link")
   * does not have any API capabilities. The server responds with a HTTP 303 See Other redirect either to the Settings UI URL
   * (if the link was valid) and instructs the user to update their password, or a redirect to the Verification UI URL with
   * a new Verification Flow ID which contains an error message that the verification link was invalid.
   *
   * More information can be found at [Ory Kratos Email and Phone Verification Documentation](https://www.ory.sh/docs/kratos/selfservice/flows/verify-email-account-activation).
   *
   */
  updateVerificationFlow?: Maybe<A_Verification_Flow>;
  /**
   *
   * >**Method**: `DELETE`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/sessions`
   * Calling this endpoint invalidates all except the current session that belong to the logged-in user.
   * Session data are not deleted.
   *
   */
  disableMyOtherSessions?: Maybe<deleteMySessionsCount>;
  /**
   *
   * >**Method**: `DELETE`
   * >**Base URL**: `http://localhost:4434`
   * >**Path**: `/sessions/{args.id}`
   * Calling this endpoint invalidates the specified session. The current session cannot be revoked.
   * Session data are not deleted.
   *
   */
  disableMySession?: Maybe<Scalars['Void']>;
};


export type authMutationcreateIdentityArgs = {
  input?: InputMaybe<createIdentityBody_Input>;
};


export type authMutationdeleteIdentityArgs = {
  id: Scalars['String'];
};


export type authMutationpatchIdentityArgs = {
  id: Scalars['String'];
  input?: InputMaybe<Array<InputMaybe<jsonPatch_Input>>>;
};


export type authMutationupdateIdentityArgs = {
  id: Scalars['String'];
  input?: InputMaybe<updateIdentityBody_Input>;
};


export type authMutationdeleteIdentitySessionsArgs = {
  id: Scalars['String'];
};


export type authMutationcreateRecoveryCodeForIdentityArgs = {
  input?: InputMaybe<createRecoveryCodeForIdentityBody_Input>;
};


export type authMutationcreateRecoveryLinkForIdentityArgs = {
  input?: InputMaybe<createRecoveryLinkForIdentityBody_Input>;
};


export type authMutationdisableSessionArgs = {
  id: Scalars['String'];
};


export type authMutationextendSessionArgs = {
  id: Scalars['String'];
};


export type authMutationupdateLoginFlowArgs = {
  X_Session_Token?: InputMaybe<Scalars['String']>;
  Cookie?: InputMaybe<Scalars['String']>;
  flow: Scalars['String'];
  input?: InputMaybe<updateLoginFlowBody_Input>;
};


export type authMutationperformNativeLogoutArgs = {
  input?: InputMaybe<Perform_Native_Logout_Request_Body_Input>;
};


export type authMutationupdateRecoveryFlowArgs = {
  Cookie?: InputMaybe<Scalars['String']>;
  flow: Scalars['String'];
  token?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<updateRecoveryFlowBody_Input>;
};


export type authMutationupdateRegistrationFlowArgs = {
  Cookie?: InputMaybe<Scalars['String']>;
  flow: Scalars['String'];
  input?: InputMaybe<updateRegistrationFlowBody_Input>;
};


export type authMutationupdateSettingsFlowArgs = {
  X_Session_Token?: InputMaybe<Scalars['String']>;
  Cookie?: InputMaybe<Scalars['String']>;
  flow: Scalars['String'];
  input?: InputMaybe<updateSettingsFlowBody_Input>;
};


export type authMutationupdateVerificationFlowArgs = {
  Cookie?: InputMaybe<Scalars['String']>;
  flow: Scalars['String'];
  token?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<updateVerificationFlowWithLinkMethod_Input>;
};


export type authMutationdisableMyOtherSessionsArgs = {
  X_Session_Token?: InputMaybe<Scalars['String']>;
  Cookie?: InputMaybe<Scalars['String']>;
};


export type authMutationdisableMySessionArgs = {
  X_Session_Token?: InputMaybe<Scalars['String']>;
  Cookie?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
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
      ["kratos-admin"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
