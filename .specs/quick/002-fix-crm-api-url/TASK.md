# Task: Fix API Gateway URL in CRM Integration

## Description
The contact form on `/servicos` (and likely everywhere else) is failing because `src/lib/crm.ts` is using the wrong environment variable for the API endpoint. It's using `NEXT_PUBLIC_API_KEY` as both the URL and the key, instead of using `NEXT_PUBLIC_API_GATEWAY_URL` for the URL.

## Requirements
- [x] Use `NEXT_PUBLIC_API_GATEWAY_URL` for `CRM_ENDPOINT` in `src/lib/crm.ts`.
- [x] Use `NEXT_PUBLIC_API_KEY` for the `X-API-Key` header.
- [x] Ensure logging correctly identifies which variable is missing if any.

## Verification
- [x] Create `src/lib/crm.test.ts` to verify `ingestLead` calls the correct URL with correct headers.
- [x] Run the test using `npm test` or `vitest`.
