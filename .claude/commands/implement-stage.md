---
description: Implement a specific hero stage from the spec. Usage: /implement-stage 2
argument-hint: stage number (1-5)
---

Read `CLAUDE.md`, `specs/hero.md`, and `specs/design-system.md`.

Implement **Stage $ARGUMENTS** of the hero, exactly as defined in `specs/hero.md` under the corresponding stage section.

Rules:
1. Touch only files inside `/src/sections/Hero/`. Do not modify other sections, providers, or hooks unless I've previously confirmed it's needed.
2. Place all GSAP timeline definitions in `/src/sections/Hero/animations.ts`. Do not inline GSAP into the component files.
3. Use the exact design tokens from `specs/design-system.md`. If a needed token is missing, ASK before inventing.
4. Use the easings and durations specified in the spec. If the spec uses a numeric value (e.g. `scale 0.75 → 1.05`), use that exact value.
5. Wrap all GSAP setup in `gsap.context()` with cleanup. Wrap in `gsap.matchMedia()` to support `prefers-reduced-motion`.
6. After implementation, summarize:
   - Which files were modified
   - Which design tokens were used (colors, easings, durations)
   - Any spec ambiguity you had to resolve and what you chose
7. Do NOT commit. Do NOT modify git state.
8. Run `pnpm tsc --noEmit` after to verify types compile. If errors, fix them; do not leave broken types.

After implementation, the user will test in the browser. Wait for feedback before continuing to the next stage.
