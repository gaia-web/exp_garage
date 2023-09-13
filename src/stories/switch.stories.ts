import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import "../components/switch";

type MyArgs = {
  case?: string;
};

export default {
  title: "Components/Switch",
  component: "gaia-switch",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    case: { control: "select", options: ["", "chinese", "morse"] },
  },
  render: (args) =>
    html`
      <gaia-switch case=${ifDefined(args.case)}>
        <div>Harry Potter</div>
        <div slot="chinese">哈利波特</div>
        <div slot="morse">.... .- .-. .-. -.-- / .--. --- - - . .-.</div>
      </gaia-switch>
    `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
