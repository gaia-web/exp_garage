import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import "../components/carousel";

type MyArgs = {
  currentIndex?: number;
  timeout?: number;
};

export default {
  title: "Components/Carousel",
  component: "gaia-carousel",
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
  argTypes: {
    currentIndex: { control: "number" },
    timeout: { control: "number" },
  },
  render: (args) => html`
    <gaia-carousel
      timeout=${ifDefined(args.timeout)}
      current-index=${ifDefined(args.currentIndex)}
      style="height: 100vh;"
    >
      <img
        src="https://picsum.photos/id/1/800/600"
        alt="Image 1"
        style="object-fit: contain"
      />
      <img
        src="https://picsum.photos/id/2/800/600"
        alt="Image 2"
        style="object-fit: contain"
      />
      <img
        src="https://picsum.photos/id/3/800/600"
        alt="Image 3"
        style="object-fit: contain"
      />
      <div style="background: beige; height: 100%">
        <h1>Something else</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut aperiam
          ut minima. Magni itaque alias, harum natus molestias blanditiis sint
          fugiat deserunt doloribus repellat nam ea est dignissimos amet ipsa.
        </p>
      </div>
    </gaia-carousel>
  `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  name: "Default",
  args: {
    timeout: 5,
  },
};
