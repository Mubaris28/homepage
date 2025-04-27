document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const tabName = button.getAttribute('data-tab');
            document.querySelector(`.tab-content.${tabName}`).classList.add('active');
        });
    });

    // Image Gallery Slider functionality
    const mainImage = document.querySelector('.gallery-main img');
    const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
    const prevBtn = document.querySelector('.gallery-nav .prev');
    const nextBtn = document.querySelector('.gallery-nav .next');
    let currentImageIndex = 0;

    // Create array of image sources
    const imageSources = Array.from(thumbnails).map(thumb => thumb.src);

    // Function to update main image
    function updateMainImage(index) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = imageSources[index];
            mainImage.style.opacity = '1';
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

    // Set first thumbnail as active initially
    thumbnails[0].classList.add('active');

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Portfolio grid loading
    const portfolioGrid = document.querySelector('.portfolio-grid');
    let page = 1;
    let loading = false;

    async function loadPortfolioImages() {
        if (loading) return;
        loading = true;

        try {
            // Simulate API call to load more images
            // Replace with actual API endpoint
            const response = await fetch(`/api/portfolio-images?page=${page}`);
            const data = await response.json();

            data.images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.url;
                imgElement.alt = image.description;
                imgElement.classList.add('portfolio-image');
                portfolioGrid.appendChild(imgElement);
            });

            page++;
            loading = false;
        } catch (error) {
            console.error('Error loading portfolio images:', error);
            loading = false;
        }
    }

    // Infinite scroll for portfolio images
    function handleScroll() {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadPortfolioImages();
        }
    }

    // Only add scroll listener when portfolio tab is active
    document.querySelector('.tab-btn').addEventListener('click', function(e) {
        if (e.target.textContent.toLowerCase() === 'portfolio') {
            window.addEventListener('scroll', handleScroll);
        } else {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    // Initial load of portfolio images
    loadPortfolioImages();
}); 