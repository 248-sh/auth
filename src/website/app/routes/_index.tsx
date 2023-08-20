import { Switch } from "@headlessui/react";
import { Identity } from "@ory/kratos-client";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  V2_MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FC, useState } from "react";
import { z } from "zod";
import { Page } from "~/layout/Page";
import { PageHeader } from "~/layout/PageHeader";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { kratos, listMySessions } from "~/ory.server";
import { actionGuard, actionResponse, join, loaderGuard } from "~/utils";
import { CurrentSession } from "./index/CurrentSession";
import { OtherSessions } from "./index/OtherSessions";

export { ErrorBoundary } from "~/ErrorBoundary";

export const meta: V2_MetaFunction = () => [{ title: "id.248.sh | admin" }];

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const { session, me, csrf } = await loaderGuard(request);

  const [sessions, tuples] = await Promise.all([
    listMySessions(session.data.session, 1),
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
    roles: [],
  } as const);
};

export default () => {
  const { user, currentSession, otherSessions, roles } = useLoaderData();

  // const { id, traits } = user;
  const name = "Name"; // join(traits.name.first, traits.name.last);
  // const createdAt = format(parseISO(user.created_at), "yyyy-MM-dd HH:mm:SS");

  return (
    // <div className="flex flex-row">
    <Page>
      <PageHeader title={name} />

      <CurrentSession session={currentSession} />
      <OtherSessions sessions={otherSessions} />
      <Roles roles={roles} />
      <Account user={user} />
      <Profile user={user} />
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
      type: z.literal("logout"),
    }),
    z.object({
      type: z.literal("remove-session"),
      sessionId: z.string().uuid(),
    }),
  ])
);
export const action: ActionFunction = async ({ params, request }) => {
  const { session, receivedValues, data } = await actionGuard(
    request,
    actionSchema
  );

  switch (data.type) {
    case "logout": {
      return redirect("/logout", { status: 303 });
    }
    case "remove-session": {
      const response = await kratos["/sessions/{id}"].delete({
        headers: { "X-Session-Token": session.data.session },
        params: { id: data.sessionId },
      });
      if (response.ok === false) {
        const json = await response.json();
        return actionResponse(
          { serverError: json.error.message },
          receivedValues
        );
      }

      return actionResponse(
        undefined,
        receivedValues,
        `Revoked session ${data.sessionId}`
      );
    }
  }

  return actionResponse(
    { serverError: "Unsupported operation" },
    receivedValues
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
const Profile: FC<{ user: Identity }> = ({ user }) => {
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
