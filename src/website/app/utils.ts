import { Session as KratosSession } from "@ory/kratos-client";
import { json, redirect, Session } from "@remix-run/node";
import { AxiosResponse } from "axios";
import { createAuthenticityToken, verifyAuthenticityToken } from "remix-utils";
import { z } from "zod";
import { frontend } from "./ory.server";
import { sessionStorage } from "./session.server";

export const join = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(" ");

// TODO: fix type definition
type Input = z.infer<z.ZodTypeAny>;
export type ActionErrors = Record<string, string>;
export type ActionDefaultValues = Record<string, Input>;
export type ActionResponse = {
  errors: ActionErrors | undefined;
  success: string | undefined;
  defaultValues: ActionDefaultValues | undefined;
};

export const actionResponse = (
  errors: ActionErrors | undefined,
  defaultValues: ActionDefaultValues | undefined,
  success: string | undefined = undefined
) => json<ActionResponse>({ errors, defaultValues, success });

export const loaderGuard = async (
  request: Request,
  requiresAuthentication = true
) => {
  const cookie = request.headers.get("cookie")!;
  const session = await sessionStorage.getSession(cookie);

  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams);

  let me: AxiosResponse<KratosSession>;
  try {
    me = await frontend.toSession({
      xSessionToken: session.data.session,
    });
  } catch (error: any) {
    if (requiresAuthentication && url.pathname !== "/login") {
      const from = query.from || url.href;

      const qs = new URLSearchParams();
      qs.set("from", from);

      throw redirect(`/login?${qs}`, { status: 303 });
    }
  }

  const csrf = createAuthenticityToken(session as Session, "csrf");

  return { session, me: me!, csrf, url, query };
};

const schemaGuard = <T extends z.ZodTypeAny>(
  schema: T,
  input: ActionDefaultValues
) => {
  const parsed = schema.safeParse(input);

  if (parsed.success === false) {
    console.log(
      "schemaGuard parsed.error",
      JSON.stringify(parsed.error, null, 2)
    );

    return {
      errors: parsed.error.issues.reduce((memo, issue) => {
        memo[issue.path.join(".")] = issue.message;
        return memo;
      }, {} as ActionErrors),
      data: undefined,
    };
  }

  return { errors: undefined, data: parsed.data as z.infer<T> };
};
export const actionGuard = async (request: Request, schema: z.ZodTypeAny) => {
  const cookie = request.headers.get("cookie");
  const formData = await request.formData();
  const session = await sessionStorage.getSession(cookie);
  await verifyAuthenticityToken(formData, session as Session, "csrf");

  const input = Object.fromEntries<Input>(formData) as ActionDefaultValues;
  const { errors, data } = await schemaGuard(schema, input);

  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams);

  return { session, receivedValues: input, errors, data, url, query };
};
