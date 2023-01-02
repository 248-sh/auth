import { Switch } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { Identity, Session } from "@ory/kratos-client";
import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { format, formatDistance, isAfter, parseISO } from "date-fns";
import { FC, useState } from "react";
import {
  typedjson,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";
import { z } from "zod";

import Page from "~/layout/Page";
import PageHeader from "~/layout/PageHeader";
import Section from "~/layout/Section";
import SectionHeader from "~/layout/SectionHeader";
import SectionItem from "~/layout/SectionItem";
import ServerMessage from "~/layout/ServerMessage";
import { keto, kratos } from "~/ory.server";
import { join } from "~/utils";

export { default as ErrorBoundary } from "~/modules/ErrorBoundary";

export const loader = async ({ params: { userId }, request }: LoaderArgs) => {
  // kratos.toSession(request.headers.get("X-Session-Token")),

  const [identity, sessions, tuples] = await Promise.all([
    kratos.adminGetIdentity(userId),
    kratos.adminListIdentitySessions(userId),
    keto.getRelationTuples(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      userId
    ),
  ]);

  const roles = tuples.data.relation_tuples!;

  return typedjson({
    user: identity.data,
    sessions: sessions.data,
    roles: roles.map((role) => `${role.object}#${role.relation}`),
  } as const);
};

export default () => {
  const { user, sessions, roles } = useTypedLoaderData<typeof loader>();

  const { id, traits } = user;
  const name = join(traits.name.first, traits.name.last);
  const createdAt = format(parseISO(user.created_at), "yyyy-MM-dd HH:mm:SS");

  return (
    <Page>
      <PageHeader title={name} />

      <Sessions sessions={sessions} />
      <Roles roles={roles} />
      <Account user={user} />
      <Profile user={user} />
    </Page>
  );
};

const schema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("remove-session"), sessionId: z.string().uuid() }),
  z.object({ type: z.literal("failed"), error: z.instanceof(Error) }),
  z.object({ type: z.literal("asd"), error: z.instanceof(Error) }),
]);
export const action = async ({ params: { userId }, request }: ActionArgs) => {
  console.log("action userId", userId);

  const formData = await request.formData();
  const input = Object.fromEntries(formData);

  const parsed = schema.safeParse(input);
  if (parsed.success === false) {
    return typedjson({
      errors: parsed.error.issues.map((issue) => issue.message),
    });
  }

  const { data } = parsed;

  switch (data.type) {
    case "remove-session": {
      try {
        await kratos.revokeSession(data.sessionId);
      } catch (error: Error) {
        return typedjson({
          errors: [error.message],
        });
      }

      return typedjson({ success: `revoked session ${data.sessionId}` });
    }
  }

  return typedjson({ errors: ["unsupported operation"] });
};

const Sessions: FC<{ sessions: Session[] }> = ({ sessions }) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  return (
    <>
      <Section>
        <SectionHeader
          title="Sessions"
          description="This information will be displayed publicly so be careful what you share."
        />

        {sessions.map((session, i) => (
          // <Link
          //   key={id}
          //   to=""
          //   onClick={() => setSelectedSession(session)}
          //   className="block"
          // >
          <SectionItem key={session.id} withStripe={i % 2 === 0}>
            <SessionItem session={session} />
          </SectionItem>
          // </Link>
        ))}
      </Section>
      {selectedSession !== null && <SessionDetails session={selectedSession} />}
    </>
  );
};
const SessionItem: FC<{ session: Session }> = ({ session }) => {
  const fetcher = useTypedFetcher<typeof action>();

  const submitting = !!fetcher.submission;
  const type = fetcher.submission?.formData.get("type") || null;

  console.log("SessionItem type", type);
  console.log("SessionItem submitting", submitting);

  const now = new Date();

  const { id, active } = session;
  const expiredAt = parseISO(session.expires_at!);
  const expired = isAfter(now, expiredAt);
  const expiresIn = formatDistance(expiredAt, now, {
    addSuffix: true,
  });

  return (
    <>
      <fetcher.Form method="post">
        <input hidden readOnly name="sessionId" value={id} />

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
            {/* <button
                        type="button"
                        className="relative inline-flex items-center rounded-l-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      >
                        Years
                      </button>
                      <button
                        type="button"
                        className="relative -ml-px inline-flex items-center border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      >
                        Months
                      </button> */}
            <button
              type="submit"
              name="type"
              value="remove-session"
              disabled={submitting}
              className={join(
                "relative -ml-px inline-flex items-center rounded-r-md border border-slate-300 bg-orange-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-100 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500",
                submitting ? "opacity-50" : ""
              )}
            >
              {type === "remove-session" ? "Removing" : "Remove"}
            </button>
          </span>
        </div>
      </fetcher.Form>
      <ServerMessage fetcher={fetcher} />
    </>
  );
};
const SessionDetails: FC<{ session: Session }> = ({ session }) => {
  return (
    <Section>
      <SectionHeader
        title="Session Details"
        description="This information will be displayed publicly so be careful what you share."
      />

      <SectionItem withStripe>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </SectionItem>
    </Section>
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
const Account: FC<{ user: Identity }> = ({ user }) => {
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);

  const { id, traits } = user;
  const name = join(traits.name.first, traits.name.last);
  const createdAt = format(parseISO(user.created_at), "yyyy-MM-dd HH:mm:SS");

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
            <span className="flex-grow">div-MM-YYYY</span>
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
const Profile: FC<{ user: Identity }> = ({ user }) => {
  const { id, traits } = user;
  const name = join(traits.name.first, traits.name.last);
  const createdAt = format(parseISO(user.created_at), "yyyy-MM-dd HH:mm:SS");

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
            <span className="flex-grow">{traits.email}</span>
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
