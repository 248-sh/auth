// @ts-nocheck
import { Switch } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { formatDistance, isAfter, parseISO } from "date-fns";
import { FC, useState } from "react";
import {
  typedjson as json,
  TypedJsonResponse,
  useTypedFetcher as useFetcher,
  useTypedLoaderData as useLoaderData,
} from "remix-typedjson";
import { z } from "zod";
import { FetcherContext } from "~/hooks/useFetcherContext";
import { Page } from "~/layout/Page";
import { PageHeader } from "~/layout/PageHeader";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { ServerMessage } from "~/layout/ServerMessage";
import { KratosIdentity, KratosSession } from "~/openapi/kratos";
import { disableSession } from "~/services/kratos/disableSession";
import { getIdentity } from "~/services/kratos/getIdentity";
import { listIdentitySessions } from "~/services/kratos/listIdentitySessions";
import {
  ActionData,
  actionGuard,
  join,
  LoaderData,
  loaderGuard,
  redirectToLogin,
} from "~/utils";
import { SessionDetails } from "../index/SessionDetails";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader = async ({
  params: { userId },
  request,
}: LoaderArgs): Promise<
  TypedJsonResponse<
    LoaderData & {
      user: KratosIdentity;
      sessions: KratosSession[];
    }
  >
> => {
  const guard = await loaderGuard(request);

  if (guard.type === "without-identity") {
    return redirectToLogin(guard);
  }

  const { identity: me, csrf } = guard;

  // TODO: check session and permissions

  const [user, sessions, tuples] = await Promise.all([
    getIdentity({
      headers: { Authorization: "" },
      params: { id: userId },
    }),
    listIdentitySessions({
      headers: { Authorization: "" },
      params: { id: userId },
    }),
    // keto.getRelationships({ subjectId: userId }),
    null,
  ]);

  // const roles = tuples.data.relation_tuples!;

  return json({
    csrf,
    user,
    sessions,
    // roles: roles.map((role) => `${role.object}#${role.relation}`),
  } as const);
};

export type LoaderResponse = typeof loader;

export default () => {
  const { user, sessions } = useLoaderData<LoaderResponse>();

  const { id, traits } = user;
  const name = "Name"; // join(traits.name.first, traits.name.last);
  // const createdAt = format(parseISO(user.created_at), "yyyy-MM-dd HH:mm:SS");

  return (
    <Page>
      <PageHeader title={name} />

      <Sessions sessions={sessions} />
      {/* <Roles roles={roles} /> */}
      {/* <Account user={user} />
      <Profile user={user} /> */}
    </Page>
  );
};

const actionSchema = z.intersection(
  z.object({ csrf: z.string() }),
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("remove-session"),
      sessionId: z.string().uuid(),
    }),
  ])
);
export const action = async ({
  params,
  request,
}: ActionArgs): Promise<TypedJsonResponse<ActionData>> => {
  const guard = await actionGuard(request, actionSchema);

  if (guard.type === "not-valid") {
    return json({
      type: "not-valid",
      messages: guard.messages,

      defaultValues: guard.defaultValues,
    });
  }

  const { data } = guard;

  switch (data.type) {
    case "remove-session": {
      const response = await disableSession({
        headers: { Authorization: "" },
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

const Sessions: FC<{ sessions: KratosSession[] }> = ({ sessions }) => {
  const [selectedSession, setSelectedSession] = useState<KratosSession | null>(
    null
  );

  return (
    <>
      <Section>
        <SectionHeader
          title="Sessions"
          description="This information will be displayed publicly so be careful what you share."
        />

        {sessions.map((session, i) => (
          <Link
            key={session.id}
            to="#"
            onClick={() => setSelectedSession(session)}
            className="block"
          >
            <SectionItem withStripe={i % 2 === 0}>
              <SessionItem session={session} />
            </SectionItem>
          </Link>
        ))}
      </Section>
      {selectedSession !== null && <SessionDetails session={selectedSession} />}
    </>
  );
};
const SessionItem: FC<{ session: KratosSession }> = ({ session }) => {
  const { csrf } = useLoaderData<LoaderResponse>();
  const fetcher = useFetcher<ActionData>();

  const submitting =
    fetcher.state === "submitting"
      ? fetcher.formData?.get("type") === "remove-session"
      : false;

  const now = new Date();

  const { id, active } = session;
  const expiredAt = parseISO(session.expires_at!);
  const expired = isAfter(now, expiredAt);
  const expiresIn = formatDistance(expiredAt, now, {
    addSuffix: true,
  });

  return (
    <FetcherContext.Provider value={fetcher}>
      <fetcher.Form method="post" noValidate>
        <input name="csrf" value={csrf} hidden readOnly />
        <input name="sessionId" value={id} hidden readOnly />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-orange-600">{id}</p>
          <p
            className={join(
              "rounded-full px-2 text-xs font-semibold leading-5",
              active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            )}
          >
            {active ? "active" : "inactive"}
          </p>
          <p className="flex items-center text-sm text-slate-500">
            <CalendarIcon
              className={join(
                "mr-1.5 h-5 w-5 flex-shrink-0",
                expired ? "text-red-400" : "text-green-400"
              )}
              aria-hidden="true"
            />
            <time dateTime={session.expires_at}>{`${
              expired ? "expired" : "expires"
            } ${expiresIn}`}</time>
          </p>
          <div className="flex-1" />
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="submit"
              name="type"
              value="remove-session"
              disabled={submitting}
              className={join(
                "relative -ml-px inline-flex items-center rounded-r-md border border-slate-300 bg-orange-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-100 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500",
                submitting ? "pointer-events-none opacity-50" : ""
              )}
            >
              {submitting ? "Removing" : "Remove"}
            </button>
          </span>
        </div>
      </fetcher.Form>
      <ServerMessage />
    </FetcherContext.Provider>
  );
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
  // const name = "Name"; // join(traits.name.first, traits.name.last);
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
