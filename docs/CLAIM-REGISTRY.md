# Claim Registry

**Last Full Review:** March 2026  
**Next Review Due:** April 1, 2026  
**Process:** See `docs/CLAIM-GOVERNANCE.md`

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

- **Claim text:** "45 AI Council Agents" (trust.html) / "15 AI agents" (llms.txt) / "15 C-Suite agents" (llms.txt)
- **Published in:** `trust.html` (line 130), `llms.txt` (lines 9, 13, 30)
- **Evidence source:** Count agent definitions in platform codebase
- **Last verified:** Unverified
- **Category:** A (Exact Metric)
- **Owner:** Engineering
- **Status:** ❌ Unverified — Inconsistent across surfaces (45 vs 15). Must be reconciled.

### CLM-003 — Language/locale count

- **Claim text:** "26 Languages" (trust.html) / "11 languages" (README, llms.txt)
- **Published in:** `trust.html` (line 134), `README.md` (line 19), `llms.txt`
- **Evidence source:** Count locale directories + translations.js language keys
- **Last verified:** Unverified
- **Category:** A (Exact Metric)
- **Owner:** Marketing
- **Status:** ❌ Unverified — trust.html claims 26 languages but README/site structure shows 11 locale dirs. Must be reconciled.

### CLM-004 — REST API route count

- **Claim text:** "REST API reference (156 route files)"
- **Published in:** `llms.txt` (line 82)
- **Evidence source:** Count route files in platform API codebase
- **Last verified:** Unverified
- **Category:** A (Exact Metric)
- **Owner:** Engineering
- **Status:** ❌ Unverified — Exact count cannot be verified from marketing repo.

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
