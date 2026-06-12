# Helipad Effect MLB

This is the pilot website for ballpark & weather analytics focused on Major League Baseball games. It provides daily environment reports, explanations of methodology, and resources for understanding how stadium conditions impact hitting.  The primary goal is to create useful, original content that can be monetized responsibly through advertising without running afoul of search or ad‑network policies.

## Structure

Key files and directories:

- `index.html` – Home page describing the site and linking to other pages.
- `daily-barrel-report.html` – A demonstration daily report that computes
  Helipad Index values for each park using sample weather conditions.
- `methodology.html` – Explains the methodology behind the Helipad Index
  and environment analysis.
- `daily-report-template.html` – (Legacy) Template for daily reports with
  placeholders for data. This is superseded by `daily-barrel-report.html` but
  retained for reference.
- `style.css` – Basic styling for the site.
- `data/parks.json` – Minimal ballpark profiles including orientation,
  baseline factors, wind sensitivities and roof type. Expand this to all
  thirty parks.
- `assets/js/helipad-model.js` – Core physics and scoring engine used by
  the demonstration report.
- `assets/js/app.js` – Client script that loads park data, generates
  sample conditions and populates the daily report table.
- `docs/MODEL_NOTES.md` – Technical notes summarising the research basis
  for the model and explaining key variables.
- `docs/ROADMAP.md` – Roadmap outlining planned improvements.
- `AGENTS.md` – Guidelines for AI coding agents working on this project.

## Getting Started

This is a static site; simply open `index.html` in your browser. To view a
working example of the Helipad Index calculations, open
`daily-barrel-report.html` which will generate scores based on randomly
seeded sample weather conditions. To publish, host these files on a
static web‑hosting service (e.g., GitHub Pages, Cloudflare Pages, or
DigitalOcean App Platform).

Feel free to extend the site by adding markdown or HTML files for
evergreen pages such as stadium guides or factor explainers. When adding
dynamic behaviour, keep scripts within the `assets/js` directory.

## Contributing

When using an AI coding agent to modify this repo, please follow the instructions in `AGENTS.md`.  Human collaborators should also adhere to these guidelines to ensure changes are safe, valuable, and compliant with best practices.
