#!/usr/bin/env node
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
            errors.push(`Missing required field for ${productCategory}: ${field}`);
        }
    });
    
    // Check forbidden fields
    requirements.forbidden.forEach(field => {
        if (order[field]) {
            errors.push(`Forbidden field for ${productCategory}: ${field}`);
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
    result.errors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
} else {
    console.log('Structure validation passed ✓');
}