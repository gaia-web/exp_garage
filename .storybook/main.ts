import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-mdx-gfm"
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  viteFinal(config) {
    config.base = "./";
    return config;
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
