import Templates from '../templates/templates.js';
import {fof} from '../templates/fourofour.js';
import fetch from 'node-fetch';
import header from '../data/header.js';
import {getTemplateList, getSimpleComponentList, dataDomain} from './shared.js';

export default server => {
  server.route([
    {
      method: `GET`,
      path: `/{lang}/templates`,
      handler: async (req, h) => {
        try {
          const {lang} = req.params;

          const templates = await getTemplateList();

          const t = new Templates({navigation: header.navigation, templates, lang});
          return t.render();
        } catch (err) {
          console.error(`component page failure`, err);
          return fof();
        }
      }
    },
    {
      method: `GET`,
      path: `/{lang}/template/new`,
      handler: async (req, h) => {
        try {
          const {lang} = req.params;

          const templates = await getTemplateList();
          const components = await getSimpleComponentList();

          const t = new Templates({navigation: header.navigation, templates, components, template: 'new', lang});
          return t.render();
        } catch (err) {
          console.error(`template page failure`, err);
          return fof();
        }
      }
    },
    {
      method: `GET`,
      path: `/{lang}/template/{type}`,
      handler: async (req, h) => {
        try {
          const {lang, type} = req.params;

          const templates = await getTemplateList();

          const components = await getSimpleComponentList();

          const raw = await fetch(`${dataDomain}/template/${type}`);
          const [template] = await raw.json();

          const t = new Templates({navigation: header.navigation, templates, components, template, lang});
          return t.render();
        } catch (err) {
          console.error(`template page failure`, err);
          return fof();
        }
      }
    }
  ]);
};
