/**
 * Language Switcher — External Event Handler
 *
 * Handles: dropdown toggle, language selection (button or anchor),
 * click-outside-to-close.
 *
 * Requires: .lang-selector > .lang-btn + .lang-dropdown in HTML.
 * Depends on: setLanguage() from translations.js or translations-loader.js.
 */
document.addEventListener('DOMContentLoaded', function() {
  // ── Language dropdown toggle ──
  var langBtn = document.querySelector('.lang-btn');
  var langSel = document.querySelector('.lang-selector');

  if (langBtn && langSel) {
    langBtn.onclick = function(e) {
      e.preventDefault();
      langSel.classList.toggle('open');
    };
  }

  // Close dropdown when clicking outside
  document.addEventListener('mousedown', function(e) {
    var sel = document.querySelector('.lang-selector');
    if (sel && !sel.contains(e.target)) {
      sel.classList.remove('open');
    }
  });

  // Language option buttons (data-lang)
  document.querySelectorAll('.lang-dropdown button[data-lang]').forEach(function(btn) {
    btn.onclick = function() {
      var sel = document.querySelector('.lang-selector');
      if (sel) sel.classList.remove('open');
      var lang = btn.getAttribute('data-lang');
      if (typeof setLanguage === 'function') setLanguage(lang);
    };
  });

  // Language option links (<a> in dropdown)
  document.querySelectorAll('.lang-dropdown a').forEach(function(link) {
    link.addEventListener('click', function() {
      var sel = document.querySelector('.lang-selector');
      if (sel) sel.classList.remove('open');
    });
  });

  // ── Navigation via data-href ──
  document.querySelectorAll('[data-href]').forEach(function(el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function(e) {
      if (e.target.closest('[data-href]') === el) {
        window.location = el.getAttribute('data-href');
      }
    });
  });

  // ── Platform API actions ──
  document.querySelectorAll('[data-platform-action]').forEach(function(el) {
    el.addEventListener('click', function() {
      var action = el.getAttribute('data-platform-action');
      if (window.DatacendiaPlatform) {
        try { new Function('window.DatacendiaPlatform.' + action)(); } catch(e) {}
      }
    });
  });
});
