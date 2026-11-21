# Corpers Connect

Clickable front-end prototypes of Corpers Connect: a social network and an opportunity marketplace (jobs, items, accommodation, events) for NYSC corps members. Both halves are equal pillars.

No build step. Sample data only; nothing is saved or sent.

| Page | File | What it is |
|---|---|---|
| Member app | `index.html` | The mobile-first member app. Responsive: phone, tablet, desktop |
| Admin console | `admin.html` (`/admin`) | Desktop-first admin prototype with MFA login, role switcher, verification review with ID viewer, moderation, listings, communities, announcements, camp schedules, support, analytics with the feed mix cap, settings, audit log, and admins, roles and permissions |
| Landing page | `landing.html` (`/landing`) | Public marketing page |
| Info pages | `info.html` (`/terms`, `/privacy`, `/guidelines`, `/safety`, `/help`, `/contact`, `/about`) | Terms, privacy, guidelines, safety tips, help centre, contact |
| Status pages | `404.html`, `maintenance.html`, `error.html` | Not found, maintenance and error pages |

- Sample media lives in `media/` (photos from picsum.photos, portraits from randomuser.me, short CC0/test videos). `media/id/` holds clearly fake sample ID cards for the admin review demo. Swap in real content before any public demo.
- Admin prototype: sign in with any email and any 6-digit code. Use "Demo: view as" at the top to switch roles and see how pages and buttons follow permissions.
- Deploy: import this repo in Vercel and click Deploy. `vercel.json` sets clean URLs and routes.
