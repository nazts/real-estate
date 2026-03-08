// ===== HAVEN REALTY GROUP — MAIN JS =====
document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Menu Toggle ──
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = menuBtn.querySelector('svg');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    // Swap hamburger / X icon
    menuIcon.innerHTML = isOpen
      ? '<path d="M6 18L18 6M6 6l12 12"/>'
      : '<path d="M4 6h16M4 12h16M4 18h16"/>';
  });

  // Close menu when a link is tapped
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuIcon.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16"/>';
    });
  });

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  });

  // ── Intersection Observer: fade-up / fade-left / fade-right ──
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered delay for siblings
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 100);
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach((el, i) => {
    scrollObserver.observe(el);
  });

  // ── Counter (count-up) animation ──
  let counterAnimated = false;

  function animateCounters() {
    if (counterAnimated) return;
    counterAnimated = true;

    document.querySelectorAll('.counter').forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const duration = 2000; // ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const easeOutQuad = t => t * (2 - t); // easing function

      const tick = () => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentValue = Math.round(target * progress);

        counter.textContent = currentValue;

        if (frame < totalFrames) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(tick);
    });
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // ── Contact Form Handling ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Loading state
      btn.disabled = true;
      btn.textContent = 'Sending...';

      // Simulate send (replace with real endpoint)
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.classList.add('form-success');

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('form-success');
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 800);
    });
  }

  // ── Active nav link highlighting on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-slate_blue', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-slate_blue');
      }
    });
  });

});
