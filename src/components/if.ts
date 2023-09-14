import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * A container that renders content based on the condition.
 * If a child item has `slot` attribute matching the `condition` attribute of the if element, the child would be rendered.
 */
@customElement("gaia-if")
export class GaiaIfElement extends LitElement {
  static styles = css``;

  /**
   * The condition that determines which child element will be rendered.
   */
  @property({ reflect: true })
  condition = "";

  render() {
    return html` <slot name=${ifDefined(this.condition)}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-if": GaiaIfElement;
  }
}
