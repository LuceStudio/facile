import buildShadowRoot from './buildShadowRoot.js';

class RegionItem extends HTMLElement {
  constructor() {
    super();
    const html = /* html */ `
      <style>
        :host {
        }
        section {
          margin: var(--spacing-500);
        }
        img {
          width: 2em;
        }
      </style>
      <img />
      <span></span>
      <section>
        <slot></slot>
      </section>
    `;
    buildShadowRoot(html, this);
    this.elems = {
      img: this.shadowRoot.querySelector('img'),
      type: this.shadowRoot.querySelector('span')
    };
    this.addEventListener('change', this.handleChange.bind(this));
  }

  handleChange(e) {
    this.dispatchEvent(
      new Event('item-change', {
        bubbles: true
      })
    );
  }

  static get observedAttributes() {
    return ['type', 'icon'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'type':
        this.elems.type.textContent = newVal;
        break;
      case 'icon':
        this.elems.img.setAttribute('src', newVal);
        break;
      default:
        break;
    }
  }

  get type() {
    return this.getAttribute('type');
  }
  set type(val) {
    if (val) {
      this.setAttribute('type', val);
    } else {
      this.removeAttribute('type');
    }
  }
  get icon() {
    return this.getAttribute('icon');
  }
  set icon(val) {
    if (val) {
      this.setAttribute('icon', val);
    } else {
      this.removeAttribute('icon');
    }
  }
}

customElements.define('region-item', RegionItem);
export default RegionItem;
