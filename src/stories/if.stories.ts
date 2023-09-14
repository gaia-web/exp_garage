import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import "../components/if";

type MyArgs = {
  condition?: string;
};

export default {
  title: "Components/If",
  component: "gaia-if",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    condition: { control: "select", options: ["", "chinese", "morse"] },
  },
  render: (args) =>
    html`
      <gaia-if condition=${ifDefined(args.condition)}>
        <div>Harry Potter</div>
        <div slot="chinese">哈利波特</div>
        <div slot="morse">.... .- .-. .-. -.-- / .--. --- - - . .-.</div>
      </gaia-if>
    `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
