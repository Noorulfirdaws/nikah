import { useState } from 'react'
import { Globe } from 'lucide-react'

const LANGUAGES = [
  { code: 'EN', name: 'English', native: 'English', dir: 'ltr', members: '2.4M+', flag: '🇬🇧', sample: 'Find your soulmate the halal way' },
  { code: 'AR', name: 'Arabic', native: 'العربية', dir: 'rtl', members: '1.8M+', flag: '🇸🇦', sample: 'ابحث عن شريك حياتك بالطريقة الحلال' },
  { code: 'FR', name: 'French', native: 'Français', dir: 'ltr', members: '890K+', flag: '🇫🇷', sample: 'Trouvez votre âme sœur de façon halal' },
  { code: 'TR', name: 'Turkish', native: 'Türkçe', dir: 'ltr', members: '720K+', flag: '🇹🇷', sample: 'Helal yolda ruh eşinizi bulun' },
  { code: 'UR', name: 'Urdu', native: 'اردو', dir: 'rtl', members: '1.1M+', flag: '🇵🇰', sample: 'حلال طریقے سے اپنا ہمسفر تلاش کریں' },
  { code: 'HI', name: 'Hindi', native: 'हिन्दी', dir: 'ltr', members: '650K+', flag: '🇮🇳', sample: 'हलाल तरीके से अपना जीवनसाथी खोजें' },
  { code: 'BN', name: 'Bengali', native: 'বাংলা', dir: 'ltr', members: '540K+', flag: '🇧🇩', sample: 'হালাল পথে আপনার জীবনসঙ্গী খুঁজুন' },
  { code: 'ID', name: 'Bahasa Indonesia', native: 'Bahasa Indonesia', dir: 'ltr', members: '980K+', flag: '🇮🇩', sample: 'Temukan jodoh Anda dengan cara halal' },
  { code: 'MS', name: 'Malay', native: 'Bahasa Melayu', dir: 'ltr', members: '420K+', flag: '🇲🇾', sample: 'Cari pasangan anda dengan cara halal' },
  { code: 'SO', name: 'Somali', native: 'Af Soomaali', dir: 'ltr', members: '185K+', flag: '🇸🇴', sample: 'La raad qabso lammaankaaga xalalka ah' },
  { code: 'SW', name: 'Swahili', native: 'Kiswahili', dir: 'ltr', members: '210K+', flag: '🇰🇪', sample: 'Tafuta mwenzi wako kwa njia ya halali' },
  { code: 'DE', name: 'German', native: 'Deutsch', dir: 'ltr', members: '310K+', flag: '🇩🇪', sample: 'Finden Sie Ihre Seele auf halal Weise' },
  { code: 'ES', name: 'Spanish', native: 'Español', dir: 'ltr', members: '280K+', flag: '🇪🇸', sample: 'Encuentra tu alma gemela de forma halal' },
]

export default function LanguageSupport() {
  const [selected, setSelected] = useState('EN')
  const current = LANGUAGES.find(l => l.code === selected) || LANGUAGES[0]

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
              Nikah is fully available in 13 languages, with right-to-left support for Arabic and Urdu. Every Muslim deserves to navigate their marriage journey in the language closest to their heart.
            </p>

            {/* Language grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setSelected(lang.code)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selected === lang.code
                      ? 'text-white shadow-lg'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                  style={
                    selected === lang.code
                      ? { background: 'linear-gradient(135deg, #c9a84c, #e8c96e)', color: '#1a1a2e' }
                      : { background: 'rgba(255,255,255,0.07)' }
                  }
                >
                  <span>{lang.flag}</span>
                  <span className="truncate">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: language preview card */}
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
                  <span className="text-xs font-medium" style={{ color: '#c9a84c' }}>{current.members}</span>
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

              {/* App UI preview in selected language */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-white/60 text-xs">Interface</span>
                  <span className="text-white text-xs font-medium">{current.native} ✓</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-white/60 text-xs">Notifications</span>
                  <span className="text-white text-xs font-medium">{current.native} ✓</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-white/60 text-xs">Support</span>
                  <span className="text-white text-xs font-medium">{current.native} ✓</span>
                </div>
              </div>

              {/* Members */}
              <div className="mt-4 p-3 rounded-xl text-center" style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <p className="text-xs" style={{ color: '#c9a84c' }}>{current.members} members use {current.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
