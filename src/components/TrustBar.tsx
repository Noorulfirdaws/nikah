import { CreditCard, ScanFace, Smartphone, HeartHandshake, ShieldAlert, Users, UserCheck, Lock, Ban } from 'lucide-react'

const TRUST_ITEMS = [
  { icon: CreditCard,     label: 'Government ID Verification' },
  { icon: ScanFace,       label: 'Face Verification' },
  { icon: Smartphone,     label: 'Phone Verification' },
  { icon: HeartHandshake, label: 'Marriage Intent Screening' },
  { icon: ShieldAlert,    label: 'Scam Detection' },
  { icon: Users,          label: 'Family Participation' },
  { icon: UserCheck,      label: 'Human Moderation' },
  { icon: Lock,           label: 'Privacy Controls' },
  { icon: Ban,            label: 'No Casual Dating' },
]

export default function TrustBar() {
  return (
    <section aria-label="Trust and verification standards" className="py-6 border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {TRUST_ITEMS.map(item => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-2 text-gray-600">
                <Icon size={15} style={{ color: '#1a6b4a' }} />
                <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
