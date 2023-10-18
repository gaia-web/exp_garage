import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import "../components/nav";
import "../components/nav-item";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Nav",
  component: "gaia-nav",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) => html`
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
              label.startsWith("Nested")
                ? undefined
                : "javascript:alert('You clicked a link.')"
            )}
            >${label}${label.startsWith("Nested")
              ? [
                  "One",
                  "Two",
                  "Three",
                  "This is a very very very very very very very very very very very long one",
                ].map(
                  (label) =>
                    html`<gaia-nav-item
                      href="javascript:alert('You clicked a link.')"
                      slot="nested"
                      >${label}</gaia-nav-item
                    >`
                )
              : ""}</gaia-nav-item
          >`
      )}
    </gaia-nav>
  `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
