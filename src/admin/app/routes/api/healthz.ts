import { LoaderFunction, Response } from "@remix-run/node";

export const loader: LoaderFunction = () => new Response("OK", { status: 200 });
