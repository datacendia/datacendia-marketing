/**
 * Language Switcher — External Event Handler
 *
 * Replaces inline onclick="setLanguage('xx')" handlers
 * to comply with CSP script-src 'self' policy.
 *
 * Requires: buttons inside .lang-dropdown with data-lang="xx" attributes.
 * Depends on: setLanguage() from translations.js or translations-loader.js.
 */
document.addEventListener('DOMContentLoaded', function() {
  // Language dropdown buttons
  var dropdown = document.querySelector('.lang-dropdown');
  if (dropdown) {
    dropdown.querySelectorAll('button[data-lang]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var lang = btn.getAttribute('data-lang');
        if (typeof setLanguage === 'function') {
          setLanguage(lang);
        }
      });
    });
  }

  // Navigation via data-href (replaces onclick="window.location='...'")
  document.querySelectorAll('[data-href]').forEach(function(el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function(e) {
      // Don't navigate if clicking a child that also has data-href
      if (e.target.closest('[data-href]') === el) {
        window.location = el.getAttribute('data-href');
      }
    });
  });

  // Platform API actions (replaces onclick="window.DatacendiaPlatform?.xxx")
  document.querySelectorAll('[data-platform-action]').forEach(function(el) {
    el.addEventListener('click', function() {
      var action = el.getAttribute('data-platform-action');
      if (window.DatacendiaPlatform) {
        try { new Function('window.DatacendiaPlatform.' + action)(); } catch(e) {}
      }
    });
  });
});
