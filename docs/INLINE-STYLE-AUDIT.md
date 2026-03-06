# Inline Style Audit

> Generated 2026-03-06 by `scripts/audit-inline-styles.cjs`

## Summary: 858 inline styles across 31 files

## Files by Inline Style Count

| File | Count | Priority |
|------|-------|----------|
| `trust.html` | 167 | HIGH |
| `index.html` | 98 | HIGH |
| `pricing.html` | 97 | HIGH |
| `verticals.html` | 89 | HIGH |
| `demos.html` | 72 | HIGH |
| `dgi-dcii-comparison.html` | 47 | MEDIUM |
| `case-studies.html` | 46 | MEDIUM |
| `diagrams.html` | 25 | MEDIUM |
| `trading.html` | 19 | LOW |
| `architecture.html` | 17 | LOW |
| `premium.html` | 17 | LOW |
| `dgi.html` | 16 | LOW |
| `platform-capabilities.html` | 15 | LOW |
| `honesty-matrices.html` | 13 | LOW |
| `pilot.html` | 13 | LOW |
| `gateway.html` | 12 | LOW |
| `hospitality.html` | 11 | LOW |
| `roi-calculator.html` | 11 | LOW |
| `protocol.html` | 10 | LOW |
| `wargames.html` | 10 | LOW |
| `regulators-receipt.html` | 8 | LOW |
| `dcii.html` | 7 | LOW |
| `security-controls.html` | 7 | LOW |
| `manifesto.html` | 6 | LOW |
| `partners.html` | 6 | LOW |
| `team.html` | 5 | LOW |
| `api-docs.html` | 4 | LOW |
| `privacy.html` | 3 | LOW |
| `terms.html` | 3 | LOW |
| `404.html` | 2 | LOW |
| `changelog.html` | 2 | LOW |

## Most Common Style Properties

| Property | Occurrences | Suggested CSS Class |
|----------|-------------|-------------------|
| `color` | 422 | `.u-color` |
| `font-size` | 287 | `.u-font-size` |
| `margin-bottom` | 177 | `.u-margin-bottom` |
| `border-radius` | 154 | `.u-border-radius` |
| `margin-top` | 105 | `.u-margin-top` |
| `background` | 99 | `.u-background` |
| `text-align` | 99 | `.u-text-align` |
| `padding` | 79 | `.u-padding` |
| `font-weight` | 77 | `.u-font-weight` |
| `text-decoration` | 65 | `.u-text-decoration` |
| `display` | 52 | `.u-display` |
| `letter-spacing` | 49 | `.u-letter-spacing` |
| `font-family` | 47 | `.u-font-family` |
| `line-height` | 43 | `.u-line-height` |
| `border` | 39 | `.u-border` |
| `gap` | 34 | `.u-gap` |
| `margin` | 27 | `.u-margin` |
| `text-transform` | 26 | `.u-text-transform` |
| `grid-template-columns` | 25 | `.u-grid-template-columns` |
| `cursor` | 25 | `.u-cursor` |
| `border-color` | 25 | `.u-border-color` |
| `width` | 21 | `.u-width` |
| `height` | 20 | `.u-height` |
| `transition` | 18 | `.u-transition` |
| `opacity` | 18 | `.u-opacity` |

## Migration Strategy

1. **Phase 1**: Extract repeated patterns into `styles.css` utility classes
2. **Phase 2**: Replace inline styles in HIGH-priority files (trust.html, index.html, pricing.html)
3. **Phase 3**: Replace in MEDIUM files (verticals.html, demos.html, case-studies.html)
4. **Phase 4**: Replace in LOW files (remaining)

## Common Patterns to Extract

These inline style combinations appear frequently and should become CSS classes:

```css
/* Trust section cards */
.trust-card-bg { background: rgba(0,0,0,0.2); border-radius: 8px; padding: 1rem; }
.trust-gradient-green { background: linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.05) 100%); }
.trust-gradient-purple { background: linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.05) 100%); }
.trust-gradient-red { background: linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(245,158,11,0.04) 100%); }
.trust-gradient-gold { background: linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.05) 100%); }

/* Typography utilities */
.text-dim { color: var(--color-text-dim); }
.text-muted { color: var(--color-text-muted); }
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.85rem; }

/* Layout utilities */
.grid-auto-fit { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
.flex-center { display: flex; align-items: center; justify-content: center; }
```

---

*Run this audit quarterly to track inline style reduction.*
