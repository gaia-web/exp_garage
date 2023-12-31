import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/nav";
import "../components/nav-item";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Nav Item",
  component: "gaia-nav-item",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) =>
    html`
      <gaia-nav-item href="javascript:alert('You clicked a link.')"
        >Nav Item</gaia-nav-item
      >
    `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};

export const Nested: StoryObj<MyArgs> = {
  name: "Nested",
  args: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) => html`
    <gaia-nav-item>
      Nested Nav Item
      <gaia-nav-item
        href="javascript:alert('You clicked a link.')"
        slot="nested"
        >One</gaia-nav-item
      >
      <gaia-nav-item
        href="javascript:alert('You clicked a link.')"
        slot="nested"
        >Two</gaia-nav-item
      >
      <gaia-nav-item
        href="javascript:alert('You clicked a link.')"
        slot="nested"
        >Three</gaia-nav-item
      >
      <gaia-nav-item
        href="javascript:alert('You clicked a link.')"
        slot="nested"
      >
        This is a very very very very very very very very very very very long
        one
      </gaia-nav-item>
    </gaia-nav-item>
  `,
};
