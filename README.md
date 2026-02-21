# Datacendia Marketing Website

Official marketing website for Datacendia's Decision Crisis Immunization Infrastructure.

**Live Site:** https://datacendia.com  
**Hosting:** Namecheap (shared hosting, static files)

## Overview

Static HTML/CSS/JS website with comprehensive internationalization support (11 languages), interactive product demos, and AI search discoverability (GEO). No server-side code — the entire site runs in the browser.

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling:** `styles.css` (main site), `demos/demo-platform.css` (demo pages)
- **i18n:** Client-side translation system (`translations.js`, 11 languages)
- **Forms:** Formspree (briefing form submission)
- **Hosting:** Namecheap shared hosting (Apache)
- **Languages:** English, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese, Arabic, Hindi

## Project Structure

```
.
├── index.html                  # Homepage
├── demos.html                  # Demo hub (Cortex / Oversight / Evidence sections)
├── trust.html                  # Trust center
├── pricing.html                # Pricing tiers
├── verticals.html              # Industry verticals
├── architecture.html           # Technical architecture
├── api-docs.html               # REST API reference
├── briefing.html               # Request a briefing (Formspree form)
├── case-studies.html           # Implementation examples
├── changelog.html              # Platform changelog
├── manifesto.html              # Company manifesto
├── partners.html               # Partner program
├── pilot.html                  # Pilot evaluation program
├── platform-capabilities.html  # Capabilities overview
├── privacy.html                # Privacy policy
├── protocol.html               # Decision protocol
├── roi-calculator.html         # ROI calculator (interactive)
├── security-controls.html      # Detailed security controls
├── team.html                   # Team page
├── terms.html                  # Terms of service
├── wargames.html               # Decision wargames
├── 404.html                    # Custom error page
│
├── demos/                      # Interactive product demos (14 pages)
│   ├── demo-platform.css       # Shared demo styling (dark theme)
│   ├── council.html            # The Council — multi-agent deliberation
│   ├── chronos.html            # CendiaChronos — decision timeline
│   ├── cascade.html            # Cascade Analysis — ripple effects
│   ├── ghost-board.html        # Ghost Board — board meeting rehearsal
│   ├── pre-mortem.html         # Pre-Mortem Engine — failure analysis
│   ├── dissent.html            # CendiaDissent — disagreement tracking
│   ├── crucible.html           # CendiaCrucible — adversarial red team
│   ├── audit-provenance.html  # Audit Provenance — cryptographic evidence
│   ├── qr-bridge.html          # QR Air-Gap Bridge — zero-network transfer
│   ├── sports-governance.html  # Sports vertical — transfer decisions
│   ├── legal-governance.html   # Legal vertical — AML/KYC compliance
│   ├── try.html                # "Try Your Decision" — interactive input demo
│   ├── maturity.html           # Decision Maturity Assessment — 6-question quiz
│   └── before-after.html       # Before & After — visual comparison
│
├── [locale]/                   # Translated homepages (ar, de, es, fr, hi, it, ja, ko, pt, zh)
│   └── index.html
│
├── learn/                      # Educational SEO content (10 articles)
│   ├── ai-governance/
│   ├── multi-agent-ai/
│   ├── decision-intelligence/
│   ├── sovereign-ai/
│   ├── ai-audit-trail/
│   ├── eu-ai-act-compliance/
│   ├── eu-ai-act-high-risk/
│   ├── hipaa-ai-compliance/
│   ├── multi-agent-vs-single-model/
│   └── air-gapped-ai-deployment/
│
├── resources/                  # Resource pages (6 topics × 11 languages)
│   ├── the-council[.locale].html
│   ├── data-sovereignty-guide[.locale].html
│   ├── air-gapped-deployment[.locale].html
│   ├── compliance[.locale].html
│   ├── sovereignty-matrix[.locale].html
│   ├── integration-honesty-matrix.html
│   ├── cascade.html
│   └── omnitranslate.html
│
├── trust/                      # Trust artifacts
│   ├── test-results.html       # Automated test results page
│   ├── eu-ai-act-conformance.pdf
│   ├── iso-42001-conformance.pdf
│   ├── nist-ai-rmf-alignment.pdf
│   └── sbom.json               # Software bill of materials
│
├── assets/                     # Static assets
│   ├── favicon.svg
│   └── videos/                 # Demo videos (Council.mp4, CendiaChronos.mp4)
│
├── docs/                       # Internal documentation
│   ├── DATACENDIA_BIBLE.md     # Comprehensive platform docs
│   ├── FINAL-DELIVERY-SUMMARY.md
│   ├── IMAGE-REQUIREMENTS.md
│   ├── SEO-IMPLEMENTATION-ROADMAP.md
│   └── compliance/
│
├── scripts/                    # Dev-only build scripts (NOT deployed)
│   ├── build-i18n-pages.js
│   ├── fix-metrics.js
│   ├── fix-nav.js
│   ├── split-translations.js
│   ├── sync-homepage-metrics.js
│   └── platform-integration.js # API integration (graceful degradation)
│
├── styles.css                  # Global styles
├── app.js                      # UI interactions (tabs, carousel, lightbox)
├── translations.js             # i18n dictionary (629KB, 11 languages)
├── .htaccess                   # Apache config (404, security headers, caching)
├── robots.txt                  # SEO + AI crawler permissions
├── llms.txt                    # AI model discoverability (GEO)
├── sitemap.xml                 # SEO sitemap
├── sitemap.xsl                 # Sitemap stylesheet
└── security.txt                # RFC 9116 security contact
```

## Local Development

### Prerequisites
- Python 3.x (for local server)
- Node.js (for utility scripts only)

### Running Locally

```bash
# Option 1: Python HTTP server
python -m http.server 8000

# Option 2: Included dev server
python serve_static.py

# Visit http://localhost:8000
```

### Updating Metrics Across Locales

```bash
node scripts/sync-homepage-metrics.js
```

This ensures all 10 translated versions stay consistent with the English source.

## Deployment (Namecheap)

The site is deployed to Namecheap shared hosting. Upload all files to the `public_html` directory via cPanel File Manager or FTP.

**Host:** Namecheap shared hosting  
**Server:** Apache  
**Build Command:** None (static files, no build step)  
**Upload Directory:** Everything in this repo → `public_html/`

### Files Safe to Exclude from Upload

These are dev-only and can be omitted to save space:
- `serve_static.py` — local dev server
- `netlify.toml` — legacy config file
- `verify-translations.js` — Node.js build script
- `scripts/build-i18n-pages.js`, `fix-metrics.js`, `fix-nav.js`, `split-translations.js`, `sync-homepage-metrics.js` — build tools
- `.git/`, `.github/` — version control
- `docs/` — internal documentation

### Security Headers

Security headers are enforced via `.htaccess` (Apache):
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options (clickjacking prevention)
- X-Content-Type-Options (MIME sniffing prevention)
- Referrer-Policy
- Permissions-Policy
- Gzip compression
- Browser caching

### HTTPS

Uncomment the rewrite rules in `.htaccess` once your Namecheap SSL certificate is active:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## AI Search Discoverability (GEO)

The site is configured for **Generative Engine Optimization** — making content discoverable by AI assistants (ChatGPT, Claude, Perplexity, Google AI Overviews, etc.):

| File | Purpose |
|------|---------|
| `llms.txt` | Structured site summary for AI models ([llmstxt.org](https://llmstxt.org/) protocol) |
| `robots.txt` | Explicitly allows GPTBot, ClaudeBot, PerplexityBot, GoogleExtended, Anthropic-AI, CCBot |
| `sitemap.xml` | Full sitemap with all pages and language alternatives |
| `learn/` | 10 SEO articles targeting high-value AI governance queries |

### How It Works

1. AI crawlers (GPTBot, ClaudeBot, etc.) are explicitly **allowed** in `robots.txt`
2. `llms.txt` at the site root provides a structured summary of what Datacendia is, what it does, and links to every major page — formatted for AI model consumption
3. The `learn/` directory contains long-form educational content that AI models reference when answering queries about AI governance, decision intelligence, sovereign AI, etc.

### Updating llms.txt

When you add new pages or change the site structure, update `llms.txt` to include them. The file follows a simple Markdown format with headings, descriptions, and linked page lists.

## Interactive Demos

All 14 demos are self-contained static HTML files in `demos/`. No backend required.

| Demo | File | Description |
|------|------|-------------|
| **The Council** | `council.html` | Multi-agent AI deliberation with agent selection and chat |
| **CendiaChronos** | `chronos.html` | Organizational decision timeline with metrics |
| **Cascade Analysis** | `cascade.html` | 2nd/3rd order ripple effect mapping |
| **Ghost Board** | `ghost-board.html` | AI board meeting rehearsal |
| **Pre-Mortem Engine** | `pre-mortem.html` | Reverse-engineer failure before it happens |
| **CendiaDissent** | `dissent.html` | Formal disagreement tracking and outcome monitoring |
| **CendiaCrucible** | `crucible.html` | Adversarial red team from 8 attack perspectives |
| **Audit Provenance** | `audit-provenance.html` | Cryptographic evidence packets with Merkle trees |
| **QR Air-Gap Bridge** | `qr-bridge.html` | Zero-network transfer via animated QR codes |
| **Sports Governance** | `sports-governance.html` | Football transfer decision with FFP compliance |
| **Legal Governance** | `legal-governance.html` | AML/KYC compliance with PEP screening |
| **Try Your Decision** | `try.html` | User types any decision, 3 agents deliberate it |
| **Maturity Assessment** | `maturity.html` | 6-question quiz, results emailed to contact@datacendia.com |
| **Before & After** | `before-after.html` | Visual comparison of governed vs ungoverned decisions |

### Demo Content Safety

All demos use clearly fictitious names and include a disclaimer footer:
> "All names, entities, and scenarios in this demo are entirely fictitious. Any resemblance to real persons, companies, or events is purely coincidental."

Fictitious entities used: Pinnacle SaaS Inc., Northgate Capital Partners, Redline Holdings Ltd, Solaris Energy Corp, Greenfield Athletic FC, Riverside City FC, Sentinel Dynamics, TechStart Inc., Hartwell Manufacturing Corp.

## Content Guidelines

### Compliance Language

Always use accurate, non-misleading compliance terminology:
- ✅ "SOC 2 Aligned Architecture" or "SOC 2 Ready"
- ❌ "SOC 2 Certified" (unless actually certified)
- ✅ "HIPAA Ready" or "HIPAA-aligned controls"
- ❌ "HIPAA Compliant" (unless formally validated)

### Metrics Integrity

All metrics must be:
1. **Verifiable** — Can be independently confirmed (e.g., via `npm test`)
2. **Current** — Updated within the last 30 days
3. **Consistent** — Identical across all language versions

### Translation Workflow

1. Update English version (`index.html`, etc.)
2. Run `node scripts/sync-homepage-metrics.js` for metric updates
3. For text changes, update `translations.js` and corresponding locale HTML files
4. Verify all 11 language versions before deploying

## Key Files

| File | Purpose |
|------|---------|
| `.htaccess` | Apache config: 404, security headers, caching, compression |
| `llms.txt` | AI model discoverability (GEO) |
| `robots.txt` | SEO + AI crawler permissions |
| `sitemap.xml` | Full sitemap with language alternatives |
| `security.txt` | RFC 9116 security contact |
| `trust.html` | Trust center with compliance statements |
| `trust/` | Downloadable trust artifacts (PDFs, SBOM) |
| `docs/DATACENDIA_BIBLE.md` | Comprehensive platform documentation |

## Security

- **No tracking pixels** — Zero third-party analytics
- **No cookies** — Privacy-first design
- **Zero npm dependencies** — No supply chain vulnerabilities
- **CSP enforced** — Strict resource loading policies
- **Vulnerability disclosure:** security@datacendia.com

## License

Proprietary. See [LICENSE](LICENSE) file.

## Contact

- **General Inquiries:** contact@datacendia.com
- **Security Reports:** security@datacendia.com
- **Sales:** contact@datacendia.com

---

**Last Updated:** February 2026
