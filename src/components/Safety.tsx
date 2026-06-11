import { ShieldCheck, Eye, AlertCircle, Lock, Users, FileCheck, UserX, Fingerprint } from 'lucide-react'
import { useLang } from '../lib/LanguageContext'

const SAFETY_ITEMS = [
  {
    icon: Fingerprint,
    title: 'Identity Verification',
    desc: 'Optional ID and selfie verification gives profiles a verified badge — so you know you\'re connecting with real people.',
    color: '#1a6b4a',
  },
  {
    icon: Eye,
    title: 'Blur Photos by Default',
    desc: 'Your photos are blurred until you explicitly approve who can see them. Your image, your control.',
    color: '#2d6fa5',
  },
  {
    icon: Lock,
    title: 'Private Photo Album',
    desc: 'Create a private album that\'s only shared with approved connections — protect your privacy at every stage.',
    color: '#7c4dbe',
  },
  {
    icon: Users,
    title: 'Wali & Chaperone Mode',
    desc: 'Invite a wali, parent, or trusted family member into any conversation for a fully halal and transparent process.',
    color: '#c9a84c',
  },
  {
    icon: AlertCircle,
    title: 'Report & Block',
    desc: 'Report suspicious or inappropriate behavior instantly. Block anyone without explanation. We act on every report.',
    color: '#c94a4a',
  },
  {
    icon: FileCheck,
    title: 'Community Guidelines',
    desc: 'A clear, respectful code of conduct focused on Islamic values. No harassment, no inappropriate messaging, ever.',
    color: '#1a6b4a',
  },
  {
    icon: ShieldCheck,
    title: 'Anti-Scam Protection',
    desc: 'AI-powered scam detection monitors patterns and flags suspicious activity to keep our community safe.',
    color: '#2d6fa5',
  },
  {
    icon: UserX,
    title: 'Profile Moderation',
    desc: 'A dedicated trust and safety team reviews profiles, photos, and flagged content to maintain a high-quality community.',
    color: '#7c4dbe',
  },
]

export default function Safety() {
  const { t } = useLang()
  return (
    <section id="safety" className="py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0a2e1f 0%, #0d3d2b 60%, #0e4a35 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(201,168,76,0.2)', color: '#e8c96e' }}>
            {t.safety_badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.safety_title}
          </h2>
          <p className="text-white/65 max-w-xl mx-auto text-lg">
            {t.safety_subtitle}
          </p>
        </div>

        {/* Safety grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SAFETY_ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="group p-5 rounded-2xl transition-all duration-300 hover:shadow-2xl cursor-default"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${item.color}25` }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-white/55 text-xs leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Trust bar */}
        <div className="mt-14 p-6 rounded-2xl text-center" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <p className="text-white font-semibold text-lg mb-1">
            Trusted by <span style={{ color: '#c9a84c' }}>6 million Muslims</span> worldwide
          </p>
          <p className="text-white/60 text-sm">
            Our safety team operates 24/7 across all time zones to protect every member of the Nikah community.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-5">
            {[
              ['99.2%', 'Scam detection rate'],
              ['< 2hr', 'Average response to reports'],
              ['100%', 'Profile moderation'],
              ['GDPR', 'Data compliant'],
            ].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-xl font-bold" style={{ color: '#c9a84c' }}>{val}</p>
                <p className="text-white/50 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
