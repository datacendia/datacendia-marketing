/* Datacendia Demo Analytics — Lightweight, privacy-first event tracking
   No external requests. No cookies. No tracking pixels.
   Events are stored in localStorage and logged to console.
   In production, swap the `flush` function to POST to your analytics endpoint. */
(function(){
  var STORAGE_KEY = 'dc_demo_events';
  var MAX_EVENTS = 200;

  function getEvents() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch(e) { return []; }
  }

  function saveEvent(evt) {
    var events = getEvents();
    events.push(evt);
    if (events.length > MAX_EVENTS) events = events.slice(-MAX_EVENTS);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); }
    catch(e) { /* quota exceeded — silent fail */ }
  }

  function track(action, data) {
    var evt = {
      t: Date.now(),
      page: location.pathname.split('/').pop() || 'index',
      action: action,
      data: data || null
    };
    saveEvent(evt);
    if (typeof console !== 'undefined' && console.debug) {
      console.debug('[DC Analytics]', evt.action, evt.data || '');
    }
  }

  // Auto-track page view
  track('page_view');

  // Track time on page
  var startTime = Date.now();
  window.addEventListener('beforeunload', function() {
    var seconds = Math.round((Date.now() - startTime) / 1000);
    track('page_exit', { duration_s: seconds });
  });

  // Auto-track clicks on key elements
  document.addEventListener('click', function(e) {
    var el = e.target.closest('.run-btn, .ctrl-btn.primary, [onclick*="runCouncil"], [onclick*="runMiniCouncil"], [onclick*="startRedTeam"], [onclick*="runDeliberation"], .doc-btn, .export-btn, .cta-btn, .demo-cta a, .pilot-cta');
    if (!el) return;

    var label = el.textContent.trim().substring(0, 60);
    if (el.classList.contains('run-btn') || el.getAttribute('onclick')) {
      track('demo_run', { label: label });
    } else if (el.classList.contains('doc-btn') || el.classList.contains('export-btn')) {
      track('export_click', { label: label });
    } else {
      track('cta_click', { label: label, href: el.href || '' });
    }
  });

  // Expose global for custom events
  window.dcTrack = track;

  // Expose summary for console debugging
  window.dcAnalyticsSummary = function() {
    var events = getEvents();
    var pages = {};
    var actions = {};
    events.forEach(function(e) {
      pages[e.page] = (pages[e.page] || 0) + 1;
      actions[e.action] = (actions[e.action] || 0) + 1;
    });
    console.table({ pages: pages, actions: actions, total: events.length });
    return { pages: pages, actions: actions, total: events.length };
  };
})();
