# Voice & Humanization Guide — Esad Kaya Portfolio

The voice for this project. Apply this guide any time you write or rewrite user-facing copy: hero, about, project narratives, role bullets, contact, footer, blog posts, empty states, page titles, meta descriptions.

If a guideline contradicts [STYLE.md](STYLE.md), the style guide wins. This document only governs the *words*.

---

## 1. The voice in one paragraph

Restrained, dry, specific. First person, contractions everywhere. Concrete numbers, named tools, named projects. Opinions allowed. Admit limitations. No aspirational language. No puffery. The reader should feel they are reading something a person wrote after thinking for a while, not something a model emitted in one pass.

---

## 2. AI tells to strip

### Tier A — sentence-level tells (highest signal)

- **Spaced em-dashes used as punchlines.** `word — word` with spaces, or three-plus em-dashes in one paragraph. Replace punchline dashes with periods, colons, or `and`/`but`. Keep unspaced em-dashes used as asides, sparingly.
- **Negative parallelism.** `It's not just X, but Y` / `Less X, more Y` (overused) / `X is dead. Y is the future.` Delete the negation; say Y directly.
- **Tri-colon with inflated third item.** `clarity, precision, and an unwavering commitment to excellence`. Use two items, four items, or one. If three, give all three equal weight.

### Tier B — vocabulary cluster (high signal when 2+ appear)

Banned unless used ironically: `delve`, `leverage` (verb), `robust`, `seamless`, `comprehensive`, `holistic`, `pivotal`, `crucial`, `vital`, `navigate` (metaphorical), `harness`, `unlock`, `elevate`, `foster`, `embark`, `underscore` (verb), `realm`, `landscape` (metaphorical), `tapestry`, `paradigm`, `moreover`, `furthermore`, `additionally`, `that being said`, `in today's fast-paced world`, `in conclusion`, `in essence`, `at its core`.

Substitutions:
- `leverage` → use, apply, deploy
- `robust` → strong, solid, reliable
- `seamless` → smooth, or name what's seamless
- `crucial` / `pivotal` → key, important, the moment when
- `navigate` → handle, work through
- `elevate` → improve, raise
- `foster` → build, grow
- `moreover` / `furthermore` → and, but, also, or just start the sentence

### Tier C — structural tells

- `It's important to note that…` / `It's worth mentioning that…` — delete and start with the actual sentence
- `Whether you're a [X], [Y], or [Z]` — pick one audience
- `Looking ahead, there are both challenges and opportunities…` — end on a concrete statement
- Bolded-colon bullets — use prose; vary bullet structure

### Tier D — voice tells

- Sycophancy — no `Great question!`, no `Certainly!`, no `Absolutely!`
- Excessive hedging — `it's worth considering that one might perhaps argue` — be direct
- Third-person self-description — write in first person with contractions
- Passive voice overuse — active voice as default
- Vague quantifiers — `various`, `numerous`, `several key`, `wide range` — replace with `3`, `12`, `2014–2018`, `40%`
- Unqualified superlatives — `best`, `world-class`, `cutting-edge` — drop or qualify

### Tier E — cadence tells

- **Uniform medium-length sentences.** Vary deliberately: fragment, long winding sentence, one-word paragraph. Mix `And,` and `But,` openers.
- No one-word paragraphs ever (LLMs avoid them) — use them occasionally.
- No ellipses in casual prose except actual trailing off.

### Tier F — claim tells

- `stands as a testament to`, `plays a pivotal role`, `underscores the importance of`, `leaves a lasting impact`, `rich tapestry`, `deeply rooted` — delete
- `As an expert in my field…` — show, don't claim; list the artifact, the metric, the year

---

## 3. What to KEEP (patterns that look AI but aren't)

- **Em-dashes used as asides, sparingly** — one per paragraph max. Unspaced (word—word), not spaced (word — word).
- **Tri-colons when they actually carry parallel structure** — same grammatical slot, similar length, similar abstraction level.
- **Smart quotes / curly apostrophes** — editorial typography. Mixed straight + curly is the tell.
- **Title Case headings** — design system dictates it; consistency beats the heuristic.
- **The em-dash bullet character** in lists when it improves a dense technical record. Use it sparingly.

---

## 4. Per-surface voice rules

### Hero tagline (≤10 words)
Direct, opinionated, no claim of greatness.
- ❌ `I craft elegant digital experiences that transform ideas into reality.`
- ✅ `I write software I want to maintain.`
- ✅ `Software I want to use. Built by someone who has to maintain it.`

### About / bio (60–120 words, 2 paragraphs max)
First person, contractions, opinions, one specific reference per paragraph. Name a year, a place, a tool, a person, a project, or a number. No tri-colon adjective lists. No "I am passionate about."

### Project narratives (80–150 words per project)
Lead with the *problem*, not the *stack*. Stack goes at the end. One measurable outcome per project. No `-ing` tail close (no `…highlighting the team's commitment to performance`). End on a real sentence.

### Experience role bullets (one line each)
Begin with a verb in past tense (rewrote, shipped, led, cut). Include a number wherever you can. No `spearheaded`, `leveraged`, `championed`. No job-description rewrites — anyone can read those.

### Skills chips
Plain labels. `TypeScript`, `Postgres`, `Figma`. No proficiency percentages. No "Expert" suffixes. No skill bars.

### Contact lede (1–2 sentences)
Casual, has a CTA. Name the kind of work to be contacted about. No "I would love to hear from you."

### Footer colophon (1–3 lines)
Dry, technical. Name the stack. Mention if it's open source. Optional copyright year.

### Empty states
Plain. Acknowledge the state. No apology. No emoji. No exclamation marks. No "stay tuned!"
- ✅ `No posts yet. The archive is being written.`
- ✅ `That route doesn't resolve. The link may be old, or it may have moved.`

---

## 5. Nine rewrite moves

1. **Vary sentence length dramatically.** Fragments + long sentences + occasional one-word paragraphs.
2. **Use contractions.** `I'm`, `don't`, `can't`, `it's`, `won't`. Always.
3. **Trade abstract claims for concrete specifics.** Numbers, names, durations. `Rebuilt checkout in React + tRPC. Cut p95 from 1.2s to 180ms.`
4. **Allow opinions and personal observations.** `I rewrote this three times before I was happy with it.`
5. **Use asides (parentheticals), sparingly.** The em-dash earns its place when it's an aside, not a punchline.
6. **Active voice as default.** Name the agent. `I migrated`, not `A migration was undertaken`.
7. **Admit limitations.** `Modals and date pickers are still rough — I open issues when I find them.`
8. **Personal anecdote and references.** Specific book, specific year, specific incident. No `passionate about`.
9. **Keep the register plainspoken.** Be polite and calm without sounding corporate. The site is honest; the copy should match.

---

## 6. Diagnostic checklist (run on every paragraph)

1. Three or more em-dashes? → fix.
2. 2+ banned-vocabulary words? → fix.
3. Negative parallelism (`not X, but Y`)? → delete the negation.
4. `-ing` analysis tail (`…highlighting`, `…underscoring`)? → delete or rewrite as a full sentence.
5. Tri-colon with inflated third item? → vary the list.
6. Every sentence 12–22 words? → mix fragments and long sentences.
7. Throat-clearing opener? (`It's important to note…`, `Certainly!`) → delete.
8. Importance claimed without specifics? → add the metric.
9. Vague quantifier where a number fits? → replace.
10. Would your manager recognize the project? → if not, add the company, year, metric, artifact.

---

## 7. Banned-words one-liner (for grep)

```
delve|leverage|robust|seamless|unlock|harness|navigate|elevate|foster|embark|pivotal|crucial|vibrant|tapestry|realm|moreover|furthermore|holistic|comprehensive
```

Run before any commit that touches user-facing copy:

```bash
grep -nEi 'delve|leverage|robust|seamless|unlock|harness|navigate|elevate|foster|embark|pivotal|crucial|vibrant|tapestry|realm|moreover|furthermore|holistic|comprehensive' src/content/**/*.md src/components/**/*.astro src/lib/data.ts
```

---

## 8. Worked example

**Before:**
> I'm a software engineer studying computer science at the University of Ottawa, graduating in December 2026. My work sits where systems engineering meets careful product thinking — distributed pub/sub, geospatial backends, edge AI on constrained hardware, and the kind of internal tooling that decides whether a team actually ships or merely talks about shipping.

**After:**
> I'm finishing a CS degree at the University of Ottawa, December 2026. Most of my work has been the kind that's hard to demo: distributed pub/sub backends, geofencing for field workforces, edge AI on hardware that has to run for weeks on a battery, the internal tools that decide whether a team ships or stalls.

**Why:**
- `I'm` (contraction)
- Em-dash removed (replaced with a colon — used to introduce a list, not to deliver a punchline)
- `actually ships or merely talks about shipping` → `ships or stalls` (cuts the negative parallelism)
- Specifics: `weeks on a battery`, `field workforces`
- No aspirational language
- Sentence rhythm varies (one medium, one longer with embedded list)

---

## 9. When this guide applies

Load this file before any of:
- Writing a new component with user-facing text
- Rewriting project narratives, experience bullets, or the about section
- Drafting blog posts (welcome.md, future posts)
- Editing page titles, meta descriptions, empty states
- Drafting copy for landing pages, error pages, contact sections

This guide does **not** govern:
- Code comments (style guide for code is separate)
- Commit messages
- Technical documentation (separate voice; clearer is better than humanized)

## 10. Shared skill

A project-agnostic version of this guide is available as the `humanize` skill in the user's skills directory (`~/.config/opencode/skills/humanize/SKILL.md`). Any agent can load it on demand with the `skill` tool. The skill covers the same procedure plus a banned-words grep one-liner.
