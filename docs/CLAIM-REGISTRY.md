# Unified Claim Registry

**Scope:** All Datacendia repos (marketing, core, components, DGI)  
**Last Full Review:** March 2026  
**Next Review Due:** April 1, 2026  
**Process:** See `docs/CLAIM-GOVERNANCE.md`

---

## Registry by Source Repo

| Repo | Claims | Verified | Stale | Unverified |
|------|--------|----------|-------|------------|
| datacendia-marketing | CLM-001 – CLM-014 | 4 | 3 | 7 |
| datacendia-core | CLM-100 – CLM-106 | 3 | 1 | 3 |
| datacendia-components | CLM-200 – CLM-202 | 1 | 0 | 2 |
| decision-governance-infrastructure | CLM-300 – CLM-303 | 2 | 0 | 2 |

---

## datacendia-marketing Claims

---

### CLM-001 — Automated test count

- **Claim text:** "204,079 Automated Tests"
- **Published in:** `trust.html`, `trust/test-results.html`, `index.html`, `partners.html`
- **Evidence source:** Run `npm test` in platform repo; count from Vitest output
- **Last verified:** 2026-02-21
- **Category:** A (Exact Metric)
- **Owner:** Engineering
- **Status:** ✅ Verified — Reconciled to 204,079 across all surfaces (March 2026). Re-verify from test suite monthly.

### CLM-002 — AI Council agent count

- **Claim text:** "40+" (trust.html, index.html) — qualified range, not exact count
- **Published in:** `trust.html`, `index.html`
- **Evidence source:** 13 core seed agents + vertical-specific agent extensions across 13 verticals
- **Last verified:** 2026-03-06
- **Category:** A (Exact Metric)
- **Owner:** Engineering
- **Status:** ✅ Verified — Reconciled to "40+" across all surfaces. Trust.html changed from 45→40+. llms.txt uses "Multiple AI agents" (no number).

### CLM-003 — Language/locale count

- **Claim text:** "11" (trust.html, README)
- **Published in:** `trust.html`, `README.md` (line 19)
- **Evidence source:** 11 locale directories (en + ar, de, es, fr, hi, it, ja, ko, pt, zh)
- **Last verified:** 2026-03-06
- **Category:** A (Exact Metric)
- **Owner:** Marketing
- **Status:** ✅ Verified — Reconciled to 11 across all surfaces. Trust.html changed from 26→11 to match actual locale directories.

### CLM-004 — REST API route count

- **Claim text:** "REST API reference" (llms.txt — exact count removed)
- **Published in:** `llms.txt`
- **Evidence source:** `scripts/generate-trust-facts.cjs` → `docs/TRUST-FACTS.json` reports 156 route files
- **Last verified:** 2026-03-06
- **Category:** A (Exact Metric)
- **Owner:** Engineering
- **Status:** ✅ Verified — trust-facts pipeline confirmed 156 route files. Exact count removed from llms.txt to prevent drift; verified count in TRUST-FACTS.json.

### CLM-005 — Docker image availability

- **Claim text:** "docker pull datacendia/datacendia-api:latest" / "docker pull datacendia/datacendia-frontend:latest"
- **Published in:** `llms.txt` (lines 59-60)
- **Evidence source:** Verify on Docker Hub: https://hub.docker.com/u/datacendia
- **Last verified:** Unverified
- **Category:** D (External Reference)
- **Owner:** Engineering
- **Status:** ❌ Unverified — Must confirm images are publicly available on Docker Hub.

### CLM-006 — Managed cloud hosting

- **Claim text:** "Hosted at app.datacendia.com (coming soon)"
- **Published in:** `llms.txt` (line 54)
- **Evidence source:** Check if app.datacendia.com resolves
- **Last verified:** Unverified
- **Category:** D (External Reference)
- **Owner:** Engineering
- **Status:** ⚠️ Stale — "Coming soon" with no target date.

### CLM-007 — GitHub Community Edition

- **Claim text:** "GitHub (Community Edition): https://github.com/datacendia/datacendia-core"
- **Published in:** `llms.txt` (line 65)
- **Evidence source:** Visit URL and confirm repo is public
- **Last verified:** Unverified
- **Category:** D (External Reference)
- **Owner:** Engineering
- **Status:** ❌ Unverified — Must confirm repo exists and is public.

### CLM-008 — Zero runtime dependencies (marketing site)

- **Claim text:** "Zero runtime dependencies — No client-side npm packages; one dev-only dependency (pdf-lib) for build scripts"
- **Published in:** `README.md` (line 285)
- **Evidence source:** `package.json` devDependencies; no `<script>` tags loading npm packages
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Marketing
- **Status:** ✅ Verified

### CLM-009 — SBOM scope

- **Claim text:** SBOM linked from trust center covers "datacendia-platform"
- **Published in:** `trust/sbom.json`, `trust.html` (line 177-182)
- **Evidence source:** SBOM metadata.component.name field
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Engineering
- **Status:** ✅ Verified — SBOM metadata now clearly scoped to platform application.

### CLM-010 — SOC 2 Type II status

- **Claim text:** "Control mapping complete. Evidence collection in progress. Target Q2 2026"
- **Published in:** `trust.html` (lines 281-283)
- **Evidence source:** Internal compliance tracking
- **Last verified:** 2026-01 (per trust.html)
- **Category:** B (Compliance Status)
- **Owner:** Compliance
- **Status:** ⚠️ Stale — "as of Jan 2026" qualifier; needs monthly update.

### CLM-011 — ISO 27001 status

- **Claim text:** "Gap assessment complete. Implementation roadmap defined. Target H2 2026"
- **Published in:** `trust.html` (lines 286-288)
- **Evidence source:** Internal compliance tracking
- **Last verified:** 2026-01 (per trust.html)
- **Category:** B (Compliance Status)
- **Owner:** Compliance
- **Status:** ⚠️ Stale — "as of Jan 2026" qualifier; needs monthly update.

### CLM-012 — Conformance statements (ISO 42001, NIST AI RMF, EU AI Act)

- **Claim text:** "Self-attested conformance statement published"
- **Published in:** `trust.html` (lines 266-278), `trust/*.pdf`
- **Evidence source:** PDFs in `trust/` directory
- **Last verified:** 2026-02-06
- **Category:** B (Compliance Status)
- **Owner:** Compliance
- **Status:** ✅ Verified — Correctly labeled as "self-attested."

### CLM-013 — 30 industry verticals

- **Claim text:** "30 Industry Verticals" / "30 sector-specific governance solutions"
- **Published in:** `llms.txt` (line 41), `verticals.html`
- **Evidence source:** Count vertical sections in `verticals.html`
- **Last verified:** Unverified
- **Category:** A (Exact Metric)
- **Owner:** Marketing
- **Status:** ❌ Unverified — Must count and confirm.

### CLM-014 — Penetration testing

- **Claim text:** "Third-party pen test scheduled for H1 2026"
- **Published in:** `trust.html` (line 332)
- **Evidence source:** Internal security schedule
- **Last verified:** Unverified
- **Category:** B (Compliance Status)
- **Owner:** Security
- **Status:** ⚠️ Stale — H1 2026 is ending; status needs update.

---

## datacendia-core Claims

### CLM-100 — Open-core Apache 2.0 license

- **Claim text:** "Community Edition is free and open-source (Apache 2.0)"
- **Published in:** `COMMUNITY.md`, `LICENSE`, marketing `llms.txt`
- **Evidence source:** `LICENSE` file in datacendia-core repo
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Engineering
- **Status:** ✅ Verified — LICENSE file is Apache 2.0. Swagger metadata also corrected to Apache-2.0.

### CLM-101 — Swagger/OpenAPI license metadata

- **Claim text:** API docs show license metadata
- **Published in:** `backend/src/config/swagger.ts`
- **Evidence source:** Swagger config file
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Engineering
- **Status:** ✅ Verified — Changed from "Proprietary" to "Apache-2.0" (March 2026).

### CLM-102 — Production auth startup guard

- **Claim text:** Server requires REQUIRE_AUTH=true in production
- **Published in:** `SECURITY.md`, `backend/src/index.ts`
- **Evidence source:** Startup guard code in index.ts
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Engineering
- **Status:** ✅ Verified — Server exits with error if NODE_ENV=production and REQUIRE_AUTH is not set.

### CLM-103 — Component/page/route counts in README

- **Claim text:** Previously "99 components", "210 pages", "156 route files", "260 models"
- **Published in:** `README.md` architecture section
- **Evidence source:** Counts removed; replaced with descriptive labels
- **Last verified:** 2026-03-06
- **Category:** A (Exact Metric)
- **Owner:** Engineering
- **Status:** ⚠️ Resolved — Exact counts removed to prevent drift. Descriptive labels used instead.

### CLM-104 — Tenant isolation enforcement

- **Claim text:** "Tenant-awareness is implemented; full row-level enforcement is being hardened"
- **Published in:** `SECURITY.md` (Tenant Isolation Model section)
- **Evidence source:** `backend/src/middleware/tenantIsolation.ts`, `tests/integration/tenant-isolation.test.ts`
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Engineering
- **Status:** ❌ Unverified — Middleware created but not yet applied to all routes. Route-by-route migration needed.

### CLM-105 — DevAuth safety in production

- **Claim text:** "devAuth cannot bypass in production"
- **Published in:** `SECURITY.md`, `backend/src/middleware/auth.ts`
- **Evidence source:** devAuth function env checks + startup guard
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Engineering
- **Status:** ❌ Unverified — devAuth has env guards and startup guard exists, but no integration test verifying production rejection.

### CLM-106 — Token persistence security model

- **Claim text:** Token storage uses localStorage with documented threat model
- **Published in:** `SECURITY.md`
- **Evidence source:** `src/stores/authStore.ts`, `SECURITY.md` threat model section
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Engineering
- **Status:** ❌ Unverified — Threat model documented but recommended hardening (httpOnly cookies, token rotation) not yet implemented.

---

## datacendia-components Claims

### CLM-200 — Enterprise service count

- **Claim text:** Previously "All 18 enterprise services"
- **Published in:** `COMMUNITY.md`
- **Evidence source:** `scripts/generate-enterprise-inventory.cjs` → `docs/ENTERPRISE-INVENTORY.md`
- **Last verified:** 2026-03-06
- **Category:** A (Exact Metric)
- **Owner:** Engineering
- **Status:** ✅ Verified — Auto-generated inventory shows 18 services. COMMUNITY.md now links to generated catalog instead of hard-coding count.

### CLM-201 — Enterprise/community boundary enforcement

- **Claim text:** "Community-tier code cannot import enterprise services"
- **Published in:** `.eslintrc.cjs` (no-restricted-imports rule)
- **Evidence source:** ESLint config with enterprise/sovereign import restrictions
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Engineering
- **Status:** ❌ Unverified — Rule created but not yet run in CI. Needs CI pipeline integration.

### CLM-202 — Enterprise seed data is demo-only

- **Claim text:** "Seeds fictitious sample data for development and demonstration purposes"
- **Published in:** `backend/prisma/seed-enterprise.ts` header
- **Evidence source:** Seed script header disclaimer
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Engineering
- **Status:** ❌ Unverified — Disclaimer added but no automated check prevents seed data from being conflated with production metrics.

---

## decision-governance-infrastructure Claims

### CLM-300 — DDGI is vendor-neutral

- **Claim text:** "A Vendor-Neutral Framework for Institutional Decision Accountability"
- **Published in:** `DGI-Framework-v1.0.md` title, `README.md`
- **Evidence source:** Framework body §1-§7 contains no vendor-specific implementation requirements
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Standards
- **Status:** ✅ Verified — Normative sections are vendor-neutral. §8 (informative) describes DCII reference implementation and is now explicitly labeled.

### CLM-301 — Framework document status

- **Claim text:** "Candidate (self-published, not independently reviewed)"
- **Published in:** `DGI-Framework-v1.0.md` Document Status table
- **Evidence source:** Document metadata
- **Last verified:** 2026-03-06
- **Category:** B (Compliance Status)
- **Owner:** Standards
- **Status:** ✅ Verified — Status label accurately reflects self-published, non-peer-reviewed state.

### CLM-302 — Traceability to implementation

- **Claim text:** Primitives A-E and P1-P9 are implemented in datacendia-core
- **Published in:** `docs/TRACEABILITY-MATRIX.md`, `README.Implementation.md`
- **Evidence source:** Traceability matrix with file paths
- **Last verified:** 2026-03-06
- **Category:** C (Product Capability)
- **Owner:** Engineering
- **Status:** ❌ Unverified — Matrix created from file search, but P8 (Synthetic Media Authentication) has no implementation. P7 needs depth verification.

### CLM-303 — Implementation counts in README.Implementation.md

- **Claim text:** "59 REST API endpoints, 6 production services, 15 PostgreSQL tables"
- **Published in:** `README.Implementation.md`
- **Evidence source:** Platform codebase
- **Last verified:** Unverified
- **Category:** A (Exact Metric)
- **Owner:** Engineering
- **Status:** ❌ Unverified — Exact counts likely stale. README.Implementation.md now has drift warning.
