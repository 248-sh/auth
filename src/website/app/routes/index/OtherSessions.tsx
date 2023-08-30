import { CalendarIcon } from "@heroicons/react/20/solid";
import { Link } from "@remix-run/react";
import { formatDistance, isAfter, parseISO } from "date-fns";
import { FC, useState } from "react";
import {
  useTypedFetcher as useFetcher,
  useTypedLoaderData as useLoaderData,
} from "remix-typedjson";
import { FetcherContext } from "~/hooks/useFetcherContext";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { ServerMessage } from "~/layout/ServerMessage";
import { KratosSession } from "~/openapi/kratos";
import { ActionData, join, LoaderData } from "~/utils";
import { SessionDetails } from "./SessionDetails";

export const OtherSessions: FC<{ sessions: KratosSession[] }> = ({ sessions }) => {
  const [selectedSession, setSelectedSession] = useState<KratosSession | null>(null);

  return (
    <>
      <Section>
        <SectionHeader
          title="Other Sessions"
          description="This information will be displayed publicly so be careful what you share."
        />

        {sessions.map((session, i) => (
          // <Link
          //   key={session.id}
          //   to="#"
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
const SessionItem: FC<{ session: KratosSession }> = ({ session }) => {
  const { csrf } = useLoaderData<LoaderData>();
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
                "relative -ml-px inline-flex items-center rounded-sm border border-slate-300 bg-orange-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-100 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500",
                submitting ? "pointer-events-none opacity-50" : ""
              )}
            >
              {submitting ? "Signing out.." : "Sign out"}
            </button>
          </span>
        </div>
      </fetcher.Form>
      <ServerMessage />
    </FetcherContext.Provider>
  );
};
