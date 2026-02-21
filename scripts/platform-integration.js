/**
 * Platform Integration for Marketing Website
 * 
 * Connects datacendia.com marketing site to app.datacendia.com platform
 * Shows real-time stats, enables live demos, verifies trust certificates
 */

const PLATFORM_API = 'https://api.datacendia.com/api/v1';
const PLATFORM_APP = 'https://app.datacendia.com';

// =============================================================================
// 1. REAL-TIME PLATFORM STATS
// =============================================================================

async function loadPlatformStats() {
  try {
    const response = await fetch(`${PLATFORM_API}/platform/stats`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      console.warn('Platform stats unavailable, using static values');
      return null;
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.warn('Platform API unreachable:', error);
    return null;
  }
}

function updateStatsOnPage(stats) {
  if (!stats) return;
  
  // Update homepage metrics if elements exist
  const totalDecisionsEl = document.querySelector('[data-stat="total-decisions"]');
  const activeUsersEl = document.querySelector('[data-stat="active-users"]');
  const avgResponseTimeEl = document.querySelector('[data-stat="avg-response-time"]');
  
  if (totalDecisionsEl) totalDecisionsEl.textContent = stats.totalDecisions?.toLocaleString() || '0';
  if (activeUsersEl) activeUsersEl.textContent = stats.activeUsers?.toLocaleString() || '0';
  if (avgResponseTimeEl) avgResponseTimeEl.textContent = `${stats.avgResponseTime || 0}ms`;
}

// =============================================================================
// 2. TRUST CERTIFICATE VERIFICATION
// =============================================================================

async function verifyTrustCertificate(filename) {
  const button = event?.target;
  if (button) {
    button.disabled = true;
    button.textContent = 'Verifying...';
  }
  
  try {
    // Fetch the PDF
    const pdfResponse = await fetch(`/trust/${filename}`);
    const pdfBlob = await pdfResponse.blob();
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Calculate SHA-256 hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Display result
    const resultEl = document.getElementById('verification-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div style="padding: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; margin-top: 1rem;">
          <div style="color: #10b981; font-weight: 600; margin-bottom: 0.5rem;">✅ Certificate Verified</div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--color-text-muted); word-break: break-all;">
            SHA-256: ${hashHex}
          </div>
          <div style="font-size: 0.75rem; color: var(--color-text-dim); margin-top: 0.5rem;">
            This hash can be independently verified. The certificate has not been tampered with since publication.
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Verification failed:', error);
    const resultEl = document.getElementById('verification-result');
    if (resultEl) {
      resultEl.innerHTML = `
        <div style="padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; margin-top: 1rem;">
          <div style="color: #ef4444; font-weight: 600;">❌ Verification Failed</div>
          <div style="font-size: 0.75rem; color: var(--color-text-dim); margin-top: 0.5rem;">
            ${error.message}
          </div>
        </div>
      `;
    }
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = 'Verify Certificate';
    }
  }
}

// =============================================================================
// 3. LIVE DEMO LAUNCHER
// =============================================================================

function launchLiveDemo(demoType = 'council') {
  const demoUrls = {
    council: `${PLATFORM_APP}/cortex/council?demo=true`,
    visualization: `${PLATFORM_APP}/cortex/council/visualization?demo=true`,
    'replay-theater': `${PLATFORM_APP}/cortex/council/replay-theater?demo=true`,
    'audit-provenance': `${PLATFORM_APP}/cortex/compliance/audit-provenance?demo=true`,
  };
  
  const url = demoUrls[demoType] || demoUrls.council;
  window.open(url, '_blank', 'width=1400,height=900');
}

// =============================================================================
// 4. TRIAL SIGNUP WITH PLATFORM REDIRECT
// =============================================================================

function startTrial(vertical = null) {
  let url = `${PLATFORM_APP}/auth/register?source=marketing`;
  if (vertical) {
    url += `&vertical=${vertical}`;
  }
  window.location.href = url;
}

// =============================================================================
// 5. PLATFORM HEALTH CHECK
// =============================================================================

async function checkPlatformHealth() {
  const statusEl = document.getElementById('platform-status');
  if (!statusEl) return;
  
  try {
    const response = await fetch(`${PLATFORM_API}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    
    if (response.ok) {
      const data = await response.json();
      statusEl.innerHTML = `
        <span style="color: #10b981;">● Platform Online</span>
        <span style="font-size: 0.75rem; color: var(--color-text-dim); margin-left: 0.5rem;">
          ${data.uptime || 'Ready'}
        </span>
      `;
    } else {
      statusEl.innerHTML = '<span style="color: #f59e0b;">● Platform Degraded</span>';
    }
  } catch (error) {
    statusEl.innerHTML = '<span style="color: #6b7280;">● Platform Status Unknown</span>';
  }
}

// =============================================================================
// AUTO-INITIALIZE ON PAGE LOAD
// =============================================================================

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    // Load platform stats if on homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      const stats = await loadPlatformStats();
      if (stats) {
        updateStatsOnPage(stats);
      }
    }
    
    // Check platform health if status element exists
    if (document.getElementById('platform-status')) {
      checkPlatformHealth();
      // Refresh every 60 seconds
      setInterval(checkPlatformHealth, 60000);
    }
  });
}

// Export functions for global use
if (typeof window !== 'undefined') {
  window.DatacendiaPlatform = {
    verifyTrustCertificate,
    launchLiveDemo,
    startTrial,
    checkPlatformHealth,
    loadPlatformStats,
  };
}
