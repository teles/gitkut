import { http, HttpResponse } from "msw";
import { gitkutReposFixture } from "./fixtures/repos";
import { gitkutUserFixture } from "./fixtures/user";

export const handlers = [
  http.get("*/api/me", () => {
    return HttpResponse.json(gitkutUserFixture);
  }),
  http.get("*/api/repos", () => {
    return HttpResponse.json(gitkutReposFixture);
  }),
  http.post("*/auth/logout", () => {
    return HttpResponse.json({ ok: true });
  }),
];
