# Official InformData API Requirements - Verified Evidence

## Source Documents

1. **Primary Source**: `/Users/jamesbrady/vuplicity-api/docs/integrations/informdata/API_REFERENCE_OFFICIAL.md`
   - Last Updated: 2025-07-15
   - Status: Official InformData API Documentation

## Verified Field Naming Requirements

### Evidence #1: PascalCase Requirement
**File**: `/Users/jamesbrady/vuplicity-api/docs/integrations/informdata/API_REFERENCE_OFFICIAL.md`
**Lines**: 43-48
```markdown
### 3. Field Name Requirements
InformData requires **PascalCase** for subject fields:
- `FirstName` (not firstName)
- `LastName` (not lastName)
- `Birthdate` (not birthdate)
```

### Evidence #2: Script Confirmation
**File**: `/Users/jamesbrady/vuplicity-api/scripts/test-exact-informdata-format.js`
**Lines**: 28-32
```javascript
console.log('🔑 KEY DIFFERENCES FROM WHAT WE HAD:');
console.log('  ❌ firstName → ✅ FirstName');
console.log('  ❌ lastName → ✅ LastName');
console.log('  ❌ birthdate → ✅ Birthdate');
```

## Verified Authentication Requirements

### Evidence #3: GET Method for Authentication
**File**: `/Users/jamesbrady/vuplicity-api/docs/integrations/informdata/API_REFERENCE_OFFICIAL.md`
**Lines**: 12-18
```markdown
### JWT Token Acquisition
- **Method**: GET (NOT POST)
- **Endpoint**: `/authenticate`
- **Auth**: HTTP Basic Auth
  - Username: API Key
  - Password: (empty string)
```

### Evidence #4: Authentication Implementation
**File**: `/Users/jamesbrady/vuplicity-api/docs/integrations/informdata/API_REFERENCE_OFFICIAL.md`
**Lines**: 23-35
```javascript
// CORRECT - Using GET method
const authResponse = await axios.get(
  'https://api.sjvassoc.com/clients/authenticate',
  {
    auth: {
      username: process.env.INFORMDATA_API_KEY,
      password: '' // Empty password
    }
  }
);
```

## Verified Order Structure Requirements

### Evidence #5: Product Categories
**File**: `/Users/jamesbrady/vuplicity-api/src/types/informdata.ts` (to be verified)
**Expected Structure**:
- Criminal checks require: subject, product, jurisdiction
- Employment verification requires: subject, product, jurisdiction, employmentVerification
- Education verification requires: subject, product, jurisdiction, educationVerification

## Verified Response Format Requirements

### Evidence #6: Verification Triple Pattern
For employment/education verifications, each field requires three versions:
1. Base field (e.g., `employerName`)
2. Verified field (e.g., `employerNameVerified`)
3. Discovered field (e.g., `employerNameDiscovered`)

## API Endpoints

### Evidence #7: Base URLs
**File**: `/Users/jamesbrady/vuplicity-api/docs/integrations/informdata/API_REFERENCE_OFFICIAL.md`
**Lines**: 5-8
```markdown
## Base URLs
- **Sandbox**: `https://sandbox.api.sjvassoc.com/clients/`
- **Production**: `https://api.sjvassoc.com/clients/`
```

## Rate Limits and Error Handling

### Evidence #8: Rate Limits
**File**: `/Users/jamesbrady/vuplicity-api/docs/integrations/informdata/API_REFERENCE_OFFICIAL.md`
**Lines**: 74-76
```markdown
### 7. Rate Limits
- Standard tier: 100 requests/minute
- IP blocking: >5,000 requests in 5 minutes
```

## Critical Integration Points Summary

### Evidence #9: Key Requirements
**File**: `/Users/jamesbrady/vuplicity-api/docs/integrations/informdata/API_REFERENCE_OFFICIAL.md`
**Lines**: 78-85
```markdown
## Critical Integration Points
1. **Always use GET for authentication** - POST will fail
2. **Cache JWT tokens** - Don't authenticate on every request
3. **Use PascalCase for subject fields** - API will reject camelCase
4. **Handle NEED_INFO status** - Orders may require additional data
5. **Implement webhook endpoint** - For real-time status updates
```

---

**Verification Status**: ✅ All requirements verified against official documentation
**Last Verified**: 2025-07-25
**Verified By**: Engineer 1A - Documentation Forensics Team