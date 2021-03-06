import buildShadowRoot from './buildShadowRoot.js';
import './an-icon.js';
class NavItem extends HTMLElement {
  constructor() {
    super();
    const html = /* html */ `
      <style>
        :host {
          --color: var(--nero, inherit);
          --color-hover: var(--nero, inherit);
          --underline: var(--link-color, blue);
          margin: var(--spacing-300);
        }
        :host([vertical]) {
          display: block;
          border-bottom: 1px solid var(--nero-300);
          margin: 0;
        }
        :host([vertical]:first-child) {
          border-top: 1px solid var(--nero-300);
        }

        :host([vertical]) a{
          display: block;
          padding: var(--spacing-300);
        }
        
        :host([vertical]) a:hover {
          border-bottom: 1px solid transparent;
        }

        a {
          color: var(--color);
          text-decoration: none;
          border-bottom: 1px solid transparent;
        }
        a:hover {
          color: var(--color-hover);
          border-bottom: 1px solid var(--underline);
        }
        an-icon {
          display: none;
        }
        :host([icon]) an-icon {
          display: inline-block;
        }
      </style>
      <!-- TODO: add icon based on item, folder, and add -->
      <a href="">
        <slot></slot>
        <an-icon></an-icon>
      </a>
    `;
    buildShadowRoot(html, this);
    this.elems = {
      link: this.shadowRoot.querySelector('a'),
      icon: this.shadowRoot.querySelector('an-icon')
    };
  }

  static get observedAttributes() {
    return ['href', 'icon'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'href') {
      this.elems.link.setAttribute('href', newVal);
    }
    if (attrName === 'icon') {
      this.elems.icon.setAttribute('type', newVal);
    }
  }

  get href() {
    return this.getAttribute('href');
  }
  set href(val) {
    if (val) {
      this.setAttribute('href', val);
    } else {
      this.removeAttribute('href');
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

customElements.define('nav-item', NavItem);
export default NavItem;
