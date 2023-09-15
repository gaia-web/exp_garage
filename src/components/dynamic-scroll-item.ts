import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  GaiaDynamicScrollElement,
  DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME,
} from "./dynamic-scroll";

export type GaiaDynamicScrollStyleFunctionArgs = {
  containerElement?: GaiaDynamicScrollElement;
  itemElement: GaiaDynamicScrollItemElement;
  scrollRatio: number;
  containerHeight: number;
  containerWidth: number;
};
export type GaiaDynamicScrollStyleFunction = (
  args: GaiaDynamicScrollStyleFunctionArgs
) => Record<string, string>;
export type GaiaDynamicScrollCSSStringOrStyleFunction =
  | string
  | GaiaDynamicScrollStyleFunction;

const CONTAINER_ELEMENT_TAG_NAME = "gaia-dynamic-scroll";

/**
 * An item that should be put inside the dynamic scroll container.
 * Its styles can be set accroding to the scroll ratio of the container.
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

  /**
   * @internal
   */
  #dynamicStyle: GaiaDynamicScrollCSSStringOrStyleFunction = "";
  /**
   * The dynamic style.
   * It can be a CSS string, where `calc()` function and CSS variables from the container element can be used.
   * It can also be a function, which should return a style object.
   */
  get dynamicStyle(): GaiaDynamicScrollCSSStringOrStyleFunction {
    return this.#dynamicStyle;
  }
  @property({ attribute: "dynamic-style" }) set dynamicStyle(
    value: GaiaDynamicScrollCSSStringOrStyleFunction
  ) {
    if (typeof value === "string" && value === this.#dynamicStyle) {
      return;
    }
    this.#dynamicStyle = value;
    this.#updateStyle();
  }

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
        this.#updateStyle();
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
    this.#updateStyle();
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * @internal
   */
  #containerScrolledHandler = () => {
    this.#updateStyle();
  };

  #updateStyle() {
    if (!this.shadowRoot) {
      return;
    }
    let styleCSSString = "";
    switch (typeof this.dynamicStyle) {
      case "string": {
        styleCSSString = this.dynamicStyle;
        break;
      }
      case "function": {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const itemElement = this;
        styleCSSString = Object.entries(
          this.dynamicStyle({
            containerElement: this.#containerElement,
            itemElement,
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
          }) ?? {}
        )
          .map(([key, value]) => `${this.#camelToKebab(key)}: ${value};`)
          .join("\n");
        break;
      }
    }
    this.#dynamicStyleSheet.replaceSync(/* css */ `
      :host {
        ${styleCSSString}
      }
    `);
  }

  #camelToKebab(text: string) {
    return text.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-dynamic-scroll-item": GaiaDynamicScrollItemElement;
  }
}
