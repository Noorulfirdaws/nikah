/**
 * security.ts — Client-side input validation and sanitization utilities.
 *
 * These helpers are NOT a substitute for server-side validation.
 * Every value submitted to a real backend must be re-validated server-side.
 * They exist to:
 *   1. Give users immediate feedback on bad input
 *   2. Prevent trivially oversized payloads from being sent
 *   3. Strip accidental control characters before display
 *   4. Whitelist known-safe values for query params that are rendered in the UI
 */

// ---------------------------------------------------------------------------
// Plan query-param whitelist
// ---------------------------------------------------------------------------

export const ALLOWED_PLANS = ['free', 'premium', 'family'] as const
export type PlanId = typeof ALLOWED_PLANS[number]

/**
 * Sanitize the ?plan= query param.
 * Returns 'free' for any value not in the allowlist (including injected strings).
 */
export function sanitizePlan(raw: string | null): PlanId {
  if (!raw) return 'free'
  const clean = raw.toLowerCase().trim()
  return (ALLOWED_PLANS as readonly string[]).includes(clean)
    ? (clean as PlanId)
    : 'free'
}

// ---------------------------------------------------------------------------
// Text sanitization
// ---------------------------------------------------------------------------

/**
 * Trim whitespace and remove non-printable control characters from text.
 * Safe to call on any text input value before display or submission.
 */
export function sanitizeText(value: string): string {
  // Strip control chars except \t (tab) and \n (newline, useful in textareas)
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim()
}

// ---------------------------------------------------------------------------
// Email validation
// ---------------------------------------------------------------------------

/**
 * Validate an email address (RFC 5322 simplified).
 * Returns false for empty strings, missing @, or obviously bad formats.
 */
export function isValidEmail(email: string): boolean {
  const trimmed = email.trim()
  if (!trimmed || trimmed.length > 254) return false
  // local@domain.tld — simplified but catches most real mistakes
  return /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/.test(trimmed)
}

// ---------------------------------------------------------------------------
// Password strength
// ---------------------------------------------------------------------------

export interface PasswordStrengthResult {
  score: 0 | 1 | 2 | 3 | 4
  label: string
  color: string
  hint: string
}

/**
 * Score a password from 0 (too short) to 4 (strong).
 * Based on: length, mixed case, digits, and special characters.
 */
export function checkPasswordStrength(password: string): PasswordStrengthResult {
  if (password.length < 8) {
    return { score: 0, label: 'Too short', color: '#e5e5e5', hint: 'Minimum 8 characters required' }
  }

  let score = 1 // base: 8+ chars
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const s = Math.min(score, 4) as 1 | 2 | 3 | 4

  const map: Record<1 | 2 | 3 | 4, { label: string; color: string; hint: string }> = {
    1: { label: 'Weak',   color: '#ef4444', hint: 'Add uppercase letters, numbers or symbols' },
    2: { label: 'Fair',   color: '#f97316', hint: 'Add numbers or special characters to strengthen' },
    3: { label: 'Good',   color: '#eab308', hint: 'Add a special character to make it strong' },
    4: { label: 'Strong', color: '#22c55e', hint: 'Great password!' },
  }

  return { score: s, ...map[s] }
}

// ---------------------------------------------------------------------------
// Input length limits (characters)
// ---------------------------------------------------------------------------

export const LIMITS = {
  name:       50,
  email:     254,
  city:       80,
  message:  2000,
  bio:       300,
  search:    100,
  subject:   120,
  newsletter:254,
  password:  128,
} as const
