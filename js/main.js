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

    brandLogosContainer.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
    });

    setTimeout(() => {
        isScrolling = false;
        updateSliderButtons();
    }, 300);
}

// Touch events for mobile swipe
function handleTouchStart(e) {
    startX = e.touches[0].pageX - brandLogosContainer.offsetLeft;
    scrollLeft = brandLogosContainer.scrollLeft;
}

function handleTouchMove(e) {
    if (!startX) return;

    const x = e.touches[0].pageX - brandLogosContainer.offsetLeft;
    const walk = (x - startX) * 2;
    brandLogosContainer.scrollLeft = scrollLeft - walk;
}

function handleTouchEnd() {
    startX = null;
    updateSliderButtons();
}

if (brandLogosContainer) {
    // Initialize buttons state
    updateSliderButtons();

    // Click events
    prevBrandBtn?.addEventListener('click', () => scrollBrands('prev'));
    nextBrandBtn?.addEventListener('click', () => scrollBrands('next'));

    // Touch events
    brandLogosContainer.addEventListener('touchstart', handleTouchStart);
    brandLogosContainer.addEventListener('touchmove', handleTouchMove);
    brandLogosContainer.addEventListener('touchend', handleTouchEnd);

    // Scroll event for updating buttons
    brandLogosContainer.addEventListener('scroll', updateSliderButtons);
}

// Image Loading Optimization
function handleImageLoad(img) {
    img.classList.add('loaded');
    if (img.parentElement.classList.contains('hero-grid-item')) {
        img.parentElement.classList.add('loaded');
    }
}

document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        handleImageLoad(img);
    } else {
        img.addEventListener('load', () => handleImageLoad(img));
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Success Stories Slider
const slides = [
    {
        image: 'images/models/hero-1.jpeg', // Using hero images as fallback
        quote: 'ModelHub helped me land my first major campaign with a leading fashion brand.',
        author: 'Sarah Johnson, Model'
    },
    {
        image: 'images/models/hero-2.jpeg',
        quote: 'The platform made it easy to connect with top agencies and build my portfolio.',
        author: 'Michael Chen, Photographer'
    },
    {
        image: 'images/models/hero-3.jpeg',
        quote: 'As an agency, we found amazing talent through ModelHub that exceeded our expectations.',
        author: 'Emma Roberts, Agency Director'
    }
];

let currentSlide = 0;

function updateSlider() {
    const slider = document.querySelector('.story-slider');
    const slide = slides[currentSlide];

    if (slider) {
        const slideHTML = `
            <div class="story-slide fade-in">
                <div class="story-content">
                    <img src="${slide.image}" alt="Success Story" loading="lazy" onerror="this.src='images/models/hero-1.jpeg'">
                    <div class="story-text">
                        <blockquote>${slide.quote}</blockquote>
                        <cite>- ${slide.author}</cite>
                    </div>
                </div>
            </div>
        `;

        slider.innerHTML = slideHTML;
    }
}

// Initialize slider and controls
document.addEventListener('DOMContentLoaded', () => {
    updateSlider();

    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });

        // Auto-rotate slider
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle missing images
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function () {
            // Use hero-1.jpeg as fallback for model images
            if (this.src.includes('model-')) {
                this.src = 'images/models/hero-1.jpeg';
            }
            // Use adidas.png as fallback for brand logos
            else if (this.src.includes('brands/')) {
                this.src = 'images/brands/adidas.png';
            }
        };
    });

    // Update Stats Section Title
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const title = document.createElement('h2');
        title.textContent = 'Community';
        statsSection.insertBefore(title, statsSection.firstChild);
    }
});

// Navigation Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    lucide.createIcons();

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Language Toggle (placeholder functionality)
    // const langToggle = document.querySelector('.lang-toggle');
    // langToggle.addEventListener('click', () => {
    //     // Add your language switching logic here
    //     console.log('Language toggle clicked');
    // });

    // Active Link Handling
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .bottom-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');

            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Bottom Navigation
    const bottomNav = document.querySelector('.bottom-nav');
    const bottomNavLinks = document.querySelectorAll('.bottom-nav-link');

    // Show/hide bottom navigation based on scroll position
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            if (bottomNav) bottomNav.style.transform = 'translateY(60px)';
        } else {
            // Scrolling up
            if (bottomNav) bottomNav.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Active state for bottom navigation links
    if (bottomNavLinks.length > 0) {
        bottomNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                bottomNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    if (mobileNavLinks.length > 0) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger) hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                if (body) body.classList.remove('menu-open');
            });
        });
    }

    // Initialize bottom navigation visibility
    if (bottomNav) {
        bottomNav.style.transform = 'translateY(0)';
    }

    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Split Text Animation
    const titles = document.querySelectorAll('.split-text');
    titles.forEach(title => {
        const text = title.textContent;
        const chars = text.split('');
        title.textContent = '';
        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * 0.05}s`;
            title.appendChild(span);
        });
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        // Initial setup
        cursor.classList.add('active');
        
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
        });

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .hero-btn, .model-card, .case-study-card, .category-card, .nav-link, input, .scroll-indicator');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Handle cursor visibility when leaving/entering window
        document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
        document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
    } else if (cursor) {
        // Hide cursor on touch devices
        cursor.style.display = 'none';
    }

    // Hero Split Hover Effects (only for desktop)
    const heroHalves = document.querySelectorAll('.hero-half');

    if (window.matchMedia('(hover: hover)').matches) {
        heroHalves.forEach(half => {
            half.addEventListener('mouseenter', () => {
                heroHalves.forEach(h => {
                    if (h !== half) {
                        h.style.flex = '0.8';
                    }
                });
            });

            half.addEventListener('mouseleave', () => {
                heroHalves.forEach(h => {
                    h.style.flex = '1';
                });
            });
        });
    }

    // Navigation for hero halves
    heroHalves.forEach(half => {
        half.addEventListener('click', () => {
            const isModel = half.classList.contains('models');
            if (isModel) {
                console.log('Navigate to models section');
            } else {
                console.log('Navigate to professionals section');
            }
        });
    });

    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Button hover effect (only for desktop)
    if (window.matchMedia('(hover: hover)').matches) {
        const buttons = document.querySelectorAll('.hero-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                button.style.setProperty('--x', x + 'px');
                button.style.setProperty('--y', y + 'px');
            });
        });
    }
});

// Category Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryScroll = document.querySelector('.category-scroll');
    const categoryGrid = document.querySelector('.category-grid');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Initialize
    function init() {
        if (window.innerWidth <= 768) {
            setupMobileSlider();
        } else {
            setupDesktopSlider();
        }
    }

    // Mobile Slider Setup
    function setupMobileSlider() {
        const cards = document.querySelectorAll('.category-card');
        const cardWidth = cards[0].offsetWidth;
        const totalSlides = cards.length;

        // Touch Events
        categoryScroll.addEventListener('touchstart', touchStart);
        categoryScroll.addEventListener('touchmove', touchMove);
        categoryScroll.addEventListener('touchend', touchEnd);

        // Update dots on scroll
        categoryScroll.addEventListener('scroll', () => {
            const scrollPosition = categoryScroll.scrollLeft;
            const cardWidth = categoryScroll.offsetWidth * 0.85; // 85% of container width
            currentSlide = Math.round(scrollPosition / cardWidth);
            updateDots();
        });

        // Dot Navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const cardWidth = categoryScroll.offsetWidth * 0.85;
                categoryScroll.scrollTo({
                    left: cardWidth * index,
                    behavior: 'smooth'
                });
                currentSlide = index;
                updateDots();
            });
        });
    }

    // Desktop Slider Setup
    function setupDesktopSlider() {
        if (!prevBtn || !nextBtn) return;

        prevBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.category-card');
            const cardWidth = cards[0].offsetWidth;
            categoryScroll.scrollBy({
                left: -cardWidth * 3,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.category-card');
            const cardWidth = cards[0].offsetWidth;
            categoryScroll.scrollBy({
                left: cardWidth * 3,
                behavior: 'smooth'
            });
        });
    }

    // Touch Event Handlers
    function touchStart(event) {
        startPos = event.touches[0].clientX;
        isDragging = true;
        categoryScroll.style.cursor = 'grabbing';
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = event.touches[0].clientX;
        const diff = startPos - currentPosition;
        categoryScroll.scrollLeft += diff;
        startPos = currentPosition;
    }

    function touchEnd() {
        isDragging = false;
        categoryScroll.style.cursor = 'grab';
    }

    // Update Dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Handle Resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(init, 250);
    });

    // Initialize the slider
    init();
});

// Brand Logos Carousel
document.addEventListener('DOMContentLoaded', () => {
    const brandLogosWrapper = document.querySelector('.brand-logos-wrapper');
    const prevButton = document.querySelector('.prev-brand');
    const nextButton = document.querySelector('.next-brand');
    
    if (!brandLogosWrapper || !prevButton || !nextButton) return;

    let currentPosition = 0;
    const step = 120 + 32; // logo width + gap
    const maxScroll = brandLogosWrapper.scrollWidth - brandLogosWrapper.clientWidth;

    function updateButtonStates() {
        prevButton.style.opacity = currentPosition <= 0 ? '0.5' : '1';
        nextButton.style.opacity = currentPosition >= maxScroll ? '0.5' : '1';
    }

    function scroll(direction) {
        if (direction === 'prev' && currentPosition > 0) {
            currentPosition = Math.max(0, currentPosition - step);
        } else if (direction === 'next' && currentPosition < maxScroll) {
            currentPosition = Math.min(maxScroll, currentPosition + step);
        }
        
        brandLogosWrapper.style.transform = `translateX(-${currentPosition}px)`;
        updateButtonStates();
    }

    prevButton.addEventListener('click', () => scroll('prev'));
    nextButton.addEventListener('click', () => scroll('next'));

    // Touch and drag functionality
    let isDragging = false;
    let startX;
    let scrollLeft;

    brandLogosWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - brandLogosWrapper.offsetLeft;
        scrollLeft = currentPosition;
    });

    brandLogosWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    brandLogosWrapper.addEventListener('mouseup', () => {
        isDragging = false;
    });

    brandLogosWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - brandLogosWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        const newPosition = scrollLeft - walk;
        
        if (newPosition >= 0 && newPosition <= maxScroll) {
            currentPosition = newPosition;
            brandLogosWrapper.style.transform = `translateX(-${currentPosition}px)`;
            updateButtonStates();
        }
    });

    // Touch events for mobile
    brandLogosWrapper.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - brandLogosWrapper.offsetLeft;
        scrollLeft = currentPosition;
    });

    brandLogosWrapper.addEventListener('touchend', () => {
        isDragging = false;
    });

    brandLogosWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - brandLogosWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        const newPosition = scrollLeft - walk;
        
        if (newPosition >= 0 && newPosition <= maxScroll) {
            currentPosition = newPosition;
            brandLogosWrapper.style.transform = `translateX(-${currentPosition}px)`;
            updateButtonStates();
        }
    });

    // Initial button states
    updateButtonStates();
});

// Slider functionality for all carousels
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sliders
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
        const slides = slider.querySelector('.slides');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const slideItems = slides.querySelectorAll('.slide');
        
        let currentSlide = 0;
        const slideCount = slideItems.length;
        
        // Update button states
        function updateButtons() {
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentSlide === slideCount - 1 ? '0.5' : '1';
        }
        
        // Slide to specific index
        function slideTo(index) {
            if (index < 0 || index >= slideCount) return;
            
            currentSlide = index;
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateButtons();
        }
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', () => slideTo(currentSlide - 1));
        nextBtn.addEventListener('click', () => slideTo(currentSlide + 1));
        
        // Touch functionality
        let touchStartX = 0;
        let touchEndX = 0;
        
        slides.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        slides.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    slideTo(currentSlide + 1); // Swipe left
                } else {
                    slideTo(currentSlide - 1); // Swipe right
                }
            }
        }
        
        // Initialize
        updateButtons();
    });
});

// Models Page Animations
if (document.querySelector('.models-hero')) {
    // Hero Section Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.models-hero');
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });

    // Animate features on scroll
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
            },
            opacity: 0,
            x: -50,
            duration: 0.6,
            delay: index * 0.2
        });
    });

    // Animate casting cards
    const castingCards = document.querySelectorAll('.casting-card');
    castingCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2
        });
    });

    // Animate steps
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.3
        });
    });

    // Animate testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            delay: index * 0.2
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// Hero Section Animations
const heroContent = document.querySelectorAll('.hero-content');
const heroHalf = document.querySelectorAll('.hero-half');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Animate hero content on load
window.addEventListener('load', () => {
    heroContent.forEach(content => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    });
});

// Hero hover effects
heroHalf.forEach(half => {
    half.addEventListener('mouseenter', () => {
        half.querySelector('.gradient-overlay').style.opacity = '0.8';
    });

    half.addEventListener('mouseleave', () => {
        half.querySelector('.gradient-overlay').style.opacity = '1';
    });
});

// Scroll indicator animation
if (scrollIndicator) {
    const wheel = scrollIndicator.querySelector('.wheel');
    const arrows = scrollIndicator.querySelectorAll('.arrow');

    function animateScrollIndicator() {
        wheel.style.animation = 'scrollWheel 2s infinite';
        arrows.forEach((arrow, index) => {
            arrow.style.animation = `arrowDown 2s infinite ${index * 0.2}s`;
        });
    }

    animateScrollIndicator();
}

// Custom cursor
const customCursor = document.querySelector('.custom-cursor');
const heroButtons = document.querySelectorAll('.hero-btn');

if (customCursor) {
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            customCursor.classList.add('hover');
        });

        button.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hover');
        });
    });
}

// Mobile category slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryGrid = document.querySelector('.category-grid');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    if (window.innerWidth <= 768) {
        // Update active dot based on scroll position
        categoryGrid.addEventListener('scroll', () => {
            const slideWidth = categoryGrid.offsetWidth * 0.85; // 85% of container width
            currentSlide = Math.round(categoryGrid.scrollLeft / slideWidth);
            updateDots();
        });

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const slideWidth = categoryGrid.offsetWidth * 0.85;
                categoryGrid.scrollTo({
                    left: slideWidth * index,
                    behavior: 'smooth'
                });
                currentSlide = index;
                updateDots();
            });
        });
    }

    // Update active dot
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= 768) {
                updateDots();
            }
        }, 250);
    });
}); 




 

 