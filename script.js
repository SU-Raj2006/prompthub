// --- 1. Navbar Toggle (Mobile) ---
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      dropdownItem = document.getElementById('category-dropdown');

// Open Menu
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

// Close Menu via X button
if(navClose){
    navClose.addEventListener('click', () => {
        closeMobileMenu();
    });
}

// --- 2. Dropdown Logic (Mobile) ---
if (dropdownItem) {
    dropdownItem.addEventListener('click', function(e) {
        // Only trigger JS toggle on mobile widths
        if(window.innerWidth < 768) {
            this.classList.toggle('show-dropdown');
        }
    });
}

// --- Helper Function to Fully Close Menu ---
function closeMobileMenu() {
    if(navMenu && navMenu.classList.contains('show')){
        navMenu.classList.remove('show');
    }
    // Also reset the dropdown state so it's closed next time
    if(dropdownItem && dropdownItem.classList.contains('show-dropdown')) {
        dropdownItem.classList.remove('show-dropdown');
    }
}

// --- 3. Tab Routing / Navigation Logic ---
const navLinks = document.querySelectorAll('.nav__link[data-target]');
const sections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active to clicked link
        this.classList.add('active');
        
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active-content');
        });
        
        // Show targeted section
        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-content');
        }

        // FIX: Force close the mobile menu after clicking a link
        closeMobileMenu();
    });
});

// --- 4. Copy to Clipboard Functionality ---
const copyBtns = document.querySelectorAll('.copy-btn');
const toastContainer = document.getElementById('toast-container');

copyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Find the text within the same card
        const promptTextDiv = this.parentElement.querySelector('.prompt-text');
        
        if (promptTextDiv) {
            const textToCopy = promptTextDiv.innerText.trim();

            // Clipboard API
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback on button
                const originalHTML = this.innerHTML;
                this.innerHTML = "<i class='bx bx-check'></i> Copied!";
                this.classList.add('copied');

                // Show Toast
                showToast();

                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    });
});

// Toast generation logic
function showToast() {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<i class='bx bx-check-circle'></i> <span>Prompt copied to clipboard!</span>`;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // Wait for transition to finish
    }, 3000);
}