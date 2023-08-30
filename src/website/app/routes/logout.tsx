import { LoaderArgs } from "@remix-run/node";
import { Oval } from "react-loader-spinner";
import { TypedJsonResponse } from "remix-typedjson";
import { Around } from "~/layout/Around";
import { performNativeLogout } from "~/services/kratos/performNativeLogout";
import { loaderGuard, redirectToHome } from "~/utils";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader = async ({
  context,
  params,
  request,
}: LoaderArgs): Promise<TypedJsonResponse<never>> => {
  const guard = await loaderGuard(request);

  await performNativeLogout({
    json: { session_token: guard.session.get("session_token") },
  });

  return redirectToHome(guard);
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
