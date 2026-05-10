import { createApp } from "./app.js";
import { configFromRecord, type WorkerBindings } from "./config.js";

export default {
  fetch(request: Request, env: WorkerBindings, context: ExecutionContext) {
    const config = configFromRecord(env);
    const app = createApp(config);

    return app.fetch(request, env, context);
  },
};

