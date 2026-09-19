# CI/CD Monolith Demo

A small monorepo with a Vite React client and an Express API. It demonstrates a test gate followed by an automatic static-client deployment to GitHub Pages.

## Important deployment boundary

GitHub Pages hosts only the static React build in `client/dist`. The Express server is included for local/demo purposes and is not deployed by this workflow. A real production API would need its own hosting target and a client-side API URL configuration.

## Setup

```bash
mkdir cfdemo
cd cfdemo
git init
npm install
```

Set the repository name in `client/vite.config.js` before publishing. For a GitHub Pages project site, the `base` value must be `/<repository-name>/`; this demo uses `/cfdemo/`.

Run the server locally in one terminal:

```bash
npm run start:server
```

Run the client locally in another terminal:

```bash
npm run dev --workspace client
```

Run both test suites in sequence:

```bash
npm run test:all
```

Build the client locally:

```bash
npm run build:client
```

After pushing to GitHub, enable Pages for the repository if needed. The workflow triggers on pushes and pull requests targeting `main`. Pull requests run the `test` job only; a push to `main` must pass the tests before `deploy` publishes `client/dist`.

## Client presentation script

1. Open a pull request and show the `test` job passing. **Talking point:** CI gives every change the same repeatable quality check.
2. Break the expected API response or client assertion, push it, and show `test` fail while `deploy` is skipped. **Talking point:** A failing check stops a known-bad change from reaching users.
3. Restore the assertion, push again, and show tests pass followed by `deploy`. **Talking point:** Once quality is verified, delivery becomes automatic and traceable.
4. Open the GitHub Pages URL and click **Simulate deployment**. **Talking point:** The hosted artifact is the static client, while the Express API remains a local/demo service in this example.
