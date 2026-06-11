import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'
import { Shield, Star, Globe, Smartphone } from 'lucide-react'

const FEATURES_LIST = [
  'Smart halal matching algorithm',
  'Faith & lifestyle filters',
  'Photo blur & privacy controls',
  'Wali / chaperone chat mode',
  'Compatibility score',
  'Icebreaker questions',
  'Multi-language support (13 languages)',
  'Video intro prompts',
  'Verified profile badges',
  'Anti-scam protection',
]

export default function DownloadPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero
        label="📱 Download Nikah"
        title="The App for"
        titleHighlight="Serious Muslims"
        subtitle="Available on iOS and Android. Free to download — premium features unlock more."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        {/* App store buttons */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto mb-14">
          {[
            { store: 'App Store', platform: 'iOS', icon: '🍎', sub: 'Requires iOS 15.0 or later', badge: 'Available on the' },
            { store: 'Google Play', platform: 'Android', icon: '🤖', sub: 'Requires Android 8.0 or later', badge: 'Get it on' },
          ].map(item => (
            <button
              key={item.store}
              className="flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all group text-left"
            >
              <span className="text-4xl">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{item.badge}</p>
                <p className="font-bold text-lg text-gray-900 group-hover:text-white transition-colors leading-tight">{item.store}</p>
                <p className="text-xs text-gray-400 group-hover:text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Web app option */}
        <div className="text-center mb-14">
          <p className="text-gray-500 text-sm mb-3">Prefer the browser?</p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <Globe size={16} /> Use the Web App instead
          </Link>
        </div>

        {/* Features grid */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Everything in the app</h2>
          <p className="text-gray-500 text-center mb-8">The full Nikah experience, in your pocket.</p>
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

        {/* Ratings */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {[
            { platform: 'App Store', rating: '4.8', reviews: '42K reviews', icon: '🍎' },
            { platform: 'Google Play', rating: '4.7', reviews: '78K reviews', icon: '🤖' },
            { platform: 'Web App', rating: '4.9', reviews: '15K reviews', icon: '🌐' },
          ].map(r => (
            <div key={r.platform} className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="text-3xl mb-2">{r.icon}</div>
              <p className="text-3xl font-bold text-gray-900">{r.rating}</p>
              <div className="flex justify-center gap-0.5 my-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#c9a84c" style={{ color: '#c9a84c' }} />)}
              </div>
              <p className="text-xs text-gray-400">{r.reviews}</p>
              <p className="text-sm font-medium text-gray-600 mt-1">{r.platform}</p>
            </div>
          ))}
        </div>

        {/* Security note */}
        <div
          className="flex items-start gap-4 p-6 rounded-2xl"
          style={{ background: 'rgba(26,107,74,0.06)', border: '1px solid rgba(26,107,74,0.15)' }}
        >
          <Shield size={28} style={{ color: '#1a6b4a', flexShrink: 0 }} />
          <div>
            <p className="font-semibold text-gray-800 mb-1">Safe to download</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Nikah is available only through the official Apple App Store and Google Play Store. We will never ask you to install from unknown sources.
              All communications are end-to-end encrypted and your data is never sold.
            </p>
          </div>
        </div>

        {/* Phone mockup area */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gray-900 text-white text-sm">
            <Smartphone size={18} />
            Download free · No credit card needed
          </div>
        </div>
      </div>
    </div>
  )
}
