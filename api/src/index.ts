import "dotenv/config";
import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { nodeConfig } from "./config.js";

const config = nodeConfig();
const app = createApp(config);

serve(
  {
    fetch: app.fetch,
    port: config.port,
  },
  (info) => {
    console.log(`Gitkut API rodando em http://localhost:${info.port}`);
  },
);

