---
name: RHIA Showcase
description: Public showcase pages — a recruiter's dossier read and annotated on a navy desk.
colors:
  navy: "#062353"
  navy-deep: "#041a3f"
  navy-raise: "#0a2c66"
  paper: "#ffffff"
  ground: "#edf0f6"
  ground-2: "#e2e7f1"
  ink: "#0a1f44"
  ink-2: "#3b4a66"
  ink-3: "#5b6a85"
  rule: "#d6dce8"
  rule-soft: "#e7ebf3"
  blue: "#5271f3"
  blue-ink: "#3552e0"
  blue-soft: "#e8edff"
  hero-mark: "#3d5cf0"
  violet: "#6d50ef"
  violet-ink: "#5b3fe0"
  violet-soft: "#efebff"
  sky: "#17abf7"
  amber-ink: "#8a5300"
  amber-soft: "#fff3df"
  red-ink: "#b42318"
typography:
  display:
    fontFamily: "Mona Sans Variable, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.15rem + 4.1vw, 4.3rem)"
    fontWeight: 760
    lineHeight: 1.01
    letterSpacing: "-0.028em"
  heading:
    fontFamily: "Mona Sans Variable, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 2.6vw, 3.3rem)"
    fontWeight: 720
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Mona Sans Variable, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 1.1rem + 1.1vw, 2rem)"
    fontWeight: 680
    lineHeight: 1.12
    letterSpacing: "-0.022em"
  lead:
    fontFamily: "Mona Sans Variable, system-ui, sans-serif"
    fontSize: "clamp(1.08rem, 1rem + 0.35vw, 1.28rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Mona Sans Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 420
    lineHeight: 1.62
  label:
    fontFamily: "Mona Sans Variable, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 680
    lineHeight: 1.4
    letterSpacing: "0.08em"
  data:
    fontFamily: "JetBrains Mono Variable, ui-monospace, monospace"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  paper: "4px"
  sheet: "3px"
  token: "6px"
  control: "10px"
  button: "12px"
  window: "16px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(80px, 10vw, 152px)"
  stage: "clamp(72px, 8vw, 120px)"
  wrap: "1240px"
  nav: "72px"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.button}"
    padding: "0 22px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "#e9eeff"
  button-small:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "40px"
  token:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.token}"
    height: "26px"
  token-match:
    backgroundColor: "{colors.blue-soft}"
    textColor: "{colors.blue-ink}"
  token-generated:
    backgroundColor: "{colors.violet-soft}"
    textColor: "{colors.violet-ink}"
  paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "22px 24px"
  dossier-tab:
    backgroundColor: "{colors.ground-2}"
    textColor: "{colors.ink-3}"
    rounded: "10px 10px 0 0"
    padding: "11px 18px 12px"
  dossier-tab-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
---

# Design System: RHIA Showcase

Scope: this showcase site (`/`, `/entreprises`, `/candidats`, `/confiance`). Every rule is scoped under the `.vt` root class in `src/vitrine.css`. The RHIA application itself keeps its own interface system and is not described here.

## Overview

**Creative North Star: "Le Dossier"**

The page is the recruiter's open dossier: crisp white paper documents — a CV, a job sheet, a score slip, a quiz, an interview report, a decision — laid on a deep navy desk, read and annotated live. Navy is the logo's own ink, so the desk *is* the brand. The product is proven by showing these documents doing their job (on labelled synthetic data), never by claims, logos or statistics.

Colour carries meaning, not decoration: what RHIA reads or marks is blue (the highlighter), what RHIA generates is violet, what is live is sky. Everything else is navy ink on paper.

**Key Characteristics:**
- Full-bleed navy "desk" fields for heroes, the interview band and the close; cool light ground for reading sections.
- Paper documents with near-square corners and real, offset, soft shadows; small rotations only where documents lie on the desk.
- One type family (Mona Sans, variable width): expanded heavy display, normal-width text; JetBrains Mono strictly for data.
- Folder-tab dividers as section navigation, sticky under the nav.

## Colors

### Primary
- **Desk Navy** (`#062353`): hero, cover, interview band and closing grounds; ink of the wordmark; primary button text.
- **Highlighter Blue** (`#5271f3`): marks what RHIA reads — highlighter strokes, matched checkboxes, progress fills, focus rings. Use `blue-ink` (`#3552e0`, 6.1:1 on white) for any blue text.

### Secondary
- **Generated Violet** (`#6d50ef` / ink `#5b3fe0`): anything RHIA produces — proposed form fields, generated quizzes, "to review" states, the Y threshold.

### Tertiary
- **Live Sky** (`#17abf7`): live indicators only (the pulsing dot, live labels in the interview room).

### Neutral
- **Paper** (`#ffffff`), **Ground** (`#edf0f6`), **Ground 2** (`#e2e7f1`), **Ink** (`#0a1f44`), **Ink 2** (`#3b4a66`), **Ink 3** (`#5b6a85`, 4.8:1 on ground), **Rule** (`#d6dce8`).
- On navy, text is white at 100 / 74 / 56% opacity.

### Named Rules
**The Meaning Rule.** Blue = read or matched by RHIA, violet = generated by RHIA, sky = live. Never use these hues decoratively.

**The Highlighter Rule.** Emphasis in running text is a highlighter stroke behind the word (`.vt-mark`), never gradient text or a colour change.

## Typography

**Display / text:** Mona Sans Variable (self-hosted via `@fontsource-variable/mona-sans/wdth.css`), width axis 100–118%.
**Data:** JetBrains Mono Variable — skill tokens, candidate IDs, scores, file names, code-like placeholders such as `[NAME]`.

### Hierarchy
- **Display** (760, stretch 116%, `clamp(2.5rem, 1.15rem + 4.1vw, 4.3rem)`, lh 1.01, -0.028em): page heroes only; `text-wrap: balance`.
- **Heading** (720, stretch 112%, up to 3.3rem): section titles.
- **Title** (680, stretch 108%, up to 2rem / 2.35rem `--lg`): stage and feature titles.
- **Lead** (400, up to 1.28rem, lh 1.5, max 37em).
- **Body** (420, 1.0625rem, lh 1.62, max 36em).
- **Label** (680, 0.7rem, uppercase, +0.08em): document tags and table heads *inside* documents only.

### Named Rules
**The No Eyebrow Rule.** Nothing sits above a section heading. Uppercase labels exist only as tags printed on documents.

**The Data Face Rule.** Monospace is for data the product handles, never for "tech" atmosphere.

## Layout

- Wrap: `min(1240px, 100% - 2 × gutter)`, gutter `clamp(16px, 4vw, 48px)`.
- Sections: `clamp(80px, 10vw, 152px)` vertical padding; journey stages `clamp(72px, 8vw, 120px)`.
- Stage grid: 5 / 7 columns at ≥960px, alternating sides; the screening stage breaks to full width; the interview stage is a navy band; the decision stage centres its slip.
- Hero (≥1100px): headline over the left ~64%; the score slip sits top-right; job sheet and CV fan out below, the CV rising beside the CTA row so the whole read-through fits a 1440×900 first viewport. Below 720px: CV leads, the slip clips onto its corner, the job sheet is hidden.
- Breakpoints in use: 520, 640, 720, 760, 860, 960, 1000, 1100px.
- `html` scroll-padding = nav + sticky tabs, so anchored jumps land under the dividers.

## Elevation & Depth

### Shadow Vocabulary
- **paper** (on light ground): `0 1px 1px rgba(4,26,63,.06), 0 8px 18px -8px rgba(4,26,63,.22), 0 28px 56px -28px rgba(4,26,63,.4)`.
- **desk** (on navy): `0 1px 1px rgba(0,6,20,.2), 0 14px 28px -12px rgba(0,6,20,.5), 0 40px 80px -36px rgba(0,6,20,.7)`.
- The navy desk carries a faint 22px dot grid fading downward (`.vt-desk::before`).

### Named Rules
**The Paper Rule.** Depth comes from paper lying on a surface: offset, soft, layered shadows. No glows, no hard offset shadows, no glass panels (the scrolled nav's blur is for legibility only).

## Shapes

Paper 3–4px; tokens 6px; controls 10px; buttons 12px; app windows (interview room, camera preview) 16px; dossier tabs 10px top corners only. Rotations: −4° to +3° for documents on the desk, never on UI controls.

## Components

### Buttons
Primary is a paper button on navy (`#fff` / navy text, 52px, radius 12). Hover `#e9eeff`; press `scale(0.97)` over 160ms. Arrow icons nudge 3px on hover (pointer devices only). Text links are inline, underlined at 5px offset, 1.5px thick, so a wrapped link keeps its arrow after the last word.

### Chips / Tokens
26px mono tokens; `match` (blue) for recognised skills, `learn` (violet) for suggested skills, `bonus` neutral. Chips in the body face for plain labels (departments).

### Navigation
Fixed 72px navy nav, transparent over the hero, `rgba(6,35,83,.9)` + blur once scrolled. Active page underlined in blue. FR | EN segmented switch. Below 960px a full-height navy sheet menu wipes in (clip-path, 280ms) with links staggered 40ms.

### Dossier Tabs (signature)
Sticky folder dividers under the nav. The active state is a clipped duplicate of the whole tab list; the clip moves (300ms, strong ease-in-out) so text and background change as one. On covers the strip is navy and the active tab takes the ground colour, joining the page below.

### Dossier Spread (signature)
The hero demonstration: PII values are wiped over by navy redaction bars naming what was removed (`[NAME]`, `[EMAIL]`…), a blue reading line sweeps the CV, each matched spelling gets a highlighter stroke and its canonical token appears in the margin column, the job sheet's checklist ticks, and the score counts to its final value. Plays once (replayable); reduced motion shows the finished state.

## Do's and Don'ts

### Do:
- **Do** prove features with a working document on synthetic data, and label it ("Données fictives").
- **Do** keep blue for what RHIA reads, violet for what it generates, sky for what is live.
- **Do** use the strong curves: `cubic-bezier(0.23, 1, 0.32, 1)` for entrances, `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement; animate transform, opacity, clip-path, filter only.
- **Do** give each document its own native motion (fields filling, transcript arriving, stamp landing) instead of one shared entrance.
- **Do** gate hover motion behind `(hover: hover) and (pointer: fine)` and honour `prefers-reduced-motion` by showing final states.

### Don't:
- **Don't** add client logos, usage statistics, testimonials or prices until they are real.
- **Don't** put eyebrows or kickers above headings, or use gradient text.
- **Don't** build sections from rows of same-size icon cards; use documents, ledgers and ruled lists.
- **Don't** fade text below AA to show a de-emphasised state; change its colour instead.
- **Don't** use `transition: all`, `ease-in`, or entrances from `scale(0)`.
