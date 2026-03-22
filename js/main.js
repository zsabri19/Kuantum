/* ============================================================
   KUANTUM — Main JavaScript
   Navigation, Animations, Interactions
   ============================================================ */

'use strict';

// ════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Scroll handler — add .scrolled class
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Hamburger toggle
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// Active nav link — highlight current page
(function setActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === currentPath) {
      link.classList.add('active');
    }
  });
})();

// ════════════════════════════════════════
// SCROLL ANIMATIONS
// ════════════════════════════════════════

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keep state
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    observer.observe(el);
  });
}

// ════════════════════════════════════════
// COUNTER ANIMATION
// ════════════════════════════════════════

function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  const isFloat = target % 1 !== 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number, .proof-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        // Extract numeric value
        const text = entry.target.textContent;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (!isNaN(num) && num > 0) {
          animateCounter(entry.target, num);
        }
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
}

// ════════════════════════════════════════
// SMOOTH ANCHOR SCROLLING
// ════════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 90; // navbar height
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ════════════════════════════════════════
// HOVER EFFECTS — Pillar cards
// ════════════════════════════════════════

function initCardHovers() {
  document.querySelectorAll('.pillar-card, .leader-card, .insight-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform';
    });
    card.addEventListener('mouseleave', () => {
      card.style.willChange = 'auto';
    });
  });
}

// ════════════════════════════════════════
// PLATFORM FEATURE GRID — hover glow
// ════════════════════════════════════════

function initPlatformHover() {
  document.querySelectorAll('.platform-feature').forEach(feature => {
    feature.addEventListener('mouseenter', () => {
      feature.querySelector('.platform-icon') && (feature.querySelector('.platform-icon').style.transform = 'scale(1.15)');
    });
    feature.addEventListener('mouseleave', () => {
      feature.querySelector('.platform-icon') && (feature.querySelector('.platform-icon').style.transform = '');
    });
  });
}

// ════════════════════════════════════════
// NAVBAR TRANSPARENCY ON HERO PAGES
// ════════════════════════════════════════

function initNavbarStyle() {
  // If on homepage or a page with hero, let navbar be transparent initially
  const heroEl = document.querySelector('.hero, .page-hero');
  if (heroEl && window.scrollY <= 20) {
    navbar.classList.remove('scrolled');
  }
}

// ════════════════════════════════════════
// PROOF STRIP — Appear effect
// ════════════════════════════════════════

function initProofStrip() {
  const strip = document.querySelector('.proof-strip-section');
  if (!strip) return;

  const items = strip.querySelectorAll('.proof-stat');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      items.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 100);
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  observer.observe(strip);
}

// ════════════════════════════════════════
// SOLUTION TABS (Solutions page)
// ════════════════════════════════════════

function initSolutionTabs() {
  const tabs = document.querySelectorAll('.solution-tab');
  if (!tabs.length) return;

  // Highlight tab on scroll
  const sections = ['organizers', 'chambers', 'government', 'exhibitors'];

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) current = id;
      }
    });

    tabs.forEach(tab => {
      const href = tab.getAttribute('href').replace('#', '');
      if (href === current) {
        tab.style.color = 'var(--white)';
        tab.style.borderBottomColor = 'var(--gold)';
      } else {
        tab.style.color = 'rgba(255,255,255,0.6)';
        tab.style.borderBottomColor = 'transparent';
      }
    });
  }, { passive: true });
}

// ════════════════════════════════════════
// HERO PARALLAX (subtle)
// ════════════════════════════════════════

function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

// ════════════════════════════════════════
// TOOLTIP — proof source
// ════════════════════════════════════════

function initTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    const tip = document.createElement('div');
    tip.className = 'tooltip';
    tip.textContent = el.dataset.tooltip;
    tip.style.cssText = `
      position:absolute;
      background:var(--navy);
      color:var(--white);
      font-size:0.75rem;
      padding:0.4rem 0.75rem;
      border-radius:4px;
      white-space:nowrap;
      pointer-events:none;
      opacity:0;
      transition:opacity 0.2s;
      z-index:1000;
      bottom:calc(100% + 6px);
      left:50%;
      transform:translateX(-50%);
      border:1px solid var(--border);
    `;
    el.style.position = 'relative';
    el.appendChild(tip);

    el.addEventListener('mouseenter', () => { tip.style.opacity = '1'; });
    el.addEventListener('mouseleave', () => { tip.style.opacity = '0'; });
  });
}

// ════════════════════════════════════════
// VIDEO MODAL
// ════════════════════════════════════════

function initVideoModal() {
  // Create modal
  const modal = document.createElement('div');
  modal.id = 'videoModal';
  modal.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(10,15,30,0.95);
    backdrop-filter:blur(8px);
    display:none;align-items:center;justify-content:center;
    padding:2rem;
  `;
  modal.innerHTML = `
    <div style="max-width:900px;width:100%;position:relative;">
      <button id="closeModal" style="
        position:absolute;top:-2.5rem;right:0;
        background:none;border:none;color:rgba(255,255,255,0.7);
        font-size:1.5rem;cursor:pointer;padding:0.5rem;
      ">✕ Close</button>
      <div style="position:relative;padding-bottom:56.25%;background:var(--navy);border-radius:12px;overflow:hidden;">
        <iframe id="modalIframe" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="position:absolute;top:0;left:0;width:100%;height:100%;"
        ></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('closeModal').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.style.display = 'none';
    document.getElementById('modalIframe').src = '';
    document.body.style.overflow = '';
  }

  // Bind video triggers
  document.querySelectorAll('[data-video-url]').forEach(el => {
    el.addEventListener('click', () => {
      const url = el.dataset.videoUrl;
      document.getElementById('modalIframe').src = url + '?autoplay=1';
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
    el.style.cursor = 'pointer';
  });
}

// ════════════════════════════════════════
// INIT ALL
// ════════════════════════════════════════

// Video fallback handler
function initVideoFallbacks() {
  // Hero visual video (top of page)
  const heroVisualVideo = document.getElementById('heroVisualVideo');
  const heroVisualFallback = document.getElementById('heroVisualFallback');
  if (heroVisualVideo && heroVisualFallback) {
    heroVisualVideo.addEventListener('error', function() {
      heroVisualVideo.style.display = 'none';
      heroVisualFallback.style.display = 'block';
    });
    setTimeout(() => {
      if (heroVisualVideo.readyState === 0) {
        heroVisualVideo.style.display = 'none';
        heroVisualFallback.style.display = 'block';
      }
    }, 4000);
  }
  // Primary hero video (brand showcase section)
  const heroVideo = document.getElementById('heroVideo');
  const videoFallback = document.getElementById('videoFallback');
  if (heroVideo && videoFallback) {
    heroVideo.addEventListener('error', function() {
      heroVideo.style.display = 'none';
      videoFallback.style.display = 'flex';
    });
    setTimeout(() => {
      if (heroVideo.readyState === 0) {
        heroVideo.style.display = 'none';
        videoFallback.style.display = 'flex';
      }
    }, 4000);
  }
  // Secondary video fallbacks
  ['vid2', 'vid3'].forEach(id => {
    const vid = document.getElementById(id);
    const fallbackImg = document.getElementById(id + 'Fallback');
    if (vid && fallbackImg) {
      vid.addEventListener('error', function() {
        vid.style.display = 'none';
        fallbackImg.style.display = 'block';
      });
      setTimeout(() => {
        if (vid.readyState === 0) {
          vid.style.display = 'none';
          fallbackImg.style.display = 'block';
        }
      }, 4000);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbarStyle();
  initScrollAnimations();
  initCounters();
  initCardHovers();
  initPlatformHover();
  initProofStrip();
  initSolutionTabs();
  initParallax();
  initTooltips();
  initVideoModal();
  initVideoFallbacks();

  // Initial check — trigger visibility for elements already in viewport
  setTimeout(() => {
    document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('visible');
      }
    });
  }, 100);
});

// ════════════════════════════════════════
// HERO VIDEO SOUND TOGGLE
// ════════════════════════════════════════

function initSoundToggle() {
  const soundToggle = document.getElementById('soundToggle');
  const heroVideo = document.getElementById('heroVisualVideo');
  const soundIcon = document.getElementById('soundIcon');

  if (soundToggle && heroVideo && soundIcon) {
    soundToggle.addEventListener('click', () => {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        soundIcon.classList.remove('fa-volume-mute');
        soundIcon.classList.add('fa-volume-up');
        soundToggle.setAttribute('aria-label', 'Mute sound');
      } else {
        heroVideo.muted = true;
        soundIcon.classList.remove('fa-volume-up');
        soundIcon.classList.add('fa-volume-mute');
        soundToggle.setAttribute('aria-label', 'Unmute sound');
      }
    });
  }
}

// Initialize sound toggle on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initSoundToggle();
});

// ════════════════════════════════════════
// PERFORMANCE — Reduce motion
// ════════════════════════════════════════

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    el.classList.add('visible');
  });
  document.querySelectorAll('[style*="animation"]').forEach(el => {
    el.style.animation = 'none';
  });
}
