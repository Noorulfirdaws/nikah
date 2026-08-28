import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'
import { Shield, Globe, Smartphone, Bell } from 'lucide-react'
import { useState } from 'react'

const FEATURES_LIST = [
  'Smart halal matching algorithm',
  'Faith & lifestyle filters',
  'Photo blur & privacy controls',
  'Wali / chaperone chat mode',
  'Compatibility score',
  'Icebreaker questions',
  'Multi-language support (12 languages)',
  'Video intro prompts',
  'Verified profile badges',
  'Anti-scam protection',
]

export default function DownloadPage() {
  const [notified, setNotified] = useState(false)

  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero
        label="📱 Nikah Mobile"
        title="The App —"
        titleHighlight="Coming Soon"
        subtitle="Native iOS and Android apps are in development. The full Nikah experience is available today in your browser."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        {/* Coming soon — honest state, no fake store links */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto mb-8">
          {[
            { store: 'App Store', icon: '🍎', sub: 'iOS · in development' },
            { store: 'Google Play', icon: '▶️', sub: 'Android · in development' },
          ].map(item => (
            <div
              key={item.store}
              className="flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-gray-200 text-left opacity-70"
            >
              <span className="text-4xl grayscale">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-400">Coming soon to the</p>
                <p className="font-bold text-lg text-gray-500 leading-tight">{item.store}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notify */}
        <div className="text-center mb-14">
          <button
            onClick={() => setNotified(v => !v)}
            aria-pressed={notified}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border text-sm font-medium transition-colors mb-4"
            style={notified
              ? { background: '#f0fdf4', borderColor: '#bbf7d0', color: '#1a6b4a' }
              : { borderColor: '#e5e7eb', color: '#4b5563' }}
          >
            <Bell size={15} /> {notified ? "We'll notify you when it launches" : 'Notify me when the app launches'}
          </button>
          <p className="text-gray-500 text-sm mb-3">In the meantime, the complete platform runs in your browser:</p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
          >
            <Globe size={16} /> Use the Web App
          </Link>
        </div>

        {/* Features grid */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Everything in the app</h2>
          <p className="text-gray-500 text-center mb-8">The full Nikah experience, available today on the web.</p>
          <div className="grid sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
            {FEATURES_LIST.map(f => (
              <div key={f} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-100">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(26,107,74,0.15)' }}>
                  <span className="text-xs" style={{ color: '#1a6b4a' }}>✓</span>
                </div>
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security note — accurate to what's actually built */}
        <div
          className="flex items-start gap-4 p-6 rounded-2xl"
          style={{ background: 'rgba(26,107,74,0.06)', border: '1px solid rgba(26,107,74,0.15)' }}
        >
          <Shield size={28} style={{ color: '#1a6b4a', flexShrink: 0 }} />
          <div>
            <p className="font-semibold text-gray-800 mb-1">Safe to use</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              When native apps launch, they will be available only through the official Apple App Store and Google
              Play Store — we will never ask you to install from an unknown source. See our{' '}
              <Link to="/trust" className="hover:underline" style={{ color: '#1a6b4a' }}>Trust Center</Link> for how
              we protect your data today.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gray-900 text-white text-sm">
            <Smartphone size={18} />
            Free to start · No credit card needed
          </div>
        </div>
      </div>
    </div>
  )
}
