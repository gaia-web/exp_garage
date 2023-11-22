import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * A container that renders content based on the condition.
 * If a child item has `slot` attribute matching the `case` attribute of the `choose` element, the child would be rendered.
 */
@customElement("gaia-choose")
export class GaiaChooseElement extends LitElement {
  static styles = css``;

  /**
   * The case that determines which child element will be rendered.
   */
  @property({ reflect: true })
  case = "";

  render() {
    return html` <slot name=${ifDefined(this.case)}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-choose": GaiaChooseElement;
  }
}
