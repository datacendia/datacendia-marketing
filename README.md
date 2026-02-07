# Datacendia Marketing Website

Official marketing website for Datacendia's Sovereign Intelligence Platform.

**Live Site:** https://datacendia.com

## Overview

Static HTML/CSS/JS website with comprehensive internationalization support (11 languages), deployed via Netlify.

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **i18n:** Client-side translation system (`translations.js`)
- **Deployment:** Netlify
- **Languages:** English, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese, Arabic, Hindi

## Project Structure

```
.
├── index.html              # Homepage (English)
├── trust.html              # Trust center
├── pricing.html            # Pricing tiers
├── verticals.html          # Industry verticals
├── demos.html              # Product demos
├── [locale]/               # Translated pages (ar, de, es, fr, hi, it, ja, ko, pt, zh)
│   └── index.html
├── assets/                 # Static assets (favicon, images)
├── docs/                   # Documentation (DATACENDIA_BIBLE.md, SEO roadmap)
├── learn/                  # Educational content
├── resources/              # Resource pages (sovereignty matrix, council, etc.)
├── scripts/                # Utility scripts
├── trust/                  # Trust artifacts (PDFs, SBOM)
├── .well-known/            # security.txt (RFC 9116)
├── styles.css              # Global styles
├── app.js                  # UI interactions
├── translations.js         # i18n dictionary
└── netlify.toml            # Netlify configuration
```

## Local Development

### Prerequisites
- Python 3.x (for local server)
- Node.js (for utility scripts)

### Running Locally

```bash
# Option 1: Python HTTP server
python -m http.server 8000

# Option 2: Python script (included)
python serve_static.py

# Visit http://localhost:8000
```

### Updating Metrics Across Locales

When updating homepage metrics (test counts, agent counts, etc.), use the sync script:

```bash
node scripts/sync-homepage-metrics.js
```

This ensures all 10 translated versions stay consistent with the English source.

## Deployment

Deployed automatically via Netlify on push to `master` branch.

**Netlify Site:** datacendia.com  
**Build Command:** None (static publish)  
**Publish Directory:** `.` (root)

### Security Headers

The site enforces strict security headers via `netlify.toml`:
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options (clickjacking prevention)
- X-Content-Type-Options (MIME sniffing prevention)
- Referrer-Policy
- Permissions-Policy

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
| `trust.html` | Trust center with compliance statements, security posture |
| `trust/` | Downloadable trust artifacts (ISO 42001, NIST AI RMF, EU AI Act PDFs, SBOM) |
| `.well-known/security.txt` | RFC 9116 security contact information |
| `docs/DATACENDIA_BIBLE.md` | Comprehensive platform documentation |
| `netlify.toml` | Deployment config + security headers |
| `sitemap.xml` | SEO sitemap (auto-generated) |

## Security

- **No tracking pixels** — Zero third-party analytics
- **No cookies** — Privacy-first design
- **Zero npm dependencies** — No supply chain vulnerabilities
- **CSP enforced** — Strict resource loading policies
- **Vulnerability disclosure:** security@datacendia.com

## Contributing

This is a private repository. For internal contributors:

1. Create a feature branch
2. Make changes
3. Test locally across multiple browsers
4. Verify all 11 language versions
5. Submit PR for review
6. Merge to `master` triggers auto-deploy

## License

Proprietary. See [LICENSE](LICENSE) file.

## Contact

- **General Inquiries:** contact@datacendia.com
- **Security Reports:** security@datacendia.com
- **Sales:** contact@datacendia.com

---

**Last Updated:** February 2026
