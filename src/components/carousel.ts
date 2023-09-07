import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * The carousel presents slides for different contents.
 */
@customElement("gaia-carousel")
export class GaiaCarouselElement extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
      display: block;
      position: relative;
      height: 500px;
      width: auto;
      overflow: hidden;
      border-radius: 10px;
    }

    #slider {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      max-height: 100%;
      transition: transform 0.5s ease;
    }

    ::slotted(*) {
      flex: 1;
      min-width: 0;
    }

    #button-container > button {
      display: flex;
      position: absolute;
      padding: 0.5em;
      top: 50%;
      transform: translateY(-50%);
      background: hsl(0, 0%, 100%, 0.5);
      border: none;
      border-radius: 10px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    #button-container > button:hover {
      filter: contrast(0.7);
    }

    #button-container > button:active {
      filter: contrast(0.5);
    }

    #button-container > button.left {
      left: 10px;
    }

    #button-container > button.right {
      right: 10px;
    }

    #indicator-container {
      display: flex;
      position: absolute;
      padding: 2px;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: fit-content;
      background: hsl(0, 0%, 50%, 0.5);
      border-radius: 10px;
    }

    #indicator-container > .indicator {
      --size: 10px;

      flex: 1;
      height: var(--size);
      width: var(--size);
      margin: 3px;
      background: hsl(0, 0%, 100%);
      border-radius: 100%;
      cursor: pointer;
    }
  `;

  /**
   * @internal
   */
  #refreshTimeoutId?: NodeJS.Timeout;

  /**
   * The displayed slide index, which starts from 0.
   */
  @property({ attribute: "current-index", type: Number, reflect: true })
  currentIndex = 0;

  /**
   * The timeout of automatically played slides.
   */
  @property({ type: Number, reflect: true })
  timeout = 5;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("currentIndex")) {
      this.#resetRefreshTimeout();
      this.#updateSlider();
    } else if (changedProperties.has("timeout")) {
      this.#resetRefreshTimeout();
    }
  }

  render() {
    return html`
      <slot
        id="slider"
        style="width: ${(this.childElementCount ?? 1) * 100}%;"
      ></slot>
      <div id="button-container">
        <button class="left" @click="${this.#goToPrevious}">
          ${this.#renderSVGArrow({ direction: "left" })}
        </button>
        <button class="right" @click="${this.#goToNext}">
          ${this.#renderSVGArrow({ direction: "right" })}
        </button>
      </div>
      <div id="indicator-container">
        ${new Array(this.childElementCount ?? 0)
          ?.fill(0)
          ?.map(
            (_, i) =>
              html`<div
                class="indicator"
                style=${i === this.currentIndex ? "opacity: 1" : "opacity: 0.5"}
                @click=${() => (this.currentIndex = i)}
              ></div>`
          )}
      </div>
    `;
  }

  #renderSVGArrow(options?: { fill?: string; direction?: "left" | "right" }) {
    return html`<svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      transform=${options?.direction === "right" ? "rotate(180)" : ""}
    >
      <path
        d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
        fill=${options?.fill ?? "hsl(0, 0%, 0%)"}
      />
    </svg>`;
  }

  #goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.childElementCount - 1;
    }
  }

  #goToNext() {
    if (this.currentIndex < this.childElementCount - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  #updateSlider() {
    const slider = this.shadowRoot?.querySelector("#slider") as HTMLDivElement;
    slider.style.transform = `translateX(-${
      this.currentIndex * (100 / this.childElementCount ?? 1)
    }%)`;
  }

  #resetRefreshTimeout() {
    clearTimeout(this.#refreshTimeoutId);
    if (this.timeout > 0) {
      this.#refreshTimeoutId = setTimeout(
        () => this.#goToNext(),
        this.timeout * 1000
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-carousel": GaiaCarouselElement;
  }
}
