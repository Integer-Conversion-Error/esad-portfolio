# Terminal Portfolio Style Guide

This is the active visual and content guide for the portfolio. The landing page
reads as one continuous, oversized Ubuntu-inspired terminal session, from the
brief login in the hero through the final contact prompt.

## Intent

Show what each system does for people and where the work runs. A visitor should
understand the outcome of a project before reading its tools. Keep the terminal
language useful: commands orient readers, and links take them somewhere real.
Do not add decorative status text, fake input fields, or small labels that repeat
nearby content.

## Color

| Token | Value | Use |
| --- | --- | --- |
| Terminal black | `#0B0A0D` | Main background across the landing page |
| Ubuntu orange | `#E99855` | Prompts, key outcomes, links, focus, and rules |
| Paper | `#F4F1EB` | Main text |
| Muted paper | `#B8AEB2` | Supporting text |
| Quiet rule | `#51454B` | Dividers and visual frames |

Use near-black as a continuous field. Orange signals structure and action; it
should not color every line. Small shifts in dark surfaces may separate a visual
or document preview. Avoid gradients, glow, glass, and unrelated accent colors.

## Typography

- Use JetBrains Mono for the landing page's headings, body, prompts, and links.
- Make headings and outcomes large enough to carry the hierarchy without relying
  on a second display or serif face.
- Keep body copy at least 14px, preferably 15-16px. Supporting text must remain
  readable on phones; avoid decorative 11px uppercase copy.
- Use short lines, sensible wrapping, and fixed responsive type sizes. Do not let
  a long command or email address cause horizontal scrolling.

## Layout

- Maximum content width: `1440px`.
- Side padding: `72px` desktop, `48px` tablet, `24px` mobile.
- Use section prompts and quiet rules to organize the page. Keep generous space
  between sections and a visible hint of the next section below the hero.
- Project records can pair concise copy with a real visual on desktop. Stack
  title, outcome, evidence, visual, and actions into one reading column on mobile.
- Avoid floating cards, badge clouds, and repeated labels that add length without
  helping navigation.

## Components

### Navigation and hero

Keep navigation simple, with working anchors to the portfolio sections and
writing page. Mobile navigation needs a readable, keyboard-accessible menu.

The hero uses a brief Ubuntu-style login, then presents one large proposition,
three concrete areas of work, and a clear link to selected work. The content
must be present without JavaScript and immediately available when reduced motion
is requested. Do not repeat the login animation elsewhere.

### Project records

Lead with a short, concrete outcome. Follow it with one evidence line explaining
the system or constraint. Keep the project name, real visual, and any visit or
source links easy to find. Use actual screenshots, product marks, diagrams,
photos, or measured artifacts when available. Do not present decorative
mockups as proof or imply a result that has not been measured.

### Experience, about, tools, and other work

Show the strongest result or deliverable for each role; do not reproduce a full
resume on the page. Keep About to a few specific sentences. Curate the tools to
the capabilities demonstrated by the projects rather than listing every skill.
Show small projects as compact one-line records with their real source links.

### Resume and contact

Keep `/resume.pdf` available through clear open and download links. A preview
may be optional or collapsed so four pages of embedded PDF do not interrupt the
portfolio. End with a direct email action and the existing profile links.

## Copy

- Write in first person where it helps explain ownership; prefer concrete verbs,
  users, constraints, and outcomes over long implementation narratives.
- Keep claims proportional to the evidence. Describe work in progress as work in
  progress; do not invent adoption, rankings, savings, or completed launches.
- Keep project summaries to one outcome sentence and one supporting sentence.
- Remove duplicate subtitles, counts, signoffs, and command-like decoration that
  do not help a reader decide what to inspect next.
- Preserve useful specifics such as Ottawa, payroll for more than 50 people,
  local intercom audio, geofenced clock-ins, and measured time reductions.

## Interaction and accessibility

- Command-like headings are navigation cues, not simulated inputs. Only real
  links and controls should look actionable.
- Use brief 160-220ms hover and menu transitions. Avoid scroll choreography,
  parallax, and animations that delay access to content.
- Respect `prefers-reduced-motion` for login and all other motion.
- Preserve visible orange focus outlines with at least a 2px offset. Give
  icon-only controls accessible labels and use real text for essential content.
- Verify no horizontal overflow at 390px and 1440px.

## Deployment

The site builds as static Astro output in `dist/`. Keep it static unless a
future feature needs runtime state. Cloudflare serves the generated files; the
Workers configuration in `wrangler.jsonc` also applies the security headers
from `src/worker.ts`.
