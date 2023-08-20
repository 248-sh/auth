import { LoaderFunction, redirect } from "@remix-run/node";
import { Oval } from "react-loader-spinner";
import { serverError } from "remix-utils";
import { Around } from "~/layout/Around";
import { kratos } from "~/ory.server";
import { sessionStorage } from "~/session.server";
import { loaderGuard } from "~/utils";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const { session, me, query } = await loaderGuard(request, false);

  if (me !== undefined) {
    const response = await kratos["/self-service/logout/api"].delete({
      json: { session_token: session.data.session! },
    });
    if (response.ok === false) {
      const json = await response.json();
      throw serverError(json.error);
    }
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
