import { LoaderArgs } from "@remix-run/node";
import { redirect } from "remix-typedjson";
import { sessionStorage } from "~/session.server";
import { loaderGuard } from "~/utils";

const kratosUrl = process.env.KRATOS_PUBLIC_ENDPOINT;

export const loader = async ({ params, request }: LoaderArgs) => {
  const guard = await loaderGuard(request);

  const { url, session } = guard;

  return redirect(`${kratosUrl}/${params["*"]}?${url.searchParams}`, {
    status: 303,
    headers: {
      "set-cookie": await sessionStorage.commitSession(session),
    },
  });
};
