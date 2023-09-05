import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import "../../src/components/header";
import "../../src/components/nav";
import "../../src/components/nav-item";

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
          ${[
            "Normal 1",
            "Normal 2",
            "Nested",
            "Normal 3",
            "Normal 4",
            "Normal 5",
          ].map(
            (label) =>
              html`<gaia-nav-item
                href=${ifDefined(
                  label.startsWith("Nested") ? undefined : "https://bing.com"
                )}
                target="_blank"
                >${label}${label.startsWith("Nested")
                  ? ["One", "Two", "Three"].map(
                      (label) =>
                        html`<gaia-nav-item
                          href="https://bing.com"
                          target="_blank"
                          slot="nested"
                          >${label}</gaia-nav-item
                        >`
                    )
                  : ""}</gaia-nav-item
              >`
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

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {
    sticky: false,
    expanded: false,
  },
};
