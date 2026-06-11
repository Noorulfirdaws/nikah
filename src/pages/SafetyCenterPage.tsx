import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'
import { ShieldCheck, AlertTriangle, Phone, Flag } from 'lucide-react'

const TIPS = [
  { icon: '🔍', title: 'Verify before you trust', desc: 'Look for the Verified badge. Ask to video-call before sharing personal contact information. Real members won\'t pressure you to move off-platform.' },
  { icon: '💬', title: 'Keep conversations on Nikah', desc: 'Do not share your phone number, email, or social media until you\'ve built genuine trust. Our in-app messaging has safety protections that external apps don\'t.' },
  { icon: '👨‍👩‍👧', title: 'Involve your wali early', desc: 'Inviting your wali or a trusted family member into the conversation is not just an Islamic practice — it\'s a safety measure. Use Wali Mode as soon as conversations get serious.' },
  { icon: '🚩', title: 'Know the red flags', desc: 'Be cautious of: anyone asking for money; claims of extraordinary hardship; pressure to move fast; inconsistent stories; refusal to video-call; asking to leave the platform early.' },
  { icon: '📵', title: 'Protect your personal data', desc: 'Never share your home address, workplace, national ID, bank details, or passport with someone you haven\'t met in person and verified.' },
  { icon: '🤝', title: 'First meetings matter', desc: 'If you decide to meet in person, do so in a public place, tell a trusted person where you\'re going, and consider bringing your wali or a family member.' },
]

export default function SafetyCenterPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero
        label="🛡️ Safety Center"
        title="Your Safety is Our"
        titleHighlight="Responsibility"
        subtitle="Nikah is built with safety at every layer — from ID verification to anti-scam protection and our 24/7 trust team."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-14">
        {/* Emergency */}
        <div className="flex items-start gap-4 p-5 rounded-2xl border-2" style={{ background: 'rgba(201,58,58,0.05)', borderColor: 'rgba(201,58,58,0.2)' }}>
          <AlertTriangle size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-gray-900 mb-1">Immediate safety concern?</p>
            <p className="text-sm text-gray-600 mb-2">If you believe you are in immediate danger, contact local emergency services first. For urgent safety reports on Nikah, email <strong>safety@nikahapp.com</strong> — we respond within 2 hours, 24/7.</p>
            <Link to="/contact" className="text-sm font-semibold hover:underline" style={{ color: '#c94a4a' }}>File an urgent report →</Link>
          </div>
        </div>

        {/* How we protect you */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How we protect you</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: 'Identity Verification', desc: 'Optional photo selfie and ID check. Verified users get a badge. We verify within 24 hours.', color: '#1a6b4a' },
              { icon: Flag, title: 'Report & Block', desc: 'Report any profile or message in seconds. Block any user without explanation. We act on every report.', color: '#c94a4a' },
              { icon: Phone, title: '24/7 Safety Team', desc: 'A dedicated trust and safety team operates round the clock across all time zones.', color: '#2d6fa5' },
            ].map(item => {
              const Icon = item.icon
              return (
                <div key={item.title} className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: `${item.color}15` }}>
                    <Icon size={22} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Safety tips */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Safety tips for members</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TIPS.map(tip => (
              <div key={tip.title} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-sm transition-all">
                <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{tip.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #0a2e1f, #1a6b4a)' }}>
          <h2 className="text-xl font-bold text-white mb-6">Our safety record</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[['99.2%', 'Scam detection rate'], ['< 2hr', 'Report response time'], ['100%', 'Profiles moderated'], ['24/7', 'Safety team active']].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold text-white mb-1">{v}</p>
                <p className="text-white/60 text-xs">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Also see */}
        <p className="text-center text-gray-400 text-sm">
          Also see:{' '}
          <Link to="/community-guidelines" className="hover:underline" style={{ color: '#1a6b4a' }}>Community Guidelines</Link>
          {' · '}
          <Link to="/privacy" className="hover:underline" style={{ color: '#1a6b4a' }}>Privacy Policy</Link>
          {' · '}
          <Link to="/help" className="hover:underline" style={{ color: '#1a6b4a' }}>Help Center</Link>
        </p>
      </div>
    </div>
  )
}
