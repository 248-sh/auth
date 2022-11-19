import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import styles from "./generated.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "id.248.sh | admin",
  viewport: "width=device-width,initial-scale=1",
});

export const CatchBoundary = () => {
  const caught = useCatch();

  console.log("CatchBoundary caught", caught);

  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="mx-auto max-w-max">
            <main className="sm:flex">
              <p className="text-4xl font-bold tracking-tight text-orange-600 sm:text-5xl">
                {caught.status}
              </p>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-slate-200 sm:pl-6">
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    {caught.statusText}
                  </h1>
                  <p className="mt-1 text-base text-slate-500">
                    Please check the URL in the address bar and try again.
                  </p>
                </div>
                <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Go back home
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Contact support
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
};

export default () => {
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
