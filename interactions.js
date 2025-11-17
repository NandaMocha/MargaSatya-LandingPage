// ========================================
// MARGA SATYA - UI INTERACTIONS
// Header Navigation, Smooth Scroll, Animations
// ========================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderSticky();
    initToast();
});

// ========================================
// NAVIGATION & HAMBURGER MENU
// ========================================

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileCta = document.querySelector('.mobile-cta-button');

    if (!hamburger || !mobileMenu) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        const isActive = mobileMenu.classList.contains('active');

        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeMobileMenu();
        });
    });

    // Close menu when clicking CTA
    if (mobileCta) {
        mobileCta.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scroll
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    // Smooth scroll for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                // Get header height for offset
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 70;

                // Calculate target position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                // Smooth scroll (600-800ms as per requirement)
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// STICKY HEADER
// ========================================

function initHeaderSticky() {
    const header = document.getElementById('header');

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add 'scrolled' class when scrolled down
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================

function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Only observe once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Observe platform cards
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        observer.observe(card);
    });
}

// ========================================
// TOAST NOTIFICATION SYSTEM
// ========================================

let toastContainer = null;

function initToast() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    } else {
        toastContainer = document.getElementById('toast-container');
    }
}

// Show toast notification
window.showToast = function(message, type = 'success', duration = 5000) {
    if (!toastContainer) initToast();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = getToastIcon(type);

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" aria-label="Close">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto hide
    const hideTimeout = setTimeout(() => {
        hideToast(toast);
    }, duration);

    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(hideTimeout);
        hideToast(toast);
    });

    return toast;
};

function hideToast(toast) {
    toast.classList.remove('show');

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 220); // Match transition duration
}

function getToastIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'i'
    };
    return icons[type] || icons.info;
}

// ========================================
// CARD HOVER EFFECTS ENHANCEMENT
// ========================================

// Add extra interactivity to feature cards
function enhanceFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        const icon = card.querySelector('.feature-icon');

        if (icon) {
            card.addEventListener('mouseenter', function() {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            });

            card.addEventListener('mouseleave', function() {
                icon.style.transform = '';
            });
        }
    });
}

// Call on load
window.addEventListener('load', enhanceFeatureCards);

// ========================================
// FORM ENHANCEMENTS (Loading State)
// ========================================

// Enhance waitlist form with loading state
const waitlistForm = document.getElementById('waitlistForm');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
        const submitButton = this.querySelector('button[type="submit"]');
        if (submitButton) {
            // Add loading class
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        }
    });
}

// Add custom cursor effects (optional)
function initCustomCursor() {
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .platform-card');

    interactiveElements.forEach(el => {
        el.style.cursor = 'pointer';
    });
}

window.addEventListener('load', initCustomCursor);

// ========================================
// UTILITY: Debounce function for performance
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for external use
window.MargaSatya = {
    showToast: window.showToast,
    closeToast: hideToast
};

console.log('🎨 Marga Satya UI Interactions initialized');
