# Summary: Fix API Gateway URL in CRM Integration

## Changes
- Updated `src/lib/crm.ts` to correctly use `NEXT_PUBLIC_API_GATEWAY_URL` for the API endpoint and `NEXT_PUBLIC_API_KEY` for the `X-API-Key` header.
- **Added path validation:** The code now ensures the endpoint always ends with `/ingest`, appending it if necessary (handling trailing slashes automatically).
- Environment variables are now read inside the `ingestLead` function to ensure they are always up-to-date and to facilitate unit testing.
- Rewrote unit tests in `src/lib/crm.test.ts` to strictly verify URL construction, ensuring `/ingest` is correctly appended and not duplicated.

## Verification Results
- Unit tests passed (5/5):
  - `should append /ingest to the gateway URL if missing`: PASSED
  - `should not duplicate /ingest if already present`: PASSED
  - `should handle trailing slash in gateway URL correctly`: PASSED
  - `should use NEXT_PUBLIC_API_KEY as X-API-Key header`: PASSED
  - `should return false if configuration is missing`: PASSED

## Conclusion
The issue where the contact form was not calling the correct API URL (and missing the `/ingest` path) has been resolved. The integration is now robust against different environment variable formats.
