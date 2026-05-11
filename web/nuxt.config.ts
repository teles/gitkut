export default defineNuxtConfig({
  ssr: false,
  srcDir: "src/",
  compatibilityDate: "2026-05-10",
  devtools: {
    enabled: false,
  },
  experimental: {
    viteEnvironmentApi: process.env.NODE_ENV !== "production",
  },
  css: ["~/style.css"],
  runtimeConfig: {
    public: {
      apiUrl:
        process.env.NUXT_PUBLIC_API_URL ??
        process.env.VITE_API_URL ??
        "http://localhost:8787",
      useMsw:
        process.env.NUXT_PUBLIC_USE_MSW ??
        process.env.VITE_USE_MSW ??
        "false",
    },
  },
  nitro: {
    preset:
      process.env.NITRO_PRESET ??
      (process.env.NODE_ENV === "production"
        ? "cloudflare_pages"
        : "node-server"),
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Gitkut",
      meta: [
        {
          name: "description",
          content:
            "A retro social profile for developers, powered by public GitHub data.",
        },
      ],
    },
  },
  typescript: {
    strict: true,
  },
});
