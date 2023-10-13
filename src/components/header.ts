import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MOBILE_BREAKPOINT } from "../utils/breakpoint";

export type GaiaHeaderPosition = "absolute" | "fixed" | "sticky";

/**
 * Header that is shown on the top of page.
 * @slot menu-toggle-icon - The icon menu toggle button in the mobile view.
 * @slot collapsible - Content would be collapsed in the mobile view and expanded in the desktop view.
 * @slot extra - Slot used to put extra stuffs. The width fits the content.
 */
@customElement("gaia-header")
export class GaiaHeaderElement extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
      display: grid;
      position: relative;
      width: auto;
      height: fit-content;
      align-items: center;
      top: 0;
      left: 0;
      right: 0;
      padding: 5px;
      background: var(--gaia-background, hsl(0, 0%, 100%));
      z-index: 1;
      grid-template-rows: 1fr;
      grid-template-columns: minmax(0px, auto) minmax(0px, 1fr) minmax(0px, auto);
      overflow: hidden;

      @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        grid-template-rows: 1fr fit-content;
        grid-template-columns: fit-content auto auto;
      }
    }

    :host([sticky]) {
      position: sticky;
    }

    #menu-toggle {
      display: none;
    }

    #menu-toggle-button {
      display: none;
      cursor: pointer;
      user-select: none;

      @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        display: block;
        grid-row: 1;
        grid-column: 1;
      }
    }

    #default-menu-toggle-icon {
      padding: 10px;
      border-radius: 10px;

      &:hover {
        backdrop-filter: brightness(0.9);
      }

      &:active {
        backdrop-filter: brightness(0.8);
      }
    }

    slot {
      display: block;
      position: relative;
      padding: 10px;

      &:not([name]) {
        grid-column: 1;

        @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
          grid-row: 1;
          grid-column: 2;
        }
      }

      &[name="collapsible"] {
        grid-column: 2;

        @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
          display: grid;
          grid-template-rows: 1fr;
          overflow-y: hidden;
          grid-row: 2;
          grid-column: 1 / span 3;
          transition: grid-template-rows 0.3s;

          &::slotted(*) {
            min-height: 0;
          }

          :host(:not([expanded])) & {
            grid-template-rows: 0fr;
            padding-top: 0;
            padding-bottom: 0;
          }
        }
      }

      &[name="extra"] {
        grid-column: 3;

        @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
          grid-row: 1;
          grid-column: 3;
        }
      }
    }
  `;

  /**
   * Whether the header sticky to the top.
   */
  @property({ type: Boolean, reflect: true })
  sticky = false;

  /**
   * Whether the header is collapsed in the mobile view.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  render() {
    return html`
      <input
        id="menu-toggle"
        type="checkbox"
        @change=${({ currentTarget }: Event) =>
          (this.expanded = (currentTarget as HTMLInputElement).checked)}
      />
      <label id="menu-toggle-button" for="menu-toggle">
        <slot name="menu-toggle-icon"
          ><div id="default-menu-toggle-icon">☰</div></slot
        >
      </label>
      <slot></slot>
      <slot name="collapsible"></slot>
      <slot name="extra"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-header": GaiaHeaderElement;
  }
}
