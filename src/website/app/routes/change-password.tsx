import { ActionArgs, json, LoaderFunction, redirect } from "@remix-run/node";
import { serverError } from "remix-utils";
import { z } from "zod";
import { Footer } from "~/layout/Footer";
import { Page } from "~/layout/Page";
import { kratos } from "~/ory.server";
import { sessionStorage } from "~/session.server";
import { actionGuard, actionResponse, loaderGuard } from "~/utils";
import { ChangePassword } from "./change-password/ChangePassword";
import { RequestChangePassword } from "./change-password/RequestChangePassword";

export { ErrorBoundary } from "~/ErrorBoundary";

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const { session, me, csrf, url, query } = await loaderGuard(request, false);

  if (me !== undefined) {
    return redirect(query.from || "/", { status: 303 });
  }

  if ("flow" in query === false) {
    const response = await kratos["/self-service/recovery/api"].get();

    if (response.ok === false) {
      const json = await response.json();

      throw serverError(json.error);
    }

    const flow = await response.json();

    url.searchParams.set("flow", flow.id);

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }

  const response = await kratos["/self-service/recovery/flows"].get({
    query: { id: query.flow },
  });

  if (response.ok === false) {
    url.searchParams.delete("flow");

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }
  return json(
    { csrf },
    { headers: { "set-cookie": await sessionStorage.commitSession(session) } }
  );
};

export default () => {
  return (
    <Page>
      <RequestChangePassword />
      <ChangePassword />
      <Footer />
    </Page>
  );
};

const actionSchema = z.intersection(
  z.object({ csrf: z.string() }),
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("request-change-password"),
      email: z.string().email(),
    }),
    z.object({
      type: z.literal("change-password"),
      code: z.string().length(6),
      password: z.string(),
    }),
  ])
);
export const action = async ({ params, request }: ActionArgs) => {
  const { session, receivedValues, errors, data, query } = await actionGuard(
    request,
    actionSchema
  );

  if (errors) {
    return actionResponse(errors, receivedValues);
  }

  switch (data.type) {
    case "request-change-password": {
      const response = await kratos["/self-service/recovery"].post({
        query: { flow: query.flow },
        json: {
          method: "code",
          email: data.email,
        },
      });

      if (response.ok === false) {
        const text = await response.text();

        return serverError({ message: text });
      }

      const flow = await response.json();

      console.log("change-password action", JSON.stringify(flow, null, 2));

      return actionResponse(undefined, receivedValues);
    }
    case "change-password": {
      const response = await kratos["/self-service/recovery"].post({
        query: { flow: query.flow },
        json: {
          method: "code",
          code: data.code,
        },
      });

      if (response.ok === false) {
        const text = await response.text();

        return serverError({ message: text });
      }

      const flow = await response.json();

      console.log("change-password action", JSON.stringify(flow, null, 2));

      return actionResponse(undefined, receivedValues);
    }
  }

  return actionResponse(
    { serverError: "Unsupported operation" },
    receivedValues
  );
};
