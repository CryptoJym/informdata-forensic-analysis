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
function downloadScript(scriptType) {
    let content = '';
    let filename = '';
    
    switch(scriptType) {
        case 'field-names':
            filename = 'validate-field-names.js';
            content = `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const INCORRECT_PATTERNS = {
    PascalCase: /\\b(FirstName|LastName|MiddleName|Birthdate|DriversLicenseNumber)\\b/g,
    snake_case: /\\b(first_name|last_name|middle_name|birth_date|drivers_license_number)\\b/g,
    UPPER_CASE: /\\b(FIRST_NAME|LAST_NAME|MIDDLE_NAME)\\b/g
};

function validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const violations = [];
    
    Object.entries(INCORRECT_PATTERNS).forEach(([type, pattern]) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const line = content.substring(0, match.index).split('\\n').length;
            violations.push({
                file: filePath,
                line,
                type,
                found: match[0],
                shouldBe: toCamelCase(match[0])
            });
        }
    });
    
    return violations;
}

function toCamelCase(str) {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase())
              .replace(/^[A-Z]/, (g) => g.toLowerCase());
}

// Run validation
const files = process.argv.slice(2);
let totalViolations = 0;

files.forEach(file => {
    const violations = validateFile(file);
    if (violations.length > 0) {
        console.log(\`\\nViolations in \${file}:\`);
        violations.forEach(v => {
            console.log(\`  Line \${v.line}: \${v.found} → \${v.shouldBe} (\${v.type})\`);
        });
        totalViolations += violations.length;
    }
});

console.log(\`\\nTotal violations found: \${totalViolations}\`);
process.exit(totalViolations > 0 ? 1 : 0);`;
            break;
            
        case 'product-structure':
            filename = 'validate-product-structure.js';
            content = `#!/usr/bin/env node
const fs = require('fs');

const PRODUCT_REQUIREMENTS = {
    CRIMINAL: {
        required: ['subject', 'product', 'jurisdiction'],
        forbidden: ['employmentVerification', 'educationVerification', 'militaryVerification']
    },
    EMPLOYMENT_VERIFICATION: {
        required: ['subject', 'product', 'jurisdiction', 'employmentVerification'],
        forbidden: ['educationVerification', 'militaryVerification']
    },
    EDUCATION_VERIFICATION: {
        required: ['subject', 'product', 'jurisdiction', 'educationVerification'],
        forbidden: ['employmentVerification', 'militaryVerification']
    }
};

function validateOrderStructure(order) {
    const productCategory = order.product?.category;
    if (!productCategory || !PRODUCT_REQUIREMENTS[productCategory]) {
        return { valid: false, errors: ['Unknown or missing product category'] };
    }
    
    const requirements = PRODUCT_REQUIREMENTS[productCategory];
    const errors = [];
    
    // Check required fields
    requirements.required.forEach(field => {
        if (!order[field]) {
            errors.push(\`Missing required field for \${productCategory}: \${field}\`);
        }
    });
    
    // Check forbidden fields
    requirements.forbidden.forEach(field => {
        if (order[field]) {
            errors.push(\`Forbidden field for \${productCategory}: \${field}\`);
        }
    });
    
    return { valid: errors.length === 0, errors };
}

// Example usage
const orderJson = fs.readFileSync(process.argv[2], 'utf8');
const order = JSON.parse(orderJson);
const result = validateOrderStructure(order.order || order);

if (!result.valid) {
    console.error('Structure validation failed:');
    result.errors.forEach(error => console.error(\`  - \${error}\`));
    process.exit(1);
} else {
    console.log('Structure validation passed ✓');
}`;
            break;
            
        case 'verification':
            filename = 'validate-verification-pattern.js';
            content = `#!/usr/bin/env node

function validateVerificationResponse(verificationObject) {
    const errors = [];
    const ignoredFields = ['agentName', 'resultsDetails', 'verifiedDate', 'verifiedById'];
    
    const baseFields = Object.keys(verificationObject).filter(key => {
        return !key.endsWith('Verified') && 
               !key.endsWith('Discovered') && 
               !ignoredFields.includes(key);
    });
    
    baseFields.forEach(field => {
        const verifiedField = \`\${field}Verified\`;
        const discoveredField = \`\${field}Discovered\`;
        
        if (!(verifiedField in verificationObject)) {
            errors.push(\`Missing \${verifiedField} for base field \${field}\`);
        }
        if (!(discoveredField in verificationObject)) {
            errors.push(\`Missing \${discoveredField} for base field \${field}\`);
        }
    });
    
    return { valid: errors.length === 0, errors };
}

// Usage
const fs = require('fs');
const responseJson = fs.readFileSync(process.argv[2], 'utf8');
const response = JSON.parse(responseJson);

if (response.order?.employmentVerification) {
    const result = validateVerificationResponse(response.order.employmentVerification);
    if (!result.valid) {
        console.error('Verification pattern validation failed:');
        result.errors.forEach(error => console.error(\`  - \${error}\`));
        process.exit(1);
    } else {
        console.log('Verification pattern validation passed ✓');
    }
}`;
            break;
    }
    
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