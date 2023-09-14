import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/collapse";

type MyArgs = {
  expanded: boolean;
};

export default {
  title: "Components/Collapse",
  component: "gaia-collapse",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  render: (args) =>
    html`
      <style>
        gaia-collapse::part(header) {
          background: hsl(0, 0%, 96%);
          font-weight: bold;
        }
      </style>
      <gaia-collapse ?expanded=${args.expanded}>
        <div slot="header">Header</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus
          urna et pharetra pharetra massa massa ultricies mi quis. Ac feugiat
          sed lectus vestibulum mattis. Sit amet volutpat consequat mauris. In
          vitae turpis massa sed elementum tempus egestas. Volutpat sed cras
          ornare arcu dui vivamus. Justo donec enim diam vulputate ut pharetra
          sit amet. Eu scelerisque felis imperdiet proin. Aliquet sagittis id
          consectetur purus. Consequat id porta nibh venenatis. Sit amet justo
          donec enim diam.
        </div>
      </gaia-collapse>
    `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {
    expanded: false,
  },
};
