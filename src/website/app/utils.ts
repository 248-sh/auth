import { Session } from "@remix-run/node";
import { redirect } from "remix-typedjson";
import { createAuthenticityToken, verifyAuthenticityToken } from "remix-utils";
import { z } from "zod";
import { KratosSession } from "./openapi/kratos";
import { kratos } from "./ory.server";
import { sessionStorage } from "./session.server";

export const join = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(" ");

type WithoutIdentity = {
  state: "without-identity";
  message: string;
};
type WithIdentity = {
  state: "with-identity";
  identity: KratosSession;
};

export type LoaderData = {
  csrf: string;
};

export type LoaderGuard = (WithoutIdentity | WithIdentity) & {
  url: URL;
  session: Session;
  csrf: string;
};
export const loaderGuard = async (request: Request): Promise<LoaderGuard> => {
  const cookie = request.headers.get("cookie")!;
  const session = await sessionStorage.getSession(cookie);

  const url = new URL(request.url);

  const me = await kratos["/sessions/whoami"].get({
    headers: { "X-Session-Token": session.get("session_token") },
  });

  let guard: WithoutIdentity | WithIdentity;

  if (me.ok === false) {
    const body = await me.json();

    guard = { state: "without-identity", message: body.error.message };
  } else {
    const body = await me.json();

    guard = { state: "with-identity", identity: body };
  }

  const csrf = createAuthenticityToken(session, "csrf");

  return { url, session, csrf, ...guard };
};

type Input = Record<string, string | undefined>;

type Success = {
  state: "success";
  message: string;
};
type Failure = {
  state: "failure";
  message: string;
};
type NotValid = {
  state: "not-valid";
  messages: Record<string, string>;
};
type Valid<T extends z.ZodType<any, any, any>> = {
  state: "valid";
  data: z.infer<T>;
};

export type ActionData = (Success | Failure | NotValid) & {
  defaultValues: Input;
};

const schemaGuard = <S extends z.ZodType<any, any, any>>(
  schema: S,
  input: Input
): NotValid | Valid<S> => {
  const parsed = schema.safeParse(input);

  if (parsed.success === false) {
    return {
      state: "not-valid",
      messages: parsed.error.issues.reduce((memo, issue) => {
        memo[issue.path.join(".")] = issue.message;
        return memo;
      }, {} as Record<string, string>),
    };
  }

  return { state: "valid", data: parsed.data };
};

export type ActionGuard<S extends z.ZodType<any, any, any>> = (
  | NotValid
  | Valid<S>
) & {
  url: URL;
  session: Session;
  defaultValues: Input;
};
export const actionGuard = async <S extends z.ZodType<any, any, any>>(
  request: Request,
  schema: S
): Promise<ActionGuard<S>> => {
  const cookie = request.headers.get("cookie");
  const formData = await request.formData();
  const session = await sessionStorage.getSession(cookie);
  await verifyAuthenticityToken(formData, session, "csrf");

  const input = Object.fromEntries(formData) as Input;
  const guard = await schemaGuard(schema, input);

  const url = new URL(request.url);

  return { url, session, defaultValues: input, ...guard };
};

export const redirectToLogin = async ({ url, session }: LoaderGuard) => {
  const from = url.searchParams.get("from") || url.href;

  const query = new URLSearchParams();
  query.set("from", from);

  return redirect(`/login?${query}`, {
    status: 303,
    headers: { "set-cookie": await sessionStorage.commitSession(session) },
  });
};
export const redirectToHome = async ({ url, session }: LoaderGuard) => {
  const from = url.searchParams.get("from") || "/";

  return redirect(from, {
    status: 303,
    headers: { "set-cookie": await sessionStorage.commitSession(session) },
  });
};
