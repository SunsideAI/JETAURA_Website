# Hero Specification

## Concept
A cinematic, scroll-driven hero where a private jet emerges from dense clouds, cruises across the viewport, and disappears back into clouds. The scroll is the camera. The user is the pilot of the experience.

The entire hero occupies a **pinned section** of `end: "+=3000"` — meaning the user scrolls 3000 vertical pixels through the hero before the page moves past it. During this 3000px the section is pinned to the viewport.

Scroll progress is divided into **five stages** with overlapping animation regions. Animation is **continuously scrubbed** (not snapped) — every scroll position has a unique visual state. The scrub timeline uses `scrub: 1.2` for slight smoothing.

## Stage table

| Stage | Scroll range | Title       | Key visual                              |
|-------|--------------|-------------|------------------------------------------|
| 1     | 0% – 15%     | Mist        | Dense clouds. Jet not visible. Headline 1. |
| 2     | 15% – 40%    | Emergence   | Front clouds dissolve. Jet appears.       |
| 3     | 40% – 65%    | Cruise      | Jet centered. HUD active. Mid-headline.    |
| 4     | 65% – 88%    | Approach    | New clouds advance. Headline 2 active.     |
| 5     | 88% – 100%   | Vanish      | Jet gone. Clouds dense. CTA appears.       |

## Element layer stack (z-index ascending)

```
z 0   Stage background (#0A0A0B solid)
z 1   Stars layer (60 absolute-positioned dots, parallax)
z 2   Cloud back (large, soft, slowest parallax)
z 3   Cloud mid (medium scale, medium parallax)
z 4   Jet (the centerpiece)
z 5   Cloud front (largest, fastest parallax, scales out during emergence)
z 6   Headlines (1 and 2, alternating visibility)
z 7   Cloud close (the final cloud that re-covers the jet at vanish)
z 8   Film grain overlay (mix-blend-mode: overlay, opacity 0.04)
z 9   Vignette (box-shadow inset, dark edges)
z 10  HUD elements (corners, readouts, CTA)
```

## Stage details

### Stage 1 — Mist (scroll 0% – 15%)
**State at scroll 0%:**
- Entire viewport filled with dense, dark cloud-front layer
- Cloud-mid and cloud-back visible behind, but not yet activated for animation
- Stars subtly visible in the top 60% of the viewport
- Jet element invisible (`opacity: 0`)
- Headline 1 centered: *"Beyond schedules."* — full opacity, font-size 64px on desktop (responsive scale)
- HUD corners visible from start: `N° 001 — Sky Brokers` top-left, `FL 000 · M 0.00` top-right, `Est. 2026 · Frankfurt` bottom-left, progress indicator bottom-right
- CTA invisible

**Animation through this range:**
- Headline 1 begins subtle parallax up (`y: -10px` at scroll 15%)
- Stars start a very slow downward drift (`y: +5px` at scroll 15%)
- Cloud-front still at base scale, no movement yet

### Stage 2 — Emergence (scroll 15% – 40%)
**Animation:**
- Cloud-front: scales from `1.0` to `2.6`, translates `y +70px`, opacity from `1.0` to `0.0` using `expo-in-out`
- Cloud-mid: scales from `1.0` to `1.4`, translates `x -50px, y +30px`, opacity `0.9 → 0.4`
- Cloud-back: translates `x -30px, y +18px`, opacity `0.85 → 0.55`
- Jet enters: opacity from `0` to `1.0`, scale from `0.75` to `1.05`, x from `-40px` to `0px`, all on `expo-out` easing, starting at scroll 18%, finishing at scroll 38%
- Headline 1: continues parallax up, fades out completely between scroll 25% and 33%
- HUD readouts: FL starts ticking up from `FL 000`, Mach starts from `M 0.00`

### Stage 3 — Cruise (scroll 40% – 65%)
**State during this range:**
- Jet centered, fully visible, at slight scale `1.05` decreasing to `1.0`
- Cloud-back drifting slowly underneath
- Stars at maximum subtle parallax
- HUD readouts reach cruise values: `FL 410` and `M 0.85` by scroll 55%
- Headline 2 (smaller, font-size 36px) fades in starting scroll 55%: *"Anywhere. Within 90 minutes."* — centered, positioned 80px below true center to avoid overlap with jet
- A small annotation appears top-right under HUD: aircraft tail number `D-AVIA · GULFSTREAM G650` (mono, opacity 0.6)

**Animation:**
- Jet: subtle vertical bob `y: sin(scrollProgress * π * 1.6) * 5px` — gives "in flight" feel
- Jet: scale `1.05 → 1.0`, x `0 → +22px` (cruise drift)
- Cloud-back: continues drift `x -50px, y +30px` at end of stage 3
- Headline 2 entry: `y: 30 → 0`, opacity `0 → 1.0`, easing `expo-out`, duration mapped to scroll 55% → 68%

### Stage 4 — Approach (scroll 65% – 88%)
**Animation:**
- Cloud-close (the final cloud) fades in: opacity `0 → 1.0`, scale `1.8 → 1.0` over scroll 65% → 100%, easing `expo-in-out`
- Jet: scale `1.0 → 1.18`, x `+22px → +55px`, opacity `1.0 → 0` between scroll 72% and 92%
- Headline 2: stays visible until scroll 82%, then fades out
- HUD readouts: FL begins descending from `FL 410` toward `FL 000` between scroll 80% and 100%, Mach decreases similarly
- Aircraft tail number annotation fades out at scroll 80%

### Stage 5 — Vanish + CTA (scroll 88% – 100%)
**State at scroll 100%:**
- Cloud-close at full opacity, scale 1.0 — the viewport is dense clouds again
- Jet completely gone (opacity 0)
- Both headlines invisible
- CTA visible and active: *"Configure your flight"* — centered, bottom 70px offset, monospace 11px, letter-spacing 0.25em, champagne `#B8956A` border 0.5px, padding 12px 32px
- HUD corners: progress reads `100%`, FL reads `FL 000`, Mach reads `M 0.00`
- A small scroll-hint annotation appears below the CTA at scroll 95%: `Press space or scroll to continue ↓` (mono, opacity 0.4)

**Animation:**
- CTA: opacity `0 → 1.0` between scroll 88% and 96%, easing `expo-out`
- Hint: opacity `0 → 0.4` between scroll 95% and 99%

## Idle animations (active when user is NOT scrolling)

These run independently of the scroll timeline, providing "alive" feeling on stillness:

- Cloud-back and cloud-mid: `y: +/- 8px`, duration 8s, ease `sine.inOut`, infinite yoyo
- Stars: random twinkle — each star has random `opacity` animation between its base opacity and `base * 0.4`, duration 2-5s random per star, infinite yoyo
- Jet bob (only active during cruise stage): handled by stage 3 animation, not idle

## Copy / strings

```ts
export const heroStrings = {
  topLeft: "N° 001 — Sky Brokers",
  bottomLeft: "Est. 2026 · Frankfurt",
  headline1: {
    line1: "Beyond",
    line2: "schedules.",  // italic, opacity 0.55
  },
  headline2: {
    line1: "Anywhere.",
    line2: "Within 90 minutes.",  // italic, opacity 0.55
  },
  cta: "Configure your flight",
  scrollHint: "Press space or scroll to continue ↓",
  tailNumber: "D-AVIA · GULFSTREAM G650",
};
```

## Asset requirements

All assets stored in `/public/` and optimized to WebP before commit.

### Cloud assets (3 layers + 1 closer = 4 PNGs)
Source: Midjourney v6 with prompts in `specs/assets.md`. Each cloud PNG has:
- Format: PNG with alpha channel, then converted to WebP
- Dimensions: 2400 × 1400 px (oversized for parallax breathing room)
- File size after optimization: target under 400 KB each
- Pure black areas should be fully transparent (use `remove.bg` or Photoshop with "Color Range" → black → delete)

Files:
- `/public/clouds/back.webp` — most diffuse, lightest in implied density
- `/public/clouds/mid.webp` — medium density
- `/public/clouds/front.webp` — densest, darkest, used for stages 1-2
- `/public/clouds/close.webp` — final cover, mostly opaque

### Jet asset
- One static PNG render of a Gulfstream G650 or Bombardier Global 7500
- 3/4 view from slightly above
- Format: PNG with alpha, then WebP
- Dimensions: 1800 × 720 px
- File size after optimization: target under 300 KB
- File: `/public/jet/jet-main.webp`

### Texture overlays
- `/public/textures/grain.png` — 200×200 px noise texture, tileable, used with `mix-blend-mode: overlay` at opacity 0.04

## Performance targets
- LCP under 2.0s on Fast 4G
- CLS = 0 (no layout shift)
- Total hero bundle (JS + CSS + assets) under 3.2 MB
- 60 fps during scroll on mid-tier hardware (test target: MacBook Air M1, mid-range Android from 2022)
- Lighthouse Performance score: 92+

## Accessibility requirements
- All decorative SVG and PNG layers get `aria-hidden="true"`
- The `<section>` has `aria-label="Sky Brokers hero"`
- Headlines use real `<h1>` and `<h2>` tags with the design fonts
- CTA is a real `<button>` with focus-visible outline (use `#B8956A` as focus ring color)
- Respect `prefers-reduced-motion`: if reduced motion is set, skip ALL scroll animations, show jet + headline 1 + CTA as a static composition with no scroll-pinning
- Color contrast: champagne `#B8956A` on `#0A0A0B` is checked (passes AA for large text, fails AA for body text → only use for HUD elements and CTA, never for body copy)

## Open questions for the user
The implementation should pause and ask before deciding:
- Should headline 2 (`Anywhere. Within 90 minutes.`) be replaced with a route-specific string later? (For now use the generic.)
- Tail number — fictional `D-AVIA` or real client's tail number? (Default fictional until client briefs.)
- Should the CTA `Configure your flight` link to an anchor `#configure` on the same page, a separate `/configure` route, or trigger a modal? (Default: no link yet, just visual.)
