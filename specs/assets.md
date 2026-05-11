# Asset Brief — Hero

## Overview
The hero requires **5 image assets** and **1 texture overlay**. Total asset budget after optimization: under 2 MB.

## Cloud assets (4 files)

All four cloud assets follow the same generation and processing pipeline. The variation is in the prompt seed and density level.

### Generation: Midjourney v6

Run each prompt with `--ar 16:9 --style raw --v 6`. Generate 4 candidates per prompt, pick the best.

**1. Front cloud (densest, stage 1-2)**
```
thick dramatic cumulus cloud filling the foreground, pure black 
background, side lighting from upper right, subtle warm rim glow, 
hyper detailed cinematic, transparent edges, atmospheric haze, 
no horizon visible, single dense mass --ar 16:9 --style raw --v 6
```

**2. Mid cloud (medium density)**
```
medium altitude wispy cumulus formation, pure black background, 
soft ambient lighting, cinematic atmospheric, isolated cloud mass, 
no sky, drifting horizontally, dark moody tones with subtle 
champagne accents --ar 16:9 --style raw --v 6
```

**3. Back cloud (lightest, most diffuse)**
```
distant diffuse cloud layer, pure black background, very soft 
edges, atmospheric depth, barely visible mist, dark cinematic 
mood, single horizontal formation, isolated --ar 16:9 --style raw --v 6
```

**4. Close cloud (final cover, stage 5)**
```
massive dense storm cloud rolling forward, pure black background, 
dramatic underlight, cinematic, completely fills frame, dark moody, 
no breakaways or holes, opaque center --ar 16:9 --style raw --v 6
```

### Processing pipeline (per cloud)

1. Download the chosen variant at full resolution from Midjourney
2. Open in Photoshop, Photopea, or Affinity Photo
3. Use "Color Range" tool, sample pure black, tolerance ~30, expand if needed
4. Delete selection → transparent background
5. Refine edges with feather 2-3 px on the alpha mask
6. Resize to 2400 × 1400 px (downscale only, never upscale)
7. Export as PNG with alpha
8. Optimize: run through `sharp` to convert to WebP at quality 85
   ```bash
   npx sharp-cli -i input.png -o output.webp --format webp --quality 85
   ```
9. Verify file size under 400 KB

### Naming
- `/public/clouds/back.webp`
- `/public/clouds/mid.webp`
- `/public/clouds/front.webp`
- `/public/clouds/close.webp`

### Alternative source if Midjourney fails to produce usable results
- **Envato Elements** or **Adobe Stock**: search "isolated cumulus cloud transparent black background"
- **Unsplash** + manual masking: photo of clouds against sky, mask out sky, convert to dark tonality in Photoshop
- **3D render**: in Blender, use the "Empty Volume" with Principled Volume shader, render single frame, composite over black

## Jet asset

### Option A — 3D render (recommended, highest quality)
1. Purchase 3D model from TurboSquid or CGTrader (search "Gulfstream G650" or "Bombardier Global 7500", €30-80 range)
2. Import to Blender
3. Set up scene:
   - Camera: 3/4 view, slightly elevated (10-15° down), focal length 85mm
   - Lighting: 3-point setup with key light from upper-left (cool 5500K), warm rim from upper-right (3500K, low intensity for the champagne accent), fill from below at very low intensity
   - Background: pure black
4. Render at 1800 × 720 px, 256 samples, denoise on
5. Export as PNG with transparent background
6. Convert to WebP at quality 90 (jets benefit from slightly higher quality due to fine wing edges)

### Option B — Midjourney (faster, less reliable)
```
private jet gulfstream g650 luxury aircraft, side three-quarter view 
from slightly above, isolated on pure black background, professional 
studio product photography lighting, ultra detailed photorealistic, 
sharp focus, premium aviation, no people, no airport --ar 16:9 
--style raw --v 6
```
Generate 8-12 candidates. Most will have subtle distortions (wing geometry, engine placement). Pick the cleanest, mask edges manually if needed.

### Option C — Licensed press image
Manufacturers (Bombardier, Gulfstream, Embraer Executive) provide press images via their media centers. Apply for press access, download, mask background. License terms typically allow editorial and commercial use with attribution.

### Final spec
- File: `/public/jet/jet-main.webp`
- Dimensions: 1800 × 720 px
- Format: WebP, quality 90, alpha preserved
- File size after optimization: under 300 KB
- The jet should occupy ~60% of the frame width, centered, with margin on all sides for the parallax movement

## Texture: film grain

### Source
Download a free seamless film grain PNG from one of:
- https://www.transparenttextures.com/ (search "noise" or "grain")
- Generate via SVG `feTurbulence` and rasterize at 200×200 px

### Spec
- File: `/public/textures/grain.png`
- Dimensions: 200 × 200 px (tileable)
- Format: PNG with alpha (grayscale noise on transparent background)
- File size: under 15 KB

### Application
Used as a fullscreen overlay layer:
```tsx
<div 
  aria-hidden 
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: "url(/textures/grain.png)",
    backgroundRepeat: "repeat",
    mixBlendMode: "overlay",
    opacity: 0.04,
  }}
/>
```

## Font assets

Self-host these in `/public/fonts/`. Acquire legally:
- **Editorial New** by Pangram Pangram — paid license, around €60 for personal/small commercial. Variable WOFF2 version.
- **Söhne** by Klim Type Foundry — paid license, larger commercial use tier required (~€600+ depending on traffic). Alternative: **Inter Tight** (free, Google Fonts, self-host the WOFF2).
- **JetBrains Mono** — free under Apache 2.0, available on GitHub.

For client work where licensing is a concern, the recommended drop-ins:
- Display: **PP Editorial New** (same foundry, similar visual feel, sometimes lower tier)
- Body: **Inter Tight** (free)
- Mono: **JetBrains Mono** (free)

### Font file structure
```
/public/fonts/
  /editorial-new/
    EditorialNew-Variable.woff2
    EditorialNew-Italic-Variable.woff2
  /inter-tight/
    InterTight-Variable.woff2
  /jetbrains-mono/
    JetBrainsMono-Variable.woff2
```

### Font-face declarations in `app/fonts.css`
```css
@font-face {
  font-family: "Editorial New";
  src: url("/fonts/editorial-new/EditorialNew-Variable.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Editorial New";
  src: url("/fonts/editorial-new/EditorialNew-Italic-Variable.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}

/* analogous for Inter Tight and JetBrains Mono */
```

Then in `app/layout.tsx` import the CSS:
```tsx
import "./fonts.css";
```

## Pre-flight checklist before starting Claude Code

Before opening Claude Code and running the first prompt, confirm:

- [ ] All 4 cloud WebP files exist in `/public/clouds/` and total under 1.6 MB
- [ ] Jet WebP exists at `/public/jet/jet-main.webp` and is under 300 KB
- [ ] Grain texture exists at `/public/textures/grain.png` and is under 15 KB
- [ ] All 3 font families self-hosted in `/public/fonts/` with variable WOFF2 files
- [ ] `CLAUDE.md` is at repo root
- [ ] `specs/hero.md` exists
- [ ] `specs/design-system.md` exists
- [ ] Next.js project is initialized with TypeScript strict mode, Tailwind, App Router
- [ ] Dependencies installed: `gsap`, `lenis` (no `framer-motion`, no `three`)
- [ ] Empty playground route exists at `/src/app/playground/hero/page.tsx` returning a placeholder

Once all checked, the first Claude Code prompt is:

> Read CLAUDE.md and specs/hero.md and specs/design-system.md. Then scaffold the Hero component structure at /src/sections/Hero/ (index.tsx, animations.ts, Clouds.tsx, Jet.tsx, HUD.tsx, Headlines.tsx, types.ts) with the static layout only — no animations yet. Mount it in /src/app/playground/hero/page.tsx so I can see the static composition at /playground/hero.
