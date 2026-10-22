# CLAUDE.md

Guidance for Claude (locally and in the `@claude` GitHub Action) when working in this repo.

## What this is

The public marketing site at **safepark.app**. It explains SafePark to truck drivers and sends them to the map app at **map.safepark.app**, which is a separate repo. Static Astro 7 site, hosted on GitHub Pages.

The site is for **drivers**. SafePark no longer sells to hauliers, so don't add haulier or fleet wording to new copy. Some older guides still use it; leave that alone unless the issue asks.

## Commands

```bash
npm ci              # install
npm run dev         # local dev server, http://localhost:4321
npm run check       # astro check (type errors)
npm run build       # build to dist/
npm run linkcheck   # check internal links in dist/ (run after build)
```

Before pushing: `npm run check && npm run build && npm run linkcheck`. That's all CI runs, and it takes under a minute.

## Layout

| Path | What it is |
|---|---|
| `src/consts.ts` | Phone, email, company name, map URL, form endpoint. Change contact details here only |
| `src/styles/global.css` | Design tokens and shared classes (`.container`, `.section`, `.eyebrow`, `.card`, `.grid`, form fields) |
| `src/layouts/BaseLayout.astro` | `<head>`: title, description, canonical, Open Graph, JSON-LD, noindex on non-live builds |
| `src/components/` | Header, Footer, Button, cards and bands. Styles are scoped in each component |
| `src/pages/` | One file per page. `[guide].astro` renders guides at the site root |
| `src/content/guides/*.md` | Guides. The file name is the URL: `foo.md` → `/foo/` |
| `src/content/legal/*.md` | Privacy, cookie and terms pages |
| `src/data/` | Welfare organisations, accreditation logos, guide icons |
| `src/scripts/enquiry.ts` | Sends the Get access and Contact forms to park-backend-2 |
| `src/pages/robots.txt.ts`, `llms.txt.ts` | Generated per build. Preview builds block all crawlers |
| `docs/STYLE.md` | Colours, type, voice. **Read it before changing copy or styles** |
| `docs/deploy.md` | Hosting, DNS, go-live steps |

## Rules

- **URLs are permanent.** Every address the old WordPress site had still works, with a trailing slash. Never rename or remove a page or guide file. If one must move, add an entry to `redirects` in `astro.config.mjs`.
- **Follow docs/STYLE.md.** Navy `#1a2b80` and sky `#99bce4`. Red only for crime. Oswald for headings and buttons, Roboto for body text. Use the CSS variables, never hard-coded colours.
- **Voice:** talk to the driver ("you"), plain British English, short sentences. Say "truck" and "lorry" both; drivers search for both.
- **Every page needs a title and description** written for search: what the page is, then `| SafePark`.
- **Mobile first.** Check at 390px wide. No horizontal scrolling. Tap targets at least 44px.
- **No cookies, analytics or third-party scripts** without an issue that says so. The site needs no cookie banner and should keep it that way. Fonts are self-hosted through Fontsource.
- **Images** go in `src/assets/` and are rendered with `<Image>` from `astro:assets`, so they're resized and converted to WebP. Only `public/` files that need a fixed URL (og.png) live in `public/`.
- **No prices or free trial** on the site yet. Access is by request (phase 1). The trial and Stripe come later.
- **Don't edit legal page wording** beyond formatting unless the issue gives the new text. Those pages need sign-off from the company.

## Adding a guide

Create `src/content/guides/<slug>.md`:

```markdown
---
title: 'Sentence-case title'
description: 'One or two sentences for Google, about 150 characters.'
published: 2026-11-01
readMinutes: 3
icon: crime-theft-cargo-trailer   # see src/data/guideIcons.ts
---

Intro paragraph (shown larger).

## Section heading
```

It appears on /guides/, the home page (newest four), the sitemap and llms.txt automatically.

## GitHub workflow conventions

When tagged with **"@claude plan"** (or "@claude plan this"), reply on the issue with:

- Proposed file changes
- Key decisions and alternatives considered
- Ambiguities or questions to settle first
- Estimated scope

Do NOT make a branch or open a PR. Wait for approval in the thread.

When tagged with **"@claude implement"**, build it on a branch, push, and open a PR (the workflow opens it if the action doesn't).

- One issue, one PR. If an issue is too big for one PR, say so in a plan and propose a split.
- The PR description says `Closes #<n>` and explains the change in plain English.
- Push as soon as `check`, `build` and `linkcheck` pass. Don't wait on anything else.
- Never push to `main`. Merging to main deploys to the live site.
- Don't change `.github/workflows/`, `astro.config.mjs` `site`/`redirects`, or `src/consts.ts` contact details unless the issue asks. Flag it in the PR if you had to.
- Update this file when the structure or conventions change.
