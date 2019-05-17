import Home from "../templates/home.js";
import Article from "../templates/article.js";
import fetch from "node-fetch";
import { join } from "path";
import require from "./require.cjs";
import LoginRegistration from "../templates/login_registration.js";

const port = process.env.PORT || 8000;
export default server => {
  const polyfillsURL = require.resolve("@webcomponents/webcomponentsjs");
  const stivaURL = require.resolve("stiva");

  // STATIC Routes
  server.route({
    method: `GET`,
    path: `/static/{param*}`,
    handler: {
      directory: {
        path: "client"
      }
    }
  });

  server.route({
    method: `GET`,
    path: `/static/polyfills/{param*}`,
    handler: {
      directory: {
        path: join(polyfillsURL, "../")
      }
    }
  });

  server.route({
    method: `GET`,
    path: `/stiva.js`,
    handler: {
      file: stivaURL
    }
  });

  // Dynamic Routes
  server.route({
    method: `GET`,
    path: `/`,
    handler: async (req, h) => {
      try {
        // Simulating a fetch to some service to get content.
        const raw = await fetch(`http://localhost:${port}/api/home`);
        const json = await raw.json();
        const home = new Home(json);
        return home.render();
      } catch (err) {
        console.error(`home page failure`, err);
        return `fourOfour.render()`;
      }
    }
  });

  server.route({
    method: `GET`,
    path: `/login`,
    handler: async (req, h) => {
      try {
        const login = new LoginRegistration();
        return login.render();
      } catch (err) {
        console.error(`login / registration page failure`, err);
        return `fourOfour.render()`;
      }
    }
  });

  server.route({
    method: `GET`,
    path: `/article/{id}`,
    handler: async (req, h) => {
      const { id } = req.params;
      try {
        const raw = await fetch(`http://localhost:${port}/api/article/${id}`);
        const json = await raw.json();
        const article = new Article(json);
        return article.render();
      } catch (err) {
        console.error(`article ${id} page failure`, err);
        return `fourOfour.render()`;
      }
    }
  });
};
