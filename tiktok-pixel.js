/* Datacendia — TikTok Pixel + Events API Integration
   =====================================================
   SETUP: Replace PIXEL_ID below with your actual TikTok Pixel ID
   from TikTok Ads Manager → Assets → Events → Web Events.

   Standard events fired:
   - PageView          → every page load
   - ViewContent       → demo page views (auto-detected)
   - Contact           → briefing form submission
   - SubmitForm        → lead capture on try.html
   - CompleteRegistration → pilot program page visit
   - Search            → demo run / deliberation start

   Custom events:
   - DemoRun           → user triggers a demo deliberation
   - CaseStudyView     → user views case studies page
   - PricingView       → user views pricing page

   To fire custom events from anywhere:
     window.ttqTrack('DemoRun', { content_name: 'Council Demo' });
*/

(function () {
  // ─── CONFIGURATION ────────────────────────────────────────
  var PIXEL_ID = 'YOUR_TIKTOK_PIXEL_ID'; // ← Replace with your real Pixel ID
  // ──────────────────────────────────────────────────────────

  // Skip if pixel ID not configured
  if (PIXEL_ID === 'YOUR_TIKTOK_PIXEL_ID') {
    console.debug('[TikTok Pixel] Pixel ID not configured. Set PIXEL_ID in tiktok-pixel.js');
    window.ttqTrack = function () {};
    return;
  }

  // ─── TikTok Pixel Base Code ───────────────────────────────
  !function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    var ttq = w[t] = w[t] || [];
    ttq.methods = [
      'page', 'track', 'identify', 'instances', 'debug', 'on', 'off',
      'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie',
      'holdConsent', 'revokeConsent', 'grantConsent'
    ];
    ttq.setAndDefer = function (t, e) {
      t[e] = function () {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (var i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]);
    }
    ttq.instance = function (t) {
      for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) {
        ttq.setAndDefer(e, ttq.methods[n]);
      }
      return e;
    };
    ttq.load = function (e, n) {
      var r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._i = ttq._i || {};
      ttq._i[e] = [];
      ttq._i[e]._u = r;
      ttq._t = ttq._t || {};
      ttq._t[e] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[e] = n || {};
      var o = d.createElement('script');
      o.type = 'text/javascript';
      o.async = true;
      o.src = r + '?sdkid=' + e + '&lib=' + t;
      var a = d.getElementsByTagName('script')[0];
      a.parentNode.insertBefore(o, a);
    };
    ttq.load(PIXEL_ID);
    ttq.page();
  }(window, document, 'ttq');

  // ─── Helper: expose global track function ─────────────────
  window.ttqTrack = function (eventName, params) {
    if (window.ttq) {
      window.ttq.track(eventName, params || {});
      console.debug('[TikTok Pixel]', eventName, params || '');
    }
  };

  // ─── Auto-detect page type and fire relevant events ───────
  var path = window.location.pathname;
  var page = path.split('/').pop() || 'index.html';

  // Demo pages → ViewContent
  if (path.indexOf('/demos/') !== -1) {
    window.ttqTrack('ViewContent', {
      content_type: 'demo',
      content_name: document.title || page
    });
  }

  // Case studies → custom event
  if (page === 'case-studies.html') {
    window.ttqTrack('CaseStudyView', {
      content_type: 'case_study'
    });
  }

  // Pricing → ViewContent with pricing context
  if (page === 'pricing.html') {
    window.ttqTrack('PricingView', {
      content_type: 'pricing'
    });
  }

  // Pilot page → CompleteRegistration intent
  if (page === 'pilot.html') {
    window.ttqTrack('CompleteRegistration', {
      content_type: 'pilot_interest'
    });
  }

  // ─── Briefing form submission → Contact event ─────────────
  document.addEventListener('DOMContentLoaded', function () {
    var briefingForm = document.getElementById('briefing-form');
    if (briefingForm) {
      briefingForm.addEventListener('submit', function () {
        window.ttqTrack('Contact', {
          content_name: 'Briefing Request',
          content_type: 'lead'
        });
      });
    }

    // Lead capture on try.html → SubmitForm event
    var leadForm = document.getElementById('leadForm');
    if (leadForm) {
      var sendBtn = leadForm.querySelector('button');
      if (sendBtn) {
        sendBtn.addEventListener('click', function () {
          var email = document.getElementById('leadEmail');
          if (email && email.value) {
            window.ttqTrack('SubmitForm', {
              content_name: 'Demo Lead Capture',
              content_type: 'lead'
            });
          }
        });
      }
    }

    // Demo run buttons → Search event (closest standard event to "explore")
    document.addEventListener('click', function (e) {
      var el = e.target.closest(
        '.run-btn, .ctrl-btn.primary, [onclick*="runCouncil"], [onclick*="runMiniCouncil"], [onclick*="startRedTeam"], [onclick*="runDeliberation"]'
      );
      if (el) {
        window.ttqTrack('Search', {
          query: document.title || 'Demo Run',
          content_type: 'demo_interaction'
        });
      }
    });
  });
})();
