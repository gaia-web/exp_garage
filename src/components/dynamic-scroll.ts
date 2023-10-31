import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

export const DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME =
  "--gaia-dynamic-scroll-scroll-ratio";
export const DYNAMIC_SCROLL_VIEW_SCROLL_RATIO_CSS_VARIABLE_NAME =
  "--gaia-dynamic-scroll-view-scroll-ratio";
export const DYNAMIC_SCROLL_CONTAINER_HEIGHT_CSS_VARIABLE_NAME =
  "--gaia-dynamic-scroll-container-height";
export const DYNAMIC_SCROLL_CONTAINER_WIDTH_CSS_VARIABLE_NAME =
  "--gaia-dynamic-scroll-container-width";

/**
 * A container where its content can be styled freely accroding to its scroll ratio.
 * @cssproperty --gaia-dynamic-scroll-scroll-ratio - The scroll ratio of container. It should be **READ ONLY**.
 * @cssproperty --gaia-dynamic-scroll-view-scroll-ratio - The scroll ratio of container in the aspect of current view. It should be **READ ONLY**.
 * @cssproperty --gaia-dynamic-scroll-container-height - The height of container. It should be **READ ONLY**.
 * @cssproperty --gaia-dynamic-scroll-container-width - The width of container. It should be **READ ONLY**.
 */
@customElement("gaia-dynamic-scroll")
export class GaiaDynamicScrollElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      height: 100%;
      width: 100%;
      overflow-y: auto;
    }
  `;

  /**
   * @internal
   */
  #resizeObserver?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("scroll", this.#scrolledHandler);
    this.#setCanvasSizeWhenResized();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("scroll", this.#scrolledHandler);
    this.#resizeObserver?.disconnect();
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * @internal
   */
  #scrolledHandler = () => {
    const scrollRatio =
      this.scrollTop / (this.scrollHeight - this.clientHeight);
    this.style.setProperty(
      DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME,
      scrollRatio.toString()
    );
    const viewScrollRatio = this.scrollTop / this.clientHeight;
    this.style.setProperty(
      DYNAMIC_SCROLL_VIEW_SCROLL_RATIO_CSS_VARIABLE_NAME,
      viewScrollRatio.toString()
    );
  };

  #setCanvasSizeWhenResized() {
    this.#resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this) {
          this.#updateCanvasSize();
        }
      }
    });
    this.#resizeObserver?.observe(this);
  }

  #updateCanvasSize() {
    const height = this.clientHeight;
    this.style.setProperty(
      DYNAMIC_SCROLL_CONTAINER_HEIGHT_CSS_VARIABLE_NAME,
      `${height}px`
    );
    const width = this.clientWidth;
    this.style.setProperty(
      DYNAMIC_SCROLL_CONTAINER_WIDTH_CSS_VARIABLE_NAME,
      `${width}px`
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-dynamic-scroll": GaiaDynamicScrollElement;
  }
}
