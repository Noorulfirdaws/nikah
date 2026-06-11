import { checkPasswordStrength } from '../lib/security'

interface Props {
  password: string
}

/**
 * Visual password strength indicator.
 * Renders 4 coloured bar segments and a label with an improvement hint.
 * Only visible when the password field has a value.
 */
export default function PasswordStrength({ password }: Props) {
  if (!password) return null

  const { score, label, color, hint } = checkPasswordStrength(password)
  const bars = [1, 2, 3, 4] as const

  return (
    <div className="mt-2 space-y-1" role="status" aria-live="polite">
      <div className="flex gap-1">
        {bars.map(b => (
          <div
            key={b}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: b <= score ? color : '#e5e5e5' }}
          />
        ))}
      </div>
      <p className="text-xs font-medium flex items-center gap-1.5" style={{ color }}>
        <span>{label}</span>
        {score < 4 && (
          <span className="text-gray-400 font-normal">— {hint}</span>
        )}
      </p>
    </div>
  )
}
