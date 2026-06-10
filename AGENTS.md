# AGENTS.md

## Project purpose
This repository contains an ad‑revenue website focused on MLB ballpark and weather analytics.  The goal is to provide fans with daily environment reports and evergreen explainers while prioritizing speed, usefulness, accessibility, search quality and monetization safety.

## Commands

This site is completely static and has no build step.

- **Install**: none (no dependencies)
- **Build**: none (HTML files are ready as‑is)
- **Test**: ensure HTML and CSS validate and pages render correctly in browsers.
- **Lint**: not applicable; however, keep markup tidy and consistent.

## Hard rules

- **Never commit secrets.**  Do not embed API keys, personal data or other confidential information in this repository.
- **Do not deploy to production automatically.**  Publishing to the live domain should always require human approval.
- **Do not modify ad code without approval.**  Ad‑network script inclusion or configuration must be reviewed.
- **Do not create thin, duplicate or doorway‑style pages.**  Every page should provide distinct value and adhere to quality guidelines.
- **Do not delete content without approval.**  Removing pages should involve a review of traffic and SEO impact.
- **Do not change canonical URLs without approval.**  Modifying URLs can harm SEO if done incorrectly.
- **All changes must pass HTML validation and maintain accessibility.**

## SEO rules

- Each page must include a meaningful `<title>`, a concise `meta description`, and, where appropriate, a `<link rel="canonical">` element.
- Pages must provide unique and valuable content; avoid mass‑generated generic pages.
- Cite factual claims and sources when possible, especially for technical explanations or data‑driven assertions.
- Prefer useful tools, data and original analysis over filler articles.
- Include structured data (JSON‑LD) when appropriate to enhance search visibility (e.g., articles, FAQs, events).

## Required completion report

At the end of every automated coding task, summarise:

1. **Files changed** – list of created, modified or deleted files.
2. **Tests run** – indicate any validation steps (e.g., HTML validation) and whether they passed.
3. **Risks** – potential issues or side‑effects from the changes.
4. **Recommended next step** – what a future task should focus on.

Following these guidelines helps ensure that work done by AI agents (and human collaborators) aligns with the project’s goals and maintains quality and compliance.
