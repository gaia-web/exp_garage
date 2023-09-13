import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * A container that conditionally renders content based on the case.
 * If a child item has `slot` attribute matching the `case` attribute of the switch element, the child would be rendered.
 */
@customElement("gaia-switch")
export class GaiaSwitchElement extends LitElement {
  static styles = css``;

  /**
   * The case to be switched to.
   */
  @property({ reflect: true })
  case = "";

  render() {
    return html` <slot name=${ifDefined(this.case)}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-switch": GaiaSwitchElement;
  }
}
