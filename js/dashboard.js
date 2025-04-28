document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard state
    let dashboardState = {
        notifications: [],
        messages: [],
        bookings: [],
        profileCompletion: 17,
        isPremium: false
    };

    // Sample casting data
    const castings = [
        {
            image: 'images/casting1.jpg',
            title: 'Fashion Model Needed',
            location: 'New York',
            payment: '$500-1000',
            date: '2024-03-20'
        },
        {
            image: 'images/casting2.jpg',
            title: 'Commercial Shoot',
            location: 'Los Angeles',
            payment: '$800-1500',
            date: '2024-03-22'
        },
        {
            image: 'images/casting3.jpg',
            title: 'Runway Show',
            location: 'Paris',
            payment: '€1000-2000',
            date: '2024-03-25'
        },
        {
            image: 'images/casting4.jpg',
            title: 'Print Campaign',
            location: 'London',
            payment: '£700-1200',
            date: '2024-03-28'
        },
        {
            image: 'images/casting5.jpg',
            title: 'TV Commercial',
            location: 'Miami',
            payment: '$1500-3000',
            date: '2024-04-01'
        }
    ];

    // Profile completion steps
    const profileSteps = {
        email: true,
        profilePhoto: false,
        bio: false,
        phoneVerification: false,
        instagram: false,
        additionalPhotos: false
    };

    // Initialize notifications
    function initializeNotifications() {
        // Check for new notifications every 30 seconds
        setInterval(checkNewNotifications, 30000);
    }

    // Update profile completion
    function updateProfileCompletion() {
        const completedSteps = Object.values(profileSteps).filter(step => step).length;
        const totalSteps = Object.keys(profileSteps).length;
        dashboardState.profileCompletion = Math.round((completedSteps / totalSteps) * 100);
        
        // Update progress bar
        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            progressBar.style.width = `${dashboardState.profileCompletion}%`;
        }
    }

    // Populate recent castings with enhanced functionality
    function populateRecentCastings() {
        const castingGrid = document.querySelector('.casting-grid');
        if (castingGrid) {
            castingGrid.innerHTML = ''; // Clear existing content
            castings.forEach(casting => {
                const castingCard = document.createElement('div');
                castingCard.className = 'casting-card';
                castingCard.innerHTML = `
                    <img src="${casting.image}" alt="${casting.title}">
                    <div class="casting-details">
                        <h4>${casting.title}</h4>
                        <p class="location"><i class="fas fa-map-marker-alt"></i> ${casting.location}</p>
                        <p class="payment"><i class="fas fa-money-bill-wave"></i> ${casting.payment}</p>
                        <p class="date"><i class="fas fa-calendar"></i> ${casting.date}</p>
                        <button class="apply-btn">Apply Now</button>
                    </div>
                `;
                
                // Add click event for the apply button
                const applyBtn = castingCard.querySelector('.apply-btn');
                applyBtn.addEventListener('click', () => handleCastingApplication(casting));
                
                castingGrid.appendChild(castingCard);
            });
        }
    }

    // Handle casting application
    function handleCastingApplication(casting) {
        if (!dashboardState.isPremium) {
            showUpgradePrompt();
            return;
        }
        
        // Add application logic here
        alert(`Applied for: ${casting.title} in ${casting.location}`);
    }

    // Show upgrade prompt
    function showUpgradePrompt() {
        const popup = document.createElement('div');
        popup.className = 'upgrade-popup';
        popup.innerHTML = `
            <div class="upgrade-content">
                <h3>Upgrade to Premium</h3>
                <p>Upgrade your account to apply for castings and unlock more features!</p>
                <button class="upgrade-now-btn">Upgrade Now</button>
                <button class="close-popup-btn">Maybe Later</button>
            </div>
        `;
        document.body.appendChild(popup);

        // Handle popup buttons
        popup.querySelector('.upgrade-now-btn').addEventListener('click', handleUpgrade);
        popup.querySelector('.close-popup-btn').addEventListener('click', () => popup.remove());
    }

    // Handle upgrade
    function handleUpgrade() {
        // Add upgrade logic here
        dashboardState.isPremium = true;
        // Update UI to reflect premium status
        document.querySelectorAll('.premium-only').forEach(elem => elem.classList.remove('premium-only'));
    }

    // Initialize sidebar navigation
    function initializeSidebarNav() {
        const navItems = document.querySelectorAll('.sidebar-nav a');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                updateMainContent(item.getAttribute('href').substring(1));
            });
        });
    }

    // Update main content based on navigation
    function updateMainContent(section) {
        // Add logic to update main content based on selected section
        console.log(`Navigating to ${section}`);
    }

    // Initialize dashboard
    function initializeDashboard() {
        initializeNotifications();
        updateProfileCompletion();
        populateRecentCastings();
        initializeSidebarNav();

        // Add event listeners for action buttons
        document.querySelectorAll('.action-buttons button').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.closest('button').classList.contains('see-castings') ? 
                    'castings' : 'photos';
                handleActionButton(action);
            });
        });
    }

    // Handle action button clicks
    function handleActionButton(action) {
        if (action === 'castings') {
            window.location.href = 'castings.html';
        } else {
            window.location.href = 'upload-photos.html';
        }
    }

    // Add CSS styles for new elements
    const style = document.createElement('style');
    style.textContent = `
        .casting-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }

        .casting-card:hover {
            transform: translateY(-5px);
        }

        .casting-card img {
            width: 100%;
            height: 150px;
            object-fit: cover;
        }

        .casting-details {
            padding: 15px;
        }

        .casting-details h4 {
            margin: 0 0 10px 0;
            font-size: 16px;
        }

        .casting-details p {
            margin: 5px 0;
            font-size: 14px;
            color: #666;
        }

        .casting-details i {
            margin-right: 5px;
            width: 16px;
        }

        .apply-btn {
            width: 100%;
            padding: 8px;
            margin-top: 10px;
            background: #000;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .apply-btn:hover {
            background: #333;
        }

        .upgrade-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .upgrade-content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        }

        .upgrade-content h3 {
            margin-bottom: 15px;
        }

        .upgrade-content button {
            margin: 10px;
            padding: 8px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .upgrade-now-btn {
            background: #000;
            color: white;
        }

        .close-popup-btn {
            background: #eee;
            color: #333;
        }

        .premium-only {
            position: relative;
            overflow: hidden;
        }

        .premium-only::after {
            content: 'Premium Only';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);

    // Initialize the dashboard
    initializeDashboard();
}); 