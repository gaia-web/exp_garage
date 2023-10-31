import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import {
  GaiaDynamicScrollElement,
  DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME,
} from "./dynamic-scroll";

export type GaiaDynamicScrollDetail = {
  containerElement?: GaiaDynamicScrollElement;
  scrollRatio: number;
  containerHeight: number;
  containerWidth: number;
};

const CONTAINER_ELEMENT_TAG_NAME = "gaia-dynamic-scroll";

/**
 * An item that should be put inside the dynamic scroll container.
 * Its styles can be set accroding to the scroll ratio of the container.
 *
 * @fires containerScroll - Occurs when the container is scrolled.
 */
@customElement("gaia-dynamic-scroll-item")
export class GaiaDynamicScrollItemElement extends LitElement {
  /**
   * @internal
   */
  readonly #staticStyleSheets = [
    css`
      :host {
        display: block;
        position: relative;
        height: fit-content;
        width: fit-content;
      }
    `.styleSheet,
  ].filter(Boolean) as CSSStyleSheet[];

  /**
   * @internal
   */
  readonly #dynamicStyleSheet = new CSSStyleSheet();

  /**
   * @internal
   */
  #containerElement?: GaiaDynamicScrollElement;

  connectedCallback() {
    super.connectedCallback();
    for (
      let walker = this.parentElement;
      walker != null;
      walker = walker.parentElement
    ) {
      if (walker?.tagName === CONTAINER_ELEMENT_TAG_NAME.toUpperCase()) {
        this.#containerElement = walker as GaiaDynamicScrollElement;
        this.#containerElement?.addEventListener(
          "scroll",
          this.#containerScrolledHandler
        );
        break;
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#containerElement?.removeEventListener(
      "scroll",
      this.#containerScrolledHandler
    );
  }

  firstUpdated() {
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.#staticStyleSheets,
        this.#dynamicStyleSheet,
      ];
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * @internal
   */
  #containerScrolledHandler = () => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const itemElement = this;
    this.dispatchEvent(
      new CustomEvent("containerScroll", {
        detail: {
          containerElement: itemElement.#containerElement,
          get scrollRatio() {
            return +getComputedStyle(itemElement).getPropertyValue(
              DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME
            );
          },
          get containerHeight() {
            return itemElement.#containerElement?.clientHeight ?? Number.NaN;
          },
          get containerWidth() {
            return itemElement.#containerElement?.clientWidth ?? Number.NaN;
          },
        } as GaiaDynamicScrollDetail,
      })
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-dynamic-scroll-item": GaiaDynamicScrollItemElement;
  }
}
