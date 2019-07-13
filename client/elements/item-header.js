import buildShadowRoot from './buildShadowRoot.js';
import './a-tag.js';
import './tag-list.js';
import './labeled-input.js';
import './image-upload.js';

class ItemHeader extends HTMLElement {
  constructor() {
    super();
    const html = /*html*/ `
      <style>
        :host {
          display: block;
        }
        header {
          display: grid;
          grid-template-columns: 50% 50%;
          align-items: flex-start;
          justify-content: flex-start;
        }
        div {
          height: 3.1em;
          display: flex;
        }
        image-upload {
          height: 100%;
        }
      </style>
      <header>
        <div>
          <image-upload src="/static/assets/add.svg" ></image-upload>
          <labeled-input class="title" large no-label></labeled-input>
        </div>
        <tag-list>
        </tag-list>
        <slot></slot>
      </header>
    `;
    buildShadowRoot(html, this);
    this.elems = {
      title: this.shadowRoot.querySelector('labeled-input'),
      tagList: this.shadowRoot.querySelector('tag-list'),
      img: this.shadowRoot.querySelector('image-upload')
    };
    this.elems.tagList.addEventListener('tag-update', this.handleTags.bind(this));
    this.elems.title.addEventListener('change', this.handleTitle.bind(this));
    this.elems.img.addEventListener('upload', this.handleUpload.bind(this));
  }
  handleUpload(e) {
    const {file, fileData} = e.detail;
    this.dispatchEvent(
      new CustomEvent('upload', {
        bubbles: true,
        detail: {
          file,
          fileData
        }
      })
    );
  }
  handleTags(e) {
    this.dispatchEvent(
      new CustomEvent('tag-update', {
        detail: e.detail
      })
    );
  }
  handleTitle(e) {
    this.dispatchEvent(
      new CustomEvent('title-update', {
        detail: {
          title: e.target.value
        }
      })
    );
  }

  static get observedAttributes() {
    return ['title-label', 'tags-label', 'tags', `value`, `icon`, `add-tag-label`];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'title-label':
        this.elems.title.textContent = newVal;
        this.elems.title.setAttribute('placeholder', newVal);
        break;
      case 'tags-label':
        this.elems.tagList.setAttribute('label', newVal);
        break;
      case 'add-tag-label':
        this.elems.tagList.setAttribute('add-label', newVal);
        break;
      case 'icon':
        this.elems.img.setAttribute('src', newVal);
        break;
      case 'tags':
        this.elems.tagList.innerHTML = newVal
          .split(',')
          .map(tag => `<a-tag>${tag}</a-tag>`)
          .join('');
        break;
      case 'value':
        this.elems.title.setAttribute('value', newVal);
        break;
      default:
        break;
    }
  }

  get titleLabel() {
    return this.getAttribute('title-label');
  }
  set titleLabel(val) {
    if (val) {
      this.setAttribute('title-label', val);
    } else {
      this.removeAttribute('title-label');
    }
  }
  get tagsLabel() {
    return this.getAttribute('tags-label');
  }
  set tagsLabel(val) {
    if (val) {
      this.setAttribute('tags-label', val);
    } else {
      this.removeAttribute('tags-label');
    }
  }
  get addTagLabel() {
    return this.hasAttribute('add-tag-label');
  }
  set addTagLabel(val) {
    if (val) {
      this.setAttribute('add-tag-label', '');
    } else {
      this.removeAttribute('add-tag-label');
    }
  }
  get tags() {
    return this.getAttribute('tags');
  }
  set tags(val) {
    if (val) {
      this.setAttribute('tags', val);
    } else {
      this.removeAttribute('tags');
    }
  }
  get value() {
    return this.getAttribute('value');
  }
  set value(val) {
    if (val) {
      this.setAttribute('value', val);
    } else {
      this.removeAttribute('value');
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

customElements.define('item-header', ItemHeader);
export default ItemHeader;
