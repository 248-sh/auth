import { LoaderFunction, redirect } from "@remix-run/node";
import { Oval } from "react-loader-spinner";
import { Around } from "~/layout/Around";
import { frontend } from "~/ory.server";
import { sessionStorage } from "~/session.server";
import { loaderGuard } from "~/utils";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const { session, me, query } = await loaderGuard(request, false);

  if (me !== undefined) {
    await frontend.performNativeLogout({
      performNativeLogoutBody: { session_token: session.data.session! },
    });
  }

  return redirect(query.from || "/", {
    status: 303,
    headers: { "set-cookie": await sessionStorage.destroySession(session) },
  });
};

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
