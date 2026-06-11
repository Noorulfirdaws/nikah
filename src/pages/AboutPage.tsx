import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'

const TEAM = [
  { initials: 'SA', name: 'Samir Al-Amin', role: 'Co-Founder & CEO', bg: '#1a6b4a', bio: 'Born in Casablanca, raised in Paris. 12 years in tech. Built Nikah to solve the matchmaking gap he saw in his own community.' },
  { initials: 'ZH', name: 'Zaynab Hassan', role: 'Co-Founder & CPO', bg: '#c9a84c', bio: 'British-Somali product lead with 10 years building apps for underserved communities. Passionate about halal-first design.' },
  { initials: 'YA', name: 'Yusuf Aydın', role: 'CTO', bg: '#2d6fa5', bio: 'Turkish software architect based in Berlin. Specialises in privacy-first systems and cross-cultural platform design.' },
  { initials: 'NK', name: 'Noor Karim', role: 'Head of Community & Safety', bg: '#7c4dbe', bio: 'Pakistani-Canadian community leader with a background in Islamic studies and digital safety. Leads our trust & safety operations.' },
]

const VALUES = [
  { icon: '🕌', title: 'Faith First', desc: 'Every feature we build starts with the question: is this halal, respectful, and in line with Islamic values? That is non-negotiable.' },
  { icon: '🌍', title: 'Truly International', desc: 'The Muslim ummah has no borders. Nikah serves Muslims in 50+ countries across every culture, language, and tradition.' },
  { icon: '🔒', title: 'Privacy by Default', desc: 'Privacy isn\'t a premium feature — it\'s a core right. Photos are blurred, data is encrypted, and you control everything.' },
  { icon: '💍', title: 'Marriage Focused', desc: 'We\'re not an entertainment app. Every design decision is made to serve one goal: helping serious Muslims find a spouse.' },
  { icon: '👨‍👩‍👧', title: 'Family Inclusive', desc: 'Marriage in Islam involves family. Our wali mode and family features recognise that this is a communal decision, not just an individual one.' },
  { icon: '✊', title: 'Community Driven', desc: 'We partner with masajid, Islamic scholars, and community organisations to ensure Nikah reflects real Muslim needs.' },
]

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero
        label="🌿 About Nikah"
        title="Built for the"
        titleHighlight="Muslim Ummah"
        subtitle="Nikah was born from a simple belief: every Muslim deserves a respectful, faith-centred path to finding a spouse."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-20">
        {/* Mission */}
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>Our Mission</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Making nikah accessible to every Muslim, everywhere</h2>
          <p className="text-gray-600 leading-relaxed">
            For too long, Muslims looking for a spouse had to choose between apps designed for casual dating or informal family networks that didn't scale globally. Nikah was built to bridge that gap — an international platform that honours Islamic values, respects privacy, and connects Muslims across every culture, language, and country.
          </p>
          <p className="text-gray-500 leading-relaxed mt-4">
            We built Nikah with scholars, community leaders, and thousands of Muslim singles who told us what they actually needed. The result is a product that puts faith first, family second, and features third.
          </p>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-3" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>Our Values</span>
            <h2 className="text-2xl font-bold text-gray-900">What we stand for</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-3" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>Our Team</span>
            <h2 className="text-2xl font-bold text-gray-900">The people behind Nikah</h2>
            <p className="text-gray-500 mt-2">A diverse, international team of Muslims who've lived the problem we're solving.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(member => (
              <div key={member.name} className="p-5 rounded-2xl bg-white border border-gray-100 text-center hover:shadow-md transition-all">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-3"
                  style={{ background: member.bg }}
                >
                  {member.initials}
                </div>
                <p className="font-bold text-gray-800 text-sm">{member.name}</p>
                <p className="text-xs font-medium mb-2" style={{ color: '#1a6b4a' }}>{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-3xl p-10 text-center" style={{ background: 'linear-gradient(135deg, #0a2e1f, #1a6b4a)' }}>
          <h2 className="text-2xl font-bold text-white mb-8">Our community, by the numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '2M+', label: 'Registered members' },
              { value: '50+', label: 'Countries' },
              { value: '42K+', label: 'Successful couples' },
              { value: '13', label: 'Languages' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-white/60 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
          >
            Join our community — it's free
          </Link>
          <p className="text-gray-400 text-sm mt-3">
            Interested in joining our team?{' '}
            <Link to="/careers" className="hover:underline" style={{ color: '#1a6b4a' }}>See open roles →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
