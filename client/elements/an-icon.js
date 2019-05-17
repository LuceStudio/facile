import buildShadowRoot from './buildShadowRoot.js';
import icons from '../assets/icons.js';

class AnIcon extends HTMLElement {
  constructor() {
    super();
    const html = `
      <style>
        :host {
         font-size: 1.2em;
        }
        svg {
          height: 1em;
          width: 1em;
          fill: currentColor;
        }
      </style>
      <svg viewBox="" xmlns="http://www.w3.org/2000/svg">
        <title></title>
        <desc></desc>
        <path fill-rule="nonzero" d=""/>
      </svg>
    `;
    buildShadowRoot(html, this);
    this.elems = {
      svg: this.shadowRoot.querySelector('svg'),
      title: this.shadowRoot.querySelector('title'),
      desc: this.shadowRoot.querySelector('desc'),
      path: this.shadowRoot.querySelector('path')
    };
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'type':
        const icon = icons[newVal];
        if (icon) {
          this.elems.svg.setAttribute('viewBox', `0 0 ${icon.width} ${icon.height}`);
          this.elems.title.textContent = this.getAttribute('title') || icon.title;
          this.elems.desc.textContent = icon.desc;
          this.elems.path.setAttribute('d', icon.path);
        }
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
}

customElements.define('an-icon', AnIcon);
export default AnIcon;
