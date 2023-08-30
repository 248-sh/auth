import { createCookie, createCookieSessionStorage } from "@remix-run/node";

const cookie = createCookie("session", {
  httpOnly: true,
  maxAge: 24 * 60 * 60, // 1 day
  path: "/",
  sameSite: "lax",
  secrets: [process.env.COOKIE_SECRET!],
});

export const sessionStorage = createCookieSessionStorage({ cookie });
