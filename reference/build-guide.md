# Building Your Portfolio Site From Scratch

**A step-by-step guide for a first from-scratch build, using open-source tools and Claude as a collaborator.**

What you're building is defined in `portfolio-site-spec-v2.md` and the two wireframes (`wireframe-home.html`, `wireframe-project-detail.html`). Keep all three open as reference throughout — every Claude prompt in this guide assumes you'll paste or attach the spec.

**The stack** (all open source except hosting):

| Tool | What it is | Why it's here |
|---|---|---|
| HTML/CSS/JavaScript | The three native languages of the web: structure, appearance, behavior | The actual site |
| VS Code | A free, open-source code editor from Microsoft | Where you'll write everything |
| Node.js + npm | A JavaScript runtime for your computer + its package manager (the tool that installs and runs other tools) | Required to run Eleventy |
| Eleventy (11ty) | An open-source SSG (Static Site Generator — assembles pages from reusable templates at build time) | One source of truth for your nav, footer, and case-study template |
| Git + GitHub | Version control (tracks every change, lets you undo anything) + the website that hosts Git projects | Safety net and the path to deployment |
| GitHub Pages | Free static hosting (proprietary, but the code it hosts is all yours) | Where the site lives |

**How to use Claude throughout:** Two modes serve different purposes. Use **Claude chat** for decisions, explanations, and reviewing code you paste in. Use **Claude Code / Cowork with your project folder connected** for writing and editing files directly. A good habit for a learning project: have Claude *explain before it writes*, and after any generated code, ask it to walk you through the file line by line. The prompts below are written for that habit.

**Time expectations:** roughly 12–22 hours total for a first build, spread over Phases 0–9. Phase 3 (the signature animation) is the most fiddly; Phase 9 (deployment) is the most "follow the steps exactly." Mobile ships *before* launch (Phase 8) — a portfolio's first visits mostly arrive from shared links opened on phones.

---

## Phase 0 — Set up your Mac (once, ~1 hour)

**0.1 — Install VS Code.** Download from code.visualstudio.com, drag to Applications. Open it once so macOS trusts it. Optional but recommended: in VS Code, install the "Live Server" extension (right-click an HTML file → "Open with Live Server" gives you a browser preview that auto-refreshes when you save — you'll use this constantly in Phases 1–3).

**0.2 — Install Node.js.** Download the LTS (Long Term Support — the stable, recommended line) installer from nodejs.org and run it. Verify in the Terminal app:

```bash
node --version
npm --version
```

Each should print a version number. If you get `command not found`, quit and reopen Terminal first.

**0.3 — Install Git and create a GitHub account.** macOS ships with Git; typing `git --version` in Terminal will prompt you to install Apple's developer tools if it's missing — accept. Then create a free account at github.com. Tell Git who you are:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the same email as your GitHub account.

**0.4 — Create the project folder.**

```bash
mkdir ~/portfolio-site
cd ~/portfolio-site
git init
```

`git init` turns the folder into a **repository** ("repo" — a folder whose history Git is tracking).

> **Claude prompt (chat):** "I'm setting up a Mac for web development for the first time: VS Code, Node.js LTS, Git. I just ran [paste command] and got [paste output/error]. What's wrong and how do I fix it?"

**Checkpoint:** all three version commands print numbers, and `~/portfolio-site` exists with a hidden `.git` folder (`ls -a` shows it).

---

## Phase 1 — Settle the design system (~2 hours, mostly decisions)

Your spec deliberately left the aesthetic layer TBD: color base, typefaces, accent color. Decide them now, *before* writing CSS, and record them as a short design-system file. Known constraints from the spec: **light mode first**, **warm not clinical**, personality from **typography and a warm neutral palette**, a **large serif** for name/headline.

Decide and write down:

1. **Palette** — a warm off-white background, a near-black warm text color, one accent (the hand-drawn oval/arrow want a color that reads as "ink" or "marker"), plus the dark-mode counterparts of each. Aim for 5–7 named colors total, not 20.
2. **Type pairing** — one serif for display (name, headline, section headings), one workhorse for body. Choose from open-source fonts so you can self-host them (download the font files into your project rather than loading from Google's servers — faster, more private, one less dependency). Good hunting grounds: Fontsource or Google Fonts' catalog (the fonts themselves are open-licensed even if the CDN isn't).
3. **Spacing scale** — a small set of allowed spacing values (e.g., 4/8/16/24/40/64px) so the layout feels consistent without per-element fiddling.

Create `design-system.md` in your project folder recording all three, with hex codes and font names.

> **Claude prompt (chat):** "Here's my site spec [paste spec v2]. Propose 3 candidate design systems: each with a warm-neutral light-mode palette (with dark-mode counterparts), an open-source serif display font paired with an open-source body font, and a spacing scale. Explain the personality of each option in one sentence. I'll pick one and we'll refine it."

**Frank note:** this phase has no code and is the easiest to over-polish. Pick a direction you're 80% happy with and move on — you'll tune colors against real content in Phase 5, and everything lives in CSS variables (Phase 2) so changing your mind costs minutes, not days.

**Checkpoint:** `design-system.md` exists with hex codes, two font names, and a spacing scale.

---

## Phase 2 — Build the home page in plain HTML and CSS (~3–4 hours)

This is the fundamentals phase — no Eleventy yet, no JavaScript yet. You'll translate `wireframe-home.html` into a real page. Work in this order:

**2.1 — Structure first (HTML only).** Create `index.html`. Write the full page skeleton with real (or placeholder) content but zero styling: nav, hero band 1 (name, headline, contact affordance, portrait image), hero band 2 (bio, curiosity box), the five project cards, the closing contact card. Use semantic elements — `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>` — rather than a wall of `<div>`s. Open it in the browser: it will look like a 1996 document. That's correct.

**2.2 — CSS variables, then layout.** Create `style.css`. First thing in the file: your design system as **CSS custom properties** (variables — named values like `--color-accent` that the rest of your CSS refers to, so the whole site can be retuned from one block):

```css
:root {
  --color-bg: #faf6f0;      /* your values from design-system.md */
  --color-text: #2b2622;
  --color-accent: #b5502a;
  --space-md: 24px;
  /* ... */
}
```

Then build the layout, matching the wireframe's structural decisions: the ~220px outer margins, the two-band hero **grid** (`grid-template-columns: 1.8fr 1fr`), the contact affordance pinned with `margin-top: auto`, the matched fixed heights on bio and curiosity box, `overflow-y: scroll` on the curiosity box, the circular portrait (`border-radius: 50%`), and the flex-wrap 3-then-2 card grid.

**Write this CSS with the mobile pass (Phase 8) in mind:** prefer flexible units and grid/flex layout over hard-coded absolute positioning wherever possible. The spec's "Mobile adaptation" section locks the mobile intent — desktop CSS written this way makes that pass a linearization, not a rebuild.

**2.3 — Typography and polish.** Self-host your two fonts (`@font-face` rules pointing at font files in a `/fonts` folder), then apply the type scale.

> **Claude prompt (Code/Cowork, folder connected):** "Here's my spec [attach spec v2], my wireframe [attach wireframe-home.html], and my design system [attach design-system.md]. I've written the HTML skeleton in index.html myself. Before you write any CSS: review my HTML and give me frank feedback on my semantic element choices. Then write style.css to implement the wireframe's layout — and walk me through the hero grid section line by line, because I want to understand `fr` units, `gap`, and `margin-top: auto` pinning."

> **Learning prompt (chat), anytime:** "Explain what [property] does in this rule, and what would happen if I removed it: [paste CSS rule]."

**Commit your work** (do this at the end of every phase from now on):

```bash
git add .
git commit -m "Home page: static HTML and CSS"
```

A **commit** is a saved snapshot — the thing that lets you experiment fearlessly afterward.

**Checkpoint:** the home page in a browser matches the wireframe's structure, in your palette and type. Both hero bands align correctly. The curiosity box scrolls independently. No JavaScript exists yet.

---

## Phase 3 — Interactivity in vanilla JavaScript (~3–4 hours)

"Vanilla" JavaScript means plain JavaScript with no framework — the right call at this scale. Three features, in ascending difficulty:

**3.1 — Card hover flyout.** Mostly CSS, not JavaScript: the flyout is hidden by default and revealed on `:hover`. Good first exercise in CSS-only interactivity.

**3.2 — Light/dark toggle.** Small and real: clicking the sun/moon icon swaps a `data-theme` attribute on the page, and your CSS variables have dark-mode values under that attribute — this is where the CSS-variables investment pays off visibly. Persist the choice with `localStorage` (a small browser storage area that survives page reloads) so visitors keep their preference.

**3.3 — The scroll-cue animation (your signature element).** The technique is **SVG stroke animation**: an SVG (Scalable Vector Graphics — shapes defined as code, drawn crisply at any size) path plus the `stroke-dasharray`/`stroke-dashoffset` CSS technique, which reveals a path progressively as if being drawn. Sequence per your spec: hand-drawn oval around "problems" → squiggly arrow in the left margin → "scroll" fades in. Plays once, on a delay, after load.

Two frank warnings from your own spec: the oval must *not* look geometric — you'll iterate on the path shape and easing several times before it reads as a pen stroke, and that iteration is normal, not failure. And the bio copy must be finalized (or at least the sentence containing "problems") before you fine-position the oval, because copy and animation are authored together.

> **Claude prompt (Code/Cowork):** "Implement the scroll-cue animation from my spec [attach]: an SVG path drawing a hand-drawn oval around the word 'problems' in my bio, then a squiggly arrow in the left margin, then 'scroll' fading in. Plays once after a short delay on load. Use the stroke-dasharray technique with hand-tuned easing so it reads as a human pen stroke. Explain how I can adjust the oval's shape and the drawing speed myself, because I expect to iterate on the feel."

> **Accessibility note to include from the start:** wrap the animation in a `prefers-reduced-motion` check (a browser setting users enable when animation bothers them — your CSS/JS can detect it and skip the animation). Ask Claude to include this; it's much easier now than retrofitted.

**Checkpoint:** flyout appears on hover; toggle switches and remembers theme; the animation plays once and feels hand-drawn. Commit.

---

## Phase 4 — Introduce Eleventy (~3 hours)

Now you feel the pain Eleventy solves: you have one page, and five more that share its nav, footer, and head. Instead of copy-pasting, you'll templatize.

**4.1 — Install and configure.**

```bash
npm init -y
npm install @11ty/eleventy
```

`npm init` creates `package.json` (the manifest listing your project's dependencies). Add a minimal `eleventy.config.js` telling Eleventy to pass through your CSS, JS, fonts, and images, and to output the built site into `_site/`. Run the dev server:

```bash
npx @11ty/eleventy --serve
```

**4.2 — Convert what you have.** Move your page's shared shell (everything from `<!DOCTYPE html>` through the nav, and the footer) into a **layout** (`_includes/base.njk` — a Nunjucks template file). Your home page becomes content that declares, in **front matter** (a small metadata block at the top of the file, fenced by `---` lines), which layout wraps it. Break the nav and footer into **partials** (small reusable template fragments included by name).

**4.3 — The case-study template.** This is Eleventy's showcase moment for your site:

- Create `projects/` with one Markdown file per project. Each file's front matter holds its structured fields — title, one-line context, challenge, tools (a list), outcome, and an optional flexible section — and the body holds any prose and images.
- Create one `project.njk` layout implementing your wireframe's detail template: Challenge → Tools rendered as tags (a Nunjucks loop over the front-matter list) → Outcome, with the optional section rendered only when present (an `{% if %}` block — this is exactly the "included or omitted without breaking the template" requirement from your spec).
- Use an Eleventy **collection** (an auto-generated list of all files in a group) to (a) generate the five home-page cards from the same data that builds the detail pages — one source of truth, no drift — and (b) wire up prev/next navigation automatically.

> **Claude prompt (Code/Cowork):** "Convert my static site to Eleventy. Requirements: base layout + nav/footer partials in Nunjucks; a projects collection where each project is a Markdown file with front matter for title, context, challenge, tools (list), outcome, and an optional 'flexible' section that renders only if present [attach wireframe-project-detail.html and spec]; home-page cards and their hover flyouts generated from the same collection; automatic prev/next links. Go step by step and stop after each file so I can read it and ask questions before you continue."

**Frank note:** this phase has the steepest "why is nothing rendering?" moments — usually a front-matter typo or a wrong folder name. Budget patience; paste any error straight to Claude with the file that caused it.

**Checkpoint:** `npx @11ty/eleventy --serve` renders home plus five project pages; editing the nav partial once changes it everywhere; prev/next works. Commit.

---

## Phase 5 — Real content and images (~2–3 hours)

- Write final copy for all five case studies into their Markdown files; finalize bio copy (locking the "problems" sentence) and re-tune the oval position.
- Export/collect images. Resize to the dimensions actually displayed (a 4000px-wide photo in a 204px circle wastes bandwidth) and compress. Use WebP format (a modern image format, much smaller than JPEG/PNG at the same quality); an open-source tool like Squoosh (squoosh.app) handles both resize and convert.
- Every image gets **alt text** (the written description screen readers announce and browsers show if the image fails).

> **Claude prompt (chat):** "Here's my draft case study [paste]. Give me frank feedback against this structure: Challenge (2–4 sentences), Tools, Outcome (2–4 sentences), optional Process section. Then suggest the three short flyout phrases (challenge/tools/outcome) for the home-page card."

**Checkpoint:** all five projects live with real copy and optimized images; bio final; oval positioned. Commit.

---

## Phase 6 — Accessibility pass (~1–2 hours)

Per your spec, mobile is deferred — but accessibility is not, because retrofitting it is far harder than checking it now:

- **Color contrast:** your warm palette must keep text readable — check combinations with a contrast checker (WebAIM's is the standard; aim for the WCAG AA level, the mid-tier of the Web Content Accessibility Guidelines).
- **Keyboard navigation:** Tab through the whole page. Can you reach the toggle, the cards, and every link? Does the card flyout content exist for keyboard users too (hover-only content is invisible to them)?
- **Alt text:** done in Phase 5; verify nothing was missed.
- **Reduced motion:** verify the Phase 3 check works (macOS: System Settings → Accessibility → Display → Reduce Motion).

> **Claude prompt (Code/Cowork):** "Audit my site for accessibility: contrast against WCAG AA in both light and dark mode, keyboard operability (especially the hover flyout and the theme toggle), focus visibility, heading hierarchy, and reduced-motion handling. List issues in priority order, explain each, and fix them one at a time with me."

**Checkpoint:** keyboard-only navigation works end to end; contrast passes AA in both modes. Commit.

---

## Phase 7 — Metadata and SEO basics (~1 hour)

SEO (Search Engine Optimization) at portfolio scale is just hygiene, not a campaign:

- Unique `<title>` and meta description per page (Eleventy front matter makes this per-page data — easy).
- **Open Graph tags** (metadata controlling the preview card shown when your link is shared on LinkedIn, Slack, iMessage). For a portfolio you'll share on LinkedIn, this one actually matters — include a preview image.
- Favicon (the tab icon), plus a `sitemap.xml` (an Eleventy plugin generates it) and `robots.txt`.

> **Claude prompt (Code/Cowork):** "Add per-page titles/descriptions via front matter, Open Graph tags with a share image, a favicon, sitemap.xml, and robots.txt to my Eleventy site. Explain what each Open Graph tag controls."

**Checkpoint:** paste your (eventual) URL into an Open Graph preview tool and get a correct card. Commit.

---

## Phase 8 — Mobile adaptation pass (~2–3 hours, before launch)

Now that desktop is locked, adapt it for phones. The design decisions are already made in the spec's "Mobile adaptation" section; this phase implements them. The tool is the **media query** (a CSS block that applies only below/above a screen width, e.g. `@media (max-width: 700px) { ... }`) — your desktop styles stay untouched, and the query overrides layout at narrow widths.

- **Linearize the hero** to a single column in the locked stacking order: name/headline → contact affordance → photo → bio → curiosity list.
- **Convert the curiosity box:** no internal scroll on mobile; show the 3 most recent entries with a "see more" disclosure that expands the rest in place (native `<details>`/`<summary>` needs no JavaScript).
- **Drop the card flyout** at touch widths — cards just navigate.
- **Simplify or remove the scroll-cue animation** on mobile.
- **Stack the card grid** (likely single column) and retune margins — 220px margins on a 390px phone leaves no room for content; mobile margins will be small.
- **Test on a real phone**, not just a narrowed desktop window: with your Eleventy dev server running, visit your Mac's local address from your phone on the same Wi-Fi (ask Claude for the exact steps). Touch behavior and real type rendering only show up on the device.

> **Claude prompt (Code/Cowork):** "Implement the mobile pass per my spec's 'Mobile adaptation' section [attach spec]: single-column hero in the specified stacking order, curiosity box as a 3-item list with a details/summary 'see more' expansion, flyout dropped, simplified scroll cue, single-column cards, mobile-scale margins. Use media queries so desktop is untouched. Before writing code, tell me which breakpoint width you'd choose and why."

**Checkpoint:** the site is usable and tidy on your actual phone; desktop is unchanged. Commit.

---

## Phase 9 — Deploy to GitHub Pages + custom domain (~1–2 hours)

**9.1 — Push to GitHub.** Create an empty repository on github.com, then connect and push:

```bash
git remote add origin https://github.com/YOURNAME/portfolio-site.git
git push -u origin main
```

**9.2 — Automate the build.** GitHub Pages serves static files, but your site needs Eleventy to *build* first. The standard solution is a **GitHub Actions workflow** (a small YAML file in your repo that tells GitHub: on every push, run Eleventy, publish `_site/` to Pages). Ask Claude for the file — this is a well-worn path with an official recipe.

**9.3 — Buy and connect a domain.** Registrars are just vendors; pick a reputable one with transparent renewal pricing (Porkbun and Cloudflare Registrar are commonly recommended; expect ~$10–20/year — beware first-year teaser prices with expensive renewals). Then: add the domain in your repo's Pages settings, and at the registrar create the DNS records GitHub specifies (DNS — the Domain Name System, the global directory mapping names like yourname.com to servers). Enable "Enforce HTTPS" once DNS propagates (can take from minutes to a day or two).

> **Claude prompt (Code/Cowork):** "Set up deployment: a GitHub Actions workflow that builds my Eleventy site and publishes to GitHub Pages on every push to main. Then walk me through connecting the custom domain I bought at [registrar] — exact DNS records and where they go — and explain what each record does."

**Checkpoint:** pushing a commit updates the live site automatically; your domain loads it over HTTPS. **You've shipped.**

---

## Phase 10 — Post-launch (optional, anytime)

- **Privacy-friendly analytics** — if you want visit data: Plausible or Umami (both open source; both offer paid hosting or free self-hosting — for one portfolio, paid hosting or *no analytics at all* is the sane choice; self-hosting is its own project).
- **A `README.md`** in the repo describing the project — recruiters and fellow developers do look, and for a portfolio, the repo itself is a portfolio piece.

---

## Working rhythm (applies to every phase)

1. **Read before you run.** When Claude writes a file, read it and ask about any line you couldn't explain to someone else.
2. **One change, then look.** Small edits with the browser preview open beat big batches — you always know which change broke (or fixed) things.
3. **Commit at every checkpoint**, minimum. Cheap insurance, and the habit itself is a professional skill you're here to learn.
4. **Paste errors verbatim to Claude** — error message + the file it points at. Never retype or summarize an error; the details are the diagnosis.
5. **When stuck for 20+ minutes, change modes:** ask Claude to explain the *concept* rather than fix the *code*. Understanding is the deliverable of this project; the site is the receipt.
