# Claim Governance Process

**Owner:** Marketing / Trust  
**Last Updated:** March 2026  
**Review Cadence:** Monthly

## Purpose

Every public-facing claim on datacendia.com, in trust artifacts, in `llms.txt`, and in marketing content must be **verifiable, current, and precisely qualified**. This document defines the process for creating, reviewing, and retiring claims.

## Scope

This process covers claims published in:

| Surface | Examples |
|---------|----------|
| `README.md` | Dependency counts, tech stack descriptions |
| `trust.html` | Compliance status, test counts, certification language |
| `trust/` artifacts | Conformance PDFs, SBOM, test results |
| `llms.txt` | Product descriptions, route counts, deployment claims |
| `pricing.html` | Feature lists, tier capabilities |
| `index.html` | Hero metrics, agent counts, language counts |
| `learn/` articles | Technical accuracy of educational content |
| Locale pages | All translated versions of the above |

## Claim Categories

### Category A — Exact Metrics (High Drift Risk)

Claims with specific numbers that change as the codebase evolves.

- Test counts (e.g., "205,081 automated tests")
- Agent counts (e.g., "15 AI agents", "45 agents")
- Route/endpoint counts (e.g., "156 route files")
- Language/locale counts
- Deliberation mode counts

**Rule:** Must be regenerated from source (e.g., `npm test`, code grep) within the last 30 days. If stale, replace with a qualified range or remove the exact number.

### Category B — Compliance & Certification Status

Claims about regulatory alignment, certification, or audit status.

- SOC 2, ISO 27001, FedRAMP, HIPAA, GDPR, EU AI Act, CMMC
- Conformance statements and alignment documents

**Rule:** Must use precise qualifiers:

| Qualifier | Meaning |
|-----------|---------|
| **Certified** | Formally audited and certified by accredited third party |
| **Audited** | Third-party audit completed; report available |
| **Aligned** | Architecture designed to meet framework controls |
| **Architecture-Ready** | Controls implemented but not yet formally assessed |
| **Self-Attested** | Internal conformance statement published (no third-party validation) |
| **Roadmap** | Planned; not yet implemented |

Never use "Certified" or "Compliant" without formal third-party validation.

### Category C — Product Capability Claims

Claims about what the platform can do.

- Deployment options (Docker, Kubernetes, air-gapped)
- Integration claims (AWS KMS, Azure Key Vault, etc.)
- Feature descriptions

**Rule:** Must match current implementation status. Use the Honesty Matrix (`honesty-matrices.html`) as the source of truth for what's built vs. mocked vs. roadmap.

### Category D — External Reference Claims

Claims about third-party relationships or availability.

- Docker Hub image availability
- GitHub repository links
- AWS Marketplace listing
- NVIDIA Inception membership

**Rule:** Must be verified by visiting the external resource. Broken links or unavailable resources must be removed or qualified with "(coming soon)" and a target date.

## Claim Registry

All high-impact claims are tracked in `docs/CLAIM-REGISTRY.md`. Each entry includes:

```markdown
### [Claim ID] — [Short description]

- **Claim text:** [exact text as published]
- **Published in:** [file(s) where it appears]
- **Evidence source:** [how to verify — command, URL, or document]
- **Last verified:** [YYYY-MM-DD]
- **Category:** [A / B / C / D]
- **Owner:** [who is responsible for keeping it current]
- **Status:** ✅ Verified | ⚠️ Stale | ❌ Unverified
```

## Review Process

### Monthly Review (1st of each month)

1. Run `node scripts/test-site.js` to verify site health
2. Check all Category A metrics against source
3. Verify all external links (Category D)
4. Update `docs/CLAIM-REGISTRY.md` with new verification dates
5. Run `node scripts/sync-homepage-metrics.js` if any metrics changed

### Before Any Deploy

1. Confirm no Category A claims are older than 30 days
2. Confirm no broken external links
3. Confirm all locale versions match English source metrics

### When Adding New Claims

1. Determine claim category (A/B/C/D)
2. Identify evidence source
3. Add entry to `docs/CLAIM-REGISTRY.md`
4. Get review from a second person before publishing
5. If metric-based, add to `scripts/sync-homepage-metrics.js` for locale sync

## Escalation

If a published claim is found to be inaccurate:

1. **Immediate:** Qualify or remove the claim within 24 hours
2. **Investigate:** Determine root cause (drift, error, or misrepresentation)
3. **Fix:** Update all surfaces where the claim appears (including all locales)
4. **Prevent:** Add automated check or registry entry to prevent recurrence

## GEO Asset Review Checklist

Before updating `llms.txt`:

- [ ] All product names match current branding
- [ ] No exact counts unless verified within 30 days
- [ ] Docker image tags verified on Docker Hub
- [ ] GitHub repository links verified and public
- [ ] Pricing matches `pricing.html`
- [ ] Page URLs verified (no 404s)
- [ ] Deployment claims match current capability
- [ ] "Coming soon" items have target dates
