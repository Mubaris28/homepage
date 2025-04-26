// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
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

// Success Stories Slider
const successStoriesSlider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.story-slide'),
    
    init() {
        this.prevBtn = document.querySelector('.prev-slide');
        this.nextBtn = document.querySelector('.next-slide');
        
        if (!this.slides.length) return;
        
        this.setupEventListeners();
        this.showSlide(0);
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
        document.querySelector('.story-slider').addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        document.querySelector('.story-slider').addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                this.navigate(diff > 0 ? 1 : -1);
            }
        });
    },
    
    navigate(direction) {
        this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    },
    
    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                // Trigger fade in animation
                slide.style.opacity = '0';
                setTimeout(() => {
                    slide.style.opacity = '1';
                }, 50);
            }
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
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
            grids.forEach(grid => {
                grid.classList.remove('active');
                grid.style.display = 'none';
            });
            
            // Add active class to clicked tab and corresponding grid
            tab.classList.add('active');
            const targetGrid = document.getElementById(`${target}-models`);
            if (targetGrid) {
                targetGrid.classList.add('active');
                targetGrid.style.display = 'grid';
            }
        });
    });

    // Initialize first tab
    if (tabs.length > 0) {
        tabs[0].click();
    }
});

