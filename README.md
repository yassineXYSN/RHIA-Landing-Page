# RHIA — Showcase site

Public presentation site for **RHIA**, an AI-assisted recruitment platform (final-year project, 2026). Four pages, French by default with an English switch:

| Page | Path | For |
| --- | --- | --- |
| Home | `/` | Everyone — what RHIA does, the hiring pipeline end to end |
| Companies | `/entreprises` | HR teams — offers, screening, quizzes, interviews, team |
| Candidates | `/candidats` | Job seekers — profile from CV, applications, interviews |
| Trust | `/confiance` | What data is analysed, kept, and never kept |

The site is static (React + Vite) and has no backend. Its sign-in buttons and the terms link open the real application (see `src/config.js`).

## Notes for reviewers

- **Every product statement maps to a real feature** of the RHIA codebase. The documents on the pages (CV, job sheet, ranking, quiz, interview, decision) are **demonstrations built with synthetic data** and are labelled as such. There are deliberately no client logos, usage figures or testimonials.
- Skill counts in the "Nine engines" section are the real sizes of each matching engine's canonical vocabulary.
- Design rules (palette, type, motion, components) are documented in [DESIGN.md](DESIGN.md). Logo files are in [`brand/`](brand/).
- Animations respect the system "reduce motion" setting (the pages then show their final state).

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Deploy to GitHub Pages

1. Create a repository on GitHub and push this folder to its `main` branch.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds and publishes the site (workflow in `.github/workflows/deploy.yml`). The address appears in the workflow run and in Settings → Pages, typically `https://<user>.github.io/<repo>/`.

Optional: to point the sign-in buttons somewhere other than the default application URL, add a repository variable **`APP_URL`** (Settings → Secrets and variables → Actions → Variables).

Direct links to inner pages (e.g. `/<repo>/entreprises`) work: the build copies `index.html` to `404.html`, which GitHub Pages serves for unknown paths.

## Structure

```
src/
  App.jsx            routes
  VitrineLayout.jsx  navigation, mobile menu, footer
  pages/             Home, Companies, Candidates, Trust
  components/        demo documents (DossierSpread, FunnelBoard, …), tabs, logo
  content.js         all copy, FR + EN, and the synthetic demo data
  vitrine.css        the design system, scoped under .vt
  config.js          URL of the real application
```
