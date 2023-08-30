// @ts-nocheck
import {
  CalendarIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { format, parseISO } from "date-fns";
import {
  typedjson as json,
  TypedJsonResponse,
  useTypedLoaderData as useLoaderData,
} from "remix-typedjson";
import { Page } from "~/layout/Page";
import { PageHeader } from "~/layout/PageHeader";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { KratosIdentity } from "~/openapi/kratos";
import { listIdentities } from "~/services/kratos/listIdentities";
import { LoaderData, loaderGuard, redirectToLogin } from "~/utils";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader = async ({
  context,
  params,
  request,
}: LoaderArgs): Promise<
  TypedJsonResponse<
    LoaderData & {
      users: KratosIdentity[];
    }
  >
> => {
  const guard = await loaderGuard(request);

  if (guard.type === "without-identity") {
    return redirectToLogin(guard);
  }

  const { csrf } = guard;

  // TODO: check session and permissions

  const [users] = await Promise.all([
    listIdentities({
      headers: { Authorization: "" },
      query: { per_page: 100, page: 1 },
    }),
  ]);

  return json({ csrf, users } as const);
};

export type LoaderResponse = typeof loader;

export default () => {
  const { users } = useLoaderData<LoaderResponse>();

  return (
    <Page>
      <PageHeader title="Users" />

      <Section>
        <SectionHeader
          title="List"
          description="A list of all the users in your account including their name, title, email and role."
        />

        {users.map((user, i) => {
          const { id, traits } = user;
          const name = "Name"; // join(traits.name.first, traits.name.last);
          const createdAt = format(
            parseISO(user.created_at),
            "yyyy-MM-dd HH:mm:SS"
          );

          return (
            <Link key={id} to={id} className="block">
              <SectionItem withStripe={i % 2 === 0}>
                <div className="flex flex-row items-center space-x-5">
                  <div className="flex-1 space-y-5">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-orange-600">
                        {name}
                      </p>
                      <div className="ml-2 flex flex-shrink-0">
                        <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {user.state}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-slate-500">
                          <EnvelopeIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                            aria-hidden="true"
                          />
                          {traits.email}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-slate-500 sm:mt-0 sm:ml-6">
                          <UserIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                            aria-hidden="true"
                          />
                          {id}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-slate-500 sm:mt-0">
                        <CalendarIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
                          aria-hidden="true"
                        />
                        <time dateTime={user.created_at}>{createdAt}</time>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </SectionItem>
            </Link>
          );
        })}
      </Section>
    </Page>
  );
};
