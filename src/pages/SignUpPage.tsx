import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Check, ChevronRight, Eye, EyeOff, User, Mail, Lock,
  MapPin, Globe, Heart, AlertTriangle, Info, Star, Users, Zap,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import PasswordStrength from '../components/PasswordStrength'
import { sanitizePlan, isValidEmail, LIMITS, type PlanId } from '../lib/security'

// ─── Plan definitions ─────────────────────────────────────────────────────────

const PLANS: {
  id: PlanId
  name: string
  price: string
  period: string
  icon: React.ElementType
  color: string
  bg: string
  badge?: string
  features: string[]
}[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    icon: Zap,
    color: '#6b7280',
    bg: 'rgba(107,114,128,0.08)',
    features: [
      'Create a full profile',
      'Browse up to 20 profiles/day',
      'Send 5 messages/month',
      'Basic match suggestions',
      'Safety reporting tools',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    icon: Star,
    color: '#b8942d',
    bg: 'rgba(201,168,76,0.10)',
    badge: 'Most popular',
    features: [
      'Unlimited profile browsing',
      'Unlimited messaging',
      'Advanced match filters',
      'See who liked your profile',
      'Priority customer support',
      'Profile boost (2× per month)',
      '7-day free trial',
    ],
  },
  {
    id: 'family',
    name: 'Family',
    price: '$24.99',
    period: '/month',
    icon: Users,
    color: '#1a6b4a',
    bg: 'rgba(26,107,74,0.08)',
    badge: 'Best value',
    features: [
      'Everything in Premium',
      'Up to 4 family members',
      'Wali/guardian dashboard',
      'Family-supervised chat mode',
      'Dedicated family advisor',
      'Monthly family match report',
      '7-day free trial',
    ],
  },
]

// ─── Step definitions ─────────────────────────────────────────────────────────

const STEPS = [
  { id: 0, label: 'Plan',     icon: Star    },
  { id: 1, label: 'Account',  icon: User    },
  { id: 2, label: 'Faith',    icon: Heart   },
  { id: 3, label: 'Location', icon: MapPin  },
  { id: 4, label: 'Profile',  icon: Globe   },
]

const SECTS        = ['Sunni — Hanafi', 'Sunni — Maliki', "Sunni — Shafi'i", 'Sunni — Hanbali', 'Shia', 'Ibadi', 'Prefer not to say', 'Other']
const PRAYER_LEVELS= ['5 times daily', 'Mostly daily', 'Sometimes', 'Working on it', 'Prefer not to say']
const LANGUAGES    = ['English', 'Arabic', 'French', 'Turkish', 'Urdu', 'Hindi', 'Bengali', 'Bahasa Indonesia', 'Malay', 'Somali', 'German', 'Spanish']
const TIMELINES    = ['Ready now', 'Within 6 months', 'Within a year', '1–2 years', 'When the right person comes']
const COUNTRIES    = ['United States', 'United Kingdom', 'Canada', 'France', 'Germany', 'Turkey', 'Saudi Arabia', 'UAE', 'Pakistan', 'India', 'Bangladesh', 'Indonesia', 'Malaysia', 'Egypt', 'Morocco', 'Other']
const INTERESTS    = ['Quran & Islamic studies', 'Travel', 'Cooking', 'Fitness', 'Reading', 'Community service', 'Entrepreneurship', 'Nature & outdoors', 'Art & design', 'Technology', 'Music (halal)', 'Sports']

// ─── Component ────────────────────────────────────────────────────────────────

export default function SignUpPage() {
  const [params] = useSearchParams()
  const initialPlan = sanitizePlan(params.get('plan'))

  const [step,         setStep]         = useState<number>(initialPlan !== 'free' ? 1 : 0)
  const [plan,         setPlan]         = useState<PlanId>(initialPlan)
  const [showPass,     setShowPass]     = useState(false)
  const [submitted,    setSubmitted]    = useState(false)
  const [submitting,   setSubmitting]   = useState(false)
  const [lastSubmitMs, setLastSubmitMs] = useState(0)
  const [emailError,   setEmailError]   = useState('')

  const [form, setForm] = useState({
    gender:      '',
    firstName:   '',
    lastName:    '',
    email:       '',
    password:    '',
    age:         '',
    sect:        '',
    prayerLevel: '',
    lifestyle:   [] as string[],
    timeline:    '',
    country:     '',
    city:        '',
    languages:   [] as string[],
    interests:   [] as string[],
    bio:         '',
  })

  const set = (k: keyof typeof form, v: string | string[]) => {
    if (k === 'email') setEmailError('')
    setForm(f => ({ ...f, [k]: v }))
  }

  const toggle = (k: 'lifestyle' | 'languages' | 'interests', v: string) => {
    setForm(f => ({
      ...f,
      [k]: (f[k] as string[]).includes(v)
        ? (f[k] as string[]).filter(x => x !== v)
        : [...(f[k] as string[]), v],
    }))
  }

  const canNext = () => {
    if (step === 0) return true // plan always selected (defaults to free)
    if (step === 1) return (
      form.gender &&
      form.firstName.trim() &&
      isValidEmail(form.email) &&
      form.password.length >= 8 &&
      form.age
    )
    if (step === 2) return form.sect && form.prayerLevel && form.timeline
    if (step === 3) return form.country && form.languages.length > 0
    return true
  }

  const handleNext = () => {
    if (step === 1 && !isValidEmail(form.email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    if (step < 4) {
      setStep(s => s + 1)
      return
    }
    const now = Date.now()
    if (submitting || now - lastSubmitMs < 5000) return
    setSubmitting(true)
    setLastSubmitMs(now)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 700)
  }

  const activePlan = PLANS.find(p => p.id === plan)!

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#faf8f4', paddingTop: 64 }}>
        <div className="max-w-md w-full text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
            style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
          >
            💍
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Nikah, {form.firstName}!</h2>
          <p className="text-gray-500 mb-1 text-sm leading-relaxed">
            Your profile has been created. We're reviewing your information and will notify you soon.
          </p>
          <p className="text-gray-400 text-xs mb-5">
            Confirmation sent to <strong>{form.email}</strong>
          </p>

          {/* Plan confirmation card */}
          <div
            className="rounded-2xl p-4 mb-4 text-left border"
            style={{ background: activePlan.bg, borderColor: activePlan.color + '33' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <activePlan.icon size={16} style={{ color: activePlan.color }} />
              <span className="font-bold text-sm" style={{ color: activePlan.color }}>
                {activePlan.name} Plan activated
              </span>
              {(plan === 'premium' || plan === 'family') && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: activePlan.color, color: '#fff' }}>
                  7-day free trial
                </span>
              )}
            </div>
            <ul className="space-y-1">
              {activePlan.features.slice(0, 4).map(f => (
                <li key={f} className="text-xs text-gray-600 flex items-center gap-1.5">
                  <Check size={11} style={{ color: activePlan.color }} />
                  {f}
                </li>
              ))}
            </ul>
            {plan === 'free' && (
              <Link
                to="/signup?plan=premium"
                className="mt-3 inline-block text-xs font-semibold hover:underline"
                style={{ color: '#b8942d' }}
              >
                ✨ Upgrade to Premium →
              </Link>
            )}
          </div>

          {/* Safety reminder */}
          <div className="p-4 rounded-2xl text-left mb-4 border" style={{ background: 'rgba(201,58,58,0.05)', borderColor: 'rgba(201,58,58,0.2)' }}>
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">🛡️ Stay safe — read before you browse</p>
                <ul className="text-xs text-gray-600 space-y-1 leading-relaxed">
                  <li>• <strong>Never send money</strong> to someone you have not met in person</li>
                  <li>• Keep conversations on Nikah until you fully trust someone</li>
                  <li>• Involve your wali — it's both halal and a safety measure</li>
                  <li>• Report suspicious profiles immediately via the flag icon</li>
                </ul>
                <Link to="/safety" className="text-xs font-medium mt-2 inline-block hover:underline" style={{ color: '#c94a4a' }}>
                  Read our full safety guide →
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full py-3.5 rounded-2xl font-semibold text-white text-center transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
            >
              Explore Nikah
            </Link>
            <Link to="/download" className="block w-full py-3 rounded-2xl font-semibold text-gray-700 text-center border border-gray-200 hover:bg-gray-50 transition-colors text-sm">
              Download the App
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#faf8f4' }}>
      <PageHero
        label="✨ Join Nikah"
        title="Create Your"
        titleHighlight="Free Profile"
        subtitle="Find your soulmate the halal way. Takes less than 5 minutes."
      />

      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Demo disclaimer */}
        <div className="flex items-start gap-2 px-4 py-3 rounded-xl mb-6 text-xs text-blue-700 border border-blue-100" style={{ background: '#eff6ff' }}>
          <Info size={14} className="flex-shrink-0 mt-0.5 text-blue-500" />
          <span>
            <strong>Demo only</strong> — no real account is created and no data is transmitted or stored. This is a front-end prototype.
          </span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto pb-1">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const done   = step > s.id
            const active = step === s.id
            return (
              <div key={s.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: done ? '#1a6b4a' : active ? 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' : '#e5e5e5',
                      color: done || active ? 'white' : '#999',
                    }}
                  >
                    {done ? <Check size={16} /> : <Icon size={16} />}
                  </div>
                  <span className="text-xs mt-1 font-medium whitespace-nowrap" style={{ color: active ? '#1a6b4a' : done ? '#1a6b4a' : '#999' }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="w-8 sm:w-12 h-0.5 mx-1 mb-4 rounded-full transition-all flex-shrink-0"
                    style={{ background: step > s.id ? '#1a6b4a' : '#e5e5e5' }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg p-7 border border-gray-100">

          {/* ── Step 0: Plan selection ── */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Choose your plan</h3>
                <p className="text-sm text-gray-400">You can upgrade or change at any time</p>
              </div>
              <div className="space-y-3">
                {PLANS.map(p => {
                  const Icon    = p.icon
                  const selected = plan === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPlan(p.id)}
                      className="w-full text-left rounded-2xl border-2 p-4 transition-all"
                      style={{
                        borderColor: selected ? p.color : '#e5e5e5',
                        background:  selected ? p.bg : 'white',
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: p.bg }}>
                            <Icon size={18} style={{ color: p.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-gray-800">{p.name}</span>
                              {p.badge && (
                                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: p.color, color: '#fff' }}>
                                  {p.badge}
                                </span>
                              )}
                            </div>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-lg font-bold" style={{ color: p.color }}>{p.price}</span>
                              <span className="text-xs text-gray-400">{p.period}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                          style={{ borderColor: selected ? p.color : '#d1d5db', background: selected ? p.color : 'white' }}
                        >
                          {selected && <Check size={11} className="text-white" />}
                        </div>
                      </div>
                      {selected && (
                        <ul className="mt-3 space-y-1 pl-12">
                          {p.features.map(f => (
                            <li key={f} className="text-xs text-gray-500 flex items-center gap-1.5">
                              <Check size={10} style={{ color: p.color }} className="flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Step 1: Account ── */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Create your account</h3>
                  <p className="text-sm text-gray-400">Start with the basics</p>
                </div>
                {/* Plan badge */}
                <span
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0"
                  style={{ background: activePlan.bg, color: activePlan.color }}
                >
                  <activePlan.icon size={11} />
                  {activePlan.name}
                </span>
              </div>
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Brother', 'Sister'].map(g => (
                    <button
                      key={g}
                      onClick={() => set('gender', g)}
                      className="py-3 rounded-xl text-sm font-medium border-2 transition-all"
                      style={{
                        borderColor: form.gender === g ? '#1a6b4a' : '#e5e5e5',
                        background:  form.gender === g ? 'rgba(26,107,74,0.07)' : 'white',
                        color:       form.gender === g ? '#1a6b4a' : '#555',
                      }}
                    >
                      {g === 'Brother' ? '👨 Brother' : '👩 Sister'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => set('firstName', e.target.value)}
                    placeholder="Ahmed"
                    maxLength={LIMITS.name}
                    autoComplete="given-name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => set('lastName', e.target.value)}
                    placeholder="Hassan"
                    maxLength={LIMITS.name}
                    autoComplete="family-name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={e => set('age', e.target.value)}
                  placeholder="25"
                  min="18"
                  max="65"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Mail size={14} /> Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="you@email.com"
                  maxLength={LIMITS.email}
                  autoComplete="email"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-1 transition-colors ${emailError ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-200'}`}
                />
                {emailError && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertTriangle size={11} /> {emailError}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Lock size={14} /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                    placeholder="8+ characters"
                    maxLength={LIMITS.password}
                    autoComplete="new-password"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <PasswordStrength password={form.password} />
              </div>
            </div>
          )}

          {/* ── Step 2: Faith ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Faith &amp; values</h3>
                <p className="text-sm text-gray-400">Help us find your most compatible matches</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sect &amp; Tradition</label>
                <div className="grid grid-cols-2 gap-2">
                  {SECTS.map(s => (
                    <button
                      key={s}
                      onClick={() => set('sect', s)}
                      className="py-2.5 px-3 rounded-xl text-xs font-medium border-2 transition-all text-left"
                      style={{
                        borderColor: form.sect === s ? '#1a6b4a' : '#e5e5e5',
                        background:  form.sect === s ? 'rgba(26,107,74,0.07)' : 'white',
                        color:       form.sect === s ? '#1a6b4a' : '#555',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prayer Practice</label>
                <div className="space-y-2">
                  {PRAYER_LEVELS.map(p => (
                    <button
                      key={p}
                      onClick={() => set('prayerLevel', p)}
                      className="w-full py-2.5 px-4 rounded-xl text-sm border-2 transition-all text-left flex items-center justify-between"
                      style={{
                        borderColor: form.prayerLevel === p ? '#1a6b4a' : '#e5e5e5',
                        background:  form.prayerLevel === p ? 'rgba(26,107,74,0.07)' : 'white',
                        color:       form.prayerLevel === p ? '#1a6b4a' : '#555',
                      }}
                    >
                      {p}
                      {form.prayerLevel === p && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marriage Timeline</label>
                <div className="space-y-2">
                  {TIMELINES.map(t => (
                    <button
                      key={t}
                      onClick={() => set('timeline', t)}
                      className="w-full py-2.5 px-4 rounded-xl text-sm border-2 transition-all text-left flex items-center justify-between"
                      style={{
                        borderColor: form.timeline === t ? '#1a6b4a' : '#e5e5e5',
                        background:  form.timeline === t ? 'rgba(26,107,74,0.07)' : 'white',
                        color:       form.timeline === t ? '#1a6b4a' : '#555',
                      }}
                    >
                      {t}
                      {form.timeline === t && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Location ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Location &amp; language</h3>
                <p className="text-sm text-gray-400">Where are you and what languages do you speak?</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                <select
                  value={form.country}
                  onChange={e => set('country', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 bg-white"
                >
                  <option value="">Select country…</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City (optional)</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => set('city', e.target.value)}
                  placeholder="e.g. London"
                  maxLength={LIMITS.city}
                  autoComplete="address-level2"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages I Speak <span className="text-gray-400 font-normal text-xs">(select all)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map(l => (
                    <button
                      key={l}
                      onClick={() => toggle('languages', l)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all"
                      style={{
                        borderColor: form.languages.includes(l) ? '#1a6b4a' : '#e5e5e5',
                        background:  form.languages.includes(l) ? 'rgba(26,107,74,0.1)' : 'white',
                        color:       form.languages.includes(l) ? '#1a6b4a' : '#555',
                      }}
                    >
                      {form.languages.includes(l) ? '✓ ' : ''}{l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 4: Profile ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">About you</h3>
                <p className="text-sm text-gray-400">Let potential matches get to know you</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests <span className="text-gray-400 font-normal text-xs">(choose up to 8)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map(interest => (
                    <button
                      key={interest}
                      onClick={() => {
                        if (form.interests.includes(interest) || form.interests.length < 8)
                          toggle('interests', interest)
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all"
                      style={{
                        borderColor: form.interests.includes(interest) ? '#1a6b4a' : '#e5e5e5',
                        background:  form.interests.includes(interest) ? 'rgba(26,107,74,0.1)' : 'white',
                        color:       form.interests.includes(interest) ? '#1a6b4a' : '#555',
                        opacity:     !form.interests.includes(interest) && form.interests.length >= 8 ? 0.5 : 1,
                      }}
                    >
                      {form.interests.includes(interest) ? '✓ ' : ''}{interest}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Short Bio <span className="text-gray-400 font-normal text-xs">(optional)</span>
                </label>
                <textarea
                  value={form.bio}
                  onChange={e => set('bio', e.target.value)}
                  placeholder="Share a bit about who you are, your values, and what you're looking for in a spouse…"
                  rows={4}
                  maxLength={LIMITS.bio}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-colors resize-none"
                />
                <p className="text-xs text-gray-400 text-right mt-1">{form.bio.length}/{LIMITS.bio}</p>
              </div>
              {/* Summary */}
              <div className="p-4 rounded-2xl space-y-1.5" style={{ background: 'rgba(26,107,74,0.06)' }}>
                <p className="text-xs font-semibold text-gray-600 mb-2">Registration summary</p>
                {[
                  ['Name',     `${form.firstName} ${form.lastName}`],
                  ['Gender',   form.gender],
                  ['Country',  form.country],
                  ['Sect',     form.sect],
                  ['Prayer',   form.prayerLevel],
                  ['Timeline', form.timeline],
                  ['Plan',     `${activePlan.name} — ${activePlan.price}${activePlan.period}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs">
                    <span className="text-gray-400">{k}</span>
                    <span
                      className="font-medium"
                      style={{ color: k === 'Plan' ? activePlan.color : '#374151' }}
                    >
                      {v || '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-7">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={submitting}
                className="px-5 py-3 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canNext() || submitting}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating Profile…
                </>
              ) : (
                <>
                  {step === 0 ? `Continue with ${activePlan.name}` : step === 4 ? 'Create My Profile' : 'Continue'}
                  <ChevronRight size={17} />
                </>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Already have an account?{' '}
            <Link to="/" className="font-medium hover:underline" style={{ color: '#1a6b4a' }}>Sign in</Link>
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {['🔒 Private & secure', '✅ Free to start', '🕌 Halal-first', '👨‍👩‍👧 Wali mode available'].map(t => (
            <span key={t} className="text-xs text-gray-400">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
