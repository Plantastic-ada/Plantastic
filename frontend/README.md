# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

#**ESLINT ON CI/CD**
Will be applied before the build by the dependency defined in package.json. by "eslint:github-action"

#**RUN CI PRE PUSH**
Check can be done before pushing by running _npm run check:ci_

#**INSTALL REACT ROUTER**
npm install --save-dev @types/react-router-dom
/!\ install v6 = npm install react-router-dom@6

#**MOCK SERVICE WORKER**
Mock Service Worker is an API mocking library that allows you to write client-agnostic mocks
to install: npm i -D msw
when the package is installed, need to save the SW script in the public folder : npx msw init public/
This SW is available at runtime. Can be checked in http://localhost:5174/mockServiceWorker.js
It's set up for the browser, it can be set up for a server environment to mock API calls for unit tests

#**ZOD LIBRARY**
Zod is a TypeScript-first validation library. Define a schema and parse some data with it. You'll get back a strongly typed, validated result.
npm install zod

#**DOM PURIFY**
DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.

#**REACT ICONS**
Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.
(https://react-icons.github.io/react-icons/)

#**RESSOURCES**
React Router, Vite and JWT Authentication : https://medium.com/@asbedb/react-router-vite-and-jwt-authentication-9abf049c3f32

Starting with logger in React: https://www.meticulous.ai/blog/getting-started-with-react-logging

#**TBD**
~~8/07: Implement style components (defined but not used)~~

~~29/08 :
Implements floating action button for add a plant in the home page.~~

12/09 :
In middle in the header styling. Directions to implements
Left to do : -~~Weird div on the left~~

- Header
- Profile
- Watering button
- ~~plant card & mocks?~~
- see how to implements shapes
- explore the accessibility button
- ~~highlight icon if on page~~

TODO:

- HOME PAGE
- ~~IMPROVE RESPONSIVENESS ON NAV BAR~~
- ~~REDIRECTION WHEN REGISTER TO LOGIN PAGE~~
- ~~IMPLEMENT PWA~~
- SWITCH MOCKS UP TO ENGLISH
- ~~PAGES ARCHITECTURE~~
  26/09
  ~~Reimplement PWA (already pushed)~~

2/10

- login ✔
- register ✔
- to fix LOGOUT ✖

9/10

- ~~fix response digital garden from 200 to 401 with JSON when not logged in~~
- fix logout button in header
- finish mock ups

#**TO DO 14/11**

- TESTS AUTH
- USER PERMISSION TO STORE COOKIE ??
  HEADER
  Watering + logout button
  Remove DOMpurify
  Calculate next watering in plant card
  Update watering in plant Card
  Finish plant add form

#**IN PROGRESS 14/11**

- schema for dto done
- form submit for /create-one-plant on the form.
