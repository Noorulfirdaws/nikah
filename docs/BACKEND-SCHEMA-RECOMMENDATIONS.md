# nikah-api — Schema & Moderation Recommendations

Extends the existing Prisma schema (`User`, `Subscription`) in `nikah-api`. Apply when backend work resumes.

## Proposed Prisma additions

```prisma
model Profile {
  id            String   @id @default(cuid())
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id])
  bio           String   @default("")
  madhab        String?
  prayerLevel   String?
  islamicKnowledge String?
  childrenPref  String?
  livingPref    String?
  relocationPref String?
  financialExpectations String?
  rolesOutlook  String?          // traditional vs modern spectrum
  marriageTimeline String?
  languages     String[]
  city          String?
  photoBlurred  Boolean  @default(true)
  verifiedOnlyContact Boolean @default(true)
  completeness  Int      @default(0)   // 0–100, drives readiness
}

model Verification {
  id         String             @id @default(cuid())
  userId     String
  type       VerificationType   // ID | FACE | PHONE | EMAIL | EDUCATION | PROFESSION
  status     VerificationStatus // PENDING | APPROVED | REJECTED
  reviewerId String?            // moderator who decided
  // Store only a salted hash of the document number for ban durability —
  // never the document image after review (delete post-decision).
  docHash    String?
  createdAt  DateTime @default(now())
  decidedAt  DateTime?
  @@index([userId, type])
}

model FamilyMember {
  id         String   @id @default(cuid())
  memberId   String                    // the single seeking marriage
  guardianUserId String                // parent / wali user account
  role       FamilyRole                // WALI | PARENT | SIBLING | OTHER
  permissions Json                     // {viewSummary, viewProposals, joinChat, approveProposals}
  createdAt  DateTime @default(now())
  @@unique([memberId, guardianUserId])
}

model CompatibilityScore {
  id        String  @id @default(cuid())
  userAId   String
  userBId   String
  overall   Int                          // 0–100
  breakdown Json                         // per-dimension scores + explanations
  computedAt DateTime @default(now())
  @@unique([userAId, userBId])
}

model ReadinessScore {
  userId    String  @id
  score     Int                          // 0–100
  badge     ReadinessBadge               // READY_NOW | WITHIN_12M | EXPLORING | FAMILY_INVOLVED | FULLY_VERIFIED
  inputs    Json                         // verification %, completeness, intent, behavior signals
  updatedAt DateTime @updatedAt
}

model Report {
  id          String       @id @default(cuid())
  reporterId  String
  reportedId  String
  category    ReportCategory  // SCAM | HARASSMENT | FAKE_PROFILE | INAPPROPRIATE | OTHER
  detail      String
  status      ReportStatus    // OPEN | IN_REVIEW | RESOLVED | DISMISSED
  moderatorId String?
  resolution  String?
  createdAt   DateTime @default(now())
  resolvedAt  DateTime?
  @@index([status, createdAt])            // 24h SLA queue
}

model RiskScore {
  userId    String  @id
  score     Int     @default(0)           // 0–100; >70 freezes messaging pending review
  signals   Json                          // pattern flags: paymentKeywords, massMessaging, linkDensity…
  updatedAt DateTime @updatedAt
}

model ModerationAction {
  id          String   @id @default(cuid())
  moderatorId String
  targetUserId String
  action      ModAction // WARN | RESTRICT | SUSPEND | BAN | APPROVE | REJECT
  reason      String
  createdAt   DateTime @default(now())    // immutable audit log — no updates/deletes
}

model SuccessStory {
  id          String   @id @default(cuid())
  coupleUserIds String[]
  consentGiven Boolean @default(false)    // publish only with explicit consent
  country     String
  timelineMonths Int
  factors     String[]
  familyInvolvement String
  outcome     String
  publishedAt DateTime?
}

model TrustMetricSnapshot {
  id        String   @id @default(cuid())
  period    String                        // e.g. "2026-07"
  metrics   Json                          // verifiedPct, reportsResolved24h, fraudBlocked, approvalRate…
  createdAt DateTime @default(now())
}
```

## API surface to add (Express routes)

- `POST /api/verification/:type` · `GET /api/verification/status`
- `POST /api/family/invite` · `GET /api/family/dashboard` · `PATCH /api/family/:id/permissions`
- `GET /api/candidates` (verified + compatibility-ranked) · `GET /api/compatibility/:userId`
- `POST /api/reports` · moderator: `GET /api/admin/reports?status=OPEN`
- `POST /api/admin/verifications/:id/decision` · `POST /api/admin/users/:id/action`
- `GET /api/trust/metrics` (public, powers Transparency section)

## Moderation dashboard requirements

1. Verification review queue (ID+selfie side-by-side, approve/reject, auto-delete images after decision)
2. Report queue sorted by SLA age, 24h target visible
3. Risk-score watchlist with signal explanations
4. Immutable audit log viewer
5. Transparency report generator (monthly snapshot → `TrustMetricSnapshot`)

## Security notes (defensive)

- Verification documents: store in object storage with short TTL, delete after review; keep only salted `docHash`.
- All moderator actions require role-based JWT claims (`role: MODERATOR|ADMIN`) — add `role` to `User`.
- Rate-limit messaging endpoints per recipient count/hour (anti-mass-messaging).
- Webhooks and auth already hardened (helmet, CORS allowlist, rate limits) — keep.
