# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server with HMR
yarn build        # Production build (outputs to dist/)
yarn lint         # ESLint with zero max-warnings (strict)
yarn preview      # Preview the production build locally
```

There is no test suite configured. Lint is strict — `--max-warnings 0` means warnings fail the build.

Environment variables must be set before building (see `.env.example`). All are `VITE_` prefixed and injected at build time via `import.meta.env`.

## Architecture

This is a React 18 + Vite SPA for the 3D7 Technologies company website. The frontend is deployed as static files to cPanel hosting at `3d7tech.com`. A separate PHP API (`api.3d7tech.com`) runs on the same server and proxies requests to a locally-running Ollama instance (llama3.2).

### Routing

All routes are declared in `src/App.jsx`. `<Chatbot />` and `<ToastContainer />` are mounted once globally here, outside routes, so they persist across all pages.

The `public/.htaccess` rewrites all non-file requests to `index.html` so React Router client-side navigation works on the Apache server.

### Styling

Styled-components is the primary styling mechanism. Styled component definitions live at the **bottom** of the same file as the React component that uses them — not in separate files.

The design token object is in `src/theme/theme.js`. Use its values rather than hardcoding colors, spacing, or font sizes. Key design decisions:

- Dark background: `#0A0A0A` → `#1E3A8A` gradient (top to bottom)
- Accent blue: `#60A5FA` / `#3B82F6`
- Text: `#F3F4F6` primary, `rgba(243,244,246,0.9)` secondary
- `theme.mixins.glassmorphism` — reusable glassmorphism background for cards
- `theme.mixins.textGradient` — blue gradient applied to headings via `-webkit-background-clip`

Bootstrap 5 is also available (imported in `src/main.jsx`) and used for utility classes in some older components.

### Page Structure

Every page follows this pattern:
```
<SeoMeta ... />
<NavBar />
[page-specific sections]
<Footer />
```

`SeoMeta` (`src/components/SeoMeta.jsx`) wraps `react-helmet-async` and sets Open Graph, Twitter Card, and canonical tags. Always pass `title`, `description`, and `path` props.

### Key Features

**Chatbot** (`src/components/chatbot/Chatbot.jsx`): A floating chat widget rendered globally in `App.jsx`. It calls `https://api.3d7tech.com/v1/chat/completions` with a hardcoded system prompt describing company info. The system prompt in `Chatbot.jsx` must stay in sync with `src/data/websiteKnowledgeBase.js`, which is the canonical source of company/product data.

**Business Strategy Generator** (`src/components/hero/Hero8.jsx`): The top section of `LandingPage`. Collects business info via a modal form, streams a strategy from the AI API, then displays it with copy/PDF-download options. Submissions are saved server-side to `api/data/strategy-submissions.{csv,json}`.

**AI Quiz** (`src/pages/AiQuizPage.jsx`): Self-contained quiz feature with question shuffling, hints, and scoring. State management is all local to that page component.

**AI Concierge** (`src/pages/AiConciergePage.jsx`): A content-only marketing page for the premium consulting service. Links to a Calendly booking URL.

### Backend API (`api/`)

`api/v1/chat/completions.php` — OpenAI-compatible endpoint backed by Ollama. Accepts the OpenAI request schema and maps model names (e.g., `gpt-3.5-turbo` → `llama3.2`). Supports streaming via Server-Sent Events.

`api/v1/save-strategy.php` — Saves strategy generation submissions to flat files (`api/data/`). Requires the `api/data/` directory to exist with write permissions on the server.

### External Integrations

- **HubSpot**: Contact form submissions use `src/utils/axiosCall.js` + `src/utils/helpers.js` (`createHubSpotPayload`). Credentials come from `VITE_API_KEY`, `VITE_PORTAL_ID`, `VITE_FORM_ID`, and `VITE_3D_STRATEGY_FORM_ID`.
- **Microsoft Clarity**: Analytics initialized in `App.jsx` using `VITE_CLARITY_ID`.
- **Calendly**: Used on `AiConciergePage` for booking consultations.

## Deployment

CI/CD runs on push to `main` via `.github/workflows/deploy.yml`:
1. Builds the Vite app with secrets injected as env vars
2. Deploys `dist/` to `public_html/` on cPanel via FTP
3. Deploys `api/` to `public_html/api/` via FTP

The `api/data/` directory must be created manually in cPanel with `755` permissions — it is not created by the deploy workflow.
