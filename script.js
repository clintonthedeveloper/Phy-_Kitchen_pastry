/**
 * ============================================================================
 * PHY'S KITCHEN - CORE JAVASCRIPT
 * Artisanal Bakery & Patisserie
 * Vanilla JavaScript (No external framework dependencies)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. BUSINESS CONFIGURATION CONSTANTS (EASY CUSTOMIZATION)
     ========================================================================== */
  const BUSINESS_CONFIG = {
    businessName: "Phy's Kitchen",
    // Replace with your official Instagram link:
    instagramUrl: "https://www.instagram.com/physkitchen/",
    // Replace with your business phone number:
    phoneNumber: "+254 71619487",
    phoneClean: "254771619487", // Digits only for WhatsApp link
    // Replace with your business email:
    email: "hello@physkitchen.com",
    // Replace with your business physical location:
    location: "Nairobi, Kenya"
  };

  /* ==========================================================================
     2. DYNAMIC SOCIAL & CONTACT LINK BINDINGS
     ========================================================================== */
  const initBusinessLinks = () => {
    // Sync all Instagram anchors with the configured Instagram URL
    const instagramLinks = document.querySelectorAll('a[data-social="instagram"]');
    instagramLinks.forEach(link => {
      link.href = BUSINESS_CONFIG.instagramUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

    // Sync WhatsApp links
    const whatsappLinks = document.querySelectorAll('a[data-contact="whatsapp"]');
    whatsappLinks.forEach(link => {
      link.href = `https://wa.me/${BUSINESS_CONFIG.phoneClean}?text=Hello%20Phy's%20Kitchen,%20I%20would%20like%20to%20place%20an%20order!`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

    // Sync Email links
    const emailLinks = document.querySelectorAll('a[data-contact="email"]');
    emailLinks.forEach(link => {
      link.href = `mailto:${BUSINESS_CONFIG.email}`;
    });

    // Sync Phone links
    const phoneLinks = document.querySelectorAll('a[data-contact="phone"]');
    phoneLinks.forEach(link => {
      link.href = `tel:${BUSINESS_CONFIG.phoneClean}`;
    });
  };

  initBusinessLinks();

  /* ==========================================================================
     3. STICKY NAVBAR & ACTIVE LINK HIGHLIGHTING
     ========================================================================== */
  const navbar = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Sticky navbar shadow/compact state
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active navigation link tracking
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}` || (currentSectionId === '' && href === '#hero')) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     4. MOBILE HAMBURGER MENU
     ========================================================================== */
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navLinks');

  if (menuToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        navMenu.classList.add('open');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu();
      }
    });
  }

  /* ==========================================================================
     5. SMOOTH SCROLLING WITH OFFSET
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     6. MENU CATEGORY FILTERING
     ========================================================================== */
  const menuFilterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (menuFilterBtns.length > 0 && menuCards.length > 0) {
    menuFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active button state
        menuFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        menuCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     7. MENU CARD QUICK "ORDER NOW" INTERACTION
     ========================================================================== */
  const orderProductSelect = document.getElementById('orderProduct');
  const quickOrderButtons = document.querySelectorAll('.menu-order-btn, .service-inquire-link');

  quickOrderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = button.getAttribute('data-product');

      if (orderProductSelect && productName) {
        // Find matching option in select
        let optionFound = false;
        for (let i = 0; i < orderProductSelect.options.length; i++) {
          if (orderProductSelect.options[i].value === productName || orderProductSelect.options[i].text.includes(productName)) {
            orderProductSelect.selectedIndex = i;
            optionFound = true;
            break;
          }
        }

        // If not found, set custom or add
        if (!optionFound) {
          orderProductSelect.value = productName;
        }

        // Highlight input field subtly
        orderProductSelect.style.borderColor = 'var(--color-gold)';
        setTimeout(() => {
          orderProductSelect.style.borderColor = '';
        }, 1500);
      }

      // Scroll smoothly to contact / order section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     8. GALLERY LIGHTBOX MODAL & FILTERING
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  let activeGalleryItems = Array.from(galleryItems);

  // Gallery filtering
  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-gallery-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-gallery-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });

        // Update list of currently visible gallery items
        activeGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
      });
    });
  }

  // Lightbox functions
  const openLightbox = (index) => {
    if (!lightboxModal || activeGalleryItems.length === 0) return;
    currentGalleryIndex = index;
    const item = activeGalleryItems[currentGalleryIndex];
    if (!item) return;

    const img = item.querySelector('img');
    const title = item.getAttribute('data-title') || img.getAttribute('alt') || "Phy's Kitchen Creation";
    const category = item.getAttribute('data-gallery-category') || "Pastry";

    if (lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCategory) lightboxCategory.textContent = category.toUpperCase();

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  const nextLightbox = () => {
    if (activeGalleryItems.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % activeGalleryItems.length;
    openLightbox(currentGalleryIndex);
  };

  const prevLightbox = () => {
    if (activeGalleryItems.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
    openLightbox(currentGalleryIndex);
  };

  // Bind gallery clicks
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      activeGalleryItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
      const idx = activeGalleryItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });

  /* ==========================================================================
     9. ANIMATED NUMBER COUNTERS (HERO STATS)
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;

    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      const isDecimal = target % 1 !== 0;

      let count = 0;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        stat.textContent = `${prefix}${isDecimal ? count.toFixed(1) : Math.floor(count)}${suffix}`;
      }, stepTime);
    });

    countersAnimated = true;
  };

  // Trigger when hero section is in view
  const heroSection = document.getElementById('hero');
  if (heroSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(heroSection);
  } else {
    animateCounters();
  }

  /* ==========================================================================
     10. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ==========================================================================
     11. ORDER FORM VALIDATION & SWEET SUCCESS POPUP
     ========================================================================== */
  const orderForm = document.getElementById('bakeryOrderForm');
  const successModal = document.getElementById('successModal');
  const successSummary = document.getElementById('successSummary');
  const successCloseBtn = document.getElementById('successCloseBtn');

  // Set minimum date to today for order date picker
  const orderDateInput = document.getElementById('orderDate');
  if (orderDateInput) {
    const today = new Date().toISOString().split('T')[0];
    orderDateInput.setAttribute('min', today);
  }

  // Form Field Validation Rules
  const validateField = (input, condition, errorMsg) => {
    const parentGroup = input.closest('.form-group');
    let errorSpan = parentGroup.querySelector('.error-message');

    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'error-message';
      parentGroup.appendChild(errorSpan);
    }

    if (!condition) {
      input.classList.add('error');
      errorSpan.textContent = errorMsg;
      errorSpan.classList.add('show');
      return false;
    } else {
      input.classList.remove('error');
      errorSpan.classList.remove('show');
      return true;
    }
  };

  if (orderForm) {
    // Clear errors on user input
    orderForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errSpan = input.closest('.form-group')?.querySelector('.error-message');
        if (errSpan) errSpan.classList.remove('show');
      });
    });

    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('orderFullName');
      const phone = document.getElementById('orderPhone');
      const email = document.getElementById('orderEmail');
      const product = document.getElementById('orderProduct');
      const quantity = document.getElementById('orderQuantity');
      const date = document.getElementById('orderDate');
      const message = document.getElementById('orderMessage');

      // Validation flags
      const isNameValid = validateField(fullName, fullName.value.trim().length >= 2, "Please enter your full name (minimum 2 characters).");
      const phoneRegex = /^[\d\s\+\-\(\)]{7,16}$/;
      const isPhoneValid = validateField(phone, phoneRegex.test(phone.value.trim()), "Please provide a valid phone number.");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = validateField(email, emailRegex.test(email.value.trim()), "Please provide a valid email address.");
      const isProductValid = validateField(product, product.value.trim() !== "", "Please select a product or treat.");
      const isQtyValid = validateField(quantity, parseInt(quantity.value, 10) >= 1, "Quantity must be at least 1.");
      const isDateValid = validateField(date, date.value.trim() !== "", "Please select your preferred celebration/order date.");

      const isFormValid = isNameValid && isPhoneValid && isEmailValid && isProductValid && isQtyValid && isDateValid;

      if (isFormValid) {
        // Construct Order Summary
        const orderSummaryData = {
          name: fullName.value.trim(),
          phone: phone.value.trim(),
          email: email.value.trim(),
          product: product.value.trim(),
          quantity: quantity.value,
          date: date.value,
          message: message ? message.value.trim() : ""
        };

        if (successSummary) {
          successSummary.innerHTML = `
            <p><strong>Customer:</strong> ${escapeHtml(orderSummaryData.name)}</p>
            <p><strong>Item:</strong> ${escapeHtml(orderSummaryData.product)}</p>
            <p><strong>Quantity:</strong> ${escapeHtml(orderSummaryData.quantity)}</p>
            <p><strong>Preferred Date:</strong> ${escapeHtml(orderSummaryData.date)}</p>
            <p><strong>Contact:</strong> ${escapeHtml(orderSummaryData.phone)} | ${escapeHtml(orderSummaryData.email)}</p>
            ${orderSummaryData.message ? `<p><strong>Special Request:</strong> "${escapeHtml(orderSummaryData.message)}"</p>` : ''}
          `;
        }

        // Show Modal
        if (successModal) {
          successModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }

        // Reset form inputs cleanly
        orderForm.reset();
      }
    });
  }

  // Close Success Modal
  if (successCloseBtn && successModal) {
    successCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     12. BACK-TO-TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     13. HELPER UTILITIES
     ========================================================================== */
  function escapeHtml(string) {
    if (!string) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return string.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

  console.log(`✨ Phy's Kitchen website loaded successfully. Crafted with love & elegance.`);
});
