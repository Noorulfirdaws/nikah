import { CreditCard, ScanFace, Smartphone, HeartHandshake, ShieldAlert, Users, UserCheck, Lock, Ban } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../lib/LanguageContext'
import { tr } from '../lib/tr'

// Every claim links to the Trust Center section that backs it — a bare
// label with no evidence is exactly the kind of unverifiable claim this
// site otherwise goes out of its way to avoid.
const TRUST_ITEMS = [
  { icon: CreditCard,     label: 'Government ID Verification',  anchor: 'verification-standards' },
  { icon: ScanFace,       label: 'Face Verification',           anchor: 'verification-standards' },
  { icon: Smartphone,     label: 'Phone Verification',          anchor: 'verification-standards' },
  { icon: HeartHandshake, label: 'Marriage Intent Screening',   anchor: 'community-guidelines' },
  { icon: ShieldAlert,    label: 'Scam Detection',               anchor: 'scam-prevention' },
  { icon: Users,          label: 'Family Participation',         anchor: 'community-guidelines' },
  { icon: UserCheck,      label: 'Human Moderation',              anchor: 'moderation-process' },
  { icon: Lock,           label: 'Privacy Controls',              anchor: 'data-privacy' },
  { icon: Ban,            label: 'No Casual Dating',              anchor: 'community-guidelines' },
]

export default function TrustBar() {
  const { lang } = useLang()
  return (
    <section aria-label="Trust and verification standards" className="py-6 border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {TRUST_ITEMS.map(item => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                to={`/trust#${item.anchor}`}
                className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 transition-colors"
                title={`See how we back this — ${tr(lang, item.label)}`}
              >
                <Icon size={15} style={{ color: '#1a6b4a' }} />
                <span className="text-xs font-medium whitespace-nowrap underline decoration-dotted underline-offset-2">{tr(lang, item.label)}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
