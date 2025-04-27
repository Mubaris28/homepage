document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');

    // Form validation
    function validateField(field) {
        if (!field.value.trim()) {
            field.classList.add('error');
            return false;
        }
        field.classList.remove('error');
        return true;
    }

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validate all required fields
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
            if (field.type === 'email' && !validateEmail(field.value)) {
                field.classList.add('error');
                isValid = false;
            }
        });

        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert('Please complete the reCAPTCHA verification');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Prepare form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Send form data to server (replace with your actual endpoint)
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Show success message
                form.innerHTML = `
                    <div class="success-message">
                        <h2>Thank you for your message!</h2>
                        <p>We will get back to you as soon as possible.</p>
                    </div>
                `;
            } else {
                throw new Error('Server response was not ok');
            }
        } catch (error) {
            // Show error message
            alert('There was a problem submitting your form. Please try again later.');
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Real-time validation
    requiredFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    // Special handling for email field
    const emailField = form.querySelector('input[type="email"]');
    if (emailField) {
        emailField.addEventListener('blur', () => {
            if (emailField.value && !validateEmail(emailField.value)) {
                emailField.classList.add('error');
            }
        });
    }
}); 