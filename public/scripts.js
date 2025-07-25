// Smooth scrolling for navigation links
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

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Download validation scripts
async function downloadScript(scriptType) {
    let filename = '';
    let scriptPath = '';
    
    switch(scriptType) {
        case 'field-names':
            filename = 'validate-field-names.js';
            scriptPath = '/validation-scripts/validate-field-names.js';
            break;
            
        case 'product-structure':
            filename = 'validate-product-structure.js';
            scriptPath = '/validation-scripts/validate-product-structure.js';
            break;
            
        case 'verification':
            filename = 'validate-verification-pattern.js';
            scriptPath = '/validation-scripts/validate-verification-pattern.js';
            break;
    }
    
    try {
        // Fetch the actual script file
        const response = await fetch(scriptPath);
        const content = await response.text();
        
        // Create and download file
        const blob = new Blob([content], { type: 'text/javascript' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading script:', error);
        alert('Unable to download script. Please try again.');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add active class to nav
    const style = document.createElement('style');
    style.textContent = `
        .main-nav a.active {
            color: var(--primary-color);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
    
    // Animate metrics on scroll
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.metric-value').forEach(el => {
        observer.observe(el);
    });
});

// Add animation styles
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .metric-value {
        transition: transform 0.3s ease-out;
    }
    
    .metric-value.animate {
        animation: popIn 0.5s ease-out;
    }
    
    @keyframes popIn {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(animationStyle);