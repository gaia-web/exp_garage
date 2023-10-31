import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/dynamic-scroll";
import "../components/dynamic-scroll-item";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Dynamic Scroll",
  component: "gaia-dynamic-scroll",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) =>
    html`Check <b>Dynamic scroll item</b> component for stories.`,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
