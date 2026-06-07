---
version: alpha
name: Tabletop Midnight Console
description: A dark, technical interface system for Astro and React screens with cyan emphasis, glass panels, and editorial display typography.
colors:
  background: "#020617"
  surface: "#07111f"
  panel: "rgba(15, 23, 42, 0.78)"
  panel-soft: "rgba(255, 255, 255, 0.05)"
  border: "rgba(255, 255, 255, 0.1)"
  border-strong: "rgba(255, 255, 255, 0.15)"
  heading: "#f8fafc"
  body: "#cbd5e1"
  muted: "#94a3b8"
  accent: "#67e8f9"
  accent-strong: "#22d3ee"
  accent-soft: "rgba(103, 232, 249, 0.18)"
  success: "#34d399"
  danger: "#fb7185"
typography:
  display-lg:
    fontFamily: Fraunces
    fontSize: 60px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  display-md:
    fontFamily: Fraunces
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline-md:
    fontFamily: Fraunces
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.28em"
rounded:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 40px
  "3xl": 64px
  page-x: 24px
  section-y: 64px
  max-width: 1152px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-strong}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.heading}"
    borderColor: "{colors.border-strong}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
  panel-glass:
    backgroundColor: "{colors.panel}"
    borderColor: "{colors.border}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  chip:
    backgroundColor: "{colors.panel-soft}"
    textColor: "{colors.accent}"
    borderColor: "{colors.border}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Tabletop Midnight Console

## Overview

Tabletop Midnight Console is a dark technical design system for product surfaces that need to feel focused, precise, and a little cinematic. It uses a midnight background, translucent operational panels, cyan emphasis, and high-contrast editorial headings.

The interface should feel like a command room for a game or tool: spacious enough to breathe, direct enough for repeated use, and visually anchored by strong type and crisp status details. Use the atmospheric background as the global stage, then keep actual UI surfaces restrained and readable.

## Colors

The palette is built from near-black blue, slate surfaces, and a single cyan accent.

- **Background (`#020617`):** The full-page base. Use it behind every major view.
- **Surface (`#07111f`):** A deeper blue layer for gradients and large bands.
- **Panel (`rgba(15, 23, 42, 0.78)`):** The main glass container fill.
- **Border (`rgba(255, 255, 255, 0.1)`):** Default divider and panel edge.
- **Heading (`#f8fafc`):** Main text color for titles and important values.
- **Body (`#cbd5e1`):** Default paragraph and interface copy.
- **Muted (`#94a3b8`):** Metadata, helper text, and secondary labels.
- **Accent (`#67e8f9`):** Primary action, active navigation, highlights.
- **Success (`#34d399`):** Positive status indicators only.
- **Danger (`#fb7185`):** Errors and destructive state, used sparingly.

Keep cyan as the only recurring bright interaction color. Success and danger are semantic signals, not decorative palette expansion.

## Typography

The system pairs **Fraunces** for expressive headings with **Manrope** for interface clarity.

- **Display:** Fraunces 48-60px, weight 600, tight line-height. Use for page-level statements only.
- **Headlines:** Fraunces 32px, weight 600, for section headers and panel titles.
- **Body:** Manrope 16-18px with generous line-height for explanatory text.
- **Labels:** Manrope 12px uppercase with wide tracking for eyebrow labels, metadata, and system categories.

Headings use slight negative letter spacing in the current implementation. Do not apply that treatment to body text, buttons, navigation, or data.

## Layout

Use a centered content column with a maximum width near 1152px. Most first-level pages use `px-6 py-16` and a two-column grid on desktop.

Panels should sit inside full-page layouts, not inside nested card stacks. Prefer one strong compositional split: narrative or controls on the left, status or supporting information on the right. Mobile should collapse into a single column with the same spacing rhythm.

Spacing follows a simple 8px-derived scale with larger jumps at 24px, 32px, 40px, and 64px.

## Elevation & Depth

Depth comes from translucent panels, subtle borders, backdrop blur, and large soft shadows. The background owns atmosphere; panels own hierarchy.

Use `shadow-2xl shadow-slate-950/40` for primary glass panels. Avoid multiple competing shadow levels inside the same view. Use borders and tonal contrast for smaller UI elements.

## Shapes

The shape language is soft but controlled.

- Use 32px radii for large glass panels.
- Use full pill radii for primary actions, nav chips, and compact status labels.
- Use 8px to 16px radii for form fields and smaller repeated components.
- Keep icons, bullets, and status dots circular.

Do not mix sharp rectangular cards with pill-heavy controls in the same local component.

## Components

**Buttons:** Primary buttons use cyan fill, dark text, pill shape, and compact 14px Manrope text. Secondary buttons are transparent with white text and a faint border.

**Navigation pills:** Active state uses cyan fill with dark text. Inactive state uses translucent fill, white text, and a faint border.

**Panels:** Use glass fill, white 10% border, 24px padding minimum, and backdrop blur. Panel headers should be uppercase labels before the main content.

**Status lists:** Use compact rows with circular semantic dots. Keep status copy short.

**Inputs:** Use dark translucent fill, 10% white border, 16px radius, Manrope body text, and cyan focus rings. Helper text uses muted color. Error text uses danger.

**Chips:** Use compact pill shapes with border and translucent fill. Chips can be informational or selectable, but the active/selected state should become cyan.

## Do's and Don'ts

- Do keep the global background dark and atmospheric.
- Do reserve cyan for primary actions, active states, and important highlights.
- Do use Fraunces only for display and headline text.
- Do keep UI copy in Manrope for legibility.
- Do maintain clear contrast on glass panels.
- Don't add unrelated accent colors for decoration.
- Don't use nested cards or decorative panels inside panels.
- Don't turn every section into a card; let page sections breathe.
- Don't use hero-sized type inside compact panels or controls.
- Don't introduce a light theme unless the full token set is expanded intentionally.
