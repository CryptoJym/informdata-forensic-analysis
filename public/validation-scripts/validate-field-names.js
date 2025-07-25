#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const INCORRECT_PATTERNS = {
    PascalCase: /\b(FirstName|LastName|MiddleName|Birthdate|DriversLicenseNumber)\b/g,
    snake_case: /\b(first_name|last_name|middle_name|birth_date|drivers_license_number)\b/g,
    UPPER_CASE: /\b(FIRST_NAME|LAST_NAME|MIDDLE_NAME)\b/g
};

function validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const violations = [];
    
    Object.entries(INCORRECT_PATTERNS).forEach(([type, pattern]) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const line = content.substring(0, match.index).split('\n').length;
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
        console.log(`\nViolations in ${file}:`);
        violations.forEach(v => {
            console.log(`  Line ${v.line}: ${v.found} → ${v.shouldBe} (${v.type})`);
        });
        totalViolations += violations.length;
    }
});

console.log(`\nTotal violations found: ${totalViolations}`);
process.exit(totalViolations > 0 ? 1 : 0);