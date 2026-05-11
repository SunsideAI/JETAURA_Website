# Design System — Sky Brokers

This document defines the visual language. It is immutable for the hero. Future sections may extend this but never overwrite a token.

## Color tokens

```ts
// src/lib/tokens.ts
export const colors = {
  bg: "#0A0A0B",
  text: "#F5F2EC",
  accent: "#B8956A",
  
  // Opacity-derived only — these are not new colors
  textMuted: "rgba(245, 242, 236, 0.55)",
  textSubtle: "rgba(245, 242, 236, 0.4)",
  textFaint: "rgba(245, 242, 236, 0.25)",
  accentMuted: "rgba(184, 149, 106, 0.6)",
  accentSubtle: "rgba(184, 149, 106, 0.3)",
  borderAccent: "rgba(184, 149, 106, 0.7)",
  borderFaint: "rgba(245, 242, 236, 0.1)",
};
```

Tailwind config extension:
```ts
// tailwind.config.ts (excerpt)
extend: {
  colors: {
    bg: "#0A0A0B",
    fg: "#F5F2EC",
    accent: "#B8956A",
  },
}
```

## Typography tokens

### Font families
```css
--font-display: "Editorial New", "Times New Roman", serif;
--font-body: "Söhne", "Inter Tight", sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, monospace;
```

Variable fonts self-hosted in `/public/fonts/`. Define with `@font-face` in `app/fonts.css` using `font-display: swap`.

### Type scale (used in hero)
| Token         | Size  | Weight | Family   | Use case                  |
|---------------|-------|--------|----------|---------------------------|
| `display-xl`  | 64px  | 400    | display  | Headline 1                |
| `display-md`  | 36px  | 400    | display  | Headline 2                |
| `body-sm`     | 13px  | 400    | body     | HUD secondary, descriptions |
| `mono-xs`     | 11px  | 400    | mono     | HUD readouts, corner annotations, CTA |
| `mono-xxs`    | 10px  | 400    | mono     | Coordinates, fine print   |

### Mobile scaling
- `display-xl` scales to 40px below 768px
- `display-md` scales to 24px below 768px
- Body and mono sizes unchanged

### Tracking (letter-spacing)
- Display: `-0.02em` (tighter for serif)
- Body: `0em` (default)
- Mono small: `0.2em` (HUD aesthetic, technical feel)
- Mono CTA: `0.25em`

### Italic usage
Only on the second line of each headline. Always paired with reduced opacity (`text-fg/55`). Never italicize body text or HUD elements.

## Easing tokens

```ts
// src/lib/easings.ts
export const easings = {
  expoOut: "cubic-bezier(0.16, 1, 0.3, 1)",     // default reveals, headline entries
  expoInOut: "cubic-bezier(0.87, 0, 0.13, 1)",  // parallax, large transitions
  quartOut: "cubic-bezier(0.25, 1, 0.5, 1)",    // fade-outs
  // GSAP-native equivalents for ScrollTrigger
  gsap: {
    out: "power3.out",
    inOut: "power3.inOut",
    sine: "sine.inOut",
    none: "none",  // for scrub timelines
  },
};
```

GSAP timeline rule: use string easings (`"power3.out"`) inside `gsap.to()` calls. Use the CSS cubic-bezier strings for non-GSAP CSS transitions.

## Duration scale

```ts
export const durations = {
  instant: 0,            // state changes, hovers
  fast: 200,             // micro UI feedback (button press)
  base: 400,             // standard UI transitions
  reveal: 600,           // element entries (headline, CTA fade-in)
  heroReveal: 1200,      // hero-scale reveals (jet emergence)
  cinematic: 2000,       // major moments (only used once or twice per page)
  idleBreath: 8000,      // ambient idle animations
};
```

## Spacing scale

Based on a 4-px grid.

```ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
  "4xl": 64,
  "5xl": 96,
  "6xl": 144,
  "7xl": 192,
};
```

### Hero-specific spacing
- HUD corner inset from viewport edge: 18px on desktop, 14px on mobile
- Headline 1 vertical position: viewport center (translateY(-50%))
- Headline 2 vertical position: 80px below true center
- CTA bottom offset from viewport bottom: 70px on desktop, 48px on mobile

## Border tokens
- All borders 0.5px (sub-pixel rendering on retina, 1px on standard displays — modern browsers handle this correctly)
- Border color default: `rgba(245, 242, 236, 0.1)` (faint)
- Accent border: `rgba(184, 149, 106, 0.7)` for CTA
- No box-shadow borders — use real `border` property

## Iconography
The hero has no icons. Future sections may use them — when needed, source from `lucide-react` outline icons only, sized 14–20px, color `text-fg/40` (subtle) or `text-fg` (active). Never filled icons.

## Cursor (future, not in hero v1)
Reserved for later: custom cursor with magnetic CTA behavior, implementation deferred.

## Z-index scale
Project-wide z-index layers. Use these constants, never raw numbers.

```ts
export const z = {
  background: 0,
  content: 10,
  hud: 50,
  overlay: 100,
  modal: 200,
};
```

Within the hero, internal layering uses values 0–10 as documented in `specs/hero.md`. Treat the hero's internal stack as scoped — it does not interact with the project-level scale.

## Asset optimization standards
- All images: WebP format, quality 85
- Cloud PNGs: alpha channel preserved, oversized 1.5× viewport for parallax headroom
- All `<img>` and `next/image` instances: explicit `width` and `height` to prevent CLS
- Hero cloud assets: `priority` flag on `next/image`
- Below-fold images: `loading="lazy"`

## Reduced motion behavior
When `(prefers-reduced-motion: reduce)` matches:
- All scroll-driven GSAP timelines are skipped
- Idle animations are skipped
- Headlines render in their stage-1 positions (no parallax, no fade)
- Jet renders at full opacity, centered, no scale or movement
- CTA renders immediately visible
- The pinned section behavior is disabled — section flows as a normal block

Implementation: wrap all GSAP setup in `gsap.matchMedia()` with appropriate queries.
