import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * A collapsible container that can hide or show the content by clicking the header.
 * @slot header - The header.
 * @csspart header - The header container.
 * @csspart content - The main container.
 */
@customElement("gaia-collapse")
export class GaiaCollapseElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      border-radius: 10px;
      box-shadow: 1px 1px 2px 0 hsl(0, 0%, 0%, 0.5);
      overflow: hidden;
    }

    #main-container {
      display: grid;
      position: relative;
      height: 100%;
      width: 100%;
      grid-template-rows: auto 0fr;
      transition: grid-template-rows 0.3s;
    }

    :host([expanded]) #main-container {
      grid-template-rows: auto 1fr;
    }

    slot {
      display: block;
      position: relative;
      padding: 10px;
    }

    [part~="header"] {
      cursor: pointer;
    }

    [part~="header"]:hover {
      filter: brightness(0.9);
    }

    [part~="header"]:active {
      filter: brightness(0.8);
    }

    #content-wrapper {
      min-height: 0;
      overflow: hidden;
    }
  `;

  /**
   * Whether the collapse is expanded.
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  render() {
    return html`
      <div id="main-container">
        <slot
          name="header"
          part="header"
          @click=${() => (this.expanded = !this.expanded)}
        ></slot>
        <div id="content-wrapper">
          <slot part="content"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-collapse": GaiaCollapseElement;
  }
}
