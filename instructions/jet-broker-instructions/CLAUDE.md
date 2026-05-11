# Project: Sky Brokers — Private Jet Broker Website

## Project context
This is a premium frontend project for a private jet brokerage. The visual bar is **VistaJet, Flexjet, Bottega Veneta** — not generic SaaS. Reductive, dark, cinematic. Every decision should reduce visual noise, never add it.

The current scope is **the hero section only**. The hero must work as a standalone, polished pitch asset that can be shown to the client before the rest of the site is built. Do not scaffold pages, sections, or routes beyond what is needed for the hero playground.

## Stack
- Next.js 15 (App Router)
- TypeScript strict mode
- Tailwind CSS
- GSAP + ScrollTrigger (animation orchestration)
- Lenis (smooth scroll)
- React 19

No 3D libraries yet (no Three.js, no R3F). The hero uses 2D PNG layers with CSS transforms.

## Design system — NON-NEGOTIABLE

### Colors
- Background: `#0A0A0B` (not pure black — deep off-black)
- Text primary: `#F5F2EC` (warm off-white)
- Accent: `#B8956A` (champagne, used sparingly for HUD elements and CTAs)
- That is the entire palette. No grays. No additional colors. If you feel the need for another color, the answer is a different opacity of one of these three.

### Typography
- Display: `Editorial New` (variable, self-hosted from `/public/fonts/`). Italic variant required.
- Body: `Söhne` (variable, self-hosted). Falls Söhne nicht verfügbar: `Inter Tight`.
- Mono: `JetBrains Mono` (for HUD elements, technical readouts, coordinates)

Use sentence case everywhere except:
- CTAs (uppercase + letter-spaced)
- HUD readouts (technical aviation conventions: `FL 410`, `M 0.85`)

### Easings
Define in `tailwind.config.ts` under `transitionTimingFunction`. Use only these:
- `expo-out`: `cubic-bezier(0.16, 1, 0.3, 1)` — default for reveals
- `expo-in-out`: `cubic-bezier(0.87, 0, 0.13, 1)` — for parallax and scroll-driven moves
- `quart-out`: `cubic-bezier(0.25, 1, 0.5, 1)` — for fade-outs
- `linear`: only for scroll-scrub timelines, never elsewhere

### Spacing rhythm
- Component padding: 16px / 32px / 64px
- Section spacing: 96px / 144px / 192px (margins between major blocks)
- Inline gaps: 8px / 12px / 16px / 24px

### NEVER use
- Drop shadows
- Glow effects
- Box-shadow with colored or warm tints
- Gradients beyond functional dark vignettes
- Rounded-2xl or larger corners (max `rounded-md` = 6px, usually `rounded-none`)
- Purple, blue, teal, or any color outside the palette
- Emojis anywhere in UI
- Title Case on body content
- Light mode (this site is dark-only by design)

## Animation philosophy
Restraint over abundance. **One major motion per viewport.** Everything else is supporting.

- Default duration baseline: 600ms for UI entries, 1200ms for hero reveals, 0s for state changes
- Scroll-scrub animations: `ease: "none"`, GSAP timeline controlled by ScrollTrigger
- Idle animations (when user is not scrolling): `sine.inOut`, `duration: 6-10s`, infinite yoyo
- Headlines fade out faster than they fade in (asymmetric easing feels expensive)
- Never animate more than 4 properties on the same element at the same time

## File conventions

```
/src
  /app
    /playground
      /hero
        page.tsx          # isolated playground for the hero
  /sections
    /Hero
      index.tsx           # main component
      animations.ts       # all GSAP timeline definitions
      Clouds.tsx          # cloud layers
      Jet.tsx             # jet element
      HUD.tsx             # readouts, coordinates, corner annotations
      Headlines.tsx       # headline stages
      types.ts            # TypeScript types for stage props
  /providers
    SmoothScrollProvider.tsx
  /hooks
    useScrollProgress.ts
  /lib
    easings.ts            # exported easing strings/curves
/public
  /clouds                 # PNG cloud assets
  /jet                    # jet renders
  /fonts                  # self-hosted variable fonts
  /grain.png              # film grain texture
/specs
  hero.md                 # the hero specification (read this!)
```

## Critical implementation rules

### GSAP cleanup
Every component that uses GSAP must wrap timelines in `gsap.context()` and return `ctx.revert()` in the useEffect cleanup. Failure to do this leaks ScrollTrigger instances on hot reload and on route navigation.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // timelines here
  }, rootRef);
  return () => ctx.revert();
}, []);
```

### Lenis must be the single source of scroll truth
Sync Lenis with ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`. Do not call `lenis.raf` in a separate requestAnimationFrame loop.

### Image optimization
All hero assets use `next/image` with `priority` flag and `placeholder="blur"`. Cloud PNGs are large (~800kb each). Compress to WebP via `sharp` before commit. Target: total hero asset weight under 2.5MB.

### will-change discipline
Add `will-change: transform, opacity` ONLY to layers that are actively being animated. Remove it after the animation completes (GSAP can do this via `onComplete`). Never apply it globally — it forces GPU layers and costs memory.

### Mobile fallback
Below 768px, the full scroll-driven hero is replaced with a static hero containing only the jet image, the headline, and the CTA. No parallax, no cloud animation, no pinning. Implement via `gsap.matchMedia()`.

## Reference sites (look at these before implementing anything)
- VistaJet.com — for typography and restraint
- Flexjet.com — for the editorial layout
- Boom Supersonic — for the technical HUD aesthetic
- Bottega Veneta — for cursor behavior and magnetic CTAs
- Bang & Olufsen — for the cinematic scroll pacing
- igloo.inc — for the scrub-based scroll mechanic (technical reference)

## What I want you to do by default
- When asked to implement a stage, **read `specs/hero.md` first**.
- Match the spec exactly. If the spec is ambiguous on a value (e.g. exact duration), default to the design system above and ask the user to confirm.
- After implementing, list the design tokens you used so the user can verify nothing drifted (e.g. "Used `expo-in-out` easing, duration 1.2s, accent `#B8956A` for the HUD reveal").
- Never invent reference sites or claim a technique is used by a specific site you haven't verified. If you suggest a technique, attribute it generically ("common in luxury sites") not specifically.
- Always run `pnpm tsc --noEmit` after substantial changes to verify types still compile.

## What I want you NOT to do
- Do not add libraries beyond the stack above without explicit confirmation. Especially: no `framer-motion` (we use GSAP), no `next-themes` (dark only), no `shadcn/ui` (looks generic).
- Do not generate placeholder text in German or English filler. If real content is missing, use the strings defined in `specs/hero.md`.
- Do not create more files than necessary. Co-locate animation definitions in `animations.ts` per section.
- Do not add comments explaining what the code does. Code should be self-evident. Comments only for *why* something non-obvious was chosen.
- Do not commit. The user controls all git operations.
