import { Heart, Star, MapPin, MessageCircle, Shield, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../lib/LanguageContext'


function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 520 }}>
      {/* Glow rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #2d9b6f 0%, transparent 70%)' }} />
      </div>

      {/* Phone frame */}
      <div
        className="relative w-64 rounded-[2.5rem] border-4 border-white/20 shadow-2xl overflow-hidden animate-float"
        style={{
          background: 'linear-gradient(160deg, #0d3d2b 0%, #1a6b4a 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.2)',
          height: 480,
        }}
      >
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black/30 rounded-b-2xl z-20" />

        {/* App header */}
        <div className="px-4 pt-8 pb-3 flex items-center justify-between">
          <span className="text-white/90 font-bold text-lg">Nikah</span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <Shield size={14} className="text-white" />
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="px-4 mb-3 flex gap-1.5 overflow-hidden">
          {['Sunni', 'Near me', 'EN/AR', 'Serious'].map(chip => (
            <span
              key={chip}
              className="text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium"
              style={{ background: 'rgba(201,168,76,0.25)', color: '#e8c96e' }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Match card in phone */}
        <div className="mx-4 rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="p-3.5">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-white text-base" style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}>
                AH
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold text-sm">Amira H., 27</p>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,168,76,0.3)', color: '#e8c96e' }}>92%</span>
                </div>
                <p className="text-white/60 text-xs mt-0.5 flex items-center gap-1">
                  <MapPin size={10} /> London, UK 🇬🇧
                </p>
                <div className="flex gap-1 mt-1.5">
                  {['Sunni', 'Daily prayers', 'EN'].map(t => (
                    <span key={t} className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full text-white/70">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-white/60 text-xs mt-2 leading-relaxed">
              "Looking for a kind, faith-driven partner to build a beautiful life together. Family-oriented and serious."
            </p>
          </div>
          <div className="flex border-t border-white/10">
            <button className="flex-1 py-2.5 text-xs font-medium text-white/70 hover:bg-white/10 transition-colors flex items-center justify-center gap-1">
              <Heart size={13} className="text-red-400" /> Like
            </button>
            <button className="flex-1 py-2.5 text-xs font-medium flex items-center justify-center gap-1" style={{ color: '#e8c96e' }}>
              <MessageCircle size={13} /> Message
            </button>
          </div>
        </div>

        {/* Compatibility bar */}
        <div className="mx-4 mt-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-white/60 text-xs">Compatibility</span>
            <span className="text-xs font-bold" style={{ color: '#c9a84c' }}>92%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: '92%', background: 'linear-gradient(90deg, #1a6b4a, #c9a84c)' }} />
          </div>
          <div className="grid grid-cols-3 gap-1 mt-2">
            {[['Faith', '98%'], ['Values', '90%'], ['Lifestyle', '88%']].map(([k, v]) => (
              <div key={k} className="text-center">
                <p className="text-white/80 text-xs font-medium">{v}</p>
                <p className="text-white/40 text-xs">{k}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 border-t border-white/10" style={{ background: 'rgba(0,0,0,0.3)' }}>
          {[
            { icon: '🏠', label: 'Home' },
            { icon: '🔍', label: 'Search' },
            { icon: '💬', label: 'Chats' },
            { icon: '👤', label: 'Profile' },
          ].map(item => (
            <button key={item.label} className="flex flex-col items-center gap-0.5 opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-base">{item.icon}</span>
              <span className="text-white/50 text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute left-0 top-24 animate-float2" style={{ animationDelay: '0.3s' }}>
        <div className="glass rounded-xl p-3 w-36" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: '#c9a84c' }}>YK</div>
            <div>
              <p className="text-white text-xs font-semibold">Yusuf K.</p>
              <p className="text-white/60 text-xs">Istanbul 🇹🇷</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star size={10} style={{ color: '#c9a84c' }} fill="#c9a84c" />
            <span className="text-white/70 text-xs">88% match</span>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-32 animate-float" style={{ animationDelay: '1s' }}>
        <div className="glass rounded-xl p-3 w-36" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: '#2d6fa5' }}>FM</div>
            <div>
              <p className="text-white text-xs font-semibold">Fatima M.</p>
              <p className="text-white/60 text-xs">Kuala Lumpur 🇲🇾</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star size={10} style={{ color: '#c9a84c' }} fill="#c9a84c" />
            <span className="text-white/70 text-xs">95% match</span>
          </div>
        </div>
      </div>

      {/* New match notification */}
      <div className="absolute right-2 top-16 animate-fade-in">
        <div className="glass rounded-xl px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          <p className="text-white text-xs font-medium">✨ New match!</p>
          <p className="text-white/60 text-xs">3 new profiles today</p>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useLang()
  return (
    <section
      className="relative min-h-screen flex items-center hero-gradient pattern-overlay overflow-hidden"
      style={{ paddingTop: 64 }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }} />
      <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #2d9b6f 0%, transparent 70%)' }} />

      {/* Islamic star decorative */}
      <div className="absolute top-20 right-10 opacity-5 animate-spin-slow pointer-events-none" style={{ fontSize: 120 }}>
        ✦
      </div>
      <div className="absolute bottom-20 left-10 opacity-5 pointer-events-none" style={{ fontSize: 80 }}>
        ✦
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass text-white/90 text-sm font-medium">
              <span style={{ color: '#c9a84c' }}>✦</span>
              {t.hero_badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t.hero_title1}{' '}
              <span
                className="relative"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #e8c96e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t.hero_title2}
              </span>
            </h1>

            <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {t.hero_subtitle}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mb-8">
              {[
                { value: '2M+', label: t.common_members },
                { value: '50+', label: 'Countries' },
                { value: '13',  label: 'Languages' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/60 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96e)', color: '#1a1a2e' }}
              >
                {t.hero_cta_free}
                <ChevronRight size={18} />
              </Link>
              <Link
                to="/download"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white glass transition-all hover:bg-white/20 hover:-translate-y-0.5"
              >
                {t.nav_download}
                <span className="text-lg">📱</span>
              </Link>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
              {[
                '🔒 Private & Secure',
                '✅ Verified Profiles',
                '🕌 Halal Community',
                '👨‍👩‍👧 Wali Mode',
              ].map(chip => (
                <span
                  key={chip}
                  className="text-xs px-3 py-1.5 rounded-full text-white/80 glass"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex items-center justify-center">
            <PhoneMockup />
          </div>
        </div>

        {/* Country flags scroll */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-center text-white/50 text-xs uppercase tracking-widest mb-4">Muslims worldwide use Nikah</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['🇺🇸','🇬🇧','🇨🇦','🇫🇷','🇩🇪','🇹🇷','🇸🇦','🇦🇪','🇵🇰','🇮🇳','🇧🇩','🇲🇾','🇮🇩','🇪🇬','🇲🇦','🇩🇿','🇸🇴','🇳🇬','🇿🇦','🇶🇦'].map((flag, i) => (
              <span key={i} className="text-2xl opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-default select-none">{flag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
