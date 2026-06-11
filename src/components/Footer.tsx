import { Globe, MapPin, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'IN', flag: '🇮🇳', name: 'India' },
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'EG', flag: '🇪🇬', name: 'Egypt' },
  { code: 'TR', flag: '🇹🇷', name: 'Turkey' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
]

const LINKS = {
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ],
  Support: [
    { label: 'Help Center', to: '/help' },
    { label: 'Safety Center', to: '/safety' },
    { label: 'Community Guidelines', to: '/community-guidelines' },
    { label: 'Contact Us', to: '/contact' },
  ],
  Legal: [
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Cookie Policy', to: '/cookies' },
  ],
  App: [
    { label: 'Download iOS', to: '/download' },
    { label: 'Download Android', to: '/download' },
    { label: 'Pricing', to: '/#pricing' },
    { label: 'Features', to: '/#features' },
  ],
}

// ─── Branded SVG icons ────────────────────────────────────────────────────────

function IconX() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.962l4.265 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

const SOCIALS = [
  { SvgIcon: IconX,         label: 'X / Twitter', to: '/social/twitter',   hoverColor: '#000'     },
  { SvgIcon: IconInstagram, label: 'Instagram',   to: '/social/instagram', hoverColor: '#E1306C'  },
  { SvgIcon: IconFacebook,  label: 'Facebook',    to: '/social/facebook',  hoverColor: '#1877F2'  },
  { SvgIcon: IconYouTube,   label: 'YouTube',     to: '/social/youtube',   hoverColor: '#FF0000'  },
]

interface Props {
  lang: string
  setLang: (l: string) => void
  country: string
  setCountry: (c: string) => void
}

export default function Footer({ lang, setLang, country, setCountry }: Props) {
  const [langOpen, setLangOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const currentCountry = COUNTRIES.find(c => c.code === country)
  const navigate = useNavigate()
  const { t } = useLang()

  const handleHashLink = (to: string) => {
    if (to.startsWith('/#')) {
      navigate('/')
      setTimeout(() => {
        const id = to.replace('/#', '')
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      navigate(to)
    }
  }

  return (
    <footer style={{ background: '#0a2e1f', color: 'white' }}>
      {/* CTA Banner */}
      <div className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-3">💍</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {t.footer_cta_title}
          </h2>
          <p className="text-white/75 mb-8 max-w-lg mx-auto leading-relaxed">
            {t.footer_cta_sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-2xl font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96e)', color: '#1a1a2e' }}
            >
              {t.common_getstarted}
            </Link>
            <Link
              to="/download"
              className="px-8 py-3.5 rounded-2xl font-semibold text-white border border-white/30 hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              {t.common_download}
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-90 transition-opacity">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
              >
                <span className="text-white font-bold text-lg leading-none">ن</span>
              </div>
              <span className="text-xl font-bold text-white">Nikah</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-xs">
              {t.footer_tagline}
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {SOCIALS.map(s => (
                <Link
                  key={s.label}
                  to={s.to}
                  aria-label={s.label}
                  title={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.10)' }}
                >
                  <s.SvgIcon />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="font-semibold text-white text-sm mb-4">{section}</p>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    {link.to.startsWith('/#') ? (
                      <button
                        onClick={() => handleHashLink(link.to)}
                        className="text-white/50 hover:text-white/90 text-sm transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-white/50 hover:text-white/90 text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Nikah · {t.footer_rights}
          </p>

          <div className="flex items-center gap-2">
            {/* Language */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); setCountryOpen(false) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white/90 transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <Globe size={12} />
                {lang}
                <ChevronDown size={11} />
              </button>
              {langOpen && (
                <div
                  className="absolute bottom-full mb-1.5 right-0 w-44 rounded-2xl py-1.5 z-50 shadow-2xl max-h-56 overflow-y-auto"
                  style={{ background: '#0d3d2b', border: '1px solid rgba(255,255,255,0.1)' }}
                  onClick={e => e.stopPropagation()}
                >
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${lang === l.code ? 'font-semibold text-white' : 'text-white/60'}`}
                    >
                      <span>{l.name}</span>
                      {lang === l.code && <span className="text-emerald-400 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Country */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setCountryOpen(!countryOpen); setLangOpen(false) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white/90 transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <MapPin size={12} />
                {currentCountry?.flag} {currentCountry?.code}
                <ChevronDown size={11} />
              </button>
              {countryOpen && (
                <div
                  className="absolute bottom-full mb-1.5 right-0 w-52 rounded-2xl py-1.5 z-50 shadow-2xl max-h-64 overflow-y-auto"
                  style={{ background: '#0d3d2b', border: '1px solid rgba(255,255,255,0.1)' }}
                  onClick={e => e.stopPropagation()}
                >
                  {COUNTRIES.map(c => (
                    <button
                      key={c.code}
                      onClick={() => { setCountry(c.code); setCountryOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-white/10 transition-colors ${country === c.code ? 'font-semibold text-white' : 'text-white/60'}`}
                    >
                      <span className="text-sm">{c.flag}</span> {c.name}
                      {country === c.code && <span className="ml-auto text-emerald-400 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
