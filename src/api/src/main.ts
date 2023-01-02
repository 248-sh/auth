import * as dotenv from "dotenv";
import { createYoga } from "graphql-yoga";
import { createServer } from "http";

dotenv.config();

import { createContext } from "./context";
import { schema } from "./schema";

const yoga = createYoga({ context: createContext, schema });
const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
