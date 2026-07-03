# Nikah — Product & Trust Transformation Audit

**Date:** July 2026 · **Positioning:** "The Muslim Marriage Platform Built for Serious Nikah"

## 1. UX audit — what was wrong

| Area | Problem found | Status |
|---|---|---|
| Hero | "Find Your Perfect Match" — generic dating language | ✅ Replaced: "Find a Spouse, Not Just a Match" |
| Hero stats | Fabricated "2M+ members" | ✅ Replaced with honest commitments (100% reviewed, <24h response) |
| Trust signals | None above the fold | ✅ TrustBar with 9 verification/safety items under hero |
| How It Works | 5 steps, verification optional | ✅ 6 steps, verification mandatory (step 2) |
| Safety section | Fake "6 million Muslims" + invented "99.2% scam detection" | ✅ Replaced with published commitments + Trust Center link |
| Success stories | Fictional quotes with 5-star ratings, fake "42,000+ couples" | ✅ Journey-format cards (country, timeline, compatibility factors, family involvement, outcome), clearly labeled illustrative |
| Language section | Fake per-language member counts ("2.4M+"), "soulmate" copy | ✅ Localization-coverage labels, spouse-focused samples |
| Navigation | How it Works / Features / Safety / Stories / Pricing / Help | ✅ Home / Matches / Safety / Success Stories / Pricing / Trust Center |
| CTAs | "Sign Up Free", "Get Started Free" | ✅ "Start Your Marriage Journey", "Create Your Verified Profile" |
| Onboarding | 5 steps, no verification, no marriage goals, no family setup | ✅ 8-step wizard (plan → account → verify → faith → goals → family → privacy → profile) |
| Trust Center | Did not exist | ✅ `/trust` with 9 documented pillars |

## 2. Trust & safety audit — remaining honesty rules

- **Never publish invented metrics.** Transparency section shows "—" until live data exists; all placeholders labeled.
- Success stories must be replaced with real, consented stories before launch.
- The frontend is a prototype: signup is demo-only (labeled), admin auth is client-side (labeled). Real auth/verification lives in `nikah-api`.

## 3. New homepage structure (implemented)

Hero → TrustBar → WhyNikah → HowItWorks (6 steps) → Safety → Compatibility (`#matching`) →
MarriageReadiness → FamilyParticipation → AntiScam → Transparency → SuccessStories →
TrustCenterPreview → Features → InternationalCoverage → LanguageSupport → Pricing

## 4. Anti-scam framework (product spec)

**Prohibited (permanent ban):** money requests, gift cards, crypto/investment schemes, fake
overseas marriage requests, unverified free messaging, hidden multi-accounts, harassment, mass messaging.

**Enforcement pipeline (backend to implement):**
1. **Detection** — regex/keyword + ML pattern scoring on message metadata (frequency, recipients/hour, link density, payment keywords). Score stored per account.
2. **Risk tiers** — low: log; medium: warn member + rate-limit; high: freeze messaging, queue for manual review.
3. **Manual review** — moderator dashboard queue, decision within 24h, all actions audit-logged.
4. **Ban durability** — hash of verified ID document ID + phone number stored to block re-registration.
5. **Refund policy** — case review for paying members harmed by safety failure.

This is defensive/user-protection only — no offensive capabilities.

## 5. Family / wali framework (product spec)

- **Parent account** — linked to member account, permission-scoped (view summary / view proposals / join chat).
- **Wali role** — invited per conversation or globally; sees chaperoned conversations in full.
- **Family dashboard** — active introductions, pending proposals, readiness progress.
- **Proposal flow** — candidate → proposal → (optional) family approval gate → introduction.
- **Visibility settings** — member controls exactly what each family member sees.

## 6. Accessibility / mobile / performance notes

- All new sections use semantic `<section>` + aria labels on TrustBar; keep contrast ≥ 4.5:1 (checked on new dark sections).
- Homepage now renders 16 sections — consider `React.lazy` + `IntersectionObserver` deferral for below-fold sections if LCP suffers.
- Images: none added (icon-based) — keeps bundle small.
- RTL: AR/UR strings added; full RTL layout flip is deliberately disabled in `applyLangToDocument` (documented there).
