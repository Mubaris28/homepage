document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.querySelector('.upload-btn');
    const continueBtn = document.querySelector('.continue-btn');
    const skipLink = document.querySelector('.skip-link');
    const welcomePopup = document.getElementById('welcomePopup');
    const closePopupBtn = document.querySelector('.close-btn');
    const seeCastingsBtn = document.querySelector('.see-castings-btn');
    let uploadedPhotos = [];

    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Handle upload button click
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        uploadedPhotos = uploadedPhotos.concat(files);
        
        // Enable continue button if at least 3 photos are uploaded
        if (uploadedPhotos.length >= 3) {
            continueBtn.disabled = false;
        }

        // Preview logic would go here
        console.log(`${uploadedPhotos.length} photos selected`);
    });

    // Handle continue button click
    continueBtn.addEventListener('click', () => {
        if (uploadedPhotos.length >= 3) {
            showWelcomePopup();
        }
    });

    // Handle skip link click
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        showWelcomePopup();
    });

    // Show welcome popup
    function showWelcomePopup() {
        welcomePopup.classList.add('show');
    }

    // Hide welcome popup
    function hideWelcomePopup() {
        welcomePopup.classList.remove('show');
    }

    // Close popup when clicking the close button
    closePopupBtn.addEventListener('click', hideWelcomePopup);

    // Close popup when clicking outside
    welcomePopup.addEventListener('click', (e) => {
        if (e.target === welcomePopup) {
            hideWelcomePopup();
        }
    });

    // Handle see castings button click
    seeCastingsBtn.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });

    // Handle drag and drop
    const uploadArea = document.querySelector('.upload-area');

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = '#f5f5f5';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.backgroundColor = '';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = '';
        
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        uploadedPhotos = uploadedPhotos.concat(files);
        
        if (uploadedPhotos.length >= 3) {
            continueBtn.disabled = false;
        }

        // Preview logic would go here
        console.log(`${uploadedPhotos.length} photos selected`);
    });
}); 