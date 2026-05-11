import type { StorybookConfig } from "@storybook/vue3-vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import vue from "@vitejs/plugin-vue";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), vue()];
    config.css = {
      ...config.css,
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    };
    return config;
  },
};

export default config;
