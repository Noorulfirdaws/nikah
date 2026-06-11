import { useState, useEffect } from 'react'
import { Globe, ChevronDown, Menu, X, MapPin, Download } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../lib/LanguageContext'

const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'AR', name: 'العربية' },
  { code: 'FR', name: 'Français' },
  { code: 'TR', name: 'Türkçe' },
  { code: 'UR', name: 'اردو' },
  { code: 'HI', name: 'हिन्दी' },
  { code: 'BN', name: 'বাংলা' },
  { code: 'ID', name: 'Bahasa Indonesia' },
  { code: 'MS', name: 'Bahasa Melayu' },
  { code: 'SO', name: 'Af Soomaali' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'ES', name: 'Español' },
]

const COUNTRIES = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'TR', flag: '🇹🇷', name: 'Turkey' },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: 'AE', flag: '🇦🇪', name: 'UAE' },
  { code: 'QA', flag: '🇶🇦', name: 'Qatar' },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'IN', flag: '🇮🇳', name: 'India' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'EG', flag: '🇪🇬', name: 'Egypt' },
  { code: 'MA', flag: '🇲🇦', name: 'Morocco' },
  { code: 'DZ', flag: '🇩🇿', name: 'Algeria' },
  { code: 'SO', flag: '🇸🇴', name: 'Somalia' },
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa' },
]

// Nav items: tKey → translation key suffix, anchor id (home scroll) or path (page)
const NAV_ITEMS = [
  { tKey: 'How it Works', anchor: 'how-it-works' },
  { tKey: 'Features',     anchor: 'features'     },
  { tKey: 'Safety',       anchor: 'safety',  path: '/safety' },
  { tKey: 'Stories',      anchor: 'stories'       },
  { tKey: 'Pricing',      anchor: 'pricing'       },
  { tKey: 'Help',         path: '/help'           },
]

interface Props {
  lang: string
  setLang: (l: string) => void
  country: string
  setCountry: (c: string) => void
}

export default function Header({ lang, setLang, country, setCountry }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const { t } = useLang()

  // Nav label map — short labels only (must fit in narrow header)
  const NAV_LABELS: Record<string, string> = {
    'How it Works': t.nav_howitworks,
    'Features':     t.nav_features,
    'Safety':       t.nav_safety,
    'Stories':      t.nav_stories,
    'Pricing':      t.nav_pricing,
    'Help':         t.nav_help,
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const close = () => { setLangOpen(false); setCountryOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const handleNavClick = (item: typeof NAV_ITEMS[0], closeMobile?: () => void) => {
    closeMobile?.()
    if (item.path) {
      navigate(item.path)
      return
    }
    if (isHome) {
      const el = document.getElementById(item.anchor!)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate(`/#${item.anchor}`)
    }
  }

  const getNavLabel = (tKey: string) => NAV_LABELS[tKey] ?? tKey

  const currentCountry = COUNTRIES.find(c => c.code === country)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: scrolled || !isHome ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled || !isHome ? 'blur(12px)' : 'none',
        borderBottom: scrolled || !isHome ? '1px solid rgba(0,0,0,0.06)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
            >
              <span className="text-white font-bold text-lg leading-none select-none">ن</span>
            </div>
            <span
              className="text-xl font-bold"
              style={{ color: scrolled || !isHome ? '#1a6b4a' : 'white' }}
            >
              Nikah
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const isActive = item.path ? location.pathname === item.path : false
              const textColor = scrolled || !isHome ? (isActive ? '#1a6b4a' : '#555') : 'rgba(255,255,255,0.85)'
              return (
                <button
                  key={item.tKey}
                  onClick={() => handleNavClick(item)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-black/5"
                  style={{
                    color: textColor,
                    fontWeight: isActive ? 600 : 500,
                    background: isActive ? 'rgba(26,107,74,0.08)' : undefined,
                  }}
                >
                  {getNavLabel(item.tKey)}
                </button>
              )
            })}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language */}
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => { setLangOpen(!langOpen); setCountryOpen(false) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-black/5"
                style={{
                  color: scrolled || !isHome ? '#555' : 'rgba(255,255,255,0.85)',
                  border: `1px solid ${scrolled || !isHome ? '#e5e5e5' : 'rgba(255,255,255,0.25)'}`,
                }}
              >
                <Globe size={14} />
                {lang}
                <ChevronDown size={12} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50">
                  <p className="px-3 py-1 text-xs text-gray-400 font-medium uppercase tracking-wide">Language</p>
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-emerald-50 transition-colors ${lang === l.code ? 'font-semibold text-emerald-700' : 'text-gray-700'}`}
                    >
                      <span>{l.name}</span>
                      {lang === l.code && <span className="text-emerald-600 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Country */}
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => { setCountryOpen(!countryOpen); setLangOpen(false) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-black/5"
                style={{
                  color: scrolled || !isHome ? '#555' : 'rgba(255,255,255,0.85)',
                  border: `1px solid ${scrolled || !isHome ? '#e5e5e5' : 'rgba(255,255,255,0.25)'}`,
                }}
              >
                <MapPin size={14} />
                {currentCountry?.flag} {currentCountry?.code}
                <ChevronDown size={12} />
              </button>
              {countryOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 max-h-72 overflow-y-auto">
                  <p className="px-3 py-1 text-xs text-gray-400 font-medium uppercase tracking-wide">Country</p>
                  {COUNTRIES.map(c => (
                    <button
                      key={c.code}
                      onClick={() => { setCountry(c.code); setCountryOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-emerald-50 transition-colors ${country === c.code ? 'font-semibold text-emerald-700' : 'text-gray-700'}`}
                    >
                      <span className="text-base">{c.flag}</span>
                      <span>{c.name}</span>
                      {country === c.code && <span className="ml-auto text-emerald-600 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download */}
            <Link
              to="/download"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-black/5"
              style={{ color: scrolled || !isHome ? '#555' : 'rgba(255,255,255,0.85)' }}
            >
              <Download size={14} />
              App
            </Link>

            {/* Sign Up */}
            <Link
              to="/signup"
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
            >
              {t.nav_signup}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors hover:bg-black/5"
            style={{ color: scrolled || !isHome ? '#374151' : 'white' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-3 space-y-0.5 rounded-b-2xl shadow-lg">
            {NAV_ITEMS.map(item => (
              <button
                key={item.tKey}
                onClick={() => { handleNavClick(item, () => setMenuOpen(false)) }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
              >
                {getNavLabel(item.tKey)}
              </button>
            ))}
            <div className="pt-2 pb-1 px-3 space-y-2">
              <Link
                to="/download"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Download size={15} /> Download App
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
              >
                {t.nav_signup}
              </Link>
            </div>
            {/* Mobile lang grid */}
            <div className="pt-2 px-4 border-t border-gray-50">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 font-medium">Language</p>
              <div className="grid grid-cols-4 gap-1.5">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setMenuOpen(false) }}
                    className="py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={
                      lang === l.code
                        ? { background: '#1a6b4a', color: 'white' }
                        : { background: '#f5f5f5', color: '#555' }
                    }
                  >
                    {l.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
