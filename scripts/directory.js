// Filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dropdownPanels = document.querySelectorAll('.dropdown-panel');

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const panel = button.nextElementSibling;
            
            // Close other dropdowns
            dropdownPanels.forEach(p => {
                if (p !== panel) {
                    p.classList.remove('active');
                }
            });

            // Toggle current dropdown
            panel.classList.toggle('active');
            e.stopPropagation();
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-wrapper')) {
            dropdownPanels.forEach(panel => {
                panel.classList.remove('active');
            });
        }
    });

    // Handle dropdown search
    const searchInputs = document.querySelectorAll('.dropdown-search input');
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const options = input.closest('.dropdown-panel').querySelectorAll('.dropdown-option');

            options.forEach(option => {
                const text = option.querySelector('span').textContent.toLowerCase();
                option.style.display = text.includes(searchTerm) ? 'flex' : 'none';
            });
        });
    });

    // Handle radio button selections
    const radioButtons = document.querySelectorAll('.dropdown-option input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const option = e.target.closest('.dropdown-option');
            const filterBtn = option.closest('.dropdown-panel').previousElementSibling;
            const label = option.querySelector('span').textContent;

            // Update button text
            filterBtn.querySelector('span').textContent = label;
            
            // Close dropdown
            option.closest('.dropdown-panel').classList.remove('active');

            // Trigger filter update
            updateFilters();
        });
    });
});

// Function to update filtered results
function updateFilters() {
    const selectedFilters = {
        type: document.querySelector('input[name="type"]:checked')?.value,
        country: document.querySelector('input[name="country"]:checked')?.value,
        city: document.querySelector('input[name="city"]:checked')?.value,
        editorsPick: document.querySelector('input[name="editors-pick"]:checked')?.value
    };

    // Add your filtering logic here
    console.log('Selected filters:', selectedFilters);
    
    // Example: Filter directory items based on selected filters
    const directoryItems = document.querySelectorAll('.directory-item');
    directoryItems.forEach(item => {
        const matchesType = !selectedFilters.type || item.dataset.type === selectedFilters.type;
        const matchesCountry = !selectedFilters.country || item.dataset.country === selectedFilters.country;
        const matchesCity = !selectedFilters.city || item.dataset.city === selectedFilters.city;
        const matchesEditorsPick = !selectedFilters.editorsPick || item.dataset.editorsPick === selectedFilters.editorsPick;

        item.style.display = (matchesType && matchesCountry && matchesCity && matchesEditorsPick) ? 'block' : 'none';
    });
} 