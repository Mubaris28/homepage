// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const dropdownPanels = document.querySelectorAll('.dropdown-panel');
const searchInputs = document.querySelectorAll('.dropdown-search input');
const dropdownOptions = document.querySelectorAll('.dropdown-option');

// State
let activeFilters = {
    type: null,
    country: null,
    city: null
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    handleClickOutside();
});

// Initialize filter buttons
function initializeFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filterType = button.dataset.filter;
            const dropdownPanel = button.nextElementSibling;
            
            // Close other dropdowns
            dropdownPanels.forEach(panel => {
                if (panel !== dropdownPanel) {
                    panel.classList.remove('show');
                }
            });

            // Toggle current dropdown
            dropdownPanel.classList.toggle('show');
            e.stopPropagation();
        });
    });
}

// Handle clicks outside dropdowns
function handleClickOutside() {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-wrapper')) {
            dropdownPanels.forEach(panel => {
                panel.classList.remove('show');
            });
        }
    });
}

// Search functionality
searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const dropdownPanel = input.closest('.dropdown-panel');
        const options = dropdownPanel.querySelectorAll('.dropdown-option');

        options.forEach(option => {
            const text = option.querySelector('span').textContent.toLowerCase();
            option.style.display = text.includes(searchValue) ? 'flex' : 'none';
        });
    });
});

// Handle option selection
dropdownOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        const filterType = option.closest('.dropdown-panel').dataset.filter;
        const value = option.querySelector('span').textContent;
        const radio = option.querySelector('input[type="radio"]');
        const filterBtn = document.querySelector(`[data-filter="${filterType}"]`);

        // Update radio selection
        const options = option.closest('.dropdown-options').querySelectorAll('input[type="radio"]');
        options.forEach(opt => opt.checked = false);
        radio.checked = true;

        // Update filter button text and state
        filterBtn.querySelector('span').textContent = value;
        filterBtn.classList.add('active');
        activeFilters[filterType] = value;

        // Close dropdown
        option.closest('.dropdown-panel').classList.remove('show');

        // Apply filters
        applyFilters();
    });
});

// Apply filters to marketplace items
function applyFilters() {
    const items = document.querySelectorAll('.marketplace-card');
    
    items.forEach(item => {
        const itemType = item.dataset.type;
        const itemCountry = item.dataset.country;
        const itemCity = item.dataset.city;
        
        const typeMatch = !activeFilters.type || activeFilters.type === itemType;
        const countryMatch = !activeFilters.country || activeFilters.country === itemCountry;
        const cityMatch = !activeFilters.city || activeFilters.city === itemCity;
        
        item.style.display = typeMatch && countryMatch && cityMatch ? 'block' : 'none';
    });
}

// Clear filter
function clearFilter(filterType) {
    const filterBtn = document.querySelector(`[data-filter="${filterType}"]`);
    const defaultText = filterBtn.dataset.default;
    
    filterBtn.querySelector('span').textContent = defaultText;
    filterBtn.classList.remove('active');
    activeFilters[filterType] = null;
    
    // Clear radio selection
    const options = document.querySelector(`[data-filter="${filterType}"]`)
        .nextElementSibling
        .querySelectorAll('input[type="radio"]');
    options.forEach(opt => opt.checked = false);
    
    applyFilters();
}

// Post Offer Button Animation
const postOfferBtn = document.querySelector('.post-offer-btn');
if (postOfferBtn) {
    postOfferBtn.addEventListener('mouseenter', () => {
        postOfferBtn.style.transform = 'translateY(-2px)';
    });
    
    postOfferBtn.addEventListener('mouseleave', () => {
        postOfferBtn.style.transform = 'translateY(0)';
    });
}

// Lazy loading for marketplace images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('.card-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}); 