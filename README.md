# ATELIER — Personal Utility Ecosystem

A Vite-powered, responsive personal utility workspace. Version 1.3.23 includes live utility autocomplete search and the shared design system alongside the existing editorial, fashion-house inspired interface: warm parchment, deep forest, muted stone and antique brass, expressive typography, organic composition, light/dark appearance and restrained GSAP motion.

## Requirements

- Node.js 20.19+ or 22.12+
- npm (included with Node.js)
- Git (for GitHub deployment)

## Install and run locally

Open this project folder in VS Code or a terminal, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Motion and appearance

- GSAP powers restrained page entrance and interaction motion.
- The interface respects `prefers-reduced-motion`.
- Use the appearance control in the public header or workspace header to switch between light and dark themes. Your selection is saved in this browser.
- The design system follows a Figma-style design process: shared visual tokens, consistent spacing, type hierarchy, reusable components, interaction states and responsive breakpoints. Figma itself is not a runtime dependency.

## Create a production build

```bash
npm run build
npm run preview
```

The production-ready static website is generated in `dist/`.

## Deploy to GitHub Pages

This project includes `.github/workflows/deploy.yml`. It automatically installs dependencies, builds the Vite site and deploys `dist/` to GitHub Pages whenever you push to the `main` branch.

1. Create a new empty repository on GitHub.
2. Extract this ZIP and open the extracted `atelier-utility` folder in VS Code.
3. Open the terminal in that folder and run:

   ```bash
   git init
   git add .
   git commit -m "Initial ATELIER website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

4. On GitHub, open **Settings → Pages**.
5. Under **Build and deployment → Source**, select **GitHub Actions**.
6. Open the repository's **Actions** tab and wait for **Build and deploy to GitHub Pages** to finish.
7. Your published site URL will be shown in the deployment job and in **Settings → Pages**.

The app uses hash-based client-side routes (for example `/#/dashboard`) so direct navigation and refresh work on GitHub Pages without a server-side rewrite rule. Vite's relative asset base supports both repository pages and custom domains.

## What's included

- Public landing page and dedicated authentication route.
- Main dashboard with sidebar navigation and live utility search suggestions.
- Eight category workspaces and independent utility routes.
- Responsive desktop and mobile layouts.
- Working local demo account flow, expense tracker, CSV export and petrol cost calculator.
- Local record CRUD starter interfaces for list-oriented tools.
- Vite development server and production build configuration.
- GitHub Actions workflow for automatic GitHub Pages deployment.

## Important production notes

This is a frontend starter/prototype, not a production-ready secure personal-data system.

- Demo accounts and records are stored in browser `localStorage`; they are not secure and do not sync across devices.
- Connect Supabase Auth and a properly secured database before storing real personal or sensitive information.
- Enable Row Level Security (RLS) for every user-owned table and test the policies.
- Some advanced utilities currently have dedicated routes and starter interfaces, but still need their complete feature implementations.
- Never put Supabase service-role keys or other secrets in frontend code. Use only public client configuration in the browser.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install project dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |


## Supabase authentication setup (v1.3)

This build adds real Supabase email/password authentication and Google OAuth to the existing Atelier interface.

1. Run `npm install` to install the Supabase client.
2. Copy `.env.example` to `.env.local`.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` using the Project URL and publishable/anon key from Supabase Project Settings → API.
4. In Supabase → Authentication → Sign In / Providers → Google, enable Google and paste the Google OAuth Client ID and Client Secret.
5. In Google Cloud Console, keep `http://localhost:5173` under Authorized JavaScript origins and the Supabase callback URL (`https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`) under Authorized redirect URIs.
6. In Supabase → Authentication → URL Configuration, set Site URL to `http://localhost:5173` during local development and add `http://localhost:5173/**` to Redirect URLs. Add your production URL before deployment.
7. Start with `npm run dev`, open `http://localhost:5173/#/auth`, and test Google or email sign-in.

Google login redirects to `#/dashboard`. Email sign-up may require email confirmation depending on your Supabase Auth settings. Add your Gmail under Google OAuth Audience → Test users while the Google app is in Testing mode.

Security and scope:
- Only the Supabase URL and public publishable/anon key belong in the Vite frontend environment. Never use the Supabase service-role key or database password in frontend code.
- This replaces browser-only demo account sign-in with Supabase Auth and restores sessions.
- Existing utility records are still stored in browser localStorage in this version; they have NOT yet been migrated to Supabase tables or cross-device sync. Implement user-owned tables and Row Level Security before storing sensitive information.


## IMPORTANT — clean install after updating to v1.3.1

The error `Failed to resolve import "@supabase/supabase-js"` means Vite cannot find the Supabase JavaScript package in this project's local `node_modules`. The source import is correct and the package is declared in `package.json`, but dependencies have not been installed in the folder currently being run (or the existing `node_modules` is stale).

On Windows, use one of these methods from the `atelier-utility` project folder:

**Simplest:** double-click `START-ATELIER.bat`. It runs `npm install` first, then starts Vite.

**Manual:**
```bash
npm install
npm run dev
```

If you already ran install and still see the same error, close the Vite terminal with Ctrl+C, delete the `node_modules` folder, then run:
```bash
npm install
npm run dev
```

Do not run `npm run dev` before `npm install`. Also make sure the terminal is opened in the same folder that contains this build's `package.json` (not a parent folder or an older extracted copy).

The project requires Node.js 18 or newer. Check with `node -v` and `npm -v`.


## v1.3.2 login flow fix

- Waits for Supabase to restore a persisted session before redirecting protected routes.
- Shows authentication errors and setup instructions directly below the sign-in form.
- Gives clear guidance for invalid credentials and unconfirmed email addresses.
- Google OAuth and email/password login now show visible progress and errors.

If login still fails, verify that `.env.local` is inside the same `atelier-utility` folder as `package.json`, then restart Vite after editing it. Use the Supabase Project URL and the publishable/anon key (never the service-role key). Existing accounts must exist in this Supabase project; local demo accounts from earlier versions are not Supabase accounts.


## v1.3.3 — OAuth callback routing fix

This release fixes the case where Google authentication succeeds but the browser returns to the sign-in screen.

Cause: the previous Google OAuth `redirectTo` appended the SPA hash route (`#/dashboard`) to the callback URL. Supabase Auth also uses the URL fragment/query parameters while completing the OAuth callback and exchanging the authorization code. Mixing the application hash route into that callback can interfere with callback/session detection.

Fix:
- Google OAuth now redirects to the clean app origin/path (without a `#` fragment).
- Supabase completes callback processing and restores the session first.
- Once a session exists, the app routes from `/` or `/auth` to `#/dashboard`.
- Auth state events also route successful sign-ins to the dashboard.

Supabase → Authentication → URL Configuration must allow the clean callback destination, for local development:
`http://localhost:5173`

Keep the Google Cloud Authorized redirect URI as the Supabase callback:
`https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`

Do not change that Google Cloud redirect URI to localhost; Google must return to Supabase first.


## v1.3.4 — Authentication visual redesign

- Rebuilt sign-in / create-account page with a refined split-screen editorial layout, subtle orbital animation, responsive layout, and dark-mode styling.
- The sign-in form shows only email and one password field.
- The confirm-password field and full-name field are visible and required only in Create account mode.
- Auth screen is fixed to the viewport on desktop; mobile layout is compact and can scroll only if the device viewport is exceptionally short.


## v1.3.5 correction
The v1.3.4 archive had the new authentication CSS but accidentally retained the old `auth()` HTML template. This correction replaces the actual template with the redesigned `.auth-screen` markup. Search for `auth-screen` in `src/main.js` to verify this build.

## v1.3.6 — Supabase session race fix

Fixes a race between the initial `getSession()` startup read and Supabase `onAuthStateChange` events. A late initial read can no longer overwrite a newer successful sign-in session with a stale null session. The auth-state listener is registered before the startup session read, marks auth initialization complete, synchronizes the profile label, and routes authenticated users from the landing/sign-in page to the dashboard.

## v1.3.7 — verified clean Google OAuth redirect

The Google sign-in button now passes `http://localhost:5173/` as the Supabase `redirectTo` URL, without `#/dashboard`. Supabase must first process its OAuth callback and establish the session. The registered auth-state listener then routes the signed-in user to `#/dashboard`.

Verification: inspected the packaged `src/main.js` and confirmed the OAuth redirect expression contains no hash fragment.
Supabase Auth → URL Configuration must allow `http://localhost:5173/` (and optionally `http://localhost:5173/**`). The Google Cloud Authorized redirect URI remains the Supabase callback URL ending in `/auth/v1/callback`.

## v1.3.8 — depth and dimensional design update

- Authentication page refreshed to match the supplied reference: violet-tinted atmospheric background, prominent welcome typography, elevated translucent form card, soft layered shadows, and a living CSS 3D orb sculpture with floating, morphing, orbit and glint motion.
- Dark-mode dashboard cards use low-opacity gradient fills, softly illuminated borders, inset highlights and layered shadows instead of uniform green blocks.
- Applied the dimensional card treatment to stats, panels, tools, categories, preview cards and result surfaces.
- Honors `prefers-reduced-motion`; mobile layout remains responsive.
- Supabase client configuration and Google OAuth redirect are unchanged.

## v1.3.9 — dashboard redesign

Redesigned dark-mode dashboard surfaces: statistics, category cards, tool cards, panels and result cards now use layered low-contrast gradients, softly fading edge highlights, rounded geometry, subtle inset lighting and deeper ambient shadows. Removed the rigid green slab appearance while retaining the established forest palette and brass accents. Hover states use restrained lift and shadow changes. Existing routes, auth code and tool logic are unchanged.

## v1.3.10 — complete light/dark theme consistency pass

Introduced a shared semantic theme-token layer for page backgrounds, surfaces, text, borders, accents, buttons, controls and card shadows. Replaced hard-coded button/control colors with theme-aware styling. Audited dashboard cards, category and tool surfaces, statistics, panels, forms, tables, sidebar, navigation, CTA, result boxes, auth surfaces and toast states in both themes. In dark mode, primary action buttons now use a deliberate light sage surface with dark readable text (rather than pale text on a pale button); secondary buttons remain quiet outlined surfaces. Light mode receives matching surface hierarchy and restrained shadows. The saved `atelier_theme` preference and existing theme toggle behavior are unchanged.

## v1.3.11 — light-mode depth refinement

Refined light mode across the app to remove rigid hairline-only card borders and flat page sections. Category and tool workspaces now use softly elevated warm surfaces, layered ambient shadows, inset highlights, restrained corner radii and gentle hover lift. Stats, panels, previews, result cards, sidebar, topbar, buttons and form controls now share the same light-mode surface language. Preserves the existing palette and all application logic/auth routes.

## v1.3.12 — compact sidebar navigation

Reduced desktop sidebar vertical spacing across brand, section labels, navigation links, and profile/settings footer so all menu items fit within a standard desktop viewport without an internal scrollbar. Added tighter compact-height rules for shorter laptop displays. Mobile navigation retains vertical scrolling for accessibility and smaller screens. No route, auth, or feature logic changed.

## v1.3.13 — full layout and theme repair

Repaired sidebar contrast and sizing: it is now a fixed full-height deep-green navigation rail with legible high-contrast labels, consistent active states, and all destinations visible without desktop internal scrolling. Vertical spacing adapts to shorter screens; mobile retains an off-canvas scrollable menu. Reconciled light/dark semantic surfaces and controls with one final precedence layer, including card surfaces, borders, text, inputs, buttons, tables, and panels. Normalized dashboard content widths, heading/button alignment, card grid sizing, card footers, and responsive spacing. No authentication, Supabase, route, or utility logic changed.

## v1.3.14 — sidebar light-theme contrast fix

Root cause: a lower-priority-in-the-file but more specific light-theme sidebar surface rule from v1.3.11/v1.3.13 was still painting the sidebar ivory. This final override explicitly keeps the sidebar deep forest green in both light and dark modes and restores high-contrast brand, section labels, links, icons, active/hover states, footer divider and profile text. Sidebar sizing and no-desktop-scroll rules are retained.


## v1.3.15 — sidebar space distribution and dashboard alignment

The desktop sidebar now distributes its navigation rows vertically across the full viewport using consistent spacing rather than leaving a large blank region above the pinned footer. The rail remains non-scrollable on desktop; compact-height rules remain in place. The dashboard workspace panel now has aligned heading and category-grid insets, consistent card sizing and footer alignment. Recently used items now render as structured, accessible rows with a number, item/category hierarchy and aligned arrow affordance instead of default-margin paragraphs. Mobile layout remains responsive. No auth, Supabase or tool logic changed.

## v1.3.16 — recently-used hover refinement

Replaced the rigid rectangular hover highlight with a soft center-weighted surface whose left and right edges fade into the surrounding panel. Removed hover padding shifts, softened row separators with a centered gradient, and added a subtle arrow movement. Light and dark modes use separate restrained hover tints; reduced-motion preferences are respected. No navigation or data logic changed.

## v1.3.17 — public website design specification

- Added `DESIGN.md` at the project root as the design-system reference for the public ATELIER landing page outside the login/sign-up experience.
- Documented the ATELIER concept, eight product categories, current visual tokens, typography, layout, components, responsive behaviour, accessibility and iteration rules.
- Kept the public landing-page specification separate from authentication and the signed-in application UI.
- Documentation and project metadata update only; no application UI, authentication flow or utility behaviour was changed.

## v1.3.23 — Utility search

- The global workspace search suggests matching tools and categories as you type.
- Matches utility names, category names and descriptions.
- Open a result by clicking it or using Arrow Up / Arrow Down and Enter; press Escape to dismiss suggestions.
