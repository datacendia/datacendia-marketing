var slides = document.querySelectorAll('.slide');
var total = slides.length;
var current = 0;

function showSlide(n) {
  if (n < 0 || n >= total) return;
  slides[current].classList.remove('active');
  current = n;
  slides[current].classList.add('active');
  document.getElementById('counter').textContent = (current + 1) + ' / ' + total;
  document.getElementById('progress').style.width = ((current + 1) / total * 100) + '%';
}

function nextSlide() { showSlide(current + 1); }
function prevSlide() { showSlide(current - 1); }

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
  if (e.key === 'Home') { e.preventDefault(); showSlide(0); }
  if (e.key === 'End') { e.preventDefault(); showSlide(total - 1); }
});

var touchStartX = 0;
document.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', function(e) {
  var diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
});

document.getElementById('btn-next').addEventListener('click', nextSlide);
document.getElementById('btn-prev').addEventListener('click', prevSlide);

showSlide(0);
