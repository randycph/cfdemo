# CI/CD Monolith Demo

A small monorepo with a Vite React client and an Express API. It demonstrates a test gate followed by an automatic static-client deployment to GitHub Pages.

The client contains an interactive release-checklist CRUD example (create, complete, and remove tasks). The Express API exposes the same kind of task resource for local use and test demonstration:

- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

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

## Cloudflare Workers deployment

This repository can also deploy its static Vite client to Cloudflare Workers. In the Cloudflare Worker build screen, use:

```text
Build command: npm ci && npm run build:client
Deploy command: npx wrangler deploy
```

`wrangler.jsonc` tells Wrangler to publish `client/dist` as static Worker assets and enables SPA fallback routing. Cloudflare is served at the domain root, so the default Vite build uses `/` as its base path. The existing GitHub Pages workflow sets `DEPLOY_TARGET=github-pages` to retain its `/cfdemo/` project-site path.

The Express server is not deployed to Cloudflare by this static-assets Worker configuration. Its API remains local/demo-only unless it is rewritten for the Workers runtime or hosted separately.

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

## Demonstrate the deployment gate

Run a normal successful test suite:

```bash
npm run test:all
```

To intentionally fail the dedicated CI demonstration test locally in PowerShell:

```powershell
$env:SIMULATE_CI_FAILURE = 'true'
npm run test:server
Remove-Item Env:SIMULATE_CI_FAILURE
```

In GitHub, open **Actions → CI/CD → Run workflow** on `main`. Leave **simulate failure** unchecked for a successful test-and-deploy run. Check it to intentionally fail the test job: the `deploy` job will be shown as **skipped**, because it explicitly requires `needs.test.result == 'success'`.

After pushing to GitHub, enable Pages for the repository if needed. The workflow triggers on pushes and pull requests targeting `main`. Pull requests run the `test` job only; a push to `main` must pass the tests before `deploy` publishes `client/dist`.

## Client presentation script

1. Open a pull request and show the `test` job passing. **Talking point:** CI gives every change the same repeatable quality check.
2. Use **Run workflow** with **simulate failure** checked, and show `test` fail while `deploy` is skipped. **Talking point:** A failed quality gate prevents a release from starting.
3. Run the workflow again with the switch unchecked, and show tests pass followed by `deploy`. **Talking point:** Once quality is verified, delivery becomes automatic and traceable.
4. Open the GitHub Pages URL and add, complete, and remove a release-checklist task. **Talking point:** The hosted artifact is the static client, while the Express API remains a local/demo service in this example.
