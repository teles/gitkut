import { http, HttpResponse } from "msw";
import { gitkutProfileFixture } from "./fixtures/profile";
import { gitkutReposFixture } from "./fixtures/repos";
import { gitkutUserFixture } from "./fixtures/user";

export const handlers = [
  http.get("*/api/me", () => {
    return HttpResponse.json(gitkutUserFixture);
  }),
  http.get("*/api/repos", () => {
    return HttpResponse.json(gitkutReposFixture);
  }),
  http.get("*/api/profiles/:slug", ({ params }) => {
    if (params.slug !== gitkutProfileFixture.slug) {
      return HttpResponse.json(
        { error: "Public profile was not found." },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      profile: gitkutProfileFixture,
      user: {
        ...gitkutUserFixture,
        name: gitkutProfileFixture.displayName,
        bio: gitkutProfileFixture.gitkutBio,
      },
      repos: gitkutReposFixture,
    });
  }),
  http.post("*/auth/logout", () => {
    return HttpResponse.json({ ok: true });
  }),
];
