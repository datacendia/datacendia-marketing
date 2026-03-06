# Homepage Simplification — 3-Pillar Narrative

**Status:** Recommendation (not yet implemented)  
**Priority:** Medium  
**Last Updated:** March 2026

## Problem

The homepage currently has ~15 distinct sections and introduces too many concepts simultaneously: 9 primitives, 12 pillars, 3 tiers, IISS score, DCII framework, The Council, Decide, CendiaNotary, CendiaVault, War Games, product showcase, video demos, buyer personas, architecture, FAQ, and more.

A first-time visitor cannot quickly answer: "What does this product do?"

## Recommended 3-Pillar Narrative

Lead with three concepts that map to the buyer's journey:

### Pillar 1 — Deliberation
> "Multiple AI agents argue your decision from every angle."

- Maps to: The Council, CendiaDissent, CendiaCrucible, Ghost Board
- Buyer question answered: "How does it work?"

### Pillar 2 — Evidence
> "Every decision produces a cryptographic proof packet."

- Maps to: CendiaVault, CendiaNotary, Audit Provenance, Regulator's Receipt
- Buyer question answered: "What do I get?"

### Pillar 3 — Sovereignty
> "Runs on your infrastructure. Your keys. Your data. Air-gap ready."

- Maps to: Deployment options, air-gap, Ollama local LLM, customer-owned KMS
- Buyer question answered: "Where does it run?"

## Proposed Homepage Structure (Simplified)

| Order | Section | Purpose |
|-------|---------|---------|
| 1 | Hero | One-line value prop + CTA |
| 2 | 3 Pillars | Deliberation → Evidence → Sovereignty (cards) |
| 3 | Social proof | Pilot quotes or war game examples |
| 4 | How it works | 3-step architecture diagram |
| 5 | Trust signals | Compliance status + test count |
| 6 | Pricing | 3 tiers, brief |
| 7 | CTA | Request Briefing / Try Demo |

## What Moves to Secondary Pages

| Current homepage section | Recommended new home |
|--------------------------|---------------------|
| 9 Primitives grid | `dcii.html` (already exists) |
| 12-Pillar tier progression | `pricing.html` or `platform-capabilities.html` |
| IISS Score explanation | `dcii.html` |
| Full product showcase (all cards) | `platform-capabilities.html` |
| Demo videos | `demos.html` |
| War Games detail cards | `wargames.html` (keep 1 example on homepage) |
| Category FAQ | Keep, but reduce to 3 questions |
| Buyer personas grid | `pilot.html` or remove |

## Implementation Notes

1. This is a **content strategy change**, not just a code refactor — needs stakeholder alignment
2. All removed content still exists on dedicated pages — nothing is deleted
3. Navigation already links to all secondary pages
4. After restructuring, run `node scripts/sync-homepage-metrics.js` to propagate changes to all 10 locale versions
5. Translation keys in `translations.js` for removed sections can be kept (no-op) or cleaned up in a follow-up pass

## Message Testing

Before implementing, validate the 3-pillar framing with:
- 3-5 target buyer interviews (CISO, GRC, CTO at regulated enterprises)
- A/B test hero copy if traffic supports it
- Compare time-on-page and briefing request conversion
