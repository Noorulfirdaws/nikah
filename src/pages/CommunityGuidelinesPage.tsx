import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'

const RULES = [
  { title: 'Be sincere and honest', icon: '✅', desc: 'Your profile must reflect who you genuinely are. Use a real recent photo of yourself. Do not exaggerate your qualities, hide important information, or misrepresent your intentions. Dishonesty wastes everyone\'s time and harms trust in our community.' },
  { title: 'Treat everyone with respect', icon: '🤝', desc: 'Communicate with the dignity that every Muslim deserves. Do not insult, belittle, or demean other members — whether about their appearance, background, culture, sect, or lifestyle choices. Disagreements about preferences are fine; disrespect is not.' },
  { title: 'Keep conversations halal', icon: '🕌', desc: 'Nikah is a marriage platform. All conversations must remain within Islamic boundaries. No flirtatious, suggestive, or sexually explicit messages. No romantic roleplay. All communication should be purposeful and marriage-oriented.' },
  { title: 'Involve your wali', icon: '👨‍👩‍👧', desc: 'We encourage you to involve a wali or trusted family member in the process. While this is not technically enforced for all interactions, our Wali Mode is available at any point and we encourage its use as conversations become more serious.' },
  { title: 'Do not solicit or spam', icon: '🚫', desc: 'Do not use Nikah to promote products, services, social media accounts, or external platforms. Do not send unsolicited bulk messages. Do not contact users who have not engaged with you repeatedly after no response.' },
  { title: 'Protect your privacy and others\'', icon: '🔒', desc: 'Do not share other members\' personal information, photos, or private messages outside the platform. Do not request information you don\'t need. Respect that some members prefer discretion in their search.' },
  { title: 'No discrimination or sectarian hostility', icon: '🌍', desc: 'Nikah serves Muslims of all backgrounds, sects, cultures, and nationalities. You are welcome to have preferences. You are not welcome to demean, mock, or attack other Muslims based on their sect, madhhab, culture, or national origin.' },
  { title: 'Report, don\'t retaliate', icon: '🛡️', desc: 'If someone violates these guidelines, use the Report button. Do not engage in retaliation, public shaming, or harassment in return. Our safety team will handle all reports fairly and promptly.' },
]

const CONSEQUENCES = [
  { level: 'First violation', action: 'Warning and content removal', color: '#c9a84c' },
  { level: 'Repeated violations', action: 'Temporary account suspension (7–30 days)', color: '#c94a4a' },
  { level: 'Severe violations', action: 'Permanent account ban', color: '#8b0000' },
  { level: 'Criminal content', action: 'Report to law enforcement + permanent ban', color: '#000' },
]

export default function CommunityGuidelinesPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero
        label="🕌 Community"
        title="Community"
        titleHighlight="Guidelines"
        subtitle="Nikah is built on trust, respect, and Islamic values. These guidelines protect our community and make the platform safe for everyone."
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {/* Intro */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(26,107,74,0.07)' }}>
          <p className="text-sm text-gray-700 leading-relaxed">
            These Community Guidelines apply to all Nikah members worldwide. By using the platform, you agree to uphold these standards — not just because we require it, but because every member of our community deserves a safe, respectful, and purposeful experience on their path to nikah.
          </p>
        </div>

        {/* Rules */}
        <div className="space-y-4">
          {RULES.map(rule => (
            <div key={rule.title} className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-sm transition-all">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{rule.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{rule.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consequences */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Consequences of violations</h2>
          <div className="space-y-3">
            {CONSEQUENCES.map(c => (
              <div key={c.level} className="flex items-start gap-3 p-4 rounded-2xl border border-gray-100 bg-white">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: c.color }} />
                <div>
                  <p className="font-semibold text-sm text-gray-800">{c.level}</p>
                  <p className="text-xs text-gray-500">{c.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reporting */}
        <div className="rounded-3xl p-7" style={{ background: 'linear-gradient(135deg, #0a2e1f, #1a6b4a)' }}>
          <h2 className="text-lg font-bold text-white mb-2">See something? Say something.</h2>
          <p className="text-white/70 text-sm mb-4">Use the Report button on any profile or message. Our team reviews every report within 2 hours and takes appropriate action. Reports are confidential.</p>
          <Link to="/contact" className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96e)', color: '#1a1a2e' }}>
            File a report
          </Link>
        </div>

        <p className="text-center text-gray-400 text-sm">
          See also:{' '}
          <Link to="/safety" className="hover:underline" style={{ color: '#1a6b4a' }}>Safety Center</Link>
          {' · '}
          <Link to="/terms" className="hover:underline" style={{ color: '#1a6b4a' }}>Terms of Service</Link>
        </p>
      </div>
    </div>
  )
}
