import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export type GaiaHeaderPosition = "absolute" | "fixed" | "sticky";

/**
 * Header that is shown on the top of page.
 * @slot collapsible - Content would be collapsed in mobile view and expanded in desktop view.
 * @slot extra - Slot used to put extra stuffs. The width fits the content.
 */
@customElement("gaia-header")
export class GaiaHeaderElement extends LitElement {
  static styles = css`
    :host {
      position: relative;
      width: auto;
      height: fit-content;
      align-items: center;
      top: 0;
      left: 0;
      right: 0;
      padding: 5px;
      background: var(--gaia-background, hsl(0, 0%, 100%));
    }

    :host {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: auto 1fr auto;
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
    }

    #default-menu-toggle-icon {
      padding: 10px;
      border-radius: 10px;
    }

    #default-menu-toggle-icon:hover {
      backdrop-filter: brightness(0.9);
    }

    #default-menu-toggle-icon:active {
      backdrop-filter: brightness(0.8);
    }

    slot {
      display: block;
      position: relative;
      padding: 10px;
    }

    slot:not([name]) {
      grid-column: 1;
    }

    slot[name="collapsible"] {
      grid-column: 2;
    }

    slot[name="extra"] {
      grid-column: 3;
    }

    @media screen and (max-width: 768px) {
      :host {
        grid-template-rows: 1fr fit-content;
        grid-template-columns: fit-content auto auto;
      }

      #menu-toggle-button {
        display: block;
        grid-row: 1;
        grid-column: 1;
      }

      slot:not([name]) {
        grid-row: 1;
        grid-column: 2;
      }

      slot[name="collapsible"] {
        display: grid;
        grid-template-rows: 1fr;
        overflow-y: hidden;
        grid-row: 2;
        grid-column: 1 / span 3;
        transition: grid-template-rows 0.3s;
      }

      :host(:not([expanded])) slot[name="collapsible"] {
        grid-template-rows: 0fr;
        padding-top: 0;
        padding-bottom: 0;
      }

      slot[name="collapsible"]::slotted(*) {
        min-height: 0;
      }

      slot[name="extra"] {
        grid-row: 1;
        grid-column: 3;
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
