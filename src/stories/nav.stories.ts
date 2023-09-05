import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/nav";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Nav",
  component: "gaia-nav",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) => html`
    <gaia-nav>
      ${["One", "Two", "Three", "Four", "Five"].map(
        (label) => html`<a href="#">${label}</a>`
      )}
    </gaia-nav>
  `,
} satisfies Meta<MyArgs>;

export const Demo: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
