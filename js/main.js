// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelector('.nav-links');
const navAuth = document.querySelector('.nav-auth');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const body = document.body;
let isMenuOpen = false;

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    isMenuOpen = false;
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.classList.remove('menu-open');
}

// Event Listeners
if (hamburger && mobileMenu) {
    // Hamburger click
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking on mobile menu links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

// Tab Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const modelGrids = document.querySelectorAll('.models-grid');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and grids
        tabBtns.forEach(b => b.classList.remove('active'));
        modelGrids.forEach(grid => grid.classList.remove('active'));

        // Add active class to clicked button and corresponding grid
        btn.classList.add('active');
        document.getElementById(`${btn.dataset.tab}-models`).classList.add('active');
    });
});

// Brand Logo Slider
const brandLogosContainer = document.querySelector('.brand-logos');
const prevBrandBtn = document.querySelector('.prev-brand');
const nextBrandBtn = document.querySelector('.next-brand');
let isScrolling = false;
let startX;
let scrollLeft;

function updateSliderButtons() {
    if (brandLogosContainer) {
        const maxScroll = brandLogosContainer.scrollWidth - brandLogosContainer.clientWidth;
        prevBrandBtn.style.opacity = brandLogosContainer.scrollLeft <= 0 ? '0.5' : '1';
        nextBrandBtn.style.opacity = brandLogosContainer.scrollLeft >= maxScroll ? '0.5' : '1';
    }
}

function scrollBrands(direction) {
    if (!brandLogosContainer || isScrolling) return;

    isScrolling = true;
    const scrollAmount = direction === 'next' ? 300 : -300;
    const currentScroll = brandLogosContainer.scrollLeft;
    const targetScroll = currentScroll + scrollAmount;
    const maxScroll = brandLogosContainer.scrollWidth - brandLogosContainer.clientWidth;
    const finalScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    brandLogosContainer.scrollTo({
        left: finalScroll,
        behavior: 'smooth'
    });

    setTimeout(() => {
        isScrolling = false;
        updateSliderButtons();
    }, 300);
}

// Touch event handlers
function handleTouchStart(e) {
    startX = e.touches[0].pageX;
    scrollLeft = brandLogosContainer.scrollLeft;
}

function handleTouchMove(e) {
    if (!startX) return;
    e.preventDefault();
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 2;
    brandLogosContainer.scrollLeft = scrollLeft - walk;
}

function handleTouchEnd() {
    startX = null;
    updateSliderButtons();
}

// Success Stories Slider
const successStoriesSlider = {
    currentSlide: 0,
    slides: [
        {
            image: 'images/models/hero-1.jpeg',
            quote: 'ModelHub helped me land my first major campaign with a leading fashion brand.',
        author: 'Sarah Johnson, Model'
    },
    {
            image: 'images/models/hero-2.jpeg',
            quote: 'Through ModelHub, I\'ve connected with amazing photographers and brands worldwide.',
            author: 'James Wilson, Photographer'
        },
        {
            image: 'images/models/hero-3.jpeg',
            quote: 'The platform made it easy to find diverse talent for our latest campaign.',
            author: 'Emma Davis, Brand Manager'
        }
    ],

    init() {
        this.slider = document.querySelector('.story-slider');
        this.prevBtn = document.querySelector('.prev-slide');
        this.nextBtn = document.querySelector('.next-slide');

        if (!this.slider) return;

        this.setupEventListeners();
        this.updateSlider();
    },

    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.navigate(-1));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.navigate(1));
        }

        // Touch events
        let touchStartX = 0;
        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        this.slider.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                this.navigate(diff > 0 ? 1 : -1);
            }
        });
    },

    navigate(direction) {
        this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;
        this.updateSlider();
    },

    updateSlider() {
        if (!this.slider) return;

        const slide = this.slides[this.currentSlide];
        this.slider.innerHTML = `
            <div class="story-slide active">
                <div class="story-content">
                    <img src="${slide.image}" alt="Success Story" loading="lazy" onerror="this.src='images/models/hero-1.jpeg'">
                    <div class="story-text">
                        <blockquote>${slide.quote}</blockquote>
                        <cite>${slide.author}</cite>
                    </div>
                </div>
            </div>
        `;

        // Fade in animation
        const storySlide = this.slider.querySelector('.story-slide');
        storySlide.style.opacity = '0';
        setTimeout(() => {
            storySlide.style.opacity = '1';
        }, 50);
    }
};

// Brand Logos Slider
function updateBrandSliderButtons() {
    const prevButton = document.querySelector('.prev-brand');
    const nextButton = document.querySelector('.next-brand');
    const brandLogosContainer = document.querySelector('.brand-logos-container');

    if (!brandLogosContainer || !prevButton || !nextButton) return;

    const scrollLeft = brandLogosContainer.scrollLeft;
    const scrollWidth = brandLogosContainer.scrollWidth;
    const clientWidth = brandLogosContainer.clientWidth;

    prevButton.disabled = scrollLeft <= 0;
    nextButton.disabled = scrollLeft >= scrollWidth - clientWidth;
}

function scrollBrands(direction) {
    const brandLogosContainer = document.querySelector('.brand-logos-container');
    if (!brandLogosContainer) return;

    const scrollAmount = direction * brandLogosContainer.clientWidth;
    brandLogosContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });

    setTimeout(updateBrandSliderButtons, 300);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Initialize success stories slider
    successStoriesSlider.init();

    // Initialize brand logos slider
    const brandLogosContainer = document.querySelector('.brand-logos-container');
    const prevButton = document.querySelector('.prev-brand');
    const nextButton = document.querySelector('.next-brand');

    if (brandLogosContainer && prevButton && nextButton) {
        prevButton.addEventListener('click', () => scrollBrands(-1));
        nextButton.addEventListener('click', () => scrollBrands(1));
        brandLogosContainer.addEventListener('scroll', updateBrandSliderButtons);
        updateBrandSliderButtons();
    }

    // Handle mobile menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Initialize Lucide icons
    lucide.createIcons();

    // Handle discover tabs
    const tabs = document.querySelectorAll('.discover-tab');
    const grids = document.querySelectorAll('.discover-grid');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            // Remove active class from all tabs and grids
            tabs.forEach(t => t.classList.remove('active'));
            grids.forEach(grid => grid.classList.remove('active'));

            // Add active class to clicked tab and corresponding grid
            tab.classList.add('active');
            document.getElementById(`${target}-models`).classList.add('active');
    });
});

    // Initialize first tab
    if (tabs.length > 0) {
        tabs[0].click();
    }
});



