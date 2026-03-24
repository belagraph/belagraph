// ================================================================
// Belagraph — Site Controller
// Fetches content.json and renders all dynamic sections
// Architecture: data layer is abstracted for future Sanity CMS swap
// ================================================================

let siteData = {};

// --- Data Layer (swap this for Sanity later) ---
async function fetchContent() {
    const res = await fetch('content.json');
    return res.json();
}

// --- Init ---
async function initSite() {
    try {
        siteData = await fetchContent();
        injectStaticContent();
        renderHero();
        renderCategories();
        renderPosters();
        renderFonts();
        renderNavigation();
        renderSocialLinks();
        setupScrollReveal();
        setupFormPlaceholders();
    } catch (err) {
        console.error('Failed to load content:', err);
    }
}

// --- Static Content Injection (data-content attributes) ---
function injectStaticContent() {
    document.querySelectorAll('[data-content]').forEach(el => {
        const path = el.getAttribute('data-content').split('.');
        let value = siteData;
        for (const key of path) {
            value = value?.[key];
        }
        if (value != null) el.innerHTML = value;
    });

    // About image
    const aboutImg = document.getElementById('about-img');
    if (aboutImg && siteData.about?.image) {
        aboutImg.src = siteData.about.image;
    }
}

// --- Navigation ---
function renderNavigation() {
    const links = siteData.navigation?.links || [];

    // Desktop
    const desktopNav = document.getElementById('desktop-nav');
    if (desktopNav) {
        desktopNav.innerHTML = links.map(l =>
            `<a href="${l.url}" class="nav-link">${l.text}</a>`
        ).join('');
    }

    // Mobile
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) {
        mobileNav.innerHTML = links.map(l =>
            `<a href="${l.url}" class="mobile-menu__link">${l.text}</a>`
        ).join('');

        // Close menu on link click
        mobileNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                document.getElementById('mobile-menu').classList.remove('open');
            });
        });
    }
}

// --- Social Links ---
function renderSocialLinks() {
    const social = siteData.social || {};
    const svgIcons = {
        instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
        linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
        telegram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
        tiktok: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>`
    };

    const makeLinks = (containerClass) => {
        return Object.entries(social).map(([platform, url]) => {
            const icon = svgIcons[platform] || '';
            return `<a href="${url}" target="_blank" rel="noopener" class="${containerClass}">${icon}</a>`;
        }).join('');
    };

    // Desktop social links in navbar
    const desktopSocials = document.getElementById('social-links');
    if (desktopSocials) {
        desktopSocials.innerHTML = makeLinks('social-link');
        desktopSocials.style.display = 'flex';
        desktopSocials.style.gap = '16px';
        desktopSocials.style.alignItems = 'center';
    }

    // Footer social links
    const footerSocials = document.getElementById('footer-socials');
    if (footerSocials) {
        footerSocials.innerHTML = makeLinks('footer__social-link');
    }
}

// --- Hero ---
let currentHeroSlide = 0;
let heroSlideInterval;

function renderHero() {
    const slidesContainer = document.getElementById('hero-slides');
    const dotsContainer = document.getElementById('hero-dots');
    const images = siteData.hero?.images || [];

    // Title
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.innerHTML = siteData.hero?.title || '';

    // CTA
    const heroCta = document.getElementById('hero-cta');
    if (heroCta && siteData.hero?.cta_primary) {
        heroCta.textContent = siteData.hero.cta_primary.text;
        heroCta.href = siteData.hero.cta_primary.url;
    }

    // Slides
    images.forEach((src, idx) => {
        const slide = document.createElement('div');
        slide.className = `hero__slide ${idx === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${src}" alt="Hero image ${idx + 1}">`;
        slidesContainer.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = `hero__dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.addEventListener('click', () => goToHeroSlide(idx));
        dotsContainer.appendChild(dot);
    });

    // Auto-advance
    heroSlideInterval = setInterval(() => {
        goToHeroSlide((currentHeroSlide + 1) % images.length);
    }, 6000);
}

function goToHeroSlide(idx) {
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__dot');
    if (!slides.length) return;

    slides[currentHeroSlide]?.classList.remove('active');
    dots[currentHeroSlide]?.classList.remove('active');

    currentHeroSlide = idx;

    slides[currentHeroSlide]?.classList.add('active');
    dots[currentHeroSlide]?.classList.add('active');

    // Reset interval on manual navigation
    clearInterval(heroSlideInterval);
    heroSlideInterval = setInterval(() => {
        goToHeroSlide((currentHeroSlide + 1) % slides.length);
    }, 6000);
}

// --- Posters ---
let activeCategory = 'All';

function renderPosters() {
    const gallery = document.getElementById('poster-gallery');
    if (!gallery) return;
    gallery.innerHTML = '';

    const items = siteData.posters?.items || [];
    const filtered = activeCategory === 'All'
        ? items
        : items.filter(p => p.category === activeCategory);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card__image-wrap">
                <img src="${p.image}" alt="${p.title}" class="card__image" loading="lazy">
                <img src="${p.hoverImage}" alt="${p.title} hover" class="card__image card__image--hover" loading="lazy">
            </div>
            <div class="card__info">
                <h3 class="card__title">${p.title}</h3>
                <p class="card__meta">${p.category} · ${p.year}</p>
            </div>`;
        gallery.appendChild(card);
    });
}

function renderCategories() {
    const container = document.getElementById('category-filters');
    if (!container) return;
    container.innerHTML = '';

    const categories = siteData.posters?.categories || [];
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${cat === activeCategory ? 'active' : ''}`;
        btn.textContent = cat;
        btn.addEventListener('click', () => {
            activeCategory = cat;
            renderCategories();
            renderPosters();
        });
        container.appendChild(btn);
    });
}

// --- Fonts ---
function renderFonts() {
    const gallery = document.getElementById('font-gallery');
    if (!gallery) return;

    const items = siteData.fonts?.items || [];
    items.forEach(f => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card__image-wrap">
                <img src="${f.image}" alt="${f.title}" class="card__image" loading="lazy">
                <img src="${f.hoverImage}" alt="${f.title} hover" class="card__image card__image--hover" loading="lazy">
            </div>
            <div class="card__info">
                <h3 class="card__title">${f.title}</h3>
                <p class="card__meta">${f.style} · ${f.year}</p>
            </div>`;
        gallery.appendChild(card);
    });
}

// --- Testimonials ---
let currentTestimonial = 0;

function renderTestimonials() {
    const testimonials = siteData.testimonials || [];
    if (!testimonials.length) return;

    const dotsContainer = document.getElementById('testimonial-dots');
    dotsContainer.innerHTML = '';

    testimonials.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `testimonials__dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Testimonial ${idx + 1}`);
        dot.addEventListener('click', () => goToTestimonial(idx));
        dotsContainer.appendChild(dot);
    });

    showTestimonial();

    // Auto-advance testimonials
    setInterval(() => {
        goToTestimonial((currentTestimonial + 1) % testimonials.length);
    }, 8000);
}

function showTestimonial() {
    const t = siteData.testimonials[currentTestimonial];
    const content = document.getElementById('testimonial-content');
    if (!content || !t) return;

    content.style.opacity = '0';
    setTimeout(() => {
        content.innerHTML = `
            <blockquote class="testimonials__quote">"${t.content}"</blockquote>
            <img src="${t.avatar}" alt="${t.name}" class="testimonials__avatar">
            <h4 class="testimonials__name">${t.name}</h4>
            <p class="testimonials__role">${t.role}</p>
        `;
        content.style.opacity = '1';
    }, 400);
}

function goToTestimonial(idx) {
    const dots = document.querySelectorAll('.testimonials__dot');
    dots[currentTestimonial]?.classList.remove('active');
    currentTestimonial = idx;
    dots[currentTestimonial]?.classList.add('active');
    showTestimonial();
}

// --- Form Placeholders ---
function setupFormPlaceholders() {
    const form = siteData.contact?.form;
    if (!form) return;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    if (nameInput) nameInput.placeholder = form.name_placeholder || '';
    if (emailInput) emailInput.placeholder = form.email_placeholder || '';
    if (messageInput) messageInput.placeholder = form.message_placeholder || '';

    // Simple form handling (display-only for now, will connect to Sanity/backend later)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.contact__form-submit');
            const origText = btn.textContent;
            btn.textContent = 'MESSAGE SENT ✓';
            btn.style.background = '#16a34a';
            contactForm.reset();
            setTimeout(() => {
                btn.textContent = origText;
                btn.style.background = '';
            }, 3000);
        });
    }
}

// --- Gallery Scrolling ---
function setupGalleryScroll(leftBtnId, rightBtnId, trackId) {
    const leftBtn = document.getElementById(leftBtnId);
    const rightBtn = document.getElementById(rightBtnId);
    const track = document.getElementById(trackId);
    if (!leftBtn || !rightBtn || !track) return;

    const scrollAmount = () => track.clientWidth * 0.75;

    leftBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
}

// --- Scroll Reveal ---
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- Navbar Scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// --- Mobile Menu ---
const openMenuBtn = document.getElementById('open-menu');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

openMenuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));

// --- Gallery Scroll Buttons ---
setupGalleryScroll('poster-scroll-left', 'poster-scroll-right', 'poster-gallery');
setupGalleryScroll('font-scroll-left', 'font-scroll-right', 'font-gallery');

// --- Start ---
initSite();