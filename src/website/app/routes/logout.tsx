import { LoaderArgs } from "@remix-run/node";
import { Oval } from "react-loader-spinner";
import { redirect, TypedJsonResponse } from "remix-typedjson";
import { Around } from "~/layout/Around";
import { kratos } from "~/ory.server";
import { sessionStorage } from "~/session.server";
import { loaderGuard } from "~/utils";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader = async ({
  context,
  params,
  request,
}: LoaderArgs): Promise<TypedJsonResponse<never>> => {
  const { url, session } = await loaderGuard(request);

  await kratos["/self-service/logout/api"].delete({
    json: { session_token: session.get("session_token") },
  });

  return redirect(url.searchParams.get("from") || "/", {
    status: 303,
    headers: { "set-cookie": await sessionStorage.destroySession(session) },
  });
};

export type LoaderResponse = typeof loader;

export default () => {
  return (
    <Around>
      <Oval
        height={48}
        width={48}
        color="currentcolor"
        ariaLabel="oval-loading"
        secondaryColor=""
        strokeWidth={8}
        strokeWidthSecondary={12}
        wrapperClass="text-slate-500"
      />
    </Around>
  );
};
