/* ==========================================================================
   MASTER WEBSITE CONTROLLER (WordPress, SaaS & AI Automation Portfolio)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize core systems
  initThemeManager();
  initStickyHeader();
  initScrollReveal();
  initContactFormHandler();
  initSmoothScrolls();
  initMobileMenu();
});

/* ==========================================================================
   THEME MANAGER (Light / Dark Mode Toggle)
   ========================================================================== */
function initThemeManager() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Retrieve saved theme preference or query system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set default theme (Dark mode by default, or loaded preference)
  const defaultTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', defaultTheme);

  // Toggle click event handler
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* ==========================================================================
   STICKY HEADER TELEMETRY
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   SCROLL REVEAL INTERSECTION OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.15 // trigger when 15% visible
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target); // Stop tracking once animated
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   CONTACT FORM PIPELINE & SUBMISSION
   ========================================================================== */
function initContactFormHandler() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
      alert("Please populate all necessary form fields.");
      return;
    }

    // Simulate pipeline loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg style="animation: spin 1s linear infinite; width:18px; height:18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
      Processing transmission...
    `;

    setTimeout(() => {
      // Transition to success state
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px; height:18px; color:#10b981;">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Message Dispatched Successfully!
      `;
      submitBtn.style.backgroundColor = '#10b981';
      
      contactForm.reset();

      // Reset button state after a short period
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.backgroundColor = '';
      }, 4000);
    }, 1500);
  });
}

/* ==========================================================================
   SMOOTH SCROLLS & NAV ACTIVE STATES
   ========================================================================== */
function initSmoothScrolls() {
  const navLinks = document.querySelectorAll('.nav-link, .footer-link');
  const sections = document.querySelectorAll('section');

  // Track nav link highlights on scroll
  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY + 120; // offset header height

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   MOBILE MENU DRAWER TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (!mobileBtn || !navMenu) return;

  mobileBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate icon changes if needed (simple toggle)
    if (navMenu.classList.contains('active')) {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '70px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = 'var(--bg-secondary)';
      navMenu.style.borderBottom = '1px solid var(--border-color)';
      navMenu.style.padding = '2rem 1.5rem';
      navMenu.style.gap = '1.5rem';
    } else {
      navMenu.style.display = '';
    }
  });

  // Close mobile drawer upon click of nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navMenu.style.display = '';
      }
    });
  });
}
