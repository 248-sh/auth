import { Switch } from "@headlessui/react";
import { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import type {
  GenerateAuthenticationOptionsOpts,
  GenerateRegistrationOptionsOpts,
  VerifiedAuthenticationResponse,
  VerifiedRegistrationResponse,
  VerifyAuthenticationResponseOpts,
  VerifyRegistrationResponseOpts,
} from "@simplewebauthn/server";
import {
  // Authentication
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { isoBase64URL, isoUint8Array } from "@simplewebauthn/server/helpers";
import type {
  AuthenticationResponseJSON,
  AuthenticatorDevice,
  RegistrationResponseJSON,
} from "@simplewebauthn/typescript-types";
import { FC, FormEventHandler, useEffect, useState } from "react";
import {
  redirect,
  typedjson as json,
  TypedJsonResponse,
  useTypedFetcher as useFetcher,
  useTypedLoaderData as useLoaderData,
} from "remix-typedjson";
import { serverError } from "remix-utils";
import { z } from "zod";
import { FetcherContext } from "~/hooks/useFetcherContext";
import { Page } from "~/layout/Page";
import { PageHeader } from "~/layout/PageHeader";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { ServerMessage } from "~/layout/ServerMessage";
import { KratosIdentity, KratosSession } from "~/openapi/kratos";
import { createNativeLoginFlow } from "~/services/kratos/createNativeLoginFlow";
import { createNativeRegistrationFlow } from "~/services/kratos/createNativeRegistrationFlow";
import { disableMySession } from "~/services/kratos/disableMySession";
import { exchangeSessionToken } from "~/services/kratos/exchangeSessionToken";
import {
  ListMySessions,
  listMySessions,
} from "~/services/kratos/listMySessions";
import { updateLoginFlow } from "~/services/kratos/updateLoginFlow";
import { updateRegistrationFlow } from "~/services/kratos/updateRegistrationFlow";
import { sessionStorage } from "~/session.server";
import {
  ActionData,
  actionGuard,
  join,
  LoaderData,
  loaderGuard,
  redirectToHome,
  redirectToLogin,
} from "~/utils";

export { ErrorBoundary } from "~/ErrorBoundary";

/**
 * You'll need a database to store a few things:
 *
 * 1. Users
 *
 * You'll need to be able to associate registration and authentications challenges, and
 * authenticators to a specific user. See `LoggedInUser` below for an idea of the minimum amount of
 * info you'll need to track for a specific user during these flows.
 *
 * 2. Challenges
 *
 * The totally-random-unique-every-time values you pass into every execution of
 * `generateRegistrationOptions()` or `generateAuthenticationOptions()` MUST be stored until
 * `verifyRegistrationResponse()` or `verifyAuthenticationResponse()` (respectively) is called to verify
 * that the response contains the signed challenge.
 *
 * These values only need to be persisted for `timeout` number of milliseconds (see the `generate`
 * methods and their optional `timeout` parameter)
 *
 * 3. Authenticator Devices
 *
 * After registration, you'll need to store three things about the authenticator:
 *
 * - Base64-encoded "Credential ID" (varchar)
 * - Base64-encoded "Public Key" (varchar)
 * - Counter (int)
 *
 * Each authenticator must also be associated to a user so that you can generate a list of
 * authenticator credential IDs to pass into `generateAuthenticationOptions()`, from which one is
 * expected to generate an authentication response.
 */
interface LoggedInUser {
  id: string;
  username: string;
  devices: AuthenticatorDevice[];
}

const { ENABLE_CONFORMANCE, ENABLE_HTTPS, RP_ID = "localhost" } = {}; // process.env;

/**
 * RP ID represents the "scope" of websites on which a authenticator should be usable. The Origin
 * represents the expected URL from which registration or authentication occurs.
 */
export const rpID = RP_ID;
// This value is set at the bottom of page as part of server initialization (the empty string is
// to appease TypeScript until we determine the expected origin based on whether or not HTTPS
// support is enabled)
export let expectedOrigin = "http://localhost:3000";

/**
 * 2FA and Passwordless WebAuthn flows expect you to be able to uniquely identify the user that
 * performs registration or authentication. The user ID you specify here should be your internal,
 * _unique_ ID for that user (uuid, etc...). Avoid using identifying information here, like email
 * addresses, as it may be stored within the authenticator.
 *
 * Here, the example server assumes the following user has completed login:
 */
const loggedInUserId = "internalUserId";

const inMemoryUserDeviceDB: { [loggedInUserId: string]: LoggedInUser } = {
  [loggedInUserId]: {
    id: loggedInUserId,
    username: `user@${rpID}`,
    devices: [],
  },
};

export const meta: V2_MetaFunction = () => [{ title: "id.248.sh | admin" }];

export const loader = async ({
  context,
  params,
  request,
}: LoaderArgs): Promise<
  TypedJsonResponse<
    LoaderData & {
      user: KratosIdentity;
      currentSession: KratosSession;
      otherSessions: ListMySessions;
      // roles: any[];
    } & {
      registrationOptions: PublicKeyCredentialCreationOptionsJSON;
      authenticationOptions: PublicKeyCredentialRequestOptionsJSON;
    }
  >
> => {
  const user = inMemoryUserDeviceDB[loggedInUserId];

  const {
    /**
     * The username can be a human-readable name, email, etc... as it is intended only for display.
     */
    username,
    devices,
  } = user;

  const opts: GenerateRegistrationOptionsOpts = {
    rpName: "SimpleWebAuthn Example",
    rpID,
    userID: loggedInUserId,
    userName: username,
    timeout: 60000,
    attestationType: "none",
    /**
     * Passing in a user's list of already-registered authenticator IDs here prevents users from
     * registering the same device multiple times. The authenticator will simply throw an error in
     * the browser if it's asked to perform registration when one of these ID's already resides
     * on it.
     */
    excludeCredentials: devices.map((dev) => ({
      id: dev.credentialID,
      type: "public-key",
      transports: dev.transports,
    })),
    authenticatorSelection: {
      residentKey: "discouraged",
    },
    /**
     * Support the two most common algorithms: ES256, and RS256
     */
    supportedAlgorithmIDs: [-7, -257],
  };

  const registrationOptions = await generateRegistrationOptions(opts);

  const guard = await loaderGuard(request);

  /**
   * The server needs to temporarily remember this value for verification, so don't lose it until
   * after you verify an authenticator response.
   */
  guard.session.set(
    "currentRegistrationChallenge",
    registrationOptions.challenge
  );

  const authOpts: GenerateAuthenticationOptionsOpts = {
    timeout: 60000,
    allowCredentials: user.devices.map((dev) => ({
      id: dev.credentialID,
      type: "public-key",
      transports: dev.transports,
    })),
    userVerification: "preferred",
    // userVerification: "required",
    rpID,
  };

  const authenticationOptions = await generateAuthenticationOptions(authOpts);

  /**
   * The server needs to temporarily remember this value for verification, so don't lose it until
   * after you verify an authenticator response.
   */
  guard.session.set(
    "currentAuthenticationChallenge",
    authenticationOptions.challenge
  );

  // kratos["/.well-known/ory/webauthn.js"]
  //   .get()
  //   .then((r) => r.text())
  //   .then((r) => console.log("/.well-known/ory/webauthn.js", r));

  return json(
    {
      registrationOptions,
      authenticationOptions,

      csrf: guard.csrf,
      user: {} as KratosIdentity,
      currentSession: {} as KratosSession,
      otherSessions: { type: "failure", message: "lalala" } as ListMySessions,
      // roles: roles.map((role) => `${role.object}#${role.relation}`),
    } as const,
    {
      headers: {
        "set-cookie": await sessionStorage.commitSession(guard.session),
      },
    }
  );

  const { url, session } = guard;

  const code = url.searchParams.get("code");

  const session_token_exchange_code = session.get(
    "session_token_exchange_code"
  );

  if (code && session_token_exchange_code) {
    const response = await exchangeSessionToken({
      query: {
        init_code: session_token_exchange_code,
        return_to_code: code,
      },
    });

    switch (response.type) {
      case "failure":
        throw serverError(response.message);
      case "success":
        session.unset("session_token_exchange_code");
        session.set("session_token", response.session_token);

        return redirectToHome(guard);
    }
  }

  if (guard.type === "without-identity") {
    return redirectToLogin(guard);
  }

  const { identity: me, csrf } = guard;

  const [sessions, tuples] = await Promise.all([
    listMySessions({
      headers: { "X-Session-Token": session.get("session_token") },
      query: { per_page: 100, page: 1 },
    }),
    // keto.getRelationships({ subjectId: userId }),
    null,
  ]);

  // const roles = tuples.data.relation_tuples!;

  return json({
    csrf,
    user: me.identity,
    currentSession: me,
    otherSessions: sessions,
    // roles: roles.map((role) => `${role.object}#${role.relation}`),
  } as const);
};

export type LoaderResponse = typeof loader;

export default () => {
  const {
    csrf,
    user,
    currentSession,
    otherSessions,
    registrationOptions,
    authenticationOptions,
  } = useLoaderData<LoaderResponse>();
  const fetcher = useFetcher<
    | ActionData
    | { type: "registration-verified"; verified: boolean }
    | { type: "authentication-verified"; verified: boolean }
  >();

  // const { id, traits } = user;
  const name = "Name"; // join(traits.name.first, traits.name.last);
  // const createdAt = format(parseISO(user.created_at), "yyyy-MM-dd HH:mm:SS");

  /**
   * Conditional UI test
   *
   * 1. Start Chrome Canary 105+ with the requisite Conditional UI flag:
   *
   * open -a /Applications/Google\ Chrome\ Canary.app --args --enable-features=WebAuthenticationConditionalUI
   *
   * 2. Create an entry in chrome://settings/passwords (temporary requirement) e.g.:
   *
   *   - Site: https://example.simplewebauthn.dev/
   *   - Username: user@example.simplewebauthn.dev
   *   - Password: whatever
   *
   * 3. Register a credential
   *
   * 4. Reload the page
   *
   * 5. Interact with the username field above the Authenticate button
   *
   * Notes:
   *
   * I'm currently trying to get to calling WebAuthn as fast as I can here, there's a
   * Chrome race condition with autofill that sometimes prevents a credential from appearing.
   *
   * See: https://bugs.chromium.org/p/chromium/issues/detail?id=1322967&q=component%3ABlink%3EWebAuthentication&can=2
   *
   * I've been assured this race condition is temporary, at which point we'll probably be able
   * to include this just before </body> as we'd typically do. And at that point we can
   * probably use async/await as well for more sane-looking code.
   */
  useEffect(() => {
    const opts = authenticationOptions;

    console.log("Authentication Options (Autofill)", opts);
    startAuthentication(opts, true)
      .then(async (asseResp) => {
        // We can assume the DOM has loaded by now because it had to for the user to be able
        // to interact with an input to choose a credential from the autofill

        console.log(
          "Authentication Response (Autofill)",
          JSON.stringify(asseResp, null, 2)
        );

        const verificationResp = await fetch("/verify-authentication", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(asseResp),
        });

        const verificationJSON = await verificationResp.json();
        console.log(
          "Server Response (Autofill)",
          JSON.stringify(verificationJSON, null, 2)
        );

        if (verificationJSON && verificationJSON.verified) {
          console.log("User authenticated!");
        } else {
          console.log(
            "Oh no, something went wrong!",
            JSON.stringify(verificationJSON, null, 2)
          );
        }
      })
      .catch((err) => {
        console.error("(Autofill)", err);
      });
  }, []);

  const onRegister: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const opts = registrationOptions;

    console.log("Registration Options", JSON.stringify(opts, null, 2));

    // hideAuthForm();

    startRegistration(opts)
      .then((attResp) => {
        console.log("Registration Response", JSON.stringify(attResp, null, 2));

        const formData = new FormData(
          event.nativeEvent.target! as HTMLFormElement
        );
        formData.set("type", "verify-registration"); // why is this necessary??
        formData.set("data", JSON.stringify(attResp));
        console.log("formData", Object.fromEntries(formData));
        fetcher.submit(formData, { method: "post" });
      })
      .catch((error) => {
        if (error.name === "InvalidStateError") {
          console.log(
            "Error: Authenticator was probably already registered by user"
          );
        } else {
          console.log("startRegistration error", error);
        }

        // throw error;
      });

    // const verificationResp = await fetch("/verify-registration", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(attResp),
    // });

    // const verificationJSON = await verificationResp.json();
    // printDebug(
    //   elemDebug,
    //   "Server Response",
    //   JSON.stringify(verificationJSON, null, 2)
    // );

    // if (verificationJSON && verificationJSON.verified) {
    //   elemSuccess.innerHTML = `Authenticator registered!`;
    // } else {
    //   elemError.innerHTML = `Oh no, something went wrong! Response: <pre>${JSON.stringify(
    //     verificationJSON
    //   )}</pre>`;
    // }
  };

  const onAuthenticate: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const opts = authenticationOptions;

    console.log("Authentication Options", JSON.stringify(opts, null, 2));

    // hideAuthForm();

    startAuthentication(opts)
      .then((asseResp) => {
        console.log(
          "Authentication Response",
          JSON.stringify(asseResp, null, 2)
        );

        const formData = new FormData(
          event.nativeEvent.target! as HTMLFormElement
        );
        formData.set("type", "verify-authentication"); // why is this necessary??
        formData.set("data", JSON.stringify(asseResp));
        console.log("formData", Object.fromEntries(formData));
        fetcher.submit(formData, { method: "post" });
      })
      .catch((error) => {
        console.log("startAuthentication error", error);

        // throw new Error(error);
      });

    // const verificationJSON = await verificationResp.json();
    // printDebug(
    //   elemDebug,
    //   "Server Response",
    //   JSON.stringify(verificationJSON, null, 2)
    // );

    // if (verificationJSON && verificationJSON.verified) {
    //   elemSuccess.innerHTML = `User authenticated!`;
    // } else {
    //   elemError.innerHTML = `Oh no, something went wrong! Response: <pre>${JSON.stringify(
    //     verificationJSON
    //   )}</pre>`;
    // }
  };

  return (
    // <div className="flex flex-row">
    <Page>
      <PageHeader title={name} />

      <FetcherContext.Provider value={fetcher}>
        <fetcher.Form method="post" noValidate onSubmit={onRegister}>
          <input name="csrf" value={csrf} hidden readOnly />
          <button
            type="submit"
            name="type"
            value="verify-registration"
            // disabled={submitting}
            className={join(
              "relative -ml-px inline-flex items-center rounded-sm border border-slate-300 bg-orange-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-100 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              // submitting ? "pointer-events-none opacity-50" : ""
            )}
          >
            Register
          </button>
          <ServerMessage />
        </fetcher.Form>
        <fetcher.Form method="post" noValidate onSubmit={onAuthenticate}>
          <input name="csrf" value={csrf} hidden readOnly />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="webauthn"
            autoFocus
          />
          <button
            type="submit"
            name="type"
            value="verify-authentication"
            // disabled={submitting}
            className={join(
              "relative -ml-px inline-flex items-center rounded-sm border border-slate-300 bg-orange-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-100 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              // submitting ? "pointer-events-none opacity-50" : ""
            )}
          >
            Authenticate
          </button>
          <ServerMessage />
        </fetcher.Form>
      </FetcherContext.Provider>
      {/* <CurrentSession session={currentSession} />
      <OtherSessions sessions={otherSessions} /> */}
      {/* <Roles roles={roles} /> */}
      {/* <Account user={user} />
      <Profile user={user} /> */}
    </Page>
    //   <Page>
    //   <CurrentSession session={currentSession} />
    //   </Page>
    // </div>
  );
};

const actionSchema = z.intersection(
  z.object({ csrf: z.string() }),
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("verify-registration"),
      data: z.string(),
    }),
    z.object({
      type: z.literal("verify-authentication"),
      data: z.string(),
    }),
    z.object({
      type: z.literal("logout"),
    }),
    z.object({
      type: z.literal("remove-session"),
      sessionId: z.string().uuid(),
    }),
  ])
);
export const action = async ({
  params,
  request,
}: ActionArgs): Promise<
  TypedJsonResponse<
    | ActionData
    | { type: "registration-verified"; verified: boolean }
    | { type: "authentication-verified"; verified: boolean }
  >
> => {
  const guard = await actionGuard(request, actionSchema);

  if (guard.type === "not-valid") {
    return json({
      type: "not-valid",
      messages: guard.messages,

      defaultValues: guard.defaultValues,
    });
  }

  const { session, data } = guard;

  switch (data.type) {
    case "verify-registration": {
      console.log("verify-registration", data.data);

      const body = JSON.parse(data.data) as RegistrationResponseJSON;

      const user = inMemoryUserDeviceDB[loggedInUserId];

      const expectedChallenge = session.get("currentRegistrationChallenge");

      let verification: VerifiedRegistrationResponse;
      try {
        const opts: VerifyRegistrationResponseOpts = {
          response: body,
          expectedChallenge: `${expectedChallenge}`,
          expectedOrigin,
          expectedRPID: rpID,
          requireUserVerification: true,
        };
        verification = await verifyRegistrationResponse(opts);
      } catch (error) {
        const _error = error as Error;

        return json({
          type: "failure",
          message: _error.message,

          defaultValues: guard.defaultValues,
        });
      }

      const { verified, registrationInfo } = verification;

      if (verified && registrationInfo) {
        const { credentialPublicKey, credentialID, counter } = registrationInfo;

        const existingDevice = user.devices.find((device) =>
          isoUint8Array.areEqual(device.credentialID, credentialID)
        );

        if (!existingDevice) {
          /**
           * Add the returned device to the user's list of devices
           */
          const newDevice: AuthenticatorDevice = {
            credentialPublicKey,
            credentialID,
            counter,
            transports: body.response.transports,
          };
          user.devices.push(newDevice);
        }
      }

      session.unset("currentRegistrationChallenge");

      const createFlow = await createNativeRegistrationFlow({
        query: { return_session_token_exchange_code: true },
      });

      console.log("createFlow", createFlow);

      const updateFlow = await updateRegistrationFlow({
        query: { flow: createFlow.type === "success" ? createFlow.flow : "" },
        json: {
          method: "webauthn",
          traits: { email: "miran@248.sh" },
          webauthn_register: JSON.stringify({
            id: body.id,
            rawId: body.rawId,
            type: body.type,
            response: {
              attestationObject: body.response.attestationObject,
              clientDataJSON: body.response.clientDataJSON,
            },
          }),
          webauthn_register_displayname: "",
        },
      });

      console.log("updateRegistrationFlow response", updateFlow);

      return json(
        {
          type: "registration-verified",
          verified,
        },
        {
          headers: {
            "set-cookie": await sessionStorage.commitSession(session),
          },
        }
      );
    }
    case "verify-authentication": {
      console.log("verify-authentication", data.data);

      const body = JSON.parse(data.data) as AuthenticationResponseJSON;

      const user = inMemoryUserDeviceDB[loggedInUserId];

      const expectedChallenge = session.get("currentAuthenticationChallenge");

      let dbAuthenticator;
      const bodyCredIDBuffer = isoBase64URL.toBuffer(body.rawId);
      // "Query the DB" here for an authenticator matching `credentialID`
      for (const dev of user.devices) {
        if (isoUint8Array.areEqual(dev.credentialID, bodyCredIDBuffer)) {
          dbAuthenticator = dev;
          break;
        }
      }

      if (!dbAuthenticator) {
        return json({
          type: "failure",
          message: "Authenticator is not registered with this site",

          defaultValues: guard.defaultValues,
        });
      }

      let verification: VerifiedAuthenticationResponse;
      try {
        const opts: VerifyAuthenticationResponseOpts = {
          response: body,
          expectedChallenge: `${expectedChallenge}`,
          expectedOrigin,
          expectedRPID: rpID,
          authenticator: dbAuthenticator,
          requireUserVerification: true,
        };
        verification = await verifyAuthenticationResponse(opts);
      } catch (error) {
        const _error = error as Error;

        return json({
          type: "failure",
          message: _error.message,

          defaultValues: guard.defaultValues,
        });
      }

      const { verified, authenticationInfo } = verification;

      if (verified) {
        // Update the authenticator's counter in the DB to the newest count in the authentication
        dbAuthenticator.counter = authenticationInfo.newCounter;
      }

      session.unset("currentAuthenticationChallenge");

      const createFlow = await createNativeLoginFlow({
        query: { aal: "aal1", return_session_token_exchange_code: true },
      });

      console.log("createFlow", createFlow);

      const updateFlow = await updateLoginFlow({
        query: { flow: createFlow.type === "success" ? createFlow.flow : "" },
        json: {
          method: "webauthn",
          traits: { email: "miran@248.sh" },
          webauthn_login: JSON.stringify({
            id: body.id,
            rawId: body.rawId,
            type: body.type,
            response: {
              authenticatorData: body.response.authenticatorData,
              clientDataJSON: body.response.clientDataJSON,
              signature: body.response.signature,
              userHandle: body.response.userHandle,
            },
          }),
        },
      });

      console.log("updateRegistrationFlow response", updateFlow);

      return json(
        {
          type: "authentication-verified",
          verified,
        },
        {
          headers: {
            "set-cookie": await sessionStorage.commitSession(session),
          },
        }
      );
    }
    case "logout": {
      return redirect("/logout", {
        status: 303,
        headers: { "set-cookie": await sessionStorage.commitSession(session) },
      });
    }
    case "remove-session": {
      const response = await disableMySession({
        headers: { "X-Session-Token": session.get("session_token") },
        params: { id: data.sessionId },
      });

      switch (response.type) {
        case "failure":
          return json({
            type: "failure",
            message: response.message,

            defaultValues: guard.defaultValues,
          });
        case "success":
          return json({
            type: "success",
            message: response.message,

            defaultValues: guard.defaultValues,
          });
      }
    }
  }

  return json({
    type: "failure",
    message: "Unsupported operation",

    defaultValues: guard.defaultValues,
  });
};

const Roles: FC<{ roles: string[] }> = ({ roles }) => {
  return (
    <Section>
      <SectionHeader
        title="Roles"
        description="This information will be displayed publicly so be careful what you share."
      />

      {roles.map((role, i) => {
        return (
          <SectionItem key={role} withStripe={i % 2 === 0}>
            <pre>{role}</pre>
          </SectionItem>
        );
      })}
    </Section>
  );
};
const Account: FC<{ user: KratosIdentity }> = ({ user }) => {
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);

  // const { id, traits } = user;
  // const name = join(traits.name.first, traits.name.last);
  // const createdAt = format(parseISO(user.created_at), "yyyy-MM-dd HH:mm:SS");

  return (
    <Section>
      <SectionHeader
        title="Account"
        description="Manage how information is displayed on your account."
      />

      <SectionItem withStripe>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
          <div className="text-sm font-medium text-slate-500">Language</div>
          <div className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">English</span>
            <span className="ml-4 flex-shrink-0">
              <button
                type="button"
                className="rounded-md bg-white font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Update
              </button>
            </span>
          </div>
        </div>
      </SectionItem>
      <SectionItem>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
          <div className="text-sm font-medium text-slate-500">Date format</div>
          <div className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">DD-MM-YYYY</span>
            <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
              <button
                type="button"
                className="rounded-md bg-white font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Update
              </button>
              <span className="text-slate-300" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                className="rounded-md bg-white font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Remove
              </button>
            </span>
          </div>
        </div>
      </SectionItem>
      <SectionItem withStripe>
        <Switch.Group as="div" className="sm:grid sm:grid-cols-3 sm:gap-4">
          <Switch.Label
            as="div"
            className="text-sm font-medium text-slate-500"
            passive
          >
            Automatic timezone
          </Switch.Label>
          <div className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
            <Switch
              checked={automaticTimezoneEnabled}
              onChange={setAutomaticTimezoneEnabled}
              className={join(
                automaticTimezoneEnabled ? "bg-orange-600" : "bg-slate-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:ml-auto"
              )}
            >
              <span
                aria-hidden="true"
                className={join(
                  automaticTimezoneEnabled ? "translate-x-5" : "translate-x-0",
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </div>
        </Switch.Group>
      </SectionItem>
      <SectionItem>
        <Switch.Group as="div" className="sm:grid sm:grid-cols-3 sm:gap-4">
          <Switch.Label
            as="div"
            className="text-sm font-medium text-slate-500"
            passive
          >
            Auto-update applicant data
          </Switch.Label>
          <div className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
            <Switch
              checked={autoUpdateApplicantDataEnabled}
              onChange={setAutoUpdateApplicantDataEnabled}
              className={join(
                autoUpdateApplicantDataEnabled
                  ? "bg-orange-600"
                  : "bg-slate-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:ml-auto"
              )}
            >
              <span
                aria-hidden="true"
                className={join(
                  autoUpdateApplicantDataEnabled
                    ? "translate-x-5"
                    : "translate-x-0",
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </div>
        </Switch.Group>
      </SectionItem>
    </Section>
  );
};
const Profile: FC<{ user: KratosIdentity }> = ({ user }) => {
  const { id, traits } = user;
  const name = "Name"; // join(traits.name.first, traits.name.last);
  // const createdAt = format(parseISO(user.created_at), "yyyy-MM-dd HH:mm:SS");

  return (
    <Section>
      <SectionHeader
        title="Profile"
        description="This information will be displayed publicly so be careful what you share."
      />

      <SectionItem withStripe>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
          <div className="text-sm font-medium text-slate-500">Name</div>
          <div className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">{name}</span>
            <span className="ml-4 flex-shrink-0">
              <button
                type="button"
                className="rounded-md bg-white font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Update
              </button>
            </span>
          </div>
        </div>
      </SectionItem>
      <SectionItem>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
          <div className="text-sm font-medium text-slate-500">Photo</div>
          <div className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </span>
            <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
              <button
                type="button"
                className="rounded-md bg-white font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Update
              </button>
              <span className="text-slate-300" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                className="rounded-md bg-white font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Remove
              </button>
            </span>
          </div>
        </div>
      </SectionItem>
      <SectionItem withStripe>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
          <div className="text-sm font-medium text-slate-500">Email</div>
          <div className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
            {/* <span className="flex-grow">{traits.email}</span> */}
            <span className="ml-4 flex-shrink-0">
              <button
                type="button"
                className="rounded-md bg-white font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Update
              </button>
            </span>
          </div>
        </div>
      </SectionItem>
      <SectionItem>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4">
          <div className="text-sm font-medium text-slate-500">Job title</div>
          <div className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">Human Resources Manager</span>
            <span className="ml-4 flex-shrink-0">
              <button
                type="button"
                className="rounded-md bg-white font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Update
              </button>
            </span>
          </div>
        </div>
      </SectionItem>
    </Section>
  );
};

// const navigation = [
//   { name: "Home", path: "/", icon: HomeIcon },
//   { name: "Users", path: "/users", icon: UsersIcon },
//   { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
// ];

// const App = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <>
//       <Sidebar
//         navigation={navigation}
//         onSidebarClose={() => setSidebarOpen(false)}
//         sidebarOpen={sidebarOpen}
//       />
//       <MobileHeaderModule onSidebarOpen={() => setSidebarOpen(true)} />
//       <div className="md:mx-28 relative">
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default App;
