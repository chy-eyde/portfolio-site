# CLAUDE.md — portfolio-site

Standing context for this project. Read before making changes.

## What this is

A personal portfolio site for Chyanne Eyde: a single-page home (hero + project
index + contact) plus five standalone project detail pages. Static site,
desktop-first, with a deferred-but-locked mobile pass. Full structural spec lives
in `docs/portfolio-site-spec-v2.md` — treat it as the source of truth for layout
decisions, and don't contradict its "Mobile adaptation" section in desktop code.

## Stack

- Hand-written HTML / CSS / vanilla JavaScript (no framework — correct at this scale).
- Eleventy (11ty) as the static site generator, introduced once the five detail
  pages need to share one template (see build guide, Phase 4). May not be wired up yet.
- Self-hosted fonts and inline SVG icons — **no external dependencies, no icon-font
  libraries, no CDN font loads.** Keep it that way; it's a deliberate choice.
- Git + GitHub, deploying to GitHub Pages.

## How I want to work (I'm learning — this matters)

This is a first from-scratch build. The site is the receipt; understanding is the
deliverable.

- **Explain before you write.** For non-trivial changes, walk me through the plan
  first. After generating code, walk me through it — line by line if I ask.
- **One change, then look.** Prefer small edits I can preview and understand over
  large batches.
- **Kind but frank feedback.** Point out my weaknesses directly — that's how I grow.
  Don't paper over a shaky choice to be nice.
- **Spell out acronyms** on first use, and if it's a concept I'm learning, add a
  one-line definition. E.g. "cwd (current working directory — the one folder the
  tool can see and edit)."
- **Flag clunky language.** If I describe something the long way and there's a
  standard technical term, tell me the term — I probably just don't know it yet.
- **Be concise.**
- **Don't auto-generate browser previews.** I view changes myself via VS Code's Live
  Server — only open a preview in Code when I explicitly ask for one.
- **Commit at every checkpoint**, and before any large generated edit — cheap insurance.
- **Errors:** I'll paste them verbatim; do the same diagnosis-from-the-actual-text.

## Design system (single source of truth: the `:root` block in `style.css`)

Change values there, not inline. Everything cascades from CSS custom properties.

- **Palette (light mode is the priority):** warm paper bg `#F4EEE3`, lifted surface
  `#FBF7EF`, warm near-black text `#24211B`, muted `#7C7362`, evergreen "ink" accent
  `#1E5A50`, accent-strong (hover) `#123F38`, hairline `#E2D9C8`. Dark-mode
  counterparts are defined under `[data-theme="dark"]`.
- **Type:** Fraunces (display — name, headings) paired with Work Sans (body). Serif
  display, sans body.
- **Spacing scale:** 4 / 8 / 16 / 24 / 40 / 64px, as `--space-xs … --space-2xl`.
  Stay on the scale; avoid one-off pixel values.
- **Layout:** `--content-width: 880px` (generous margins come from capping width and
  auto-centering), `--radius: 4px`.

## House rules (learned the hard way — please enforce)

- **One CSS rule per selector.** No duplicate blocks for the same selector — a stray
  second block silently overrode things twice on this project. If a selector needs
  more properties, add them to its existing rule.
- **Give layout-critical `var()` a fallback:** `height: var(--x, 230px)`. A stale or
  mistyped variable name otherwise collapses the whole declaration to its default
  (e.g. `height: auto`), which is a silent bug.
- **Name a class for what the element _is_,** not what it contains. The Latest
  Updates region is `.latest`; the scrolling part inside it is `.latest-scroll`.
  BEM-style (`.block__element`) is fine if we formalize it.
- **Prefer a class over a bare-element selector.** Use `.section-intro`, not
  `.work p` — element selectors catch future elements you didn't mean to style.
- **Write desktop CSS with the mobile pass in mind:** flexible units, grid/flex,
  avoid hard-coded absolute positioning, so mobile is a linearization not a rebuild.
- **Accessibility is not deferred.** Icon-only links get `aria-label`; decorative
  SVGs get `aria-hidden="true"`; wrap animation in `prefers-reduced-motion`; keep
  a visible `:focus-visible` ring; every image gets alt text; contrast targets WCAG
  AA in both light and dark mode.

## Contact / privacy note

The site's email link uses a purpose-made forwarding address, **not** the personal
Gmail. Any `mailto:` in the code is a placeholder until that address exists.

## Status

Phase 2 (static HTML + CSS) largely done. Next up: Phase 3 interactivity — card
hover flyout, light/dark toggle, and the signature scroll-cue SVG animation. Update
this line as phases complete.
