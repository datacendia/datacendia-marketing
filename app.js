document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  const subTabs = document.querySelectorAll('.sub-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const subNav = document.getElementById('sub-nav');

  function switchTab(tabId, scrollToTop = false) {
    // Update main tab buttons
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabId || 
        (tab.dataset.tab === 'overview' && ['sovereignty', 'governance', 'council', 'integrations', 'failures', 'comparison', 'limitations', 'evidence'].includes(tabId)));
    });

    // Update sub-tab buttons
    subTabs.forEach(subTab => {
      subTab.classList.toggle('active', subTab.dataset.tab === tabId);
    });

    // Show/hide sub-nav based on main tab
    if (tabId === 'manifesto') {
      subNav.style.display = 'none';
    } else {
      subNav.style.display = 'flex';
    }

    // Update tab content
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === tabId);
    });

    // Scroll to top only for main tab switches
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Main tab click handlers
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Clear sub-tab active states when clicking main tabs
      subTabs.forEach(st => st.classList.remove('active'));
      switchTab(this.dataset.tab);
    });
  });

  // Sub-tab click handlers
  subTabs.forEach(subTab => {
    subTab.addEventListener('click', function() {
      switchTab(this.dataset.tab);
    });
  });

  // Matrix card click handlers
  const matrixCards = document.querySelectorAll('.matrix-card[data-target]');
  matrixCards.forEach(card => {
    card.addEventListener('click', function() {
      const target = this.dataset.target;
      if (target) {
        switchTab(target);
      }
    });
  });

  // Back button handlers
  const backBtns = document.querySelectorAll('.back-btn[data-target]');
  backBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.dataset.target;
      if (target) {
        subTabs.forEach(st => st.classList.remove('active'));
        switchTab(target);
      }
    });
  });

  // Carousel functionality
  document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(i);
      });
    });

    // Auto-advance every 4 seconds
    setInterval(() => {
      showSlide((currentSlide + 1) % slides.length);
    }, 4000);
  });

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    function openLightbox(element) {
      let content;
      if (element.tagName === 'VIDEO') {
        content = document.createElement('video');
        content.src = element.src;
        content.controls = true;
        content.autoplay = true;
        content.loop = true;
      } else if (element.tagName === 'IMG') {
        content = document.createElement('img');
        content.src = element.src;
        content.alt = element.alt;
      }
      lightboxContent.innerHTML = '';
      lightboxContent.appendChild(content);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightboxContent.innerHTML = '';
      document.body.style.overflow = '';
    }

    // Click handlers for showcase videos and images
    document.querySelectorAll('.showcase-visual video, .showcase-visual img').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(el);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // Newsletter form — AJAX submit via Formspree so thanks message shows inline
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(newsletterForm);
      fetch(newsletterForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(function(response) {
        if (response.ok) {
          newsletterForm.style.display = 'none';
          document.getElementById('newsletter-thanks').style.display = 'block';
        }
      })
      .catch(function() {
        newsletterForm.style.display = 'none';
        document.getElementById('newsletter-thanks').style.display = 'block';
      });
    });
  }
});
