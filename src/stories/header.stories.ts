import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../../src/components/header";

type MyArgs = {
  sticky: boolean;
};

export default {
  title: "Components/Header",
  component: "gaia-header",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        height: 500,
      },
    },
  },
  argTypes: {},
  render: (args) => html`
    <gaia-header ?sticky=${args.sticky} style="background: azure;">
      <div slot="start">Start</div>
      <div>Noarmal</div>
      <div slot="end">End</div>
    </gaia-header>
    <main>
      ${new Array(20)
        .fill(1)
        .map(
          () => html`<p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>`
        )}
    </main>
  `,
} satisfies Meta<MyArgs>;

export const Demo: StoryObj<MyArgs> = {
  name: "Default",
  args: {
    sticky: false,
  },
};
