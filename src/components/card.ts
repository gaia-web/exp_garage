import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * A container card.
 * @slot header - The slot stick to the top.
 * @slot footer - The slot stick to the bottom.
 * @csspart header - The container stick to the top.
 * @csspart content - The main container.
 * @csspart footer - The container stick to the bottom.
 */
@customElement("gaia-card")
export class GaiaCardElement extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      position: relative;
      border-radius: 10px;
      box-shadow: 1px 1px 2px 0 hsl(0, 0%, 0%, 0.5);
      overflow: hidden;
    }

    slot {
      display: block;
      position: relative;
      width: 100%;
      padding: 10px;

      &[name="header"] {
        position: sticky;
        top: 0;
      }
      
      &[name="footer"] {
        position: sticky;
        bottom: 0;
      }
    }
  `;

  render() {
    return html`
      <slot name="header" part="header"></slot>
      <slot part="content"></slot>
      <slot name="footer" part="footer"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-card": GaiaCardElement;
  }
}
