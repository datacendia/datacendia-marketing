/**
 * Lighthouse CI Configuration
 *
 * Performance, accessibility, and SEO audit thresholds
 * for automated testing in CI/CD pipeline.
 */

module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:8080/index.html',
        'http://localhost:8080/demos.html',
        'http://localhost:8080/trust.html',
        'http://localhost:8080/pricing.html',
        'http://localhost:8080/verticals.html',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.85 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
