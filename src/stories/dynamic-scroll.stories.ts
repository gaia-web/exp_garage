import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/dynamic-scroll";
import "../components/dynamic-scroll-item";
import {
  DYNAMIC_SCROLL_CONTAINER_HEIGHT_CSS_VARIABLE_NAME,
  DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME,
} from "../components/dynamic-scroll";
import { GaiaDynamicScrollStyleFunctionArgs } from "../components/dynamic-scroll-item";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Dynamic Scroll",
  component: "gaia-dynamic-scroll",
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) => html`
    <style>
      gaia-dynamic-scroll {
        height: 100vh;
        width: 100%;
      }

      div {
        position: relative;
      }

      .page {
        height: 100%;
      }
    </style>
    <gaia-dynamic-scroll>
      <div class="page" style="--page-index: 0;">
        <gaia-dynamic-scroll-item
          style="position: absolute; top: calc(100% - 3em);"
          dynamic-style=${`translate: 0 calc(var(${DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME}) * var(${DYNAMIC_SCROLL_CONTAINER_HEIGHT_CSS_VARIABLE_NAME}) * 0.25)`}
        >
          Slower
        </gaia-dynamic-scroll-item>
        <div style="position: absolute; top: calc(100% - 2em);">Normal</div>
        <gaia-dynamic-scroll-item
          style="position: absolute; top: calc(100% - 1em);"
          dynamic-style=${`translate: 0 calc(var(${DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME}) * var(${DYNAMIC_SCROLL_CONTAINER_HEIGHT_CSS_VARIABLE_NAME}) * -0.25)`}
        >
          Quicker
        </gaia-dynamic-scroll-item>
      </div>
      <div class="page" style="--page-index: 1;">
        <!-- This one's dynamic style is set by JavaScript property. -->
        <gaia-dynamic-scroll-item
          style="top: 50%;"
          .dynamicStyle=${({
            scrollRatio,
            itemElement,
          }: GaiaDynamicScrollStyleFunctionArgs) => ({
            opacity:
              scrollRatio +
              1 -
              +getComputedStyle(itemElement).getPropertyValue("--page-index"),
          })}
        >
          Fade-In
        </gaia-dynamic-scroll-item>
      </div>
      <div class="page" style="--page-index: 2;">
        <gaia-dynamic-scroll-item
          style="top: 50%; transform-origin: left;"
          dynamic-style=${`scale: calc((max(calc(var(${DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME}) + 1 - var(--page-index)), 0) + 1) * 2)`}
        >
          Become Larger
        </gaia-dynamic-scroll-item>
      </div>
    </gaia-dynamic-scroll>
  `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
