---
version: alpha
name: LogicLemon
description: Professional workspace intelligence platform — crisp editorial surfaces with a single lemon accent on warm cream. Confidence through clarity, not decoration.
theme: light
colors:
  primary: "#F5C518"
  on-primary: "#1A1A1A"
  primary-soft: "#FDE68A"
  primary-deep: "#D4A000"
  ink: "#0F172A"
  ink-soft: "#334155"
  ink-muted: "#4B5563"
  cream: "#FFFEF9"
  cream-elev: "#FFFFFF"
  cream-veil: "#F8F6F0"
  border: "#E2DFD6"
  border-soft: "#EEEBE3"
  success: "#15803D"
  on-success: "#FFFFFF"
  warning: "#A16207"
  on-warning: "#FFFEF9"
  error: "#B91C1C"
  on-error: "#FFFFFF"
typography:
  display-xl:
    fontFamily: Inter Tight
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  display-lg:
    fontFamily: Inter Tight
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline-lg:
    fontFamily: Inter Tight
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline-md:
    fontFamily: Inter Tight
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  headline-sm:
    fontFamily: Inter Tight
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 600
    letterSpacing: "0.06em"
    lineHeight: 1.2
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: 600
    letterSpacing: "0.08em"
    lineHeight: 1.2
  mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  none: 0px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 24px
  6: 32px
  7: 48px
  8: 64px
  9: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 12px 24px
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  chip-focus:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  state-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  button-secondary:
    backgroundColor: "{colors.cream-veil}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 12px 24px
    height: 44px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink-soft}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 12px 18px
    height: 44px
  button-ghost-hover:
    backgroundColor: "{colors.cream-veil}"
  card-default:
    backgroundColor: "{colors.cream-elev}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 28px
  tile-card:
    backgroundColor: "{colors.cream-elev}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 28px
  tile-card-hover:
    backgroundColor: "{colors.cream-veil}"
  input-field:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
    height: 44px
  chip-tag:
    backgroundColor: "{colors.border-soft}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  chip-status-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-success}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  chip-status-pending:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-warning}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  nav-topbar:
    backgroundColor: "{colors.cream-elev}"
    textColor: "{colors.ink}"
    height: 56px
    padding: 0 24px
  panel-settings:
    backgroundColor: "{colors.cream-elev}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 24px
  hairline:
    backgroundColor: "{colors.border}"
    height: 1px
  border:
    backgroundColor: "{colors.border}"
    height: 1px
---

## Brand & Style

LogicLemon is professional workspace intelligence for Google Workspace teams. The visual language is **editorial clarity with one energy accent**. Surfaces are warm cream — never sterile white, never cold gray. Typography uses Inter Tight for headlines (600 weight, tight negative tracking) and Inter for body (400 weight). JetBrains Mono carries technical metadata: run IDs, statuses, timestamps. The single chromatic accent — Primary (#F5C518) — is reserved exclusively for action: buttons, active states, selection highlights, and the brand mark. Everywhere else is mono.

Confidence through clarity. The interface whispers. The results shout.

## Colors

Warm cream ground, deep ink text, single lemon accent. Success/warning/error colors exist only for system states, never decoration.

- **Primary (#F5C518):** The only chromatic accent. Primary buttons, active tabs, selection highlights, brand mark. One per screen maximum.
- **On-Primary (#1A1A1A):** Ink text on filled button surfaces. Never pure black — warm dark gray.
- **Primary-Soft (#FDE68A):** Hover veil, focus ring, subtle highlight band.
- **Primary-Deep (#D4A000):** Active/pressed state, darker primary.
- **Ink (#0F172A):** Primary text, headlines, dark feature surfaces. Navy-tinged, not pure black.
- **Ink-Soft (#334155):** Body copy on light surfaces, sub-headlines.
- **Ink-Muted (#64748B):** Tertiary text, meta labels, disabled states, timestamps.
- **Cream (#FFFEF9):** Page ground — barely-warm, barely-not-pure-white.
- **Cream-Elev (#FFFFFF):** Card surfaces, elevated panels.
- **Cream-Veil (#F8F6F0):** Section bands, secondary surfaces, hover states.
- **Border (#E2DFD6):** Hairline borders, dividers, input outlines.
- **Border-Soft (#EEEBE3):** Subtler separators, chip backgrounds.

## Typography

Two families, clear hierarchy. Inter Tight for headlines (600-700, tight tracking — confident without shouting). Inter for body (400 weight, generous line-height — readable marathon). JetBrains Mono for technical data (run IDs, status tags, timestamps).

- **Display** — Inter Tight 700 at 56–72px. Tight tracking prevents heaviness. Hero and opener only.
- **Headline** — Inter Tight 600 at 20–40px. Workhorse heading scale.
- **Body** — Inter 400 at 13–17px, 1.55–1.6 line-height. Paragraph copy, descriptions, labels.
- **Label** — Inter 600 at 10–12px, 0.06–0.08em tracking. All-caps metadata, status pills, nav items.
- **Mono** — JetBrains Mono 11–13px, 1.4–1.5 line-height. Run IDs, system output, API responses.

## Layout & Spacing

4px baseline unit. Tight micro scale (4 / 8 / 12 / 16) for intra-component density. Loose macro scale (24 / 32 / 48 / 64 / 96) for inter-component breathing. Topbar is 56px. Tile cards have 28px padding. Section gaps at 64px desktop, 40px mobile. Implicit 12-column grid, 720px max content width for body copy.

## Elevation & Depth

Flat surfaces. Depth communicated through tonal shifts in the cream scale — cream to cream-elev to cream-veil — never through shadows. Feature bands use `ink` surface inversion for contrast. Legitimate elevation is the 1px `border` hairline on cards and inputs. No drop shadows.

## Shapes

Soft asymmetry creates rhythm:
- `sm 6px` — input fields, mono pills, tag chips
- `md 8px` — buttons, inline actions
- `lg 12px` — tile cards, panels, modals
- `xl 16px` — hero compositions, large surfaces
- `full 9999px` — status pills, badges, active-state indicators

No mid-radii (10px, 14px). The jump between xl and full is intentional — pills and badges must read as a different shape vocabulary.

## Components

- **button-primary** — Primary fill, on-primary text, 8px radius. The act-of-doing. Primary-Deep on hover. One per screen.
- **button-secondary** — Cream-veil fill, ink text. Same shape envelope as primary. For secondary actions.
- **button-ghost** — Transparent fill, muted text. Tertiary actions, cancel, dismiss. Hover to cream-veil.
- **card-default** — Cream-elev surface, 12px radius, 28px padding. Content grouping.
- **tile-card** — The core UI unit: one tile equals one card. Cream-elev surface, 12px radius. Hover to cream-veil.
- **input-field** — Cream surface, 1px border-border, 6px radius. Square-ish radius distinguishes from round buttons.
- **chip-tag** — Border-soft pill, ink-soft text (4.5:1+ contrast), label-sm text. Category tags, integration badges.
- **chip-focus** — Primary-soft pill, on-primary text. Active/focused state indicators.
- **chip-status-success** — Success fill, white text. Active run completed successfully.
- **chip-status-pending** — Warning fill, cream text. Run queued or in progress.
- **state-error** — Error fill, white text. Failed runs, validation errors.
- **nav-topbar** — Cream-elev, 56px, 24px horizontal padding. Brand left, actions right.
- **panel-settings** — Cream-elev, 12px radius, 24px padding. Config panels, settings drawers.
- **hairline** — 1px border color. Universal divider.

## Do's and Don'ts

- Do reserve Lemon for primary action only — buttons, active tabs, the one thing you want the user to do.
- Do use cream surfaces with 28px padding for tile cards. Generous white space signals premium quality.
- Do use JetBrains Mono for run IDs, statuses, and timestamps — technical data reads as technical.
- Do keep headline tracking tight (-0.02 to -0.035em) at display sizes. It reads confident, not loud.
- Do encode system status with semantic chips — success (green), warning (amber), error (red). These are the only permitted chromatic deviations.
- Don't introduce new accent colors. Lemon does the action work. Ink does the text work. Cream does the surface work.
- Don't use drop shadows or gradients. Hairlines and tonal shifts do all elevation work.
- Don't pair button-primary and button-hero on the same surface — primary is the single action.
- Don't apply pill radius to cards or containers. Full is for tags and status pills only.
