# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

npm create vite@latest assecor.react -- --template react-ts
cd assecor.react
npm install
npm install axios
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm install -D flush-promises
npm install react-router-dom
npm install -D cypress

pm install --save-dev jest @types/jest ts-jest
npm install --save-dev jest-environment-jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev jest ts-jest @types/jest @testing-library/react @testing-library/jest-dom @types/testing-library__jest-dom

npm install --save-dev util
npm install --save-dev @types/node

npm install -D babel-plugin-react-compiler@latest
npm install vite-plugin-babel
npm install -D @babel/plugin-proposal-class-properties babel-plugin-module-resolver
npm install -D @babel/plugin-transform-class-properties babel-plugin-module-resolver

npm install -D @testing-library/user-event msw
npm i vitest

npm remove jest ts-jest @types/jest jest-environment-jsdom
npm remove @types/testing-library__jest-dom

rm -rf node_modules package-lock.json

npm install
npm install -D babel-plugin-react-compiler@latest
npm install vite-plugin-babel
npm install -D @babel/plugin-transform-class-properties babel-plugin-module-resolver
npm install -D @testing-library/user-event msw
npm i vitest

npm install --save-dev @types/node
npm install --save-dev wait-on

npm test or npx vitest run
npx cypress open // visual by browser
npx cypress run  // non-visual, monitor

npm run dev   // development
npm run build // production

-- docker devel
docker compose -f docker-compose.dev.yml up

-- docker prod
docker build -t assecor.react .
docker run -p 5173:80 assecor.react

node -v
v22.20.0

npm version from ng version

Angular CLI       : 21.0.1
Node.js           : 22.20.0
Package Manager   : npm 10.9.3
Operating System  : win32 x64

┌────────────┬───────────────────┬───────────────────┐
│ Package    │ Installed Version │ Requested Version │
├────────────┼───────────────────┼───────────────────┤
│ typescript │ 5.9.3             │ ~5.9.3            │
│ vitest     │ 4.0.17            │ ^4.0.17           │
└────────────┴───────────────────┴───────────────────┘

Vitest	                                Cypress
Fully controlled fake environment	  Real browser timing
findByText waits by default	        get("table") does not wait for network
MSW resolves immediately	          Cypress needs explicit wait