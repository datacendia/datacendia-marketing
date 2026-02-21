/* Mobile Sidebar — auto-injected toggle + overlay for app-layout demos */
(function(){
  var header = document.querySelector('.platform-header');
  var sidebar = document.querySelector('.sidebar');
  if (!header || !sidebar) return;

  // Create hamburger toggle
  var btn = document.createElement('button');
  btn.className = 'sidebar-toggle';
  btn.setAttribute('aria-label', 'Toggle sidebar');
  btn.innerHTML = '<span></span><span></span><span></span>';

  // Insert as first child of header
  header.insertBefore(btn, header.firstChild);

  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  function toggle() {
    var open = sidebar.classList.toggle('mobile-open');
    btn.classList.toggle('open', open);
    overlay.classList.toggle('visible', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function close() {
    sidebar.classList.remove('mobile-open');
    btn.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', toggle);
  overlay.addEventListener('click', close);

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') close();
  });
})();
