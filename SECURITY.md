# Security Policy — Nikah App

This document describes the security posture of the Nikah front-end prototype,
the threat model, the controls currently in place, and the checklist for
hardening a real production deployment.

---

## ⚠️ Prototype Disclaimer

This is a **front-end-only demo**. No real backend exists.  
No data is transmitted, stored, or processed.  
All "form submissions" are simulated client-side.

A real production deployment **must** add server-side validation, authentication,
rate-limiting, and secure data handling for every feature described here.

---

## Threat Model

| Threat | Risk | Mitigation |
|---|---|---|
| Cross-Site Scripting (XSS) | High | React JSX auto-escaping; no `dangerouslySetInnerHTML`; CSP header |
| Clickjacking | Medium | `X-Frame-Options: DENY`; `frame-ancestors 'none'` CSP directive |
| Open redirect | Low | `?plan=` param whitelisted in `src/lib/security.ts`; `useNavigate` used (no `window.location` manipulation) |
| MIME sniffing | Low | `X-Content-Type-Options: nosniff` header |
| Sensitive data in URL | Low | No auth tokens or PII in query params; plan param is cosmetic only |
| Third-party script injection | Low | Only Google Fonts loaded externally; no analytics/tracking scripts |
| Oversized input payloads | Low | `maxLength` on all text inputs; character limits defined in `src/lib/security.ts` |
| Credential stuffing / brute force | N/A (demo) | Must be handled server-side with rate-limiting, CAPTCHA, and account lockout |
| Data exfiltration | N/A (demo) | No real data stored; in production: encrypt at rest, TLS in transit |

---

## Security Controls Implemented

### Front-end

- **No `dangerouslySetInnerHTML`** anywhere in the codebase — React auto-escaping is in effect for all user-provided values rendered in JSX.
- **No `eval()`, `new Function()`, `document.write()`** — confirmed via code audit.
- **No `localStorage` / `sessionStorage`** usage — no sensitive data stored in the browser.
- **No `console.log` of form data** — confirmed via code audit.
- **No `target="_blank"` links** without `rel="noopener noreferrer"`.
- **No insecure `http://` URLs** loaded at runtime.
- **No exposed secrets** — no `.env` files, API keys, tokens, or credentials in the repository.
- **Input length limits** via `maxLength` on all text inputs (see `src/lib/security.ts → LIMITS`).
- **Email regex validation** client-side in addition to `type="email"` browser validation.
- **Password strength indicator** — visual feedback for weak passwords.
- **Query param whitelisting** — `?plan=` is validated against `['free','premium','family']` before display.
- **Rate-limit UI** — form submit buttons are disabled for 5 seconds after each submission to discourage rapid re-submission.
- **Demo notice banner** on the sign-up page — communicates to users that no real data is sent.
- **Safety warning banner** on sign-up success — prominently warns new users never to send money.

### HTTP Headers (dev server via `vite.config.ts`)

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

### Content Security Policy (`index.html` meta tag)

```
default-src 'self';
script-src  'self' 'unsafe-inline';   ← tighten in production (use nonces/hashes)
style-src   'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src    'self' https://fonts.gstatic.com;
img-src     'self' data: blob:;
connect-src 'self' ws: wss:;          ← remove ws: in production
object-src  'none';
base-uri    'self';
```

> **Note:** `frame-ancestors` must be set as an HTTP response header — it is
> ignored by browsers when delivered via `<meta>`. Set it at the server/CDN
> level in production.

---

## Dependency Audit

```bash
npm audit          # → 0 vulnerabilities (last checked June 2026)
npm outdated       # → only @types/node is behind (dev dep, non-critical)
```

Run `npm audit` before every production release. Automate with `npm audit --audit-level=moderate` in CI.

---

## Secure Deployment Checklist

### HTTP headers (must be set at the server / CDN / edge — not just in Vite)

```nginx
# Nginx example
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header Content-Security-Policy "
  default-src 'self';
  script-src 'self' 'nonce-{RUNTIME_NONCE}';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https:;
  connect-src 'self' https://api.nikahapp.com;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  upgrade-insecure-requests;
" always;
```

### Vercel (`vercel.json`)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ]
}
```

### Netlify (`netlify.toml`)

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
```

---

## Backend Requirements (when a real API is built)

- All inputs re-validated server-side (never trust client-side validation alone)
- Passwords hashed with **bcrypt** (cost factor ≥ 12) or **argon2id**
- Auth tokens as **HttpOnly, Secure, SameSite=Strict** cookies — never in `localStorage`
- Rate-limit login and sign-up endpoints (e.g. 5 attempts / 15 min per IP)
- CAPTCHA on sign-up and contact forms (hCaptcha preferred for privacy)
- CORS configured to allow only `https://nikahapp.com` in production
- All user-uploaded media scanned for malware and CSAM before storage
- GDPR compliance: right to erasure, data portability, DPA with processors
- Audit log for all admin actions and profile moderation decisions
- TLS 1.2+ only; disable TLS 1.0/1.1

---

## Privacy Guidelines

- Never log personally identifiable information (email, name, IP) without explicit consent
- Profile photos blurred by default until mutual match
- Location data stored at city level only — never precise GPS
- Data minimisation: collect only what is necessary for the service
- Retention policy: inactive accounts purged after 12 months of inactivity (with warning)
- No data sold to third parties under any circumstances

---

## Self-hosted Fonts (optional hardening)

Currently Inter is loaded from `fonts.googleapis.com` and `fonts.gstatic.com`.  
To eliminate this third-party dependency and tighten CSP:

1. Download Inter from [rsms.me/inter](https://rsms.me/inter/) or Google Fonts
2. Place `.woff2` files in `public/fonts/`
3. Add `@font-face` declarations to `src/index.css`
4. Remove `<link>` tags to `fonts.googleapis.com` from `index.html`
5. Remove `https://fonts.googleapis.com` and `https://fonts.gstatic.com` from CSP

---

## Responsible Disclosure

If you discover a security vulnerability in Nikah, please report it responsibly:

**Email:** security@nikahapp.com  
**Response time:** Within 48 hours  
**Do not:** Publicly disclose the issue before we have had a chance to investigate and release a fix.

We appreciate responsible disclosure and will acknowledge reporters in our changelog.

---

## Audit History

| Date | Auditor | Findings | Status |
|---|---|---|---|
| June 2026 | Internal | 0 npm vulnerabilities; input hardening applied; CSP/headers added | ✅ Resolved |

---

*Last updated: June 2026*
