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
            <p className="text-sm text-gray-600 mb-2">If you believe you are in immediate danger, contact local emergency services first. For urgent safety reports on Nikah, email <strong>safety@nikahapp.com</strong> — our target is to respond within 24 hours.</p>
            <Link to="/contact" className="text-sm font-semibold hover:underline" style={{ color: '#c94a4a' }}>File an urgent report →</Link>
          </div>
        </div>

        {/* How we protect you */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How we protect you</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: 'Identity Verification', desc: 'Government ID, face, and phone verification. Our target is to review every submission within 24 hours — see the Trust Center for how this works.', color: '#1a6b4a' },
              { icon: Flag, title: 'Report & Block', desc: 'Report any profile or message in seconds. Block any user without explanation. Every report is reviewed by a moderator.', color: '#c94a4a' },
              { icon: Phone, title: 'Human Moderation', desc: 'Reports and verification submissions are reviewed by people, not just automated systems. Response-time targets are published in our Trust Center.', color: '#2d6fa5' },
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

        {/* Commitments — targets we publish and are held to, not measured
            claims we haven't earned yet. See Trust Center for methodology. */}
        <div className="rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #0a2e1f, #1a6b4a)' }}>
          <h2 className="text-xl font-bold text-white mb-2">Our safety commitments</h2>
          <p className="text-white/50 text-xs mb-6">Published targets, not self-reported statistics — see the Trust Center for how each is measured.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[['100%', 'Profiles human-reviewed'], ['< 24h', 'Report response target'], ['0', 'Tolerance for money requests']].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold text-white mb-1">{v}</p>
                <p className="text-white/60 text-xs">{l}</p>
              </div>
            ))}
          </div>
          <Link to="/trust" className="inline-block mt-6 text-sm font-semibold hover:underline" style={{ color: '#e8c96e' }}>
            See how we measure this →
          </Link>
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
