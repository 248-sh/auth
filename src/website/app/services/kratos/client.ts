import { createClient } from "fets";
import { Kratos } from "~/openapi/kratos";

export const kratos = createClient<Kratos>({
  endpoint: process.env.KRATOS_PUBLIC_ENDPOINT,
});