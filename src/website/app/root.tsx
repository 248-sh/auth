import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";

import { ErrorBoundary as ErrorBoundaryModule } from "~/ErrorBoundary";

export const ErrorBoundary = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <Meta />
      <Links />
    </head>
    <body className="min-h-screen flex flex-col items-stretch justify-between gap-10 bg-white px-6 lg:px-8 py-24 sm:py-32">
      <ErrorBoundaryModule />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const App = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="min-h-screen flex flex-col items-stretch justify-between gap-10 bg-white px-6 lg:px-8 py-24 sm:py-32">
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export default App;
