document.addEventListener('DOMContentLoaded', function() {
    // Help tooltip functionality
    const helpBtn = document.querySelector('.help-btn');
    const helpTooltip = document.querySelector('.help-tooltip');

    if (helpBtn && helpTooltip) {
        // Show tooltip on hover
        helpBtn.addEventListener('mouseenter', () => {
            helpTooltip.style.display = 'block';
        });

        // Hide tooltip when mouse leaves
        helpBtn.addEventListener('mouseleave', () => {
            helpTooltip.style.display = 'none';
        });

        // Position tooltip
        function positionTooltip() {
            const btnRect = helpBtn.getBoundingClientRect();
            const tooltipRect = helpTooltip.getBoundingClientRect();
            
            // Center tooltip horizontally
            const left = btnRect.left + (btnRect.width / 2) - (tooltipRect.width / 2);
            
            // Position above the button with some spacing
            const top = btnRect.top - tooltipRect.height - 10;

            // Ensure tooltip stays within viewport
            const viewportWidth = window.innerWidth;
            const finalLeft = Math.max(10, Math.min(left, viewportWidth - tooltipRect.width - 10));

            helpTooltip.style.left = `${finalLeft}px`;
            helpTooltip.style.top = `${top}px`;
        }

        // Update tooltip position on window resize
        window.addEventListener('resize', positionTooltip);
    }

    // Buy button click handler
    const buyBtn = document.querySelector('.buy-btn');
    if (buyBtn) {
        buyBtn.addEventListener('click', (e) => {
            // Check if user is logged in (you'll need to implement this check)
            const isLoggedIn = false; // Replace with actual login check

            if (!isLoggedIn) {
                e.preventDefault();
                // Store the current page URL to redirect back after login
                sessionStorage.setItem('redirectAfterLogin', window.location.href);
                window.location.href = 'signup.html';
            }
        });
    }

    // Image zoom functionality
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
        let isZoomed = false;
        let originalTransform = '';

        mainImage.addEventListener('click', () => {
            if (!isZoomed) {
                // Save original transform
                originalTransform = mainImage.style.transform;
                
                // Apply zoom effect
                mainImage.style.transform = 'scale(1.5)';
                mainImage.style.cursor = 'zoom-out';
                mainImage.style.transition = 'transform 0.3s ease';
                
                isZoomed = true;
            } else {
                // Restore original state
                mainImage.style.transform = originalTransform;
                mainImage.style.cursor = 'zoom-in';
                
                isZoomed = false;
            }
        });

        // Reset zoom when mouse leaves image
        mainImage.addEventListener('mouseleave', () => {
            if (isZoomed) {
                mainImage.style.transform = originalTransform;
                mainImage.style.cursor = 'zoom-in';
                isZoomed = false;
            }
        });
    }

    // Price animation
    const priceElement = document.querySelector('.current-price .amount');
    if (priceElement) {
        // Add hover effect
        priceElement.addEventListener('mouseenter', () => {
            priceElement.style.transform = 'scale(1.1)';
            priceElement.style.transition = 'transform 0.2s ease';
        });

        priceElement.addEventListener('mouseleave', () => {
            priceElement.style.transform = 'scale(1)';
        });
    }

    // Countdown timer for offer expiration
    const dateElement = document.querySelector('.offer-meta .date');
    if (dateElement) {
        const endDate = new Date('December 31, 2025').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = endDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            if (distance > 0) {
                dateElement.textContent = `Offer ends in ${days}d ${hours}h ${minutes}m`;
            } else {
                dateElement.textContent = 'Offer has ended';
                clearInterval(countdownInterval);
            }
        }

        const countdownInterval = setInterval(updateCountdown, 60000); // Update every minute
        updateCountdown(); // Initial update
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabName = button.getAttribute('data-tab');
            document.querySelector(`.tab-content.${tabName}`).classList.add('active');
        });
    });

    // Image gallery functionality
    const mainImageGallery = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-strip img');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    let currentImageIndex = 0;

    // Create array of image sources
    const imageSources = Array.from(thumbnails).map(thumb => thumb.src);

    // Function to update main image with fade effect
    function updateMainImage(index) {
        mainImageGallery.style.opacity = '0';
        setTimeout(() => {
            mainImageGallery.src = imageSources[index];
            mainImageGallery.style.opacity = '1';
        }, 200);

        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
    }

    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
        updateMainImage(currentImageIndex);
    });

    // Next button click handler
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % imageSources.length;
        updateMainImage(currentImageIndex);
    });

    // Thumbnail click handlers
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateMainImage(currentImageIndex);
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Save for later functionality
    const saveButton = document.querySelector('.btn-secondary');
    saveButton.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.color = '#ff385c';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.color = '#333';
        }
    });
}); 