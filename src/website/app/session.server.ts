import { createCookie, createCookieSessionStorage } from "@remix-run/node";
import { createTypedSessionStorage } from "remix-utils";
import { z } from "zod";

const cookie = createCookie("session", {
  httpOnly: true,
  maxAge: 24 * 60 * 60, // 1 day
  path: "/",
  sameSite: "lax",
  secrets: ["test"],
});
const session = createCookieSessionStorage({ cookie });
const schema = z.object({
  csrf: z.string().uuid().optional(),
  session: z.string().optional(),
});

export const sessionStorage = createTypedSessionStorage({
  sessionStorage: session,
  schema,
});
