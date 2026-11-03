# Juneberries Schools — Staff Administration

A fresh responsive frontend for the Juneberries Schools Super Administrator workspace.

## Stack
- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide icons

## Run locally
```bash
npm install
npm run dev
```

Open `/login` for the invitation-only staff sign-in interface and `/` for the administration dashboard.

## Current frontend scope
- Responsive administrative dashboard
- Staff directory, search and status filters
- Staff invitation modal and approved role choices
- Role permission matrix
- Activity and audit-log presentation
- Login screen with password visibility toggle
- Juneberries purple, yellow and white visual identity

## Integration status
This is currently a **frontend preview**. It uses illustrative sample records and local React state. No real invitation, sign-in, permission update, suspension or reactivation is performed from the browser yet.

The Supabase backend foundation is deployed to project reference `bnlewrojzfflmhsories`. The next integration phase will add the browser-safe publishable key, Supabase Auth session handling, protected routes, and calls to the deployed Edge Functions:
- `staff-session`
- `invite-staff`
- `manage-staff`

Never put a Supabase service-role key in frontend environment variables or browser code. Only the publishable/anon key belongs in the client. Privileged operations must remain server-side.

The initial Super Administrator must be provisioned through the controlled bootstrap process; invitations must never grant the Super Administrator role.
