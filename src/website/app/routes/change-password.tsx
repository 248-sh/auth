import { RequiredError } from "@ory/kratos-client/dist/base";
import { ActionArgs, json, LoaderFunction, redirect } from "@remix-run/node";
import { z } from "zod";
import { Footer } from "~/layout/Footer";
import { Page } from "~/layout/Page";
import { frontend } from "~/ory.server";
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
    const flow = await frontend.createNativeRecoveryFlow();
    url.searchParams.set("flow", flow.data.id);

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }

  let flow;
  try {
    flow = await frontend.getRecoveryFlow({ id: query.flow });

    // flow.data.ui.messages[0].type==="error"
    // flow.data.ui.messages[0].type==="info"
    // flow.data.ui.messages[0].type==="success"
    console.log("flow.data.ui", JSON.stringify(flow.data.ui, null, 2));
    console.log("flow.data.state", flow.data.state);

    return json(
      { csrf },
      { headers: { "set-cookie": await sessionStorage.commitSession(session) } }
    );
  } catch (error: any) {
    console.error(
      "change-password getRecoveryFlow error",
      JSON.stringify(error.response?.data || error, null, 2)
    );

    flow = await frontend.createNativeRecoveryFlow();
    url.searchParams.set("flow", flow.data.id);

    return redirect(url.toString(), {
      status: 303,
      headers: { "set-cookie": await sessionStorage.commitSession(session) },
    });
  }
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
      try {
        const flow = await frontend.updateRecoveryFlow({
          flow: query.flow,
          updateRecoveryFlowBody: {
            method: "code",
            email: data.email,
          },
        });

        console.log(
          "request-change-password action",
          JSON.stringify(flow.data, null, 2)
        );

        return actionResponse(undefined, receivedValues);
      } catch (error: any) {
        console.error(
          "request-change-password action error",
          error.response.data
          // JSON.stringify(error.response?.data || error, null, 2)
        );

        return actionResponse(
          { serverError: "Account not found" },
          receivedValues
        );
      }
    }
    case "change-password": {
      try {
        const flow = await frontend.updateRecoveryFlow({
          flow: query.flow,
          updateRecoveryFlowBody: {
            method: "code",
            code: data.code,
          },
        });

        console.log(
          "change-password action",
          JSON.stringify(flow.data, null, 2)
        );

        return actionResponse(undefined, receivedValues);
      } catch (error: any) {
        console.error(
          "change-password action error",
          error.response.data
          // JSON.stringify(error.response?.data || error, null, 2)
        );

        return actionResponse(
          { serverError: "Account not found" },
          receivedValues
        );
      }
    }
  }

  return actionResponse(
    { serverError: "Unsupported operation" },
    receivedValues
  );
};
