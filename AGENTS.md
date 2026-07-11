# bharat94.github.io

Bharat Vaidhyanathan's personal site — a "Field Journal" themed portfolio served
by GitHub Pages straight from this repo's `master` branch. Plain static files,
**no build step, no framework, no dependencies**.

## Layout

- `index.html` — the single-page portfolio (hero, Now entry, About, Projects
  carousel, Achievements, Skills, Contact).
- `styles.css` — all styling. Theming via CSS variables on `:root` /
  `[data-theme="dark"]`; paper/ink/accent palette. Match this system — never
  hardcode colors that exist as variables.
- `animations.js` — project card data (`projects` array + `vizMap` sketches),
  ink-draw animations, reveals, theme toggle, tweaks panel. Everything is
  null-guarded so the file is safe to include on any page.
- `interviews/` — the Interviews section: `index.html` (listing, driven by
  `interviews.json`), `_template.html` (per-interview page template),
  one HTML file per published interview.
- `INTERVIEWS.md` — the interview protocol (see below).

## Interviews workflow

**When the user says "interview me", "interview me on/about <topic>", or asks
for a new interview entry: read `INTERVIEWS.md` and follow it exactly.** It
defines how to conduct the interview (one question at a time), edit the
transcript, and publish it (template tokens, manifest update, verification,
push). Never publish without his explicit sign-off on the final draft.

## Conventions

- Verify changes in a real browser before pushing:
  `python3 -m http.server 8741 --directory .` then check desktop + ~390px
  mobile widths, both themes, and the console.
- Fonts: Instrument Serif (display), Caveat (handwritten), JetBrains Mono
  (labels/meta). New UI should reuse these roles.
- Commits: conventional-ish prefixes (`feat:`, `fix:`, `style:`,
  `interview:`), pushed to `master` (that's the deploy).
