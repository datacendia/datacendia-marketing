<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Datacendia XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="robots" content="noindex, follow"/>
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: #0a0a0a;
            color: #e0e0e0;
            margin: 0;
            padding: 40px;
            line-height: 1.6;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          h1 {
            font-size: 2rem;
            font-weight: 300;
            color: #c9a227;
            margin-bottom: 8px;
          }
          .subtitle {
            color: #888;
            font-size: 0.9rem;
            margin-bottom: 32px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #111;
            border: 1px solid #222;
            border-radius: 8px;
            overflow: hidden;
          }
          th {
            background: #1a1a1a;
            color: #c9a227;
            font-weight: 500;
            text-transform: uppercase;
            font-size: 0.7rem;
            letter-spacing: 0.1em;
            padding: 16px;
            text-align: left;
            border-bottom: 1px solid #222;
          }
          td {
            padding: 14px 16px;
            border-bottom: 1px solid #1a1a1a;
            font-size: 0.85rem;
          }
          tr:hover td {
            background: #151515;
          }
          a {
            color: #c9a227;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority-high { color: #4ade80; }
          .priority-medium { color: #c9a227; }
          .priority-low { color: #888; }
          .stats {
            display: flex;
            gap: 32px;
            margin-bottom: 24px;
          }
          .stat {
            background: #111;
            border: 1px solid #222;
            padding: 16px 24px;
            border-radius: 6px;
          }
          .stat-value {
            font-size: 1.5rem;
            color: #c9a227;
            font-weight: 500;
          }
          .stat-label {
            font-size: 0.75rem;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          .footer {
            margin-top: 32px;
            font-size: 0.8rem;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Datacendia XML Sitemap</h1>
          <p class="subtitle">This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs for search engine indexing.</p>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
              <div class="stat-label">Total URLs</div>
            </div>
            <div class="stat">
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority >= 0.8])"/></div>
              <div class="stat-label">High Priority</div>
            </div>
            <div class="stat">
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url/image:image)"/></div>
              <div class="stat-label">Images</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Priority</th>
                <th>Change Freq</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending"/>
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:priority >= 0.8">
                        <span class="priority-high"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:when test="sitemap:priority >= 0.5">
                        <span class="priority-medium"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority-low"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          
          <p class="footer">
            Generated for Datacendia · <a href="https://datacendia.com">Return to Homepage</a>
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
