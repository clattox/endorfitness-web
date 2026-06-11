# Audit Report — Endorfitness Web

**Date**: 2026-10-06
**Audited surfaces**: `app/page.tsx` (public landing), `app/Admin/page.tsx` (admin panel), `app/globals.css` (design tokens)
**Register**: Brand (landing page with secondary admin panel)
**Detector scan**: No automated anti-pattern hits found

---

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 2/4 | Missing ARIA labels, poor contrast on body text, no focus indicators |
| 2 | Performance | 3/4 | Inline styles cause re-renders; no image optimization; otherwise lean |
| 3 | Responsive Design | 2/4 | Fixed heights, no touch-target sizing, potential overflow on mobile |
| 4 | Theming | 1/4 | Hard-coded colors everywhere; CSS variables exist but are unused in components |
| 5 | Anti-Patterns | 2/4 | Card grid pattern, tiny uppercase tracked labels, some AI slop tells |
| **Total** | | **10/20** | **Acceptable — significant work needed** |

---

## Anti-Patterns Verdict

**Borderline pass/fail.** The site has a strong identity (dark bg + neon green) that prevents it from looking like a generic AI template, but several AI slop tells are present:

- ✅ **Avoids**: Gradient text, glassmorphism, hero metrics, side-stripe borders, numbered section markers
- ⚠️ **Has**: Identical card grids (icon + heading + text repeated in two sections), tiny uppercase tracked eyebrow ("MÁS QUE UN STUDIO", "PLANES PRESENCIALES"), all-caps body copy
- ✅ **Good**: The neon green on black is a committed color strategy, not a timid palette

**Verdict**: Not obviously AI-generated, but the card-grid + eyebrow pattern is the most common AI landing page scaffold. The brand's color commitment saves it from looking generic.

---

## Executive Summary

- **Audit Health Score**: 10/20 (Acceptable)
- **Total issues found**: 14 (P0: 1, P1: 5, P2: 5, P3: 3)
- **Top critical issues**:
  1. **P0** — Hard-coded colors throughout; no design token usage in components
  2. **P1** — Body text contrast too low (#666 on #080808 = ~4.0:1, borderline fail)
  3. **P1** — No keyboard focus indicators anywhere
  4. **P1** — Hero has fixed 70vh height; breaks on very short or very tall viewports
  5. **P1** — Identical card grids in two sections create visual monotony
- **Recommended next steps**: Run `/impeccable colorize` to establish a token system, then `/impeccable layout` to fix spacing and card variety, then `/impeccable polish` for final pass

---

## Detailed Findings by Severity

### P0 — Blocking

#### [P0] Hard-coded colors everywhere
- **Location**: `app/page.tsx` lines 15-17, 52, 62, 73-78, 81-187; `app/Admin/page.tsx` lines 22-24, 74-139
- **Category**: Theming
- **Impact**: Impossible to maintain or theme consistently. Every color change requires editing every component. The CSS variables in `globals.css` (`--primary: #ea580c`) are completely ignored — the actual site uses `#39FF14` (neon green) which isn't even defined as a token.
- **Recommendation**: Extract all colors into CSS custom properties in `globals.css`. Define tokens for: `--color-brand` (neon green), `--color-bg` (#050505), `--color-surface` (#111), `--color-text` (#fff), `--color-text-muted` (#666), `--color-border` (#222), `--color-whatsapp` (#25D366). Reference them in components.
- **Suggested command**: `/impeccable colorize`

---

### P1 — Major

#### [P1] Body text contrast below WCAG AA
- **Location**: `app/page.tsx` lines 129, 150, 167 — `color: '#666'` on `#080808` / `#0a0a0a` / `#111` backgrounds
- **Category**: Accessibility
- **Impact**: Users with low vision will struggle to read service descriptions and plan details. #666 on #111 is approximately 4.0:1, below the 4.5:1 WCAG AA minimum for body text.
- **Recommendation**: Bump muted text to at least `#999` on dark backgrounds, or use a lighter shade of the brand's own hue. For body text on dark surfaces, aim for `#aaa` or lighter.
- **Suggested command**: `/impeccable colorize`

#### [P1] No keyboard focus indicators
- **Location**: `app/page.tsx` lines 89-91 (button), 174-187 (whatsapp link); `app/Admin/page.tsx` lines 86-88, 104-105
- **Category**: Accessibility
- **Impact**: Keyboard-only users cannot navigate the site. Buttons and links have no visible focus ring.
- **Recommendation**: Add `outline: 2px solid neonGreen` or `box-shadow` on `:focus-visible` for all interactive elements. Use CSS variable for consistency.
- **Suggested command**: `/impeccable harden`

#### [P1] Fixed 70vh hero height
- **Location**: `app/page.tsx` line 81 — `height: '70vh'`
- **Category**: Responsive Design
- **Impact**: On very short viewports (landscape mobile), the hero takes the full screen and the CTA button may be below the fold. On very tall screens, the hero may feel empty.
- **Recommendation**: Use `min-height: 70vh` instead of `height: 70vh`, or use `min-height: 100svh` with padding. Better yet, let content determine height with a `min-height` floor.
- **Suggested command**: `/impeccable adapt`

#### [P1] Identical card grid pattern in two sections
- **Location**: `app/page.tsx` lines 119-132 ("MÁS QUE UN STUDIO") and lines 157-170 ("RECONSTRUCCIÓN DE CASILLAS ORIGINALES")
- **Category**: Anti-Pattern
- **Impact**: Two sections in a row use the exact same layout pattern (grid of cards with icon + heading + text). This is the #1 AI landing page tell. Creates visual monotony and reduces differentiation between sections.
- **Recommendation**: Differentiate the second section. Use a different layout (alternating rows, a list with leading icons, a featured spotlight card + smaller supporting items). The "STAFF EXPERTO" / "ALTO RENDIMIENTO" / "ESTAMOS EN CAÑETE" section deserves a distinct visual treatment.
- **Suggested command**: `/impeccable layout`

#### [P1] Tiny uppercase tracked eyebrow above sections
- **Location**: `app/page.tsx` lines 116-118 ("MÁS QUE UN STUDIO"), lines 138-139 ("PLANES PRESENCIALES")
- **Category**: Anti-Pattern
- **Impact**: The SKILL.md explicitly calls this out as the "2023-era kicker" — small all-caps text with wide tracking above every heading. It's the most common AI scaffold pattern. One section with a kicker is voice; every section is grammar.
- **Recommendation**: Vary the heading treatment. Some sections can lead with the heading directly (no kicker). Others can use a different visual cue (a colored bar, a leading number if sequential, an icon).
- **Suggested command**: `/impeccable layout`

---

### P2 — Minor

#### [P2] Inline `<style>` tag instead of CSS module or global styles
- **Location**: `app/page.tsx` lines 54-70
- **Category**: Performance / Theming
- **Impact**: Inline `<style>` tags with `${neonGreen}` interpolation create a new stylesheet on every render. The animations and utility classes should live in `globals.css` or a CSS module.
- **Recommendation**: Move the `@keyframes fadeIn`, `.animate-fade`, `.hero-overlay`, `.modern-title`, and `.pill-whatsapp` classes to `globals.css`. Use CSS custom properties instead of JS template literals.
- **Suggested command**: `/impeccable optimize`

#### [P2] Missing image lazy loading and dimensions
- **Location**: `app/page.tsx` lines 148 — `<img src={plan.img} ... />`
- **Category**: Performance
- **Impact**: Images load eagerly by default, blocking initial render. Without explicit `width` and `height`, the browser cannot reserve space, causing layout shift (CLS).
- **Recommendation**: Add `loading="lazy"` and explicit `width`/`height` attributes matching the CSS dimensions. Or use Next.js `<Image>` component for automatic optimization.
- **Suggested command**: `/impeccable optimize`

#### [P2] No touch-target sizing for mobile
- **Location**: `app/page.tsx` lines 89-91 (button padding 18px 35px is fine), but `app/Admin/page.tsx` lines 104-105 ("SALIR" link has 10px 20px padding — may be < 44px)
- **Category**: Responsive Design
- **Impact**: Touch targets smaller than 44x44px fail WCAG and frustrate mobile users.
- **Recommendation**: Ensure all interactive elements have minimum 44x44px touch targets. The "SALIR" link in admin should have larger padding.
- **Suggested command**: `/impeccable adapt`

#### [P2] No `prefers-reduced-motion` support
- **Location**: `app/page.tsx` lines 55-56 — `.animate-fade` animation
- **Category**: Accessibility
- **Impact**: Users who prefer reduced motion will still see the fade-in animation, which can cause discomfort.
- **Recommendation**: Add `@media (prefers-reduced-motion: reduce) { .animate-fade { animation: none; opacity: 1; } }` to the style block or globals.css.
- **Suggested command**: `/impeccable harden`

#### [P2] Admin page uses hard-coded PIN
- **Location**: `app/Admin/page.tsx` line 27 — `const ADMIN_PIN = "2749";`
- **Category**: Security (not design, but noted)
- **Impact**: The PIN is hard-coded in the client bundle. Anyone can view the source to find it.
- **Recommendation**: Move PIN validation to a server action or API route. At minimum, obfuscate or use environment variables.
- **Suggested command**: `/impeccable harden`

---

### P3 — Polish

#### [P3] WhatsApp button z-index: 100
- **Location**: `app/page.tsx` line 181 — `zIndex: 100`
- **Category**: Theming
- **Impact**: Arbitrary z-index values can conflict with modals or overlays added later.
- **Recommendation**: Build a semantic z-index scale in CSS variables (dropdown: 10, sticky: 20, modal-backdrop: 30, modal: 40, toast: 50, tooltip: 60). Use the appropriate token.
- **Suggested command**: `/impeccable polish`

#### [P3] No `text-wrap: balance` on headings
- **Location**: `app/page.tsx` lines 86-87 (h1), 116-118 (h2), 138-139 (h2)
- **Category**: Typography
- **Impact**: Headings may have uneven line lengths with orphaned words on the last line.
- **Recommendation**: Add `text-wrap: balance` to h1-h3 headings for even line lengths.
- **Suggested command**: `/impeccable typeset`

#### [P3] Admin table lacks responsive handling
- **Location**: `app/Admin/page.tsx` lines 114-135
- **Category**: Responsive Design
- **Impact**: On narrow viewports, the table will horizontally scroll or force the page to overflow.
- **Recommendation**: The `overflowX: 'auto'` wrapper helps, but consider a card-based layout for mobile or a responsive table pattern with stacked rows.
- **Suggested command**: `/impeccable adapt`

---

## Patterns & Systemic Issues

1. **No design token system**: Colors are hard-coded as JS string literals in every component. The CSS variables in `globals.css` (`--primary: #ea580c`) define an orange brand color, but the actual site uses neon green (`#39FF14`). The CSS variables are dead code.
2. **Inline styles everywhere**: Both pages use 100% inline styles. This prevents CSS caching, makes overrides difficult, and bloats the component code. A CSS module or Tailwind utility approach would be more maintainable.
3. **Two visual languages**: The public page uses neon green on black; the admin page uses the same neon green but the CSS variables define orange. There's no single source of truth for the brand.
4. **Card grid repetition**: Two consecutive sections use the same icon+heading+text card grid pattern, reducing visual differentiation.

---

## Positive Findings

- ✅ **Strong color commitment**: The neon green on near-black background is distinctive and energetic — exactly right for a fitness brand. This is the site's strongest visual asset.
- ✅ **Good use of `clamp()`**: Headings use `clamp()` for fluid typography (`clamp(40px, 8vw, 80px)`, `clamp(35px, 6vw, 60px)`).
- ✅ **Responsive grid without breakpoints**: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` is the correct pattern for breakpoint-free responsive grids.
- ✅ **WhatsApp CTA**: The floating WhatsApp button is well-placed and uses a proper hover effect. Good conversion pattern for a local business.
- ✅ **Clean form UX**: The attendance registration form has clear states (default, loading, success) and a "volver atrás" option. Good micro-interaction design.
- ✅ **Admin PIN gate**: Simple but effective security for the staff panel.
- ✅ **Semantic HTML structure**: Uses `<nav>`, `<header>`, `<section>`, `<form>`, `<table>` — good semantic foundation.

---

## Recommended Actions

1. **[P0] `/impeccable colorize`**: Establish a proper design token system. Extract all hard-coded colors into CSS custom properties. Fix the disconnect between `globals.css` variables (orange) and actual brand color (neon green). Fix body text contrast.

2. **[P1] `/impeccable layout`**: Differentiate the two card-grid sections. Vary heading treatments to avoid the "eyebrow on every section" pattern. Fix the fixed 70vh hero height.

3. **[P1] `/impeccable harden`**: Add keyboard focus indicators, `prefers-reduced-motion` support, and address the hard-coded PIN security concern.

4. **[P2] `/impeccable adapt`**: Fix touch target sizes, add responsive handling for the admin table, ensure hero works on all viewport sizes.

5. **[P2] `/impeccable optimize`**: Move inline `<style>` to globals.css, add image lazy loading, consider Next.js Image component.

6. **[P3] `/impeccable typeset`**: Add `text-wrap: balance` to headings, review typography scale.

7. **[P3] `/impeccable polish`**: Fix z-index scale, final quality pass.

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `/impeccable audit` after fixes to see your score improve.
