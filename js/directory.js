document.addEventListener('DOMContentLoaded', function() {
    // Handle dropdowns
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dropdownPanels = document.querySelectorAll('.dropdown-panel');
    let activeDropdown = null;

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.filter-wrapper')) {
            closeAllDropdowns();
        }
    });

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            
            if (activeDropdown && activeDropdown !== dropdown) {
                activeDropdown.classList.remove('show');
            }

            dropdown.classList.toggle('show');
            activeDropdown = dropdown.classList.contains('show') ? dropdown : null;
            
            // Toggle active state on button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            if (activeDropdown) {
                this.classList.add('active');
            }
        });
    });

    // Handle dropdown option selection
    const dropdownOptions = document.querySelectorAll('.dropdown-option');
    dropdownOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const radio = this.querySelector('input[type="radio"]');
            const filterBtn = this.closest('.filter-wrapper').querySelector('.filter-btn span');
            const dropdown = this.closest('.dropdown-panel');
            
            // Update button text
            filterBtn.textContent = this.querySelector('span').textContent;
            
            // Close dropdown
            dropdown.classList.remove('show');
            dropdown.previousElementSibling.classList.remove('active');
            
            // Handle the filter change
            handleFilterChange(radio.name, radio.value);
        });
    });

    // Handle search in dropdowns
    const searchInputs = document.querySelectorAll('.dropdown-search input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const searchTerm = this.value.toLowerCase();
            const options = this.closest('.dropdown-panel').querySelectorAll('.dropdown-option');
            
            options.forEach(option => {
                const text = option.querySelector('span').textContent.toLowerCase();
                option.style.display = text.includes(searchTerm) ? 'flex' : 'none';
            });
        });

        // Prevent dropdown from closing when clicking on search input
        input.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Handle favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.style.backgroundColor = '#000000';
                this.style.color = '#ffffff';
                this.textContent = '♥';
            } else {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                this.style.color = '#000000';
                this.textContent = '♡';
            }
        });
    });

    // Handle "Want to be listed?" button
    const listingButton = document.querySelector('.listing-btn');
    if (listingButton) {
        listingButton.addEventListener('click', function() {
            // Add your listing functionality here
            console.log('Want to be listed button clicked');
        });
    }

    // Helper functions
    function closeAllDropdowns() {
        dropdownPanels.forEach(dropdown => dropdown.classList.remove('show'));
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeDropdown = null;
    }

    function handleFilterChange(filterName, value) {
        // Add filter functionality here
        console.log(`Filter ${filterName} changed to: ${value}`);
        // You can implement the actual filtering logic here
    }
}); 