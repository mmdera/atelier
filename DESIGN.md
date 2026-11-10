---
version: alpha
name: ATELIER
description: A vibrant clay-inspired public website for ATELIER, a personal utility ecosystem. The public landing experience uses a warm cream canvas, near-black primary CTAs, rounded display typography, and saturated single-color feature cards in hot pink, deep teal, lavender, peach, ochre, and cream. Large 3D clay-style illustrations and tactile abstract forms create the visual signature, while compact product-interface previews introduce the ecosystem of everyday tools. Scope includes the public website and the login / create-account experience; the authenticated application screens retain their existing product UI.

colors:
  primary: "#0a0a0a"
  primary-active: "#1f1f1f"
  primary-disabled: "#e5e5e5"
  ink: "#0a0a0a"
  body: "#3a3a3a"
  body-strong: "#1a1a1a"
  muted: "#6a6a6a"
  muted-soft: "#9a9a9a"
  hairline: "#e5e5e5"
  hairline-soft: "#f0f0f0"
  canvas: "#fffaf0"
  surface-soft: "#faf5e8"
  surface-card: "#f5f0e0"
  surface-strong: "#ebe6d6"
  surface-dark: "#0a1a1a"
  surface-dark-elevated: "#1a2a2a"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  on-dark-soft: "#a0a0a0"
  brand-pink: "#ff4d8b"
  brand-teal: "#1a3a3a"
  brand-lavender: "#b8a4ed"
  brand-peach: "#ffb084"
  brand-ochre: "#e8b94a"
  brand-mint: "#a4d4c5"
  brand-coral: "#ff6b5a"
  success: "#22c55e"
  warning: "#f59e0b"
  error: "#ef4444"

typography:
  display-xl:
    fontFamily: "Plain Black, Inter, sans-serif"
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -2.5px
  display-lg:
    fontFamily: "Plain Black, Inter, sans-serif"
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -2px
  display-md:
    fontFamily: "Plain Black, Inter, sans-serif"
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -1px
  display-sm:
    fontFamily: "Plain Black, Inter, sans-serif"
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.5px
  title-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.3px
  title-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 1.5px
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  xs: 6px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 44px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 44px
  button-on-color:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 44px
  button-text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
  text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    padding: 96px
  hero-illustration-card:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
  feature-card-pink:
    backgroundColor: "{colors.brand-pink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-teal:
    backgroundColor: "{colors.brand-teal}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-lavender:
    backgroundColor: "{colors.brand-lavender}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-peach:
    backgroundColor: "{colors.brand-peach}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-ochre:
    backgroundColor: "{colors.brand-ochre}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  feature-card-cream:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.xl}"
    padding: 32px
  product-mockup-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  testimonial-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  pricing-tier-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  pricing-tier-card-featured:
    backgroundColor: "{colors.brand-teal}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.lg}"
    padding: 32px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 44px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  category-tab:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.pill}"
    padding: 8px 16px
  category-tab-active:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.pill}"
  badge-pill:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  expert-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  cta-band-illustrated:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    rounded: "{rounded.xl}"
    padding: 80px
  footer:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: 80px
---
<!-- MIT licensed. Original design-system reference: https://opendesignmd.com/licenses/ -->

# How ATELIER is designed

## Overview

ATELIER is a personal utility ecosystem presented through a playful, tactile, editorial website. Its visual language is built around a **warm cream canvas** (`{colors.canvas}` — #fffaf0), near-black typography, and large **3D clay-style visual compositions**. Saturated feature panels in pink, deep teal, lavender, peach, and ochre punctuate the page and give each product family a distinct visual moment. The overall result should feel optimistic, expressive, approachable, and carefully art-directed rather than like a conventional software landing page.

The public website introduces one connected place for useful everyday tools. It is not the authenticated product interface: the landing page explains the ecosystem, previews its capabilities, and guides visitors toward getting started. Keep the public-facing story focused on clarity and discovery; do not reproduce another brand's marketing copy, product names, claims, or proprietary illustrations.

Typography uses a rounded display voice at large sizes, approximated with **Inter at weight 500** when the original display face is unavailable. Headlines use tight negative letter-spacing and generous scale. Inter handles navigation, body copy, labels, and interface fragments. The contrast between expressive display type and restrained UI typography is central to the system.

The main visual rhythm comes from **large single-color feature surfaces**. Each card introduces a part of the ATELIER ecosystem and may contain a small product preview, interface fragment, or clay-style illustration. The color sequence should feel intentionally varied rather than repetitive. Cream remains the resting surface between these expressive sections.

**Key Characteristics:**
- Warm cream canvas (`{colors.canvas}` — #fffaf0) as the default page background.
- Near-black primary CTAs (`{colors.primary}` — #0a0a0a), with friendly 12px corners rather than full-pill buttons.
- Six coordinated feature surfaces: hot pink, deep teal, lavender, peach, ochre, and cream.
- 3D clay-style illustrations and soft sculptural forms as the signature visual language.
- Rounded display typography at 500 weight, with negative letter-spacing on large headlines.
- Generous corner radii: `{rounded.md}` (12px) for controls, `{rounded.lg}` (16px) for content cards, and `{rounded.xl}` (24px) for feature panels.
- Small product-interface previews embedded within selected feature cards to make the ecosystem tangible.
- Section rhythm of `{spacing.section}` (96px) between major page bands.
- A warm cream footer that continues the light visual atmosphere through the end of the page.
- Public landing-page scope only; authentication and the logged-in application have their own functional requirements.

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}` — #0a0a0a): Main actions, headline ink, and high-contrast interface elements.
- **Brand Pink** (`{colors.brand-pink}` — #ff4d8b): High-energy feature surface for expressive product stories and standout callouts.
- **Brand Teal** (`{colors.brand-teal}` — #1a3a3a): Deep, grounded feature surface for core ecosystem moments and emphasized panels.
- **Brand Lavender** (`{colors.brand-lavender}` — #b8a4ed): Soft, imaginative surface for intelligent and digital utility stories.
- **Brand Peach** (`{colors.brand-peach}` — #ffb084): Warm surface for everyday-life and approachable utility stories.
- **Brand Ochre** (`{colors.brand-ochre}` — #e8b94a): Golden accent surface for practical tools, highlights, and discovery moments.
- **Brand Mint** (`{colors.brand-mint}` — #a4d4c5): Secondary accent for illustration details, small indicators, and supporting highlights.
- **Brand Coral** (`{colors.brand-coral}` — #ff6b5a): Occasional warm contrast for emphasis and illustration accents.

### Surface
- **Canvas** (`{colors.canvas}` — #fffaf0): The default public-page background; warm rather than pure white.
- **Surface Soft** (`{colors.surface-soft}` — #faf5e8): Secondary page bands, closing CTA, and footer background.
- **Surface Card** (`{colors.surface-card}` — #f5f0e0): Cream cards, supporting content, and quieter feature surfaces.
- **Surface Strong** (`{colors.surface-strong}` — #ebe6d6): Stronger cream tone for nested or emphasized surfaces.
- **Surface Dark** (`{colors.surface-dark}` — #0a1a1a): Deep teal-tinted dark surface for occasional contrast panels.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` — #1a2a2a): Elevated layer used within dark product previews.
- **Hairline** (`{colors.hairline}` — #e5e5e5): Fine borders on inputs and compact interface previews.

### Text
- **Ink** (`{colors.ink}` — #0a0a0a): Display headlines and primary text.
- **Body Strong** (`{colors.body-strong}` — #1a1a1a): Lead copy and emphasized supporting text.
- **Body** (`{colors.body}` — #3a3a3a): Default paragraph and descriptive copy.
- **Muted** (`{colors.muted}` — #6a6a6a): Secondary labels, descriptions, and navigation support.
- **Muted Soft** (`{colors.muted-soft}` — #9a9a9a): Captions, helper text, and low-priority metadata.
- **On Primary / On Dark** (`{colors.on-primary}` — #ffffff): Text on dark primary buttons and deep teal surfaces.

### Semantic
- **Success** (`{colors.success}` — #22c55e): Successful completion and positive status.
- **Warning** (`{colors.warning}` — #f59e0b): Caution states and attention callouts.
- **Error** (`{colors.error}` — #ef4444): Invalid input and error feedback.

## Typography

### Font Family
The type system pairs a rounded display face with **Inter** for all functional text. Use the display face for large editorial headlines and section statements; use Inter for navigation, paragraphs, buttons, labels, and product-preview UI. When the original display face is unavailable, use Inter at weight 500 with the specified negative letter-spacing. Keep the fallback stack robust: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 72px | 500 | 1.0 | -2.5px | Main public-page headline and hero statement |
| `{typography.display-lg}` | 56px | 500 | 1.05 | -2px | Major section headlines |
| `{typography.display-md}` | 40px | 500 | 1.1 | -1px | Secondary section heads and feature statements |
| `{typography.display-sm}` | 32px | 500 | 1.15 | -0.5px | Feature-card titles and closing CTA headline |
| `{typography.title-lg}` | 24px | 600 | 1.3 | -0.3px | Prominent feature and content titles |
| `{typography.title-md}` | 18px | 600 | 1.4 | 0 | Card titles and lead copy |
| `{typography.title-sm}` | 16px | 600 | 1.4 | 0 | Compact card headings and labels |
| `{typography.body-md}` | 16px | 400 | 1.55 | 0 | Default descriptive copy |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | Supporting copy and footer text |
| `{typography.caption}` | 13px | 500 | 1.4 | 0 | Badges, helper labels, and captions |
| `{typography.caption-uppercase}` | 12px | 600 | 1.4 | 1.5px | Eyebrows and section labels |
| `{typography.button}` | 14px | 600 | 1.0 | 0 | Button labels |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | Main navigation links |

### Principles
The display face at weight 500 with negative letter-spacing carries the personality of the brand. Avoid making display headlines excessively bold; scale and shape should provide the emphasis.

Keep the display/body distinction consistent. Display typography is reserved for editorial moments; Inter remains responsible for legibility and functional UI. Do not introduce extra font families for isolated sections.

### Note on Font Substitutes
The original rounded display face may not be available in the project. Inter at weight 500 with negative letter-spacing is the approved practical substitute. Use a licensed rounded display alternative only if it can be loaded consistently across the public site and does not change the overall proportions.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **Section padding:** `{spacing.section}` (96px) between major page bands on desktop.
- **Feature-card padding:** `{spacing.xl}` (32px) for expressive feature panels; `{spacing.lg}` (24px) for compact preview and supporting cards.

### Grid & Container
- **Max content width:** approximately 1280px, centered.
- **Editorial body:** 12-column grid; the hero may use a 7/5 split with the main message on one side and a visual artifact on the other.
- **Feature-card grids:** 3-up on desktop, 2-up on tablet, and 1-up on mobile.
- **Product previews:** Keep previews legible and intentionally cropped; they support the story and should not compete with the main headline.
- **Navigation:** One clear horizontal row on desktop, collapsing to a compact menu on mobile.

### Whitespace Philosophy
Use generous whitespace around large headlines, clay-style hero artwork, and saturated feature panels. The cream canvas is an active part of the composition: do not fill every gap with cards, dividers, or decorative objects. Keep section transitions calm so that each colored panel feels deliberate.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Main page bands, hero, navigation |
| Soft hairline | 1px `{colors.hairline}` border | Inputs and compact supporting cards |
| Saturated card | Brand pink/teal/lavender/peach/ochre fill — no heavy shadow | Primary feature panels |
| Cream card | `{colors.surface-card}` background — minimal or no shadow | Supporting information and secondary panels |
| Subtle drop shadow | Very faint shadow at low opacity | Rare hover or floating preview treatment |

Depth should come primarily from contrast between the cream canvas, saturated surfaces, and sculptural 3D artwork. Avoid stacking multiple shadows or using glassmorphism as a competing visual language.

### Decorative Depth
- **Clay-style 3D illustrations** — soft, rounded, tactile objects and scenes. Use these as hero artifacts and occasional feature-card accents.
- **Abstract sculptural forms** — rounded shapes, organic forms, and simple playful compositions can support the visual story without introducing unrelated decoration.
- **Product-preview fragments** — small interface panels may sit within feature cards to connect the expressive surface to the practical utility ecosystem.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 6px | Small badges and compact dropdown items |
| `{rounded.sm}` | 8px | Small controls and compact UI surfaces |
| `{rounded.md}` | 12px | Primary buttons and text inputs |
| `{rounded.lg}` | 16px | Supporting content and preview cards |
| `{rounded.xl}` | 24px | Large feature panels and illustration containers |
| `{rounded.pill}` | 9999px | Category labels and badge pills |
| `{rounded.full}` | 9999px / 50% | Avatars and circular icon controls |

## Components

### Top Navigation

**`top-nav`** — Warm cream navigation bar, 64px tall, with the ATELIER wordmark at left, a small set of public-page navigation links, and a right-aligned primary action. Use `{typography.nav-link}` for menu items. Keep the header calm and compact so it frames the hero rather than competing with it. On narrow screens, collapse links into a menu while retaining a clear primary action.

### Buttons

**`button-primary`** — Near-black background `{colors.primary}`, white text `{colors.on-primary}`, Inter 14px / 600, 12px × 20px padding, 44px height, and `{rounded.md}` (12px) corners.

**`button-secondary`** — Cream or white surface with ink text and a fine hairline border. Match the primary button's height and corner radius.

**`button-on-color`** — Light button used on saturated feature panels. Use a white or cream background with dark ink text for clear contrast.

**`button-text-link`** — Unboxed text action for secondary navigation and understated calls to action.

**`text-link`** — Inline body link in ink, with a clear underline or other persistent affordance.

### Cards & Containers

**`hero-band`** — Cream-canvas hero with a 7/5 editorial composition: a large headline, short supporting statement, and action row paired with a dominant clay-style illustration or visual composition. Use generous vertical padding and keep the message concise.

**`hero-illustration-card`** — Rounded visual container for the hero artwork. Use a soft cream surface and `{rounded.xl}` corners. The artwork should feel like a considered 3D object or scene, not a generic stock image.

**`feature-card-pink`** / **`feature-card-teal`** / **`feature-card-lavender`** / **`feature-card-peach`** / **`feature-card-ochre`** — Saturated single-color feature panels. Use `{rounded.xl}` corners and 32px padding. Each panel introduces a different part of the ATELIER utility ecosystem through a concise heading, short description, and optional product-preview fragment or clay-style illustration. Use white text on dark surfaces and ink text on lighter surfaces.

**`feature-card-cream`** — Quieter feature panel on `{colors.surface-card}` for supporting stories that do not need a saturated surface.

**`product-mockup-card`** — Compact preview of an ATELIER utility interface. Use a cream/white surface, fine hairline, `{rounded.lg}` corners, and 24px padding. Show only enough realistic interface detail to communicate the tool's purpose.

**`testimonial-card`** — Optional quote or social-proof card. Use the cream card surface, restrained typography, and 24px padding. Do not invent endorsements, customer identities, or metrics; render this component only when verified content exists.

**`pricing-tier-card`** — Optional plan card with a light surface, hairline border, 16px radius, and 32px padding. Include only if public pricing is an actual product requirement.

**`pricing-tier-card-featured`** — Featured plan variant using the deep teal surface and light text. The surface color itself provides emphasis.

**`expert-card`** — Reserved reusable profile card for a real named contributor or specialist if such a public section is introduced. Do not populate it with fictional people.

### Inputs & Forms

**`text-input`** — Cream/white background, ink text, Inter body type, 12px radius, 12px × 16px padding, and 44px height. Use a fine hairline border.

**`text-input-focused`** — Strengthen the border to ink for a clear focus state. Preserve a visible keyboard focus indicator and sufficient contrast.

### Tabs / Badges

**`category-tab`** + **`category-tab-active`** — Pill-shaped category controls. Inactive tabs are transparent with muted text; the active tab uses a cream-card fill and ink text. Use 8px × 16px padding.

**`badge-pill`** — Small cream-fill pill label in caption typography with fully rounded corners and 4px × 12px padding.

### CTA / Footer

**`cta-band-illustrated`** — Closing invitation band on `{colors.surface-soft}` with `{rounded.xl}` corners and generous padding. Pair a concise ATELIER-specific headline and supporting line with the primary action; a small clay-style illustration may accompany the message.

**`footer`** — Warm cream footer using `{colors.surface-soft}` and `{colors.body}`. Organize links into clear groups, retain comfortable vertical padding, and keep the footer visually light. Use only real destinations and current product information.

## Do's and Don'ts

### Do
- Anchor public pages on the cream canvas (`{colors.canvas}` — #fffaf0).
- Use tactile 3D clay-style artwork as a distinctive visual feature.
- Rotate the saturated card palette so adjacent feature panels do not repeat the same color.
- Use the rounded display face at weight 500 with negative letter-spacing for major headlines.
- Pair feature panels with small, believable ATELIER product previews where they clarify the product story.
- Keep the footer warm and light to preserve the visual continuity of the page.
- Maintain the `{spacing.section}` (96px) rhythm between major desktop sections.
- Keep all public-facing copy original to ATELIER and accurate to the actual product.
- Ensure color contrast and keyboard accessibility remain intact on every colored surface.

### Don't
- Do not replace the warm cream canvas with cool gray or stark white as the dominant background.
- Do not introduce extra feature-card colors beyond the documented palette without updating the system deliberately.
- Do not use overly bold display typography; the rounded form and scale provide the character.
- Do not repeat the same saturated card color in consecutive feature panels.
- Do not replace the tactile illustration direction with unrelated flat-vector or generic stock imagery.
- Do not turn every section into a card grid; preserve open editorial space.
- Do not use a dark footer as the default closing treatment.
- Do not copy Clay's product copy, names, claims, illustrations, or brand identifiers into ATELIER.
- Do not imply features, integrations, pricing, testimonials, or security guarantees that are not implemented or verified.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Collapsed navigation; hero headline scales to approximately 36px; hero artwork stacks below the message; feature grids become 1-up |
| Tablet | 768–1024px | Navigation tightens; feature panels become 2-up; hero composition adjusts to available width |
| Desktop | 1024–1440px | Full navigation; 3-up feature panels where content permits; editorial hero composition |
| Wide | > 1440px | Retain desktop composition with additional outer breathing room; keep content near 1280px max width |

### Touch Targets
- Primary buttons and interactive controls should provide at least 44 × 44px target dimensions.
- Text inputs should be at least 44px high.
- Links and icon-only controls must remain keyboard accessible and visibly focused.

### Collapsing Strategy
- Collapse the top navigation to a menu below 768px.
- Change the hero's 7/5 composition to a single-column stack on mobile.
- Reduce feature grids from 3 columns to 2 and then 1 as space narrows.
- Keep saturated feature-card fills at every breakpoint; do not replace them with gradients on mobile.
- Preserve readable type sizes and comfortable spacing rather than shrinking desktop layouts proportionally.

## Iteration Guide

1. Work on one component at a time and reference its YAML key, such as `{component.feature-card-pink}` or `{component.hero-band}`.
2. Select the feature-card color based on visual rhythm and content tone; avoid assigning colors in a way that implies unsupported product tiers or capabilities.
3. Keep active and disabled variants as distinct component entries.
4. Use the documented token references wherever possible instead of introducing untracked values.
5. Document interaction states only when they are implemented and relevant to the public experience.
6. Keep display headlines at weight 500 with negative letter-spacing; keep functional text in Inter.
7. Treat the cream canvas, saturated feature surfaces, and clay-style illustration direction as the public brand system.
8. Keep the scope limited to the public website outside login, sign-up, and authenticated application screens unless the project scope is explicitly changed.

## Known Gaps

- The original rounded display font may be licensed or unavailable; Inter weight 500 with negative letter-spacing is the documented fallback.
- 3D clay-style illustrations are visual assets rather than tokenized components; each page may require separately art-directed artwork.
- Recurring mascots or named characters are not defined as part of the ATELIER system and should not be invented without a separate brand decision.
- Detailed animation and transition timings are not encoded in the token set and should be specified when motion is implemented.
- Form validation states beyond `{component.text-input-focused}` are not fully specified here.
- The authenticated ATELIER application may require additional product-specific components and interaction patterns; those remain outside this public-site and authentication specification.


## ATELIER public homepage implementation (v1.3.19)

The public landing page uses the Clay-inspired visual language as an implementation, not only as documentation. ATELIER wording, product taxonomy, links and functionality remain original. The authenticated application and sign-in experience are outside this landing-page redesign.

- Header: warm cream sticky navigation, circular Atelier monogram, compact links, dark pill CTA and appearance toggle.
- Hero: oversized editorial serif headline, two CTAs, concise proof points and a layered workspace mockup with clay-like 3D forms.
- Product showcase: saturated pink, deep teal, lavender, peach, ochre, mint, coral and cream cards for the eight ATELIER categories.
- Editorial bands: full-width illustrated landscape, three-step onboarding cards, dark teal closing CTA and warm footer.
- Responsive: 4-column category grid on wide desktop, 2-column on mobile, stacked hero and feature band on narrow screens.
- Motion: restrained hover lift and existing GSAP entrance animation; reduced-motion preferences remain respected.
- Dark appearance: landing-specific dark canvas and supporting surfaces; the preview mockup retains its readable cream surface.

Implementation lives in `landing()` in `src/main.js` and the `.clay-*` public-page styles appended to `src/style.css`. No authenticated dashboard, auth form, Supabase flow, category/tool route, or data utility implementation was intentionally changed.


## Authentication screens (v1.3.20)

The sign-in and account-creation experience shares the same Clay-inspired ATELIER visual language as the public homepage. Keep the authentication flow functional and visually continuous with the marketing site.

- Canvas: warm cream `#fffaf0`; primary ink `#0a0a0a`; body text `#3a3a3a`; muted text `#6a6a6a`.
- Desktop composition: deep teal (`#1a3a3a`) editorial welcome panel paired with a white / cream form card. Use restrained pink and peach clay-style artwork as a decorative focal point.
- Narrow screens: hide the decorative side panel and present the complete form in a single centered column. The page must grow vertically and scroll naturally; never clip fields or the submit action to the viewport.
- Form card: white surface, 24px radius, fine hairline border, subtle shadow, generous 28–48px padding.
- Inputs: cream-white surface, 12px radius, 52px height, 14px Inter text, clear focus ring and visible labels.
- Primary action: near-black fill, white text, 12px radius, minimum 52px height. Google sign-in uses a white secondary button with a 12px radius.
- Tabs: simple underline indicator, readable active state, keyboard-operable buttons.
- Create-account fields: full name, email address, password, confirm password, and submit action must all remain reachable by scrolling at every viewport size.
- Dark appearance: deep green-black canvas and card, high-contrast text, readable inputs and visible focus indicators.
- Preserve Supabase email/password sign-in, account creation, Google OAuth, confirmation messaging, validation, and existing redirects.
- Accessibility: semantic labels, required field states, keyboard focus, status announcements, and reduced-motion support.

## Authenticated application and utility workspaces (v1.3.22)

The same ATELIER design language applies throughout the signed-in application, including the dashboard, category indexes, every utility screen, forms, result panels, tables, settings, favourites and recent activity. Public and authenticated surfaces must feel like one product rather than separate visual systems.

### Application shell
- Use the warm cream canvas `#fffaf0` for the main application background and a deep teal navigation rail `#1a3a3a` for the persistent sidebar.
- Keep the top bar light, quiet and translucent, with a fine warm hairline and compact navigation metadata.
- The content area uses a centered maximum width of approximately 1600px, responsive horizontal padding, and consistent vertical rhythm.
- Page headings use the editorial serif display voice, with a small uppercase gold/ochre eyebrow and a concise muted description.

### Utility layout
- Every utility page follows one predictable hierarchy: breadcrumb/eyebrow, title and description, primary task surface, supporting results or records, then a short explanatory note where relevant.
- Calculator pages use a balanced two-column layout on wide screens: a white/cream input card and a deep-teal result card. Stack them on tablet and mobile.
- Forms use 12px rounded controls, consistent 48px desktop input height, clear uppercase labels, visible focus rings and generous field spacing.
- Primary actions use deep teal, white text and pill geometry; secondary actions use a cream-white surface and a subtle border.
- Result panels use deep teal with high-contrast white values and muted mint supporting text. Result values should be the strongest visual element after the page title.

### Shared components
- Panels, stats, tool cards and category cards use a 18–24px radius, restrained border, warm surface and soft elevation.
- Tool cards use a consistent icon, serif title, concise description and clear open action. Avoid bare text-only rows or inconsistent card heights.
- Category cards may use the approved saturated palette: pink, teal, lavender, peach, ochre, mint, coral and cream. Maintain readable contrast for each surface.
- Tables use a cream header band, compact uppercase column labels, generous cell padding, subtle row dividers and horizontal overflow on narrow screens.
- Empty states use a quiet dashed border and a warm surface rather than unframed placeholder text.
- Dark mode is supported inside the authenticated workspace using deep green-charcoal surfaces, soft borders and accessible text contrast. The public landing and authentication pages remain governed by their own documented display rules.

### Responsive and consistency rules
- Desktop tool indexes use three columns; tablet uses two; narrow mobile uses one.
- Calculator input/result columns stack below 1050px.
- Forms, tables and data-heavy content must never overflow the viewport; tables scroll horizontally when required.
- Apply shared tokens and component classes rather than introducing one-off colours, radii, shadows or spacing values in individual tools.
- When adding a new utility, reuse the same page heading, panel, field, button, table, result and empty-state components before creating a new component variant.


### Global utility search
- The workspace search is an autocomplete combobox, not an Enter-only field.
- Start matching as the user types across utility names, category names, and tool descriptions.
- Show up to seven relevant tool results plus matching category shortcuts in a compact dropdown anchored to the search field.
- Each result displays its tool name, category, and a short description so users can identify the right destination quickly.
- Support keyboard navigation with Arrow Up / Arrow Down, Enter to open the active (or first) result, and Escape to dismiss.
- Keep the dropdown accessible with combobox/listbox/option roles, expanded state, and an announced active option.
- Clicking outside dismisses suggestions; selecting a result navigates directly to its workspace.


## Theme contrast contract (v1.3.24)

- Every workspace component must use semantic theme tokens for its surface, border, primary text, and secondary text.
- Light mode uses dark ink on light surfaces; dark mode uses light ink on deep surfaces. Never preserve a light-mode text colour when switching a component to a dark surface.
- Dashboard category cards use a consistent neutral card surface in both themes. Public marketing feature cards may retain the saturated Clay-inspired palette, but must use a contrast-appropriate foreground.
- Statistic values, panel headings, tool titles, descriptions, labels, table cells, inputs, placeholders, and action controls must remain legible in both themes.
- Calculation result panels intentionally retain a deep-teal surface with white foreground in both themes.
- New components must consume the shared tokens rather than introducing isolated hard-coded foreground/background pairs.
