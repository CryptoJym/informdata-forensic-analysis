#!/usr/bin/env node

function validateVerificationResponse(verificationObject) {
    const errors = [];
    const ignoredFields = ['agentName', 'resultsDetails', 'verifiedDate', 'verifiedById'];
    
    const baseFields = Object.keys(verificationObject).filter(key => {
        return !key.endsWith('Verified') && 
               !key.endsWith('Discovered') && 
               !ignoredFields.includes(key);
    });
    
    baseFields.forEach(field => {
        const verifiedField = `${field}Verified`;
        const discoveredField = `${field}Discovered`;
        
        if (!(verifiedField in verificationObject)) {
            errors.push(`Missing ${verifiedField} for base field ${field}`);
        }
        if (!(discoveredField in verificationObject)) {
            errors.push(`Missing ${discoveredField} for base field ${field}`);
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
        result.errors.forEach(error => console.error(`  - ${error}`));
        process.exit(1);
    } else {
        console.log('Verification pattern validation passed ✓');
    }
}