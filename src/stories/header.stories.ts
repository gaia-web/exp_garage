import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../../src/components/header";
import "../../src/components/nav";

type MyArgs = {
  sticky: boolean;
  expanded: boolean;
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
    <style>
      :root {
        background: hsl(0, 0%, 96%);
      }
    </style>
    <gaia-header ?sticky=${args.sticky} ?expanded=${args.expanded}>
      <div><b style="font-size: 2rem">Logo</b></div>
      <div slot="collapsible">
        <gaia-nav>
          ${["One", "Two", "Three", "Four", "Five"].map(
            (label) => html`<a href="#">${label}</a>`
          )}
        </gaia-nav>
      </div>
      <div slot="extra">Extras</div>
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
    expanded: false,
  },
};
