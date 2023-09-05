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
      display: block;
      position: relative;
      height: fit-content;
      width: fit-content
    }

    slot {
      display: flex;
      flex-direction: row;
      gap: 5px;
    }

    ::slotted(*) {
      flex: auto auto auto;
    }

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      slot {
        flex-direction: column;
      }
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
