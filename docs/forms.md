# Forms

The Get access form (`/sign-up/`) and the Contact form (`/contact/`) post JSON to an endpoint on **park-backend-2**, which emails the request to info@safepark.app. The site has no server of its own.

Endpoint: `POST https://prodapiv2.safepark.app/enquiry` (set in `src/consts.ts`; override with the `PUBLIC_ENQUIRY_URL` repo variable, for example to point the preview at the dev API).

## Request body

Get access:

```json
{
  "kind": "access",
  "name": "Sam Driver",
  "email": "sam@example.com",
  "phone": "07700 900123",
  "region": "UK only",
  "source": "Facebook",
  "company": "",
  "message": "",
  "website": "",
  "consent": true
}
```

Contact:

```json
{
  "kind": "contact",
  "firstName": "Sam",
  "lastName": "Driver",
  "email": "sam@example.com",
  "message": "Can I list my truck stop?",
  "website": ""
}
```

- `region` is one of `UK only`, `UK and Europe`, `Mostly Europe`.
- `website` is a hidden spam trap. People never fill it in, so the backend should accept the request with a 2xx and drop it silently when it isn't empty.
- Field lengths are capped in the form (`maxlength`), but the backend must validate them itself.

## Response

Any 2xx shows the thank-you panel. Anything else, or a network error, shows a message asking the driver to try again or call or email instead.

## What the backend needs

- CORS allowing `https://safepark.app`, `https://preview.safepark.app` and `http://localhost:4321`, for `POST` with `Content-Type: application/json`.
- No auth guard on this route.
- Validation, the honeypot check, and rate limiting (API Gateway throttling on the route).
- An email to info@safepark.app with the driver's address as Reply-To, so the team can answer directly. Amazon SES is the obvious sender. Route 53 already has SES records for safepark.app (an `_amazonses` TXT and three DKIM CNAMEs), so the domain looks set up already. Confirm which region it's verified in and whether the account is out of the sandbox. Sandbox mode is fine while the only recipient is info@safepark.app.
- Optionally, store each request in DynamoDB so nothing is lost if an email goes astray.
