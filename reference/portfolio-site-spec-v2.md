# Portfolio site — structural specification (v2)

**Overall model.** A single-page site for the home view (hero + project index + contact) plus five standalone project detail pages. **Static site**, **desktop-first**; mobile is a later adaptation pass (not wireframed yet), but its structural intent is locked — see "Mobile adaptation" below. Structural reference: annakawakami.com — borrow its skeleton, not its "science" aesthetic.

## Global elements (all pages)

- A persistent, **centered nav bar** with links: about, work, contact, followed by a **light/dark mode toggle** rendered as a **sun/moon icon only** (☀/☾, no text) sitting within the centered link group, immediately right of "contact."
- **Generous outer margins** (~220px per side at a 1280px canvas; wide left/right whitespace) as a primary layout device.

## Home page

### Hero — asymmetric split, two aligned bands

The hero is an **asymmetric (split) layout**: a wide left column (~1.8fr) and a narrower right column (~1fr), organized as a **2×2 grid** forming two horizontal **bands**.

**Band 1 — intro:**

- Left: name + lofty headline (**large serif**), with a **contact affordance** pinned to the bottom of the band.
- Right: a **portrait photo in a circular crop** (`border-radius: 50%` on a square image), centered in the column.
- **Alignment rule:** the bottom of the contact affordance must not sit lower than the bottom of the photo (pin via `margin-top: auto` in a flex column, with the band's row height set by the photo).

**Band 2 — bio + curiosity box:**

- Left: the **bio**, a **fixed-height block**. Copy may end short of the block; whitespace below the copy is acceptable by design.
- Right: a **"currently curious about" box** implemented as an **independent scroll container** (`overflow-y: scroll` — scrolls separately from the page), analogous to the reference's "Latest updates."
- **Alignment rule:** both blocks share the **same fixed height**, so they start AND end together. This decouples layout from copy length entirely — no tuning of bio length against box height is required.

### Scroll cue animation (the signature element)

- The word **"problems"** appears in the bio copy. An **SVG path animation** draws a hand-drawn oval around it (**progressive stroke reveal**, hand-tuned **easing** so it reads as a human pen stroke, not a geometric shape).
- The same "pen" then draws a **squiggly arrow in the left outer margin**, beside the bio, and the word "scroll" fades in beneath it.
- Plays **once**, on a short delay after page load (not on loop).
- Bio copy must be written so "problems" lands in a predictable position (near the end of a middle line) for the oval to look intentional — **copy and animation are authored together**. The fixed-height bio block makes this position stable.

### Project index

- Below the hero: five clickable **project cards** in a **centered 3-then-2 grid** (three across, two centered beneath). Implement with **flex-wrap + centered justification** (not CSS Grid) so the partial second row centers naturally. Card width must be sized so three cards + gaps fit the content width inside the wide margins.
- Card text is centered.
- On desktop, hovering a card reveals a **preview panel (flyout)** with three short phrases — **challenge, tools, outcome** (condensed versions of the detail page's three core sections).
- Clicking a card navigates to that project's detail page.

### Closing contact

- Below the cards: a closing **contact card** with links — email via `mailto:` to a **purpose-made forwarding address** (not a personal inbox), LinkedIn, resume, etc.

## Project detail page (×5)

A scrollable **case study** sharing one template:

- **Back link** at top (← back to work).
- Title + one-line context, then a lead image.
- **Consistent section shape:** Challenge → Tools (**rendered as tags**) → Outcome.
- One **optional flexible section** (e.g. "My role," "Process") that can be included or omitted per project without breaking the template; when omitted, Tools flows directly to Outcome.
- Supports **multiple images** (lead image plus repeatable supporting-image rows with captions).
- **Prev/next navigation** at the bottom, cycling through the five projects.

## Mobile adaptation — design pass deferred, intent locked

Mobile is wireframed and built **after the desktop version is locked**, but these decisions are already made and must not be contradicted by desktop implementation choices:

- **Single-column linearization.** Hero stacking order, top to bottom: name/headline → contact affordance → portrait photo → bio → curiosity list.
- **Curiosity box loses its internal scroll** (no scroll-container-within-scrolling-page on touch). It becomes a **plain list of the 3 most recent entries** with a small **"see more" link** that expands the full list in place (a native `<details>`/`<summary>` disclosure is a good implementation candidate).
- **The card hover flyout is dropped on mobile** — hover has no touch equivalent. Cards navigate directly to detail pages, which contain the same information.
- **The scroll-cue animation is dramatically simplified or omitted** on mobile.
- **Build implication for desktop CSS:** prefer flexible units and avoid hard-coded absolute positioning where possible, so linearization is an adaptation, not a rebuild. Respect `prefers-reduced-motion` on all animation at every breakpoint.

## Aesthetic layer — TBD, do not infer

Color base, typeface, and accent color are **open decisions**; treat as TBD. Known direction only: **light mode is the priority** (the light/dark toggle is planned), the temperature is **warm rather than clinical**, and personality is expected to come substantially from **typography and a warm neutral palette**.
