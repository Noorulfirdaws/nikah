import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'

const COOKIES = [
  { name: 'Session cookie', purpose: 'Keeps you logged in during your session', duration: 'Session', required: true },
  { name: 'Authentication token', purpose: 'Securely identifies your account', duration: '30 days', required: true },
  { name: 'Preferences', purpose: 'Remembers your language and country settings', duration: '1 year', required: true },
  { name: 'Analytics (anonymised)', purpose: 'Helps us understand how the app is used to improve it', duration: '13 months', required: false },
  { name: 'Error reporting', purpose: 'Captures technical errors to help us fix bugs', duration: '30 days', required: false },
]

export default function CookiesPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero label="🍪 Cookies" title="Cookie" titleHighlight="Policy" subtitle="Last updated: 1 June 2025" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-7">
          <p className="text-sm text-gray-600 leading-relaxed">
            Nikah uses cookies and similar technologies to make the app work, remember your preferences, and understand how you use our service. This policy explains what cookies we use and why.
          </p>
          <div>
            <h2 className="font-bold text-gray-900 mb-3">What are cookies?</h2>
            <p className="text-sm text-gray-600 leading-relaxed">Cookies are small files stored on your device by your browser. They help websites and apps remember information about your visit — like whether you're logged in or what language you prefer.</p>
          </div>
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Cookies we use</h2>
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <span className="col-span-2">Cookie / Purpose</span>
                <span>Duration</span>
                <span>Required</span>
              </div>
              {COOKIES.map((c, i) => (
                <div key={i} className="grid grid-cols-4 px-4 py-3.5 border-t border-gray-50 items-start">
                  <div className="col-span-2 pr-4">
                    <p className="font-medium text-sm text-gray-800">{c.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.purpose}</p>
                  </div>
                  <span className="text-xs text-gray-500">{c.duration}</span>
                  <span>
                    {c.required
                      ? <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>Essential</span>
                      : <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Optional</span>
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-gray-900 mb-2">Managing your preferences</h2>
            <p className="text-sm text-gray-600 leading-relaxed">You can manage cookie preferences in your browser settings or in the Nikah app under Settings → Privacy. Disabling essential cookies may prevent the app from working correctly. Optional cookies can be turned off without affecting core functionality.</p>
          </div>
          <div>
            <h2 className="font-bold text-gray-900 mb-2">Third-party cookies</h2>
            <p className="text-sm text-gray-600 leading-relaxed">We do not allow third-party advertising or tracking cookies on Nikah. Any third-party services we use (such as error reporting) are bound by strict data processing agreements and cannot use your data for their own purposes.</p>
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">
          Questions? See our <Link to="/privacy" className="hover:underline" style={{ color: '#1a6b4a' }}>Privacy Policy</Link> or <Link to="/contact" className="hover:underline" style={{ color: '#1a6b4a' }}>contact us</Link>.
        </p>
      </div>
    </div>
  )
}
