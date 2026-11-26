# Portfolio Style Guide

This is the active visual guide for the portfolio. Keep the focus on the work,
experience, and writing. Copy rules remain in `VOICE.md`.

## Content

- Preserve authored essays, notes, project details, resume content, and real
  screenshots. Essay figures and citations are part of the work.
- Lead project records with a concrete outcome and a short supporting detail.
  Keep names, dates, source links, status, and measured results easy to find.
- Remove repeated summaries, generic pitches, decorative labels, and mock
  interfaces. Do not simulate a login or make readers wait for content.
- Keep the introduction brief. Put resume links beside it rather than giving
  a PDF link an entire section. Project pages carry the technical detail.
- Keep design explorations in `work/`, outside public routes.

## Visual system

- Retain the near-black background (`#0B0A0D`), paper text (`#F4F1EB`), muted text
  (`#B8AEB2`), quiet dividers (`#51454B`), and orange links (`#E99855`).
- Use Geist for headings and body copy. Reserve JetBrains Mono for dates and
  compact metadata. Preserve typography inside authored essays.
- Use a shared navigation component. Its full-name home link, section links,
  and mobile menu should work consistently across the site.
- Content shells are at most `1120px`, with `48px` side padding on desktop and
  `24px` below `700px`. Reading layouts can use a narrower measure.
- Use readable type and restrained spacing. The next piece of work should be
  within reach; avoid full-screen hero sections and oversized command headings.
- Present projects as text records separated by quiet rules. Use genuine
  screenshots when they explain the work. Omit decorative schematic mockups,
  counters, badge clouds, and repeated arrows that do not identify a link.
- Architecture flows can be ordinary lists. Preserve useful technical context.

## Interaction and accessibility

- Use plain labels such as Work, Writing, Experience, and Contact.
- Keep content and navigation available without JavaScript. Mobile navigation
  must support the keyboard, Escape, and visible focus; enhanced menus must not
  strand keyboard focus behind the drawer.
- Preserve visible orange focus outlines and reduced-motion support.
- Verify all public routes, internal links, images, mobile navigation, and no
  horizontal overflow at narrow mobile, tablet, and desktop widths.
- Capture before-and-after screenshots when presentation changes.

## Deployment

The site builds as static Astro output in `dist/`. Cloudflare serves the files;
`src/worker.ts` applies the security headers. Use the repository branch and pull
request workflow; production deploys from `main`.
