import { Session } from "@remix-run/node";
import { redirect } from "remix-typedjson";
import { createAuthenticityToken, verifyAuthenticityToken } from "remix-utils";
import { z } from "zod";
import {
  toSession,
  WithIdentity,
  WithoutIdentity,
} from "./services/kratos/toSession";
import { sessionStorage } from "./session.server";

export const join = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(" ");

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

  const me = await toSession({
    headers: { "X-Session-Token": session.get("session_token") },
  });

  const csrf = createAuthenticityToken(session, "csrf");

  return { url, session, csrf, ...me };
};

type Input = Record<string, string | undefined>;

type Success = {
  type: "success";
  message: string;
};
type Failure = {
  type: "failure";
  message: string;
};
type Info = {
  type: "info";
  message: string;
};
type NotValid = {
  type: "not-valid";
  messages: Record<string, string>;
};
type Valid<T extends z.ZodType<any, any, any>> = {
  type: "valid";
  data: z.infer<T>;
};

export type ActionData = (Success | Failure | Info | NotValid) & {
  defaultValues: Input;
};

const schemaGuard = <S extends z.ZodType<any, any, any>>(
  schema: S,
  input: Input
): NotValid | Valid<S> => {
  const parsed = schema.safeParse(input);

  if (parsed.success === false) {
    return {
      type: "not-valid",
      messages: parsed.error.issues.reduce((memo, issue) => {
        memo[issue.path.join(".")] = issue.message;
        return memo;
      }, {} as Record<string, string>),
    };
  }

  return { type: "valid", data: parsed.data };
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
export const redirectToHome = async ({
  url,
  session,
}: {
  url: URL;
  session: Session;
}) => {
  const from = url.searchParams.get("from") || "/";

  return redirect(from, {
    status: 303,
    headers: { "set-cookie": await sessionStorage.commitSession(session) },
  });
};
