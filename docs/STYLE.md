# SafePark style

The SafePark visual style, as implemented in the map application (`map-two`, deployed at map.safepark.app). It had not been written down before; this document records it so the marketing site (safepark.app) and any future SafePark front end look like one product.

Source of truth in code:

- `map-two/src/app/theme.tsx` — MUI theme (palette, font)
- `map-two/src/app/fonts.jsx` — Oswald via `next/font`
- `map-two/public/icons/` — logo, map pins, crime pictograms, facility and brand icons
- `src/styles/global.css`: this style as CSS custom properties and shared classes

## Colour

### Brand

| Token | Hex | Where it comes from | Use |
|---|---|---|---|
| `--sp-navy` | `#1a2b80` | MUI `primary.main` | Headings, titles, primary buttons, links, dark sections |
| `--sp-navy-light` | `#5254b0` | MUI `primary.light` | Hover tints, rarely on its own |
| `--sp-navy-dark` | `#000453` | MUI `primary.dark` | Button hover, footer background |
| `--sp-sky` | `#99bce4` | MUI `secondary.main` (also `#9abce3` dividers in the info dialog) | Secondary buttons (EDIT), chips, vertical rules, accents on navy |
| `--sp-sky-light` | `#cbeeff` | MUI `secondary.light` | Icon tiles, soft callout backgrounds |
| `--sp-sky-dark` | `#698cb2` | MUI `secondary.dark` | Eyebrow labels, secondary hover |
| `--sp-logo-navy` | `#223e92` | Logo artwork | Logo only — do not use for UI |
| `--sp-logo-sky` | `#a9c8e9` | Logo artwork | Logo only — do not use for UI |

Navy and sky are the whole brand. The app is two-tone blue on white; keep everything else neutral.

### Signal

MUI defaults, used sparingly and only for meaning:

| Token | Hex | Use |
|---|---|---|
| `--sp-red` | `#d32f2f` | Errors, destructive actions, the ADMINISTRATOR badge and LOGOUT button, new-crime pins |
| `--sp-green` | `#2e7d32` | Success / available |
| `--sp-amber` | `#ed6c02` | Warnings |

### Neutrals

| Token | Value | Use |
|---|---|---|
| `--sp-white` | `#ffffff` | Default surface (dialogs, sidebar, cards) |
| `--sp-panel` | `#f0f0f0` | Inset panels (e.g. "Admin Information" card) |
| `--sp-grey-button` | `#e0e0e0` | Neutral contained button (REPORT) |
| `--sp-page` | `#f6f8fc` | Alternate section background on the website |
| `--sp-text` | `rgba(0,0,0,.87)` | Body text |
| `--sp-text-muted` | `rgba(0,0,0,.6)` | Secondary text |
| `--sp-divider` | `rgba(0,0,0,.12)` | Table rules, borders |

## Typography

- **Oswald** is the SafePark typeface. The app uses it for everything (weight 400). It also matches the condensed lettering of the logo.
- On the website, use Oswald for headings, navigation, buttons, labels, tables and short UI text.
- For long-form reading (guides, legal pages, paragraphs longer than two lines) the website pairs Oswald with **Roboto**, MUI's native typeface. Oswald is too condensed for comfortable paragraph reading; Roboto keeps the MUI feel of the app.
- Headings are Oswald 400, in navy, sentence case. The app's dialog pattern is a small black title over a large navy subject line ("Incident Report" / "Friday, 24 September, 2026").
- Buttons and eyebrow labels are UPPERCASE Oswald, as in MUI.

| Role | Font | Size (desktop) |
|---|---|---|
| Display / h1 | Oswald 400 | 68px (clamps to 40px) |
| h2 | Oswald 400 | 44px (clamps to 30px) |
| h3 | Oswald 400 | 24px |
| Eyebrow | Oswald 400, uppercase, 0.12em tracking, sky-dark | 15px |
| Button | Oswald 400, uppercase, 0.04em tracking | 17px / 19px large |
| Body | Roboto 400 | 17px / 1.6 |
| Lead | Roboto 400, muted | 19px |

## Shape and depth

- Buttons, inputs, dialogs: **4px** radius (MUI default).
- Cards and map popups: **12px** radius (`mapActionPopup.css`).
- Elevation follows MUI: raised buttons (`elevation 2`), cards (`0 3px 14px` soft shadow, from the map popups), dialogs (`elevation 24`).
- Section dividers inside content: a **2px sky vertical rule** (as between Damage and Theft in the incident dialog) or a 1px neutral horizontal rule.

## Components

| Component | App reference | Website class |
|---|---|---|
| Primary button | CLOSE — navy contained | `.sp-btn.sp-btn--primary` |
| Secondary button | EDIT — sky contained, black text | `.sp-btn.sp-btn--secondary` |
| Neutral button | REPORT — grey contained | `.sp-btn.sp-btn--grey` |
| Outlined button | LOGOUT (in red), login | `.sp-btn.sp-btn--outlined` |
| On-navy buttons | — | `.sp-btn--on-dark`, `.sp-btn--ghost-dark` |
| Key/value table | Incident Report details | `.sp-kv` |
| Card | Map popup / dialog | `.sp-card` |
| Chip | "Pending" chip | `.sp-chip` |
| Icon tile | Sidebar list avatars | `.sp-icon-tile` |

## Iconography

SafePark has its own illustrated icon set; use it instead of generic icon fonts wherever a SafePark concept is shown.

- **Map pins** (`pin-*.png`): teardrop markers — SafePark (lock-lorry), secure, truck stop, fuel (red/green/blue), food, crime (red = recent, grey = older).
- **Crime pictograms** (`crime/*.png`): navy-and-sky flat illustrations — fuel theft, tank damage, cargo theft, hijack, theft, clandestine, etc.
- **Facilities and brands** (`info-*.png`): CCTV, showers, accreditation logos (ParkMark, TAPA, ESPORG, Travis, Park Safe Network), fuel and food brands.
- Generic UI glyphs (chevrons, heart, search) are Material Icons, as in the app.

## Logo

- `SafeParkLogo4-with-TM.png` — full lockup: padlock-and-lorry mark, SAFE in sky, PARK in navy, "Fuel Theft Solutions Ltd™" bar. Use on white only; give it a white plate on dark backgrounds.
- `lock-lorry-symbol.png` — the mark alone, for favicons, app icons and small spaces.
- Logo and styles by Tom Shooter.

## Voice

Plain, practical, UK English. Talk directly to the driver ("you", never "your fleet") about safety, rest and cost. Avoid hype. Call it "the SafePark app" or "the map"; it runs in the browser at map.safepark.app, so say "open" or "log in", not "download".
