# fortivexai.com

Marketing site for Fortivex AI, plus a private CRM dashboard.

## Hosting

Deployed on Netlify. Pushes to `main` deploy via GitHub Actions.

## Private CRM dashboard

- URL: `/dashboard`
- Auth: HTTP Basic Auth
- Env vars (Netlify site settings):
  - `DASHBOARD_USER` (default `ayoub` if unset)
  - `DASHBOARD_PASSWORD` (required)
- Lead data: `dashboard/data/crm.json` (seeded from the Fortivex Florida CRM sheet)

## Local

Open `index.html` in a browser, or:

```bash
npx serve .
```
