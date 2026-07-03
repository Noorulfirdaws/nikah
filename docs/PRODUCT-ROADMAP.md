# Nikah — Roadmap & Conversion Plan

## Feature prioritization (impact × effort)

| Priority | Feature | Why |
|---|---|---|
| P0 | Real auth + email verification (nikah-api) | Nothing works without accountable identities |
| P0 | ID/face/phone verification pipeline | The core trust promise on the homepage |
| P0 | Report system + moderator queue (24h SLA) | Safety promise already published |
| P1 | Compatibility assessment + scoring | Differentiator vs Muzz/Salams |
| P1 | Readiness badges + candidate filtering | Serious-intent filter |
| P1 | Wali/parent accounts + chaperoned chat | Family-first differentiator |
| P2 | Family dashboard + proposal approval flow | Deepens P1 family features |
| P2 | Risk scoring + anti-scam automation | Scales moderation |
| P2 | Live transparency metrics endpoint | Replaces "—" placeholders |
| P3 | Country pages with real local content | SEO growth engine |
| P3 | Annual transparency report | Year-1 deliverable |

## 30-day implementation plan

**Week 1** — nikah-api: add `role` to User, Profile + Verification models, migration; verification upload endpoints (S3-compatible storage, TTL delete).
**Week 2** — Moderator dashboard v1 (verification queue + report queue) inside existing `/admin`; wire Report endpoints.
**Week 3** — Onboarding wizard → real API (replace demo submit); email verification; readiness score v1 (verification % + completeness).
**Week 4** — Compatibility assessment questions + scoring v1; candidate listing endpoint; QA + deploy to Railway alongside other backends.

## 90-day roadmap

- **Days 31–60:** family accounts + wali invitations + chaperoned chat; risk scoring v1 with messaging freeze; consent-based first-message flow; transparency metrics endpoint feeding the homepage.
- **Days 61–90:** family dashboard + proposal approvals; country pages (top 10 markets) with local Islamic organizations, demographics, FAQs; success-story submission flow with consent; accessibility pass (WCAG AA) + performance (lazy-load below-fold sections); first monthly transparency snapshot published.

## Conversion copy standards (enforced)

- "Sign Up" → **Start Your Marriage Journey**
- "Find Matches" → **View Verified Marriage Candidates**
- "Message Now" → **Begin Introduction**
- "Create Account" → **Create Your Verified Profile**
- Banned words: perfect match, soulmate, swipe, dating, casual chat.

## SEO structure

- Home: "Muslim Marriage Platform for Serious Nikah | Nikah"
- `/trust`: "Trust Center — Verification, Safety & Transparency | Nikah"
- Country pages: `/countries/{slug}` — "Muslim Marriage in {Country} | Verified Members | Nikah"
- Each country page: H1 local intro, verified-member stats (live only), local organizations, cultural marriage insights, country-specific safety info, FAQ schema markup (FAQPage JSON-LD), hreflang for the 12 supported languages.

## Country page template (per country)

1. Muslim marriage in {country} (intro, 200–300 words, culturally accurate)
2. Community snapshot: active verified members (live metric), age range, languages
3. Marriage success stories from {country} (consented)
4. Local Islamic organizations & mosques directory
5. Country-specific safety information (marriage fraud patterns local to region)
6. Cultural marriage insights (mahr customs, family expectations)
7. FAQs (6–8, schema-marked)
