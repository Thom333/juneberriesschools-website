# Juneberries Schools — Public Website & Staff Administration

A responsive public school website and invitation-only staff administration workspace.

## Stack
- Next.js 15 App Router, React 19, TypeScript and Tailwind CSS
- Supabase Auth with cookie-based SSR sessions (@supabase/ssr)
- Supabase Postgres with row-level security
- Supabase Edge Functions: staff-session, invite-staff, manage-staff

## Local setup
1. Install dependencies: npm install
2. Copy .env.example to .env.local.
3. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY from the Juneberries Supabase project.
4. Run npm run dev and open / for the public homepage.

Staff sign-in is at /login and the protected Super Administrator workspace is at /admin.

Only a publishable key is used in the browser. Never expose a Supabase service-role or secret key in a NEXT_PUBLIC_ variable or commit secrets to Git.

## Public website foundation
- Responsive homepage and mobile navigation
- Single illustrative hero section
- School philosophy and learning pathway sections
- Nursery/Early Years, Primary and Secondary overview
- Prominent Language School feature
- Admissions enquiry call to action
- News/community and contact sections
- Brand philosophy: “Every Child Matters. Every Potential Counts.”

## Integrated staff administration
- Real Supabase email/password sign-in and password reset
- Cookie-backed SSR session refresh and protected admin route
- Server-side staff profile/status/role verification
- Live staff directory and account statistics
- Staff invitation through invite-staff Edge Function
- Suspend, reactivate and role-change actions through manage-staff
- Live role-permission matrix and permission updates
- Live staff audit activity
- Four approved roles; invitation UI cannot grant Super Administrator

## Governance
Only an active Super Administrator can enter the administration dashboard or perform staff-management operations. Database RLS policies allow staff to read their own profile, active staff to read role permissions, and Super Administrators to read the staff directory and audit log. Privileged writes are handled by authenticated Edge Functions.

The initial Super Administrator must be provisioned through the controlled bootstrap process. There is no public staff registration or self-service Super Administrator assignment.

## Presentation and production checklist
- Provision and test the first Super Administrator through the controlled bootstrap procedure.
- Add the project publishable key to the preview environment (never the service-role key).
- Verify Supabase Auth redirect URLs and invitation email templates.
- Test real sign-in, invitation acceptance, role changes, suspension, reactivation and password reset.
- Review Edge Function CORS allowlists and invitation acceptance safeguards.
- Complete end-to-end and mobile browser tests.
- Complete CMS content, admissions, school settings and Language School modules.
- Preview on mobile and obtain approval before production deployment.

No production deployment is authorised.
