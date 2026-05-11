---
description: Critique the current state of the hero section against the spec
---

Read `CLAUDE.md`, `specs/hero.md`, and `specs/design-system.md`.

Then inspect all files in `/src/sections/Hero/`.

Provide a critique with this exact structure (no code, only analysis):

## Spec compliance
- List any deviations from `specs/hero.md` (stage values, animation properties, copy strings, layer order)
- For each deviation: cite the line in the spec and the line in the implementation

## Design token compliance
- List any uses of colors, fonts, easings, durations, or spacings that are NOT in `specs/design-system.md`
- Flag any hardcoded values that should reference design tokens

## Animation quality
- Easings: are they appropriate per the spec? Any linear used where ease-out should be? Any aggressive ease where subtle is needed?
- Timing: are durations consistent with the duration scale?
- Coordination: do animations that should be synchronized share the same scroll progress range?
- Cleanup: is every GSAP timeline wrapped in `gsap.context()` with `ctx.revert()` in cleanup?

## Performance concerns
- `will-change` usage: any layers with persistent will-change that should be transient?
- Image loading: all hero images using `next/image` with `priority`?
- Bundle: any imported but unused libraries?
- Animations triggering layout reflow vs only transform/opacity?

## Accessibility issues
- Decorative elements with `aria-hidden`?
- Real semantic tags (`h1`, `h2`, `button`)?
- `prefers-reduced-motion` handling present?
- Focus states defined?

## Polish opportunities (subjective but flagged)
- Anything that would feel more "premium" with a tweak: easing curves that could be more expressive, timings that feel slightly off, opacities that read as too aggressive or too subtle.

Do NOT write any code. This is critique only. The user will decide what to act on.
