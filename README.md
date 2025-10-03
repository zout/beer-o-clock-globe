# where4oclock

A small React + TypeScript + Vite app that visualizes the world on a 3D globe and helps answer a simple question: “Where is it 4 o'clock right now?” Built with globe.gl and three.js.

## Demo

Coming soon. You can run it locally with the steps below.

## Tech stack

- React 19 + TypeScript
- Vite 7
- three.js + globe.gl
- ESLint (TypeScript + React hooks)

## Getting started

Prerequisites:
- Node.js 18+ (LTS recommended)
- pnpm, npm, or yarn

Install dependencies:

- Using npm: npm install
- Using pnpm: pnpm install
- Using yarn: yarn install

## Available scripts

- dev: Starts the dev server with HMR (Vite)
  - npm run dev
- build: Type-checks and builds the production bundle
  - npm run build
- preview: Serves the production build locally
  - npm run preview
- lint: Runs ESLint on the project
  - npm run lint

## Local development

1. Install dependencies (see above).
2. Start the dev server: npm run dev
3. Open http://localhost:5173 (Vite default) in your browser.

## Build

- Production build: npm run build
- Preview the build locally: npm run preview

## Environment variables

This project currently does not require environment variables. If you add any, create an .env file and never commit real secrets. The repository includes a .gitignore that ignores .env by default. If you want to share example keys, add an .env.example file.

## Project structure (key files)

- src: React application source code
- public: Static assets served as-is
- index.html: App HTML entry
- vite.config.ts: Vite configuration
- eslint.config.js: ESLint configuration
- tsconfig*.json: TypeScript configs

## Deploy to GitHub Pages

There are two common GitHub Pages targets:

- Project Pages (recommended for this repo): served from https://<user>.github.io/<repo>/
- User/Org Pages: served from https://<user>.github.io/

Steps (Project Pages):

1. Ensure the repository is public and Pages is enabled in GitHub → Settings → Pages.
2. Build and publish to the gh-pages branch:
   - macOS/Linux: GHP_BASE="/beer-o-clock-globe/" npm run deploy
   - Windows (PowerShell): $env:GHP_BASE="/beer-o-clock-globe/"; npm run deploy
   This sets the correct base path for Vite, then runs the deploy script (which builds and publishes the dist folder to the gh-pages branch using gh-pages).
3. In GitHub → Settings → Pages, set Source to “Deploy from a branch”, Branch: gh-pages / root. Save.
4. Visit https://<user>.github.io/<repo-name>/ after a minute.

Notes:
- If you publish to a User/Org page (https://<user>.github.io/), you can skip GHP_BASE as the base can remain "/".
- The deploy scripts are defined in package.json, and vite.config.ts reads GHP_BASE to set the correct base path.

## Contributing

Issues and PRs are welcome. If you plan a larger change, please open an issue to discuss it first.

- Run lint before committing: npm run lint
- Keep changes small and focused.

## License

MIT © 2025 Joshua Peper. See LICENSE for details.

## Repository & issues

This project is now hosted on GitHub.

- Repository: https://github.com/zout/beer-o-clock-globe
- Issues: https://github.com/zout/beer-o-clock-globe/issues

## Acknowledgements

- globe.gl and world-atlas for geographic data and rendering
- three.js for WebGL rendering

