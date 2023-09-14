import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/card";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Card",
  component: "gaia-card",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) => html`
    <style>
      gaia-card::part(header) {
        background: hsl(0, 0%, 96%);
        font-weight: bold;
      }

      gaia-card::part(footer) {
        color: hsl(0, 0%, 30%);
      }
    </style>
    <gaia-card>
      <div slot="header">Header</div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Tempus urna et
        pharetra pharetra massa massa ultricies mi quis. Ac feugiat sed lectus
        vestibulum mattis. Sit amet volutpat consequat mauris. In vitae turpis
        massa sed elementum tempus egestas. Volutpat sed cras ornare arcu dui
        vivamus. Justo donec enim diam vulputate ut pharetra sit amet. Eu
        scelerisque felis imperdiet proin. Aliquet sagittis id consectetur
        purus. Consequat id porta nibh venenatis. Sit amet justo donec enim
        diam.
      </div>
      <div slot="footer">Footer</div>
    </gaia-card>
  `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
