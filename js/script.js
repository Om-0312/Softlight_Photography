// =============================================
// SOFTLIGHT PHOTOGRAPHY — Custom JavaScript
// Developer : Om Dhengle
// Features  : Hamburger Menu | Form Validation |
//             Portfolio Filter | Back to Top |
//             Hero Typewriter Effect
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // 1. HAMBURGER MENU TOGGLE
  //    Toggles the 'show' class on nav <ul>
  //    when the hamburger button is clicked.
  //    Closes automatically when a link is tapped.
  // ============================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('nav ul');

  if (hamburger && navMenu) {

    hamburger.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Swap ☰ ↔ ✕
      hamburger.innerHTML = isOpen ? '&#x2715;' : '&#9776;';
    });

    // Close menu when any nav link is clicked (mobile UX)
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('show');
        hamburger.innerHTML = '&#9776;';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ============================================
  // 2. CONTACT FORM — JavaScript Validation
  //    Validates name, email, and message
  //    both on blur (real-time) and on submit.
  //    Shows inline error messages and colours.
  // ============================================
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    const nameInput    = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn    = contactForm.querySelector('button[type="submit"]');

    // --- helpers ---
    function showError(input, msg) {
      clearError(input);                         // remove old error first
      input.style.borderColor = '#ff5050';
      const span = document.createElement('span');
      span.className = 'error-msg';
      span.textContent = msg;
      input.insertAdjacentElement('afterend', span);
    }

    function clearError(input) {
      const old = input.parentNode.querySelector('.error-msg');
      if (old) old.remove();
      input.style.borderColor = '#4CAF50';       // green border = valid
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // --- real-time blur validation ---
    nameInput.addEventListener('blur', function () {
      this.value.trim().length < 2
        ? showError(this, 'Name must be at least 2 characters.')
        : clearError(this);
    });

    emailInput.addEventListener('blur', function () {
      !isValidEmail(this.value.trim())
        ? showError(this, 'Please enter a valid email address.')
        : clearError(this);
    });

    messageInput.addEventListener('blur', function () {
      this.value.trim().length < 10
        ? showError(this, 'Message must be at least 10 characters.')
        : clearError(this);
    });

    // --- submit validation ---
    contactForm.addEventListener('submit', function (e) {
      let isValid = true;

      if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters.');
        isValid = false;
      }
      if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      }
      if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters.');
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();                      // block form submit
      } else {
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled    = true;            // prevent double-click
      }
    });
  }


  // ============================================
  // 3. PORTFOLIO CATEGORY FILTER
  //    Reads data-category on each gallery <a>
  //    and shows/hides items based on which
  //    filter button is clicked.
  //    Animate items in with a fade effect.
  // ============================================
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid a[data-category]');

  if (filterBtns.length > 0 && galleryItems.length > 0) {

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {

        // Update active state
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        const selected = this.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          const match = selected === 'all' || item.getAttribute('data-category') === selected;

          if (match) {
            item.style.display   = 'block';
            item.style.animation = 'filterFadeIn 0.4s ease forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }


  // ============================================
  // 4. BACK-TO-TOP BUTTON
  //    Appears after scrolling 400px down.
  //    Smoothly scrolls back to the top.
  // ============================================
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    // Show / hide on scroll
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    // Smooth scroll to top on click
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ============================================
  // 5. HERO TYPEWRITER EFFECT  (index.html only)
  //    Types out the h1 text character by
  //    character, then removes the cursor blink.
  // ============================================
  const heroHeading = document.querySelector('.hero-text h1');

  if (heroHeading) {
    const fullText = heroHeading.textContent;
    heroHeading.textContent = '';
    heroHeading.classList.add('typewriter-cursor');

    let i = 0;
    function typeChar() {
      if (i < fullText.length) {
        heroHeading.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeChar, 55);
      } else {
        // Remove blinking cursor once done
        setTimeout(function () {
          heroHeading.classList.remove('typewriter-cursor');
        }, 800);
      }
    }

    // Small delay so AOS fade-up plays first
    setTimeout(typeChar, 600);
  }

});