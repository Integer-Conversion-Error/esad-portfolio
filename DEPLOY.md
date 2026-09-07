# Cloudflare Deployment

This is an explicitly static Astro site. `npm run build` writes the deployable
site to `dist/`; there is no SSR adapter or server runtime.

## Cloudflare Pages

In **Workers & Pages**, create a Pages project from the repository and use:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` |

`public/_headers` and `public/_redirects` are copied to `dist/` by Astro, so
Pages applies the security headers and redirect behavior on deploy. Pages will
rebuild on every pushed commit and produce pull-request previews.

For a direct CLI upload instead of Git integration:

```bash
npm run deploy:pages
```

The script expects a Pages project named `esad-portfolio`. Change the
`--project-name` value in `package.json` if your project uses another name.

## Cloudflare Workers Static Assets

`wrangler.jsonc` deploys the same `dist/` folder to Workers static assets.
`src/worker.ts` adds the security headers that Pages normally receives from
`_headers`, while `assets.html_handling` keeps Astro's directory routes working
and `assets.not_found_handling` serves `dist/404.html` for missing routes.

Authenticate once:

```bash
npx wrangler login
```

Then deploy:

```bash
npm run deploy:worker
```

## Continuous Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and
deploys this Worker for every push to `main`. It cancels an older in-progress
deployment when a newer commit arrives, so production finishes on the latest
commit.

Before the first automatic deployment, add these repository Actions secrets:

| Secret | Value |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account that owns `esad-portfolio` |
| `CLOUDFLARE_API_TOKEN` | A restricted Cloudflare API token with permission to edit this Worker |

Create the API token from Cloudflare's **Edit Cloudflare Workers** template and
scope it to the account and zone used by this site. Never commit the token to
the repository. Until both secrets are present, the workflow builds the site
and reports that deployment was skipped.

The Worker name is `esad-portfolio`. Its production Custom Domain is declared
as `esadkaya.ca` in `wrangler.jsonc`, so Cloudflare will create the DNS record
and certificate when that zone is present in the authenticated account. Change
the route before first deploy if the production hostname is different.

To preview the Worker and its static assets locally:

```bash
npm run preview:worker
```

## Custom Domain

The Worker configuration attaches both `esadkaya.ca` and `www.esadkaya.ca`
during deployment. Cloudflare provisions the certificates and DNS records once
the zone is verified. Both hostnames serve the same Worker deployment.

## Static Build Check

```bash
npm run build
```

The command must complete successfully before either Pages or Workers can
deploy. No environment variables are required.
