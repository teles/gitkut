import type { ExecutionContext } from "hono";
import { createApp } from "./app.js";
import { configFromRecord } from "./config.js";

type WorkerEnv = {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GITHUB_REDIRECT_URI?: string;
  WEB_ORIGIN?: string;
  PORT?: string;
  COOKIE_SECURE?: string;
};

export default {
  fetch(request: Request, env: WorkerEnv, context?: ExecutionContext) {
    const config = configFromRecord(env);
    const app = createApp(config);

    return app.fetch(request, env, context);
  },
};
