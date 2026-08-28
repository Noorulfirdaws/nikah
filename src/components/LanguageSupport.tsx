import { Globe, Check } from 'lucide-react'
import { useLang } from '../lib/LanguageContext'
import { hasFullContentCoverage } from '../lib/tr'

// Sample phrases + RTL direction, keyed by the real supported LangCode set
// (src/lib/i18n.ts). Kept in sync with that list — do not add a code here
// that isn't a real supported language.
const LANGUAGES = [
  { code: 'EN', name: 'English', native: 'English', dir: 'ltr', flag: '🇬🇧', sample: 'Find a spouse, not just a match' },
  { code: 'AR', name: 'Arabic', native: 'العربية', dir: 'rtl', flag: '🇸🇦', sample: 'ابحث عن زوج بالطريقة الحلال' },
  { code: 'FR', name: 'French', native: 'Français', dir: 'ltr', flag: '🇫🇷', sample: 'Trouvez un époux de façon halal' },
  { code: 'TR', name: 'Turkish', native: 'Türkçe', dir: 'ltr', flag: '🇹🇷', sample: 'Helal yolda bir eş bulun' },
  { code: 'UR', name: 'Urdu', native: 'اردو', dir: 'rtl', flag: '🇵🇰', sample: 'حلال طریقے سے شریکِ حیات تلاش کریں' },
  { code: 'HI', name: 'Hindi', native: 'हिन्दी', dir: 'ltr', flag: '🇮🇳', sample: 'हलाल तरीके से जीवनसाथी खोजें' },
  { code: 'BN', name: 'Bengali', native: 'বাংলা', dir: 'ltr', flag: '🇧🇩', sample: 'হালাল পথে জীবনসঙ্গী খুঁজুন' },
  { code: 'ID', name: 'Bahasa Indonesia', native: 'Bahasa Indonesia', dir: 'ltr', flag: '🇮🇩', sample: 'Temukan pasangan hidup dengan cara halal' },
  { code: 'MS', name: 'Malay', native: 'Bahasa Melayu', dir: 'ltr', flag: '🇲🇾', sample: 'Cari pasangan hidup dengan cara halal' },
  { code: 'SO', name: 'Somali', native: 'Af Soomaali', dir: 'ltr', flag: '🇸🇴', sample: 'Raadi xaas si xalaal ah' },
  { code: 'DE', name: 'German', native: 'Deutsch', dir: 'ltr', flag: '🇩🇪', sample: 'Finden Sie einen Ehepartner auf halal Weise' },
  { code: 'ES', name: 'Spanish', native: 'Español', dir: 'ltr', flag: '🇪🇸', sample: 'Encuentra un cónyuge de forma halal' },
]

export default function LanguageSupport() {
  const { lang, setLang } = useLang()
  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]
  const fullCoverage = hasFullContentCoverage(current.code)

  return (
    <section
      id="languages"
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(135deg, #0a2e1f 0%, #0d3d2b 50%, #1a6b4a 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(201,168,76,0.2)', color: '#e8c96e' }}>
              🌐 Multi-Language
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Speak Your Language,<br />
              <span style={{ color: '#c9a84c' }}>Find Your Match</span>
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-8">
              Nikah's navigation is available in 12 languages, with right-to-left support for Arabic and Urdu, and
              full page content in English, French, Arabic, and Somali so far — more are on the way. Tap a language
              to switch the site right now.
            </p>

            {/* Language grid — this is the real switcher, wired to the site's language context */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" role="group" aria-label="Choose site language">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  aria-pressed={lang === l.code}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    lang === l.code
                      ? 'text-white shadow-lg'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                  style={
                    lang === l.code
                      ? { background: 'linear-gradient(135deg, #c9a84c, #e8c96e)', color: '#1a1a2e' }
                      : { background: 'rgba(255,255,255,0.07)' }
                  }
                >
                  <span>{l.flag}</span>
                  <span className="truncate">{l.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: live preview of the currently active language */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-3xl p-6 glass" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  {current.flag}
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{current.native}</p>
                  <p className="text-white/60 text-sm">{current.name}</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: 'rgba(201,168,76,0.2)' }}>
                  <Globe size={13} style={{ color: '#c9a84c' }} />
                  <span className="text-xs font-medium" style={{ color: '#c9a84c' }}>{fullCoverage ? 'Full support' : 'Partial support'}</span>
                </div>
              </div>

              {/* Sample text */}
              <div
                className="p-4 rounded-2xl mb-4"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                dir={current.dir}
              >
                <p className="text-white/80 text-sm leading-relaxed mb-1">{current.sample}</p>
                <p className="text-white/40 text-xs">{current.name} · {current.dir === 'rtl' ? 'Right-to-Left' : 'Left-to-Right'}</p>
              </div>

              {/* Honest coverage checklist */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-white/60 text-xs">Navigation &amp; menus</span>
                  <span className="text-white text-xs font-medium flex items-center gap-1"><Check size={12} /> {current.native}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-white/60 text-xs">Page content</span>
                  {fullCoverage
                    ? <span className="text-white text-xs font-medium flex items-center gap-1"><Check size={12} /> {current.native}</span>
                    : <span className="text-white/50 text-xs font-medium">English (for now)</span>}
                </div>
              </div>

              {/* Localization coverage */}
              <div className="mt-4 p-3 rounded-xl text-center" style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <p className="text-xs" style={{ color: '#c9a84c' }}>
                  {fullCoverage
                    ? `Navigation and page content fully available in ${current.name}`
                    : `Navigation is in ${current.name} — full page content translation is in progress`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
