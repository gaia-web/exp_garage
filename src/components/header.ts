import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export type GaiaHeaderPosition = "absolute" | "fixed" | "sticky";

/**
 * Header that is shown on the top of page.
 * @slot start - At the start of the display flow. The width fits the content.
 * @slot end - At the end of the display flow. The width fits the content.
 */
@customElement("gaia-header")
export class GaiaHeaderElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      position: sticky;
      width: auto;
      height: fit-content;
      left: 0;
      right: 0;
      padding: 10px;
      gap: 10px 10px;
    }

    :host([sticky]) {
      top: 0;
    }

    slot {
      display: block;
      position: relative;
    }

    slot[name="start"] {
      flex: 0;
    }

    slot:not([name]) {
      flex: auto;
    }
  `;

  /**
   * Whether the header sticky to the top.
   */
  @property({ type: Boolean, reflect: true })
  sticky = true;

  render() {
    return html`
      <slot name="start"></slot>
      <slot></slot>
      <slot name="end"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-header": GaiaHeaderElement;
  }
}
