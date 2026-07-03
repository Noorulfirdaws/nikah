import { ShieldCheck, Eye, AlertCircle, Lock, Users, FileCheck, UserX, Fingerprint } from 'lucide-react'
import { useLang } from '../lib/LanguageContext'
import { tr } from '../lib/tr'

const SAFETY_ITEMS = [
  {
    icon: Fingerprint,
    title: 'Government ID Verification',
    desc: 'Members verify with a government-issued ID, face verification, and phone number — so every person you meet is real and accountable.',
    color: '#1a6b4a',
  },
  {
    icon: ShieldCheck,
    title: 'AI Fraud Detection',
    desc: 'Automated systems score risk, detect scam patterns like money requests and mass messaging, and restrict suspicious accounts before harm is done.',
    color: '#2d6fa5',
  },
  {
    icon: UserX,
    title: 'Human Moderation',
    desc: 'A dedicated trust and safety team reviews every profile, every flagged conversation, and every verification submission — not just algorithms.',
    color: '#7c4dbe',
  },
  {
    icon: AlertCircle,
    title: 'Reports Answered in 24 Hours',
    desc: 'Report suspicious or inappropriate behavior instantly. A human moderator responds to every report within 24 hours.',
    color: '#c94a4a',
  },
  {
    icon: Eye,
    title: 'Photo Protection',
    desc: 'Photos are blurred by default and screenshots are discouraged. You approve exactly who can see your image — your photo, your control.',
    color: '#2d6fa5',
  },
  {
    icon: Lock,
    title: 'Privacy Controls',
    desc: 'Private photo albums, hidden mode, granular visibility settings, and family-only viewing options protect you at every stage.',
    color: '#c9a84c',
  },
  {
    icon: Users,
    title: 'Wali & Chaperone Mode',
    desc: 'Invite a wali, parent, or trusted family member into any conversation for a fully transparent, family-supervised process.',
    color: '#1a6b4a',
  },
  {
    icon: FileCheck,
    title: 'Block & Restrict Tools',
    desc: 'Block anyone instantly without explanation. Restrict who can contact you to verified members only. Clear community guidelines, enforced.',
    color: '#7c4dbe',
  },
]

export default function Safety() {
  const { t, lang } = useLang()
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
                <h3 className="font-bold text-white text-sm mb-2">{tr(lang, item.title)}</h3>
                <p className="text-white/55 text-xs leading-relaxed">{tr(lang, item.desc)}</p>
              </div>
            )
          })}
        </div>

        {/* Safety commitments — platform standards, not vanity numbers */}
        <div className="mt-14 p-6 rounded-2xl text-center" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <p className="text-white font-semibold text-lg mb-1">
            {tr(lang, 'Our safety commitments to')} <span style={{ color: '#c9a84c' }}>{tr(lang, 'every member')}</span>
          </p>
          <p className="text-white/60 text-sm">
            {tr(lang, 'Human moderators operate across time zones. These are standards we hold ourselves to — published in our Trust Center.')}
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-5">
            {[
              ['100%', 'Profiles human-reviewed'],
              ['< 24h', 'Report response time'],
              ['0', 'Tolerance for money requests'],
              ['GDPR', 'Data compliant'],
            ].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-xl font-bold" style={{ color: '#c9a84c' }}>{val}</p>
                <p className="text-white/50 text-xs">{tr(lang, label)}</p>
              </div>
            ))}
          </div>
          <a href="/trust" className="inline-block mt-5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: '#c9a84c', color: '#1a1a2e' }}>
            {tr(lang, 'Visit the Trust Center')}
          </a>
        </div>
      </div>
    </section>
  )
}
