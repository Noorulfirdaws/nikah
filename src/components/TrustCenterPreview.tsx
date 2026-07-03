import { Link } from 'react-router-dom'
import { ShieldCheck, FileText, Scale, Lock, Flag, BookOpen } from 'lucide-react'
import { useLang } from '../lib/LanguageContext'
import { tr } from '../lib/tr'

const TRUST_LINKS = [
  { icon: ShieldCheck, label: 'Verification Standards' },
  { icon: Flag,        label: 'Scam Prevention' },
  { icon: Scale,       label: 'Moderation Process' },
  { icon: Lock,        label: 'Data Privacy' },
  { icon: BookOpen,    label: 'Community Guidelines' },
  { icon: FileText,    label: 'Transparency Reports' },
]

export default function TrustCenterPreview() {
  const { lang } = useLang()
  return (
    <section className="py-16" style={{ background: '#faf9f6' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#1a1a2e' }}>
          {tr(lang, 'Everything We Do Is Documented in the Trust Center')}
        </h2>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          {tr(lang, 'How verification works, how moderation decisions are made, how your data is protected, and how we report on it — all public, all in one place.')}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {TRUST_LINKS.map(l => {
            const Icon = l.icon
            return (
              <Link key={l.label} to="/trust" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 hover:border-emerald-600 hover:text-emerald-700 transition-colors">
                <Icon size={15} style={{ color: '#1a6b4a' }} /> {tr(lang, l.label)}
              </Link>
            )
          })}
        </div>
        <Link
          to="/trust"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl"
          style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
        >
          {tr(lang, 'Visit the Trust Center →')}
        </Link>
      </div>
    </section>
  )
}
