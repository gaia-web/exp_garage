import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { MOBILE_BREAKPOINT } from "../utils/breakpoint";

/**
 * Nav item that can be put into nav.
 * @slot nested - Nested nav items goes into here.
 */
@customElement("gaia-nav-item")
export class GaiaNavItemElement extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
      display: block;
      position: relative;
      height: 100%;
      width: 100%;
    }

    #helper-anchor {
      all: unset;
      display: block;
      position: relative;
      min-width: max-content;
      width: auto;
      cursor: pointer;
      border-radius: 10px;
      padding: 10px;

      &:hover {
        backdrop-filter: brightness(0.9);
      }

      &:active {
        backdrop-filter: brightness(0.8);
      }
    }

    slot {
      &:not([name]) {
        user-select: none;
      }

      &[name="nested"] {
        margin: 5px;
        width: fit-content;
        border: none;
        border-radius: 10px;
        box-shadow: 5px 10px 20px -5px hsl(0, 0%, 0%, 0.5);
        top: var(--popover-top);
        left: var(--popover-left);

        @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
          width: auto;
          left: 0;
        }
      }
    }
  `;

  /**
   * @internal
   */
  #popoverRef: Ref<HTMLSlotElement> = createRef();

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   */
  @property({ reflect: true })
  href?: string;

  /**
   * Specifies where to display the linked URL.
   */
  @property({ reflect: true })
  target?: string;

  render() {
    return html`
      <a
        id="helper-anchor"
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        @click=${({ currentTarget }: Event) => {
          if (!this.querySelector('[slot="nested"]')) {
            return;
          }
          const popoverElement = this.#popoverRef?.value;
          if (!popoverElement) {
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (popoverElement as any).togglePopover();

          // TODO use CSS anchor positioning
          const { top, left, height } = (
            currentTarget as HTMLElement
          ).getBoundingClientRect();
          popoverElement.style.setProperty(
            "--popover-top",
            `${top + height + 5}px`
          );
          popoverElement.style.setProperty("--popover-left", `${left}px`);
        }}
      >
        <slot></slot>
        <slot
          ${ref(this.#popoverRef)}
          popover
          name="nested"
          @slotchange=${() => {}}
        ></slot>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gaia-nav-item": GaiaNavItemElement;
  }
}
