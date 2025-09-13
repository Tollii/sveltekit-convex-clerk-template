## SoundPantry — Quick Setup (Convex + Clerk)

### 1) Create Convex and Clerk projects
- Create a Convex project in the Convex dashboard.
- Create a Clerk application in the Clerk dashboard.

### Env vars (set locally in `.env.local` and in Convex cloud)
```bash
CONVEX_DEPLOYMENT=
PUBLIC_CONVEX_URL=
PUBLIC_CLERK_FRONTEND_API_URL=
PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
CLERK_JWT_ISSUER_DOMAIN=
```

### Steps
1) Create Convex and Clerk projects.

2) Clerk → JWT Templates: create using Convex preset, name it `convex`.

3) Clerk → Sessions → Custom claims: add
```json
{
  "roles": "{{user.public_metadata.roles}}",
  "fullname": "{{user.full_name}}",
  "lastname": "{{user.last_name}}",
  "username": "{{user.username}}",
  "firstname": "{{user.first_name}}"
}
```

4) Clerk → Webhooks: subscribe to `user.created`, `user.updated`, `user.deleted`.
   - URL: `https://<your-convex>.convex.site/clerk-users-webhook` (or local Convex dev URL + `/clerk-users-webhook`).
   - Copy the webhook secret → set `CLERK_WEBHOOK_SECRET` (local + Convex cloud).

5) Set env vars (see list above).
   - `CLERK_JWT_ISSUER_DOMAIN`: your Clerk issuer (e.g. `https://<app>.clerk.accounts.dev`).

6) Optional: set user roles in Clerk `unsafe_metadata`:
```json
{ "roles": ["admin"] }
```

7) Import sample data:
```bash
npx convex import --table tasks sampleData.jsonl
```

8) Run Convex dev:
```bash
npx convex dev
```

9) Run app:
```bash
npm run dev -- --open
```

Notes:
- Webhook endpoint: `/clerk-users-webhook` (see `src/convex/http.ts`).
- JWT provider config: `src/convex/auth.config.ts` (`applicationID: "convex"`).
