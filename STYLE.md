# Crimson Index Style Guide

This is the active visual source of truth for the portfolio. It supersedes the
Rams-era build spec in `DESIGN.md`.

## Intent

The site is a technical record with a sharp graphic face. It should feel like
an independent systems archive, not a generic developer landing page.

Lead with the evidence: a crew clock-in that must be correct, payroll that
cannot stall, hardware that has to survive a real home or car. Type and layout
give those stories pressure; they do not replace them.

## Color

| Token | Value | Use |
| --- | --- | --- |
| Jet black | `#080808` | Primary background |
| Crimson | `#E3153B` | Signal color, rules, key words, active states |
| Crimson deep | `#8D1028` | Quiet rules and secondary separation |
| Paper | `#F4F1EB` | Primary text and light contact surface |
| Muted paper | `#AAA39D` | Secondary copy on black |

Use black as the field and crimson as the signal. Paper is a neutral for
legibility, not an additional theme color. Do not add gradients, purple, blue
accent treatments, glass effects, glow, or decorative blobs.

## Typography

- **Display and interface:** Geist, 500-600 weight.
- **Editorial copy:** Source Serif 4, 400 weight.
- **Labels, metadata, and technical strings:** JetBrains Mono, 11px, uppercase.

Large type can be emphatic, but it must preserve a clear reading order. Use
fixed type sizes with responsive breakpoints instead of viewport-scaled type.
Keep tracking at `0` for display copy. Mono labels may use positive tracking
for legibility.

## Layout

- Maximum content width: `1440px`.
- Side padding: `72px` desktop, `48px` tablet, `24px` mobile.
- Sections are full-width bands separated by 1px crimson or deep-crimson rules.
- Repeated records use columns, indices, and rules. Avoid floating cards.
- Keep a visible hint of the next section at the bottom of the hero.
- Mobile collapses to a single readable column; never rely on horizontal scroll.

## Components

### Navigation

Use a 64px black bar with a crimson rule, `EK` at left, dense mono links in the
center, and a crimson contact cue at right. On mobile use a full-screen black
drawer with plain oversized links.

### Hero

Use one blunt proposition in large display type. A crimson phrase may carry the
emphasis. Pair it with one concrete paragraph and a small factual status list.
No hero image, no animated cursor, no rotating taglines.

### Project Records

Every record contains an index, role, title, subtitle, narrative, year, stack,
and a technical visual. Technical visuals must be tied to real work: product
marks, system topology, a real screenshot, a schematic, a photo, or a measured
artifact. Decorative mockups are not evidence.

### About and Contact Bands

Use a red About band and a paper Contact band to break the black archive. These
are the only large surface inversions. Keep copy specific and direct.

### Resume

Keep the resume available as a real PDF record. Place the viewer after
experience, with a direct open/download link and a stable framed height. The
PDF is a source document, not a replacement for the accessible HTML record.

### Skills and Small Projects

Treat both as an index. Use text, dividers, and columns; do not use pills,
skill bars, progress meters, or badge clouds.

## Motion

Motion is structural and brief. Use 160-220ms color, underline, and menu
transitions. Do not restore smooth scrolling, parallax, pinned scrollytelling,
letter-by-letter reveals, or decorative entrance choreography unless it helps a
visitor understand the project record.

All interactions must remain usable with `prefers-reduced-motion`.

## Content Rules

- Write in first person with named constraints, people, places, and numbers.
- Lead project narratives with the problem, then the system.
- Let personal details do the work: the intercom for Mom, fifty people on
  payroll, an overnight sensor budget, a dispatch spreadsheet that cannot lock.
- Avoid generic “product thinking” language, generic AI imagery, and empty
  statements about craft.

## Accessibility

- Preserve visible crimson focus outlines with at least a 2px offset.
- Keep body copy large enough to read on black: 14px minimum, 15-16px preferred.
- Every icon-only control needs an accessible label.
- Use real text for essential labels and project information.
- Verify no horizontal overflow at 390px and 1440px before shipping.

## Deployment

The site builds as static Astro output in `dist/`. Keep it static unless a
future feature needs runtime state. Cloudflare Pages serves `dist` directly;
the Workers configuration in `wrangler.jsonc` serves the same files via static
assets and applies the security headers from `src/worker.ts`.
