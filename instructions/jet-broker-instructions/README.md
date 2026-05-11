# Sky Brokers — Hero Instruction Package

Drop these files into your Next.js repo before running Claude Code for the first time. They tell Claude Code exactly what to build, what NOT to build, and what design constraints are immutable.

## File placement

Drop these into the corresponding paths in your repo:

```
/CLAUDE.md                            ← repo root, Claude Code reads automatically
/specs/hero.md                        ← detailed hero spec
/specs/design-system.md               ← design tokens (colors, fonts, easings)
/specs/assets.md                      ← asset brief with Midjourney prompts
/.claude/commands/critique-hero.md    ← slash command: /critique-hero
/.claude/commands/implement-stage.md  ← slash command: /implement-stage 1..5
```

## Workflow

### Step 1 — Set up the repo (you, ~30 min)
```bash
pnpm create next-app@latest jet-broker --typescript --tailwind --app
cd jet-broker
pnpm add gsap lenis
mkdir -p specs .claude/commands src/sections/Hero src/app/playground/hero
```

Drop in the 6 files from this package. Verify `CLAUDE.md` is at the repo root.

### Step 2 — Generate assets (you, ~2-3 hours)
Follow `specs/assets.md`. Open Midjourney, run the four cloud prompts, mask backgrounds, convert to WebP. Render or buy the jet asset. Save font files.

Confirm the pre-flight checklist at the bottom of `specs/assets.md` is fully checked.

### Step 3 — First Claude Code session (you + Claude Code, ~30 min)
```bash
claude
```

Initial prompt (paste verbatim):
> Read CLAUDE.md and specs/hero.md and specs/design-system.md. Then scaffold the Hero component structure at /src/sections/Hero/ (index.tsx, animations.ts, Clouds.tsx, Jet.tsx, HUD.tsx, Headlines.tsx, types.ts) with the static layout only — no animations yet. Mount it in /src/app/playground/hero/page.tsx so I can see the static composition at /playground/hero.

Run `pnpm dev`, open `localhost:3000/playground/hero`, verify the static composition looks correct (clouds visible, jet visible, headlines visible, HUD readouts visible). Fix any layout issues by prompting Claude Code with specific feedback.

### Step 4 — Implement stages one by one (you + Claude Code, ~6-10 hours total)
For each of the 5 stages:

```
/implement-stage 1
```

(Then verify in browser, prompt adjustments, polish the easing manually.)

```
/implement-stage 2
```

Etc. Do NOT skip ahead or implement multiple stages in one prompt.

### Step 5 — Critique and polish (you + Claude Code, ~2-3 hours)
After all 5 stages work:

```
/critique-hero
```

Get back a structured list of deviations. Decide which to fix. Tweak easings by hand. Test on mobile. Run Lighthouse.

### Step 6 — Mobile fallback (you + Claude Code, ~1 hour)
Prompt:
> Implement the prefers-reduced-motion fallback as specified in CLAUDE.md and the mobile static fallback for viewports below 768px as specified in specs/hero.md.

### Step 7 — Performance pass (you, ~1 hour)
- Run Lighthouse, fix anything below 90
- Test on a real mid-range Android device
- Verify total asset weight under 3.2 MB
- Confirm 60 fps during scroll (DevTools Performance tab)

## Important behavioral notes for Claude Code

The `CLAUDE.md` file tells Claude Code to:
- Never commit (you control git)
- Always read the spec before implementing
- Never invent libraries beyond the stack
- Always wrap GSAP in cleanup contexts
- List which design tokens were used after every implementation

If Claude Code violates any of these, the file is at fault — refine the rules and try again. Claude Code follows `CLAUDE.md` strictly.

## When to use Claude.ai instead

Open Claude.ai (not Claude Code) when:
- You're stuck on a conceptual question ("should this easing be expo-out or cubic-bezier?")
- You want to brainstorm a new section or feature
- You need to refine the spec before implementing
- You want a code review on a snippet without modifying the repo

Open Claude Code when:
- You're implementing
- You're iterating on a real running component
- You need cross-file refactoring
- You're polishing animation timing with hot reload
