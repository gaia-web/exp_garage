import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { MOBILE_BREAKPOINT } from "../utils/breakpoint";

/**
 * A container for nav items. It display nav items horizontally in the desktop mode and vertically in the mobile mode.
 */
@customElement("gaia-nav")
export class GaiaNavElement extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
      display: block;
      position: relative;
      height: fit-content;
      width: fit-content;
      max-width: 100%;
    }

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      :host {
        width: auto;
      }
    }

    nav {
      overflow-y: auto;
    }

    slot {
      display: flex;
      flex-direction: row;

      @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        flex-direction: column;
      }
    }

    ::slotted(*) {
      flex: auto auto auto;
    }
  `;

  render() {
    return html`
      <nav>
        <slot></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-nav": GaiaNavElement;
  }
}
