// ===================================
// Animation Controller
// ===================================

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===================================
// Intersection Observer for Scroll Animations
// ===================================

function initScrollAnimations() {
    if (prefersReducedMotion) {
        // Show all elements immediately if user prefers reduced motion
        document.querySelectorAll('[data-animation]').forEach(el => {
            el.classList.add('animate-in');
        });
        return;
    }

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;

                // Apply animation after delay
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, parseInt(delay));

                // Stop observing after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements with data-animation attribute
    document.querySelectorAll('[data-animation]').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// Typing Effect for Hero Section
// ===================================

function typeWriter(element, text, speed = 80, callback) {
    if (prefersReducedMotion) {
        element.textContent = text;
        element.classList.add('active');
        if (callback) callback();
        return;
    }

    let index = 0;
    element.classList.add('active');
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }

    type();
}

function initHeroAnimations() {
    const nameElement = document.querySelector('.typing-text');
    const subtitle = document.querySelector('.hero-subtitle');
    const description = document.querySelector('.hero-description');
    const buttons = document.querySelector('.hero-buttons');

    if (!nameElement) return;

    const nameText = nameElement.textContent;

    // Start typing effect
    typeWriter(nameElement, nameText, 80, () => {
        // After name is typed, show subtitle
        setTimeout(() => {
            if (subtitle) subtitle.classList.add('active');

            // Then show description
            setTimeout(() => {
                if (description) description.classList.add('active');

                // Finally show buttons
                setTimeout(() => {
                    if (buttons) buttons.classList.add('active');
                }, 300);
            }, 200);
        }, 200);
    });
}

// ===================================
// 3D Tilt Effect for Project Cards
// ===================================

function init3DTilt() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.classList.add('tilt-active');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `
                translateY(-8px)
                scale(1.02)
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.3s ease-out';

            setTimeout(() => {
                card.style.transition = '';
            }, 300);
        });
    });
}

// ===================================
// Stagger Animation for Child Elements
// ===================================

function applyStaggerToChildren(parentSelector, childSelector, baseDelay = 0, staggerDelay = 50) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;

    const children = parent.querySelectorAll(childSelector);
    children.forEach((child, index) => {
        const totalDelay = baseDelay + (index * staggerDelay);
        child.setAttribute('data-delay', totalDelay);
    });
}

// ===================================
// Initialize All Animations
// ===================================

function initAnimations() {
    // Apply stagger delays to various sections

    // About section - interests list
    applyStaggerToChildren('.bg-slate-700', 'li', 0, 100);

    // Projects section - cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.setAttribute('data-delay', index * 200);
    });

    // Skills section - badges in each category
    const skillCategories = document.querySelectorAll('#skills > div > div > div');
    skillCategories.forEach(category => {
        const badges = category.querySelectorAll('.skill-badge');
        badges.forEach((badge, index) => {
            badge.setAttribute('data-delay', index * 50);
        });
    });

    // Contact section - social links
    applyStaggerToChildren('#contact', 'a', 0, 150);

    // Initialize all animation systems
    initScrollAnimations();
    initHeroAnimations();
    init3DTilt();
}

// ===================================
// Run on DOM Ready
// ===================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}
