(function() {
  if (sessionStorage.getItem('datacendia_intro_seen')) {
    var overlay = document.getElementById('landing-overlay');
    if (overlay) overlay.style.display = 'none';
    return;
  }

  // Particle field
  var canvas = document.getElementById('landing-particles');
  var ctx = canvas.getContext('2d');
  var particles = [];
  var animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create particles
  for (var i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      gold: Math.random() > 0.7
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold ? 'rgba(201, 162, 39, 0.4)' : 'rgba(255, 255, 255, 0.12)';
      ctx.fill();
    }
    // Draw faint connection lines
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(201, 162, 39, ' + (0.06 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // Auto-dismiss after animation completes
  setTimeout(function() { dismissLanding(); }, 4800);

  // Skip button listener (no inline onclick needed)
  var skipBtn = document.querySelector('.landing-skip');
  if (skipBtn) {
    skipBtn.addEventListener('click', function() { dismissLanding(); });
  }

  function dismissLanding() {
    var overlay = document.getElementById('landing-overlay');
    if (!overlay || overlay.classList.contains('fade-out')) return;
    overlay.classList.add('fade-out');
    sessionStorage.setItem('datacendia_intro_seen', '1');
    setTimeout(function() {
      overlay.style.display = 'none';
      cancelAnimationFrame(animId);
    }, 800);
  }
})();
