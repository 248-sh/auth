import { isRouteErrorResponse, Link, useRouteError } from "@remix-run/react";
import { FC } from "react";
import { Div } from "./layout/Div";
import { Page } from "./layout/Page";
import { Pre } from "./layout/Pre";

const ErrorMessage: FC<{
  status: number;
  statusText: string;
  message: string;
  stack?: string;
}> = ({ status, statusText, message, stack }) => (
  <>
    <Div>
      {status && (
        <p className="text-center text-base font-semibold text-orange-600">
          {status}
        </p>
      )}
      {statusText && (
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {statusText}
        </h1>
      )}
    </Div>
    {stack ? <Pre>{stack}</Pre> : message && <Pre>{message}</Pre>}
    <div className="flex items-center justify-center gap-x-6 text-center">
      <Link
        to="/"
        className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
      >
        Go back home
      </Link>
      <Link
        to="mailto:hi@bitshare.sh"
        className="rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-500 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
      >
        Contact support <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  </>
);

export const ErrorBoundary = () => {
  const error = useRouteError();
  // const error = new Error("boo");

  console.log("ErrorBoundary error", error);

  if (isRouteErrorResponse(error)) {
    return (
      <Page>
        <ErrorMessage
          status={error.status}
          statusText={error.statusText}
          message={error.data.message || error.data}
        />
      </Page>
    );
  }
  if (error instanceof Error) {
    return (
      <Page>
        <ErrorMessage
          status={500}
          statusText="Oops"
          message={error.message}
          stack={error.stack}
        />
      </Page>
    );
  }

  return (
    <Page>
      <ErrorMessage status={500} statusText="Oops" message={error as string} />
    </Page>
  );
};
