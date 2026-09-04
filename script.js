/* =========================================================
   Dineshkumar S — Portfolio Script
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  initNavScroll();
  initNavToggle();
  initTypingEffect();
  initScrollReveal();
  initTimelineReveal();
  initContactForm();
});

/* Footer year */
function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* Navbar background on scroll */
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const toggle = () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* Mobile nav toggle */
function initNavToggle() {
  const btn = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Hero terminal typing animation — the one signature moment */
function initTypingEffect() {
  const el = document.getElementById('typeLine');
  if (!el) return;

  const text = 'Dineshkumar S — building things that work.';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    el.textContent = text;
    return;
  }

  let i = 0;
  const speed = 45;

  const type = () => {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i += 1;
      setTimeout(type, speed);
    }
  };

  setTimeout(type, 900);
}

/* Scroll-triggered reveal for section content */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.section-tag, .section-title, .about-card, .skill-card, .project-card, .cert-card, .contact-form, .contact-list'
  );

  targets.forEach((el) => el.classList.add('reveal-el'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* Timeline vertical line grows in once visible */
function initTimelineReveal() {
  const line = document.getElementById('timelineLine');
  if (!line) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          line.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(line);
}

/* Contact form — front-end only, no backend wired up */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Please fill in all fields before sending.';
      return;
    }

    status.textContent = 'Thanks — this form isn\'t connected to email yet. Please reach out directly for now.';
    form.reset();
  });
}
