/**
 * Mobile Navigation Handler
 *
 * Manages hamburger menu toggle, mobile nav overlay,
 * and responsive breakpoint behavior.
 */

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function() {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('open');
  });

  // Mobile: tap to open/close dropdown groups
  var labels = document.querySelectorAll('.nav-group > .nav-label');
  labels.forEach(function(label) {
    label.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        var group = label.parentElement;
        // Close other groups
        document.querySelectorAll('.nav-group.open').forEach(function(g) {
          if (g !== group) g.classList.remove('open');
        });
        group.classList.toggle('open');
      }
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && !e.target.closest('.main-nav')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.nav-group.open').forEach(function(g) {
        g.classList.remove('open');
      });
    }
  });
});
