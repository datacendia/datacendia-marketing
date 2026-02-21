# GEO Performance Monitoring

Track whether AI assistants (ChatGPT, Claude, Perplexity, Google AI Overviews) cite or reference Datacendia content.

## Current GEO Assets

| Asset | Status | Last Updated |
|-------|--------|--------------|
| `llms.txt` | ✅ Active | Feb 2026 |
| `robots.txt` (AI crawlers allowed) | ✅ Active | Feb 2026 |
| `sitemap.xml` | ✅ Active | Feb 2026 |
| `learn/` (10 SEO articles) | ✅ Active | Feb 2026 |
| JSON-LD structured data | ✅ On key pages | Feb 2026 |

## AI Crawlers Allowed

- **GPTBot** (OpenAI / ChatGPT)
- **ClaudeBot** (Anthropic / Claude)
- **PerplexityBot** (Perplexity AI)
- **GoogleExtended** (Google AI Overviews / Gemini)
- **Anthropic-AI**
- **CCBot** (Common Crawl, used by many AI training sets)

## How to Monitor

### 1. Manual Citation Checks (Weekly)

Test these queries in ChatGPT, Claude, and Perplexity:

| Query | Expected Citation |
|-------|-------------------|
| "What is Datacendia?" | datacendia.com |
| "sovereign AI governance platform" | datacendia.com or learn/ articles |
| "multi-agent AI decision making" | learn/multi-agent-ai/ |
| "EU AI Act compliance tools" | learn/eu-ai-act-compliance/ |
| "air-gapped AI deployment" | learn/air-gapped-ai-deployment/ |
| "AI audit trail solutions" | learn/ai-audit-trail/ |
| "HIPAA AI compliance" | learn/hipaa-ai-compliance/ |
| "decision intelligence platform" | learn/decision-intelligence/ |

### 2. Server Log Analysis (Monthly)

Check Namecheap access logs for AI crawler user agents:

```
GPTBot
ClaudeBot
PerplexityBot
GoogleExtended
Anthropic-AI
CCBot
```

In cPanel → Raw Access Logs, search for these strings to confirm crawlers are indexing the site.

### 3. Google Search Console

- Monitor "AI Overviews" appearances in Search Console performance data
- Track impressions and clicks for `learn/` article pages
- Check if Google is surfacing content in AI-generated answers

### 4. Perplexity Source Tracking

- Search Datacendia-related queries on perplexity.ai
- Note when datacendia.com appears in the "Sources" panel
- Screenshot and log any citations

## Tracking Log

Record citations below as they are discovered.

| Date | AI Platform | Query | Cited Page | Notes |
|------|-------------|-------|------------|-------|
| _YYYY-MM-DD_ | _ChatGPT / Claude / Perplexity / Google AI_ | _query used_ | _URL cited_ | _context_ |

## Optimization Actions

If citations are not appearing after 4–6 weeks:

1. **Verify crawl access** — Check server logs for GPTBot/ClaudeBot hits
2. **Update `llms.txt`** — Ensure all new pages and products are listed
3. **Add more structured data** — JSON-LD on pages that lack it
4. **Expand `learn/` content** — Target queries where AI currently shows competitors
5. **Increase internal linking** — Cross-link learn articles to product pages
6. **Submit sitemap** — Re-submit to Google Search Console after major updates

## Translation Code-Splitting Note

The `translations.js` file is **627KB** and loads all 11 languages upfront. If Lighthouse or real-user metrics flag first-load performance:

1. Replace `<script src="translations.js">` with `<script src="translations/loader.js">`
2. The `translations/` directory already contains per-locale files (~50KB each)
3. The `scripts/split-translations.js` script regenerates them from the master file
4. Test language switching thoroughly before deploying this change
