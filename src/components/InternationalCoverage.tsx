import { useState } from 'react'
import { Search, Users, MapPin, X, ArrowRight, Heart, ShieldCheck, Globe, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../lib/LanguageContext'

// ─── Data ─────────────────────────────────────────────────────────────────────

const COUNTRIES = [
  {
    code: 'US', name: 'United States',  members: '340K+', region: 'Americas',
    color: '#1e40af', bg: '#dbeafe',
    capital: 'Washington D.C.', languages: ['English', 'Arabic', 'Urdu'],
    cities: ['New York', 'Chicago', 'Los Angeles', 'Houston', 'Detroit'],
    muslimPop: '3.85 million', verified: '28K+', matches: '12K+', successStories: '1,840',
    about: 'A large and growing Muslim community with members from South Asia, the Middle East, and Africa. Major Islamic centres in NYC, Chicago, and Detroit.',
  },
  {
    code: 'GB', name: 'United Kingdom', members: '280K+', region: 'Europe',
    color: '#1e3a8a', bg: '#dbeafe',
    capital: 'London', languages: ['English', 'Urdu', 'Bengali', 'Arabic'],
    cities: ['London', 'Birmingham', 'Manchester', 'Bradford', 'Leeds'],
    muslimPop: '3.9 million', verified: '22K+', matches: '9K+', successStories: '1,420',
    about: 'One of the most active Nikah communities in Europe. Large Bangladeshi, Pakistani, and Arab communities across London and the Midlands.',
  },
  {
    code: 'CA', name: 'Canada',         members: '120K+', region: 'Americas',
    color: '#991b1b', bg: '#fee2e2',
    capital: 'Ottawa', languages: ['English', 'French', 'Arabic', 'Urdu'],
    cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa'],
    muslimPop: '1.77 million', verified: '10K+', matches: '4K+', successStories: '610',
    about: 'A diverse Muslim population spread across Toronto, Montreal and Vancouver. Strong interfaith community networks and Islamic centres.',
  },
  {
    code: 'FR', name: 'France',         members: '190K+', region: 'Europe',
    color: '#1d4ed8', bg: '#dbeafe',
    capital: 'Paris', languages: ['French', 'Arabic', 'Berber'],
    cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Strasbourg'],
    muslimPop: '5.7 million', verified: '14K+', matches: '6K+', successStories: '820',
    about: 'The largest Muslim population in Western Europe, primarily of North African (Maghrebi) heritage. A growing demand for halal marriage services.',
  },
  {
    code: 'DE', name: 'Germany',        members: '140K+', region: 'Europe',
    color: '#374151', bg: '#f3f4f6',
    capital: 'Berlin', languages: ['German', 'Turkish', 'Arabic'],
    cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
    muslimPop: '5.0 million', verified: '11K+', matches: '5K+', successStories: '540',
    about: 'A prominent Turkish-German and Arab Muslim community with strong cultural identity and growing demand for faith-based matchmaking.',
  },
  {
    code: 'TR', name: 'Turkey',         members: '420K+', region: 'Middle East',
    color: '#b91c1c', bg: '#fee2e2',
    capital: 'Ankara', languages: ['Turkish', 'Arabic', 'Kurdish'],
    cities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
    muslimPop: '84 million', verified: '36K+', matches: '18K+', successStories: '4,200',
    about: 'One of our largest user bases. Turkey has a deeply rooted Islamic marriage culture and a highly engaged Nikah community.',
  },
  {
    code: 'SA', name: 'Saudi Arabia',   members: '310K+', region: 'Middle East',
    color: '#166534', bg: '#dcfce7',
    capital: 'Riyadh', languages: ['Arabic'],
    cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
    muslimPop: '35 million', verified: '29K+', matches: '13K+', successStories: '3,100',
    about: 'At the heart of the Muslim world. A conservative, faith-first community where wali involvement and family approval are central to the process.',
  },
  {
    code: 'AE', name: 'UAE',            members: '260K+', region: 'Middle East',
    color: '#065f46', bg: '#d1fae5',
    capital: 'Abu Dhabi', languages: ['Arabic', 'English', 'Urdu', 'Hindi'],
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
    muslimPop: '4.5 million', verified: '21K+', matches: '10K+', successStories: '2,100',
    about: 'A cosmopolitan Muslim hub with members from across the Arab world, South Asia, and beyond. High engagement from expat communities.',
  },
  {
    code: 'QA', name: 'Qatar',          members: '85K+',  region: 'Middle East',
    color: '#7c3aed', bg: '#ede9fe',
    capital: 'Doha', languages: ['Arabic', 'English', 'Urdu'],
    cities: ['Doha', 'Al Wakrah', 'Al Khor'],
    muslimPop: '2.0 million', verified: '7K+', matches: '3K+', successStories: '420',
    about: 'A small but highly engaged community. Many expat professionals seeking serious nikah partners across the GCC region.',
  },
  {
    code: 'EG', name: 'Egypt',          members: '380K+', region: 'Africa',
    color: '#92400e', bg: '#fef3c7',
    capital: 'Cairo', languages: ['Arabic'],
    cities: ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan'],
    muslimPop: '87 million', verified: '32K+', matches: '15K+', successStories: '3,600',
    about: 'A deeply rooted Islamic culture centred on family values. Al-Azhar influence makes Egypt one of our most faith-aligned communities.',
  },
  {
    code: 'MA', name: 'Morocco',        members: '220K+', region: 'Africa',
    color: '#9a3412', bg: '#ffedd5',
    capital: 'Rabat', languages: ['Arabic', 'French', 'Berber'],
    cities: ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier'],
    muslimPop: '36 million', verified: '18K+', matches: '8K+', successStories: '1,980',
    about: 'A vibrant Moroccan Muslim community both at home and across the diaspora in France, Spain, and Belgium.',
  },
  {
    code: 'DZ', name: 'Algeria',        members: '175K+', region: 'Africa',
    color: '#166534', bg: '#dcfce7',
    capital: 'Algiers', languages: ['Arabic', 'French', 'Berber'],
    cities: ['Algiers', 'Oran', 'Constantine', 'Annaba'],
    muslimPop: '45 million', verified: '13K+', matches: '5K+', successStories: '1,200',
    about: 'A fast-growing community with strong ties to the Algerian diaspora in France and across North Africa.',
  },
  {
    code: 'PK', name: 'Pakistan',       members: '490K+', region: 'South Asia',
    color: '#065f46', bg: '#d1fae5',
    capital: 'Islamabad', languages: ['Urdu', 'English', 'Punjabi', 'Sindhi', 'Pashto'],
    cities: ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi'],
    muslimPop: '225 million', verified: '43K+', matches: '22K+', successStories: '5,800',
    about: 'Our largest community in South Asia. Pakistani users are highly active with strong family involvement and wali participation.',
  },
  {
    code: 'IN', name: 'India',          members: '520K+', region: 'South Asia',
    color: '#b45309', bg: '#fef3c7',
    capital: 'New Delhi', languages: ['Urdu', 'Hindi', 'Bengali', 'Tamil', 'Malayalam'],
    cities: ['Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Kolkata'],
    muslimPop: '200 million', verified: '46K+', matches: '24K+', successStories: '6,200',
    about: 'Our largest single user base. India\'s Muslim community spans many linguistic and cultural groups, united by faith and family values.',
  },
  {
    code: 'BD', name: 'Bangladesh',     members: '300K+', region: 'South Asia',
    color: '#166534', bg: '#dcfce7',
    capital: 'Dhaka', languages: ['Bengali', 'English', 'Arabic'],
    cities: ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi'],
    muslimPop: '153 million', verified: '26K+', matches: '11K+', successStories: '2,900',
    about: 'A majority-Muslim nation with a deeply family-oriented culture. Diaspora communities in the UK and US are also highly active.',
  },
  {
    code: 'MY', name: 'Malaysia',       members: '210K+', region: 'Southeast Asia',
    color: '#1d4ed8', bg: '#dbeafe',
    capital: 'Kuala Lumpur', languages: ['Malay', 'English', 'Mandarin', 'Tamil'],
    cities: ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Kota Kinabalu'],
    muslimPop: '20 million', verified: '17K+', matches: '7K+', successStories: '1,500',
    about: 'A progressive Muslim-majority nation where faith and modernity coexist. Strong interfaith community structures support halal matchmaking.',
  },
  {
    code: 'ID', name: 'Indonesia',      members: '650K+', region: 'Southeast Asia',
    color: '#b91c1c', bg: '#fee2e2',
    capital: 'Jakarta', languages: ['Bahasa Indonesia', 'Javanese', 'Arabic', 'English'],
    cities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar'],
    muslimPop: '240 million', verified: '58K+', matches: '32K+', successStories: '8,400',
    about: 'The world\'s largest Muslim country and our biggest user community. Nikah is deeply embraced as the halal alternative to conventional dating apps.',
  },
  {
    code: 'SO', name: 'Somalia',        members: '95K+',  region: 'Africa',
    color: '#1d4ed8', bg: '#dbeafe',
    capital: 'Mogadishu', languages: ['Somali', 'Arabic', 'English'],
    cities: ['Mogadishu', 'Hargeisa', 'Kismayo'],
    muslimPop: '17 million', verified: '7K+', matches: '3K+', successStories: '520',
    about: 'A community defined by resilience and faith. Active Somali diaspora communities in the US, UK, and Scandinavia also use Nikah.',
  },
  {
    code: 'NG', name: 'Nigeria',        members: '285K+', region: 'Africa',
    color: '#166534', bg: '#dcfce7',
    capital: 'Abuja', languages: ['English', 'Hausa', 'Yoruba', 'Arabic'],
    cities: ['Lagos', 'Kano', 'Abuja', 'Ibadan', 'Kaduna'],
    muslimPop: '99 million', verified: '23K+', matches: '10K+', successStories: '2,300',
    about: 'Nigeria has one of Africa\'s most vibrant Muslim communities. The northern states have a strong Islamic marriage tradition.',
  },
  {
    code: 'ZA', name: 'South Africa',   members: '110K+', region: 'Africa',
    color: '#065f46', bg: '#d1fae5',
    capital: 'Cape Town', languages: ['English', 'Afrikaans', 'Zulu', 'Arabic'],
    cities: ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria'],
    muslimPop: '1.9 million', verified: '8K+', matches: '3K+', successStories: '480',
    about: 'A close-knit Muslim community with roots in Malay, Indian, and African heritage. Cape Town has a particularly active Nikah user base.',
  },
]

const REGIONS = ['All', 'Middle East', 'South Asia', 'Europe', 'Americas', 'Africa', 'Southeast Asia']

// ─── Flag badge (always reliable — no external CDN) ────────────────────────────

function FlagBadge({ code, color }: { code: string; color: string; bg?: string }) {
  return (
    <div
      className="w-14 h-10 rounded-xl flex items-center justify-center font-bold text-sm tracking-wide flex-shrink-0"
      style={{ background: color, color: '#fff' }}
    >
      {code}
    </div>
  )
}

// ─── Country Detail Drawer ─────────────────────────────────────────────────────

function CountryDrawer({ country, onClose }: { country: typeof COUNTRIES[0]; onClose: () => void }) {
  const navigate = useNavigate()

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <FlagBadge code={country.code} color={country.color} bg={country.bg} />
            <div>
              <h2 className="text-lg font-bold text-gray-900">{country.name}</h2>
              <p className="text-xs text-gray-400">{country.capital} · {country.region}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 py-6 space-y-6">
          {/* About */}
          <p className="text-sm text-gray-600 leading-relaxed">{country.about}</p>

          {/* Community stats */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Community Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users,       label: 'Nikah Members',   value: country.members        },
                { icon: ShieldCheck, label: 'Verified',         value: country.verified       },
                { icon: Heart,       label: 'Active Matches',   value: country.matches        },
                { icon: Globe,       label: 'Muslim Population',value: country.muslimPop      },
              ].map(s => (
                <div key={s.label} className="rounded-2xl p-4 border border-gray-100" style={{ background: country.bg }}>
                  <s.icon size={16} style={{ color: country.color }} className="mb-2" />
                  <p className="text-lg font-bold text-gray-800">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Success stories */}
          <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: 'rgba(26,107,74,0.06)' }}>
            <div className="text-3xl">💍</div>
            <div>
              <p className="font-bold text-gray-800">{country.successStories} success stories</p>
              <p className="text-xs text-gray-500 mt-0.5">couples who found their match in {country.name}</p>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Languages spoken</h3>
            <div className="flex flex-wrap gap-2">
              {country.languages.map(l => (
                <span key={l} className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 text-gray-600">
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Major cities */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Major cities</h3>
            <div className="space-y-1.5">
              {country.cities.map(city => (
                <div key={city} className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-5 border-t border-gray-100 flex-shrink-0 space-y-3">
          <button
            onClick={() => navigate(`/signup?country=${encodeURIComponent(country.name)}`)}
            className="w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
          >
            Find Matches in {country.name}
            <ArrowRight size={16} />
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Back to all countries
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function InternationalCoverage() {
  const { t } = useLang()
  const [search,   setSearch]   = useState('')
  const [region,   setRegion]   = useState('All')
  const [selected, setSelected] = useState<typeof COUNTRIES[0] | null>(null)

  const filtered = COUNTRIES.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchRegion = region === 'All' || c.region === region
    return matchSearch && matchRegion
  })

  function highlight(text: string) {
    if (!search) return <>{text}</>
    const idx = text.toLowerCase().indexOf(search.toLowerCase())
    if (idx === -1) return <>{text}</>
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-200 text-gray-900 rounded px-0.5">{text.slice(idx, idx + search.length)}</mark>
        {text.slice(idx + search.length)}
      </>
    )
  }

  return (
    <>
      {selected && <CountryDrawer country={selected} onClose={() => setSelected(null)} />}

      <section id="coverage" className="py-20 lg:py-28" style={{ background: '#fffef9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>
              {t.cov_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
              {t.cov_title}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              {t.cov_subtitle}
            </p>
          </div>

          {/* Search */}
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder={t.common_search}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl border border-gray-200 bg-white text-sm outline-none shadow-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>
            {search && (
              <p className="text-xs text-gray-400 mt-2 text-center">
                {filtered.length === 0
                  ? 'No countries found'
                  : `${filtered.length} countr${filtered.length === 1 ? 'y' : 'ies'} found`}
              </p>
            )}
          </div>

          {/* Region tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={
                  region === r
                    ? { background: '#1a6b4a', color: 'white' }
                    : { background: '#f0f0f0', color: '#555' }
                }
              >
                {r}
                {r !== 'All' && (
                  <span className="ml-1.5 text-xs opacity-60">
                    ({COUNTRIES.filter(c => c.region === r).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Country grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filtered.map(country => (
                <button
                  key={country.name}
                  onClick={() => setSelected(country)}
                  className="group text-left rounded-2xl p-4 bg-white border border-gray-100 hover:border-emerald-300 hover:shadow-lg transition-all cursor-pointer"
                >
                  <FlagBadge code={country.code} color={country.color} bg={country.bg} />

                  <p className="font-semibold text-sm text-gray-800 group-hover:text-emerald-700 transition-colors leading-tight mt-3">
                    {highlight(country.name)}
                  </p>
                  <div className="flex items-center gap-1 mt-1 mb-2">
                    <Users size={11} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{country.members}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: country.bg, color: country.color }}
                    >
                      {country.region}
                    </span>
                    <ChevronRight size={13} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <MapPin size={44} className="mx-auto mb-3 opacity-30" />
              <p className="text-base font-medium text-gray-500">No countries found</p>
              <p className="text-sm mt-1">Try a different name or select "All" regions</p>
              <button
                onClick={() => { setSearch(''); setRegion('All') }}
                className="mt-4 px-5 py-2 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: '#1a6b4a' }}
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Bottom stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50+',  label: 'Countries',       emoji: '🌍' },
              { value: '6M+',  label: 'Active Members',  emoji: '👥' },
              { value: '42K+', label: 'Success Stories', emoji: '💍' },
              { value: '24/7', label: 'Support',         emoji: '🛡️' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(26,107,74,0.05), rgba(26,107,74,0.08))' }}>
                <div className="text-3xl mb-1">{stat.emoji}</div>
                <p className="text-2xl font-bold mb-0.5" style={{ color: '#1a6b4a' }}>{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
