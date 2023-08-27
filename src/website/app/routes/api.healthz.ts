import { Response } from "@remix-run/node";

export const loader = () => new Response("OK", { status: 200 });
