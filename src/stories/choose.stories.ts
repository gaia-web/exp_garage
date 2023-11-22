import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import "../components/choose";

type MyArgs = {
  case?: string;
};

export default {
  title: "Components/Choose",
  component: "gaia-choose",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    case: { control: "select", options: ["", "chinese", "morse"] },
  },
  render: (args) =>
    html`
      <gaia-choose case=${ifDefined(args.case)}>
        <div>Harry Potter</div>
        <div slot="chinese">哈利波特</div>
        <div slot="morse">.... .- .-. .-. -.-- / .--. --- - - . .-.</div>
      </gaia-choose>
    `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
