import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, Send, CheckCircle, AlertTriangle, Rocket, ShieldCheck, Heart, CreditCard } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'
import { isValidEmail, LIMITS } from '../lib/security'

const CATEGORY_CARDS = [
  { Icon: Rocket,      label: 'Getting Started',    id: 'getting-started', color: '#f97316', bg: '#fff7ed' },
  { Icon: ShieldCheck, label: 'Safety & Privacy',   id: 'safety',          color: '#1a6b4a', bg: '#f0fdf4' },
  { Icon: Heart,       label: 'Finding Matches',    id: 'matching',        color: '#e11d48', bg: '#fff1f2' },
  { Icon: CreditCard,  label: 'Billing',            id: 'billing',         color: '#7c3aed', bg: '#f5f3ff' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const FAQ_SECTIONS = [
  {
    section: 'Getting Started',
    icon: '🚀',
    questions: [
      {
        q: 'Is Nikah free to use?',
        a: 'Yes! Nikah has a completely free plan that lets you create a profile, browse up to 10 profiles per day, and send icebreaker messages. Premium plans unlock unlimited browsing, messaging, advanced filters, and wali mode. See our Pricing page for full details.',
      },
      {
        q: 'How do I create a profile?',
        a: 'Click "Sign Up Free" in the header or footer. The registration takes less than 5 minutes: enter your basic info, set your faith preferences, add your location and languages, and write a short bio. You\'ll be guided step by step.',
      },
      {
        q: 'Is my information safe?',
        a: 'Absolutely. All data is encrypted in transit and at rest. Your photos are blurred by default. We never sell your data to third parties. Read our Privacy Policy for full details.',
      },
      {
        q: 'What countries is Nikah available in?',
        a: 'Nikah is available to Muslims worldwide. Our app currently has verified members in over 50 countries, including the US, UK, Canada, France, Germany, Turkey, UAE, Saudi Arabia, Pakistan, India, Bangladesh, Malaysia, Indonesia, Egypt, Morocco, Nigeria, and more.',
      },
    ],
  },
  {
    section: 'Matching & Features',
    icon: '💑',
    questions: [
      {
        q: 'How does the compatibility score work?',
        a: 'The compatibility score is calculated based on six dimensions: faith alignment, shared values, lifestyle match, life goals, personality fit, and language/culture overlap. The more complete your profile, the more accurate your scores will be.',
      },
      {
        q: 'Can I filter by Islamic sect or madhhab?',
        a: 'Yes. You can specify your sect (Sunni, Shia, Ibadi, etc.) and, within Sunni Islam, your preferred madhhab (Hanafi, Maliki, Shafi\'i, Hanbali). You can set how important this preference is to you in your filter settings.',
      },
      {
        q: 'How do the language filters work?',
        a: 'You can add all the languages you speak to your profile and set which languages you\'d prefer your match to speak. The app supports 13 languages for its interface, including Arabic (RTL) and Urdu (RTL).',
      },
      {
        q: 'What is Wali Mode?',
        a: 'Wali Mode lets you invite a parent, guardian, or trusted family member into your conversation thread — so all communication happens with full transparency. This is completely optional but strongly encouraged for members who want a fully halal process.',
      },
    ],
  },
  {
    section: 'Privacy & Safety',
    icon: '🛡️',
    questions: [
      {
        q: 'Who can see my photos?',
        a: 'Your photos are blurred to all users by default. You can choose to make them visible to everyone, approved matches only, or keep them private. You can approve or decline individual photo view requests at any time.',
      },
      {
        q: 'How do I report a suspicious profile?',
        a: 'Tap the three-dot menu on any profile or message and select "Report." Choose the reason (fake profile, inappropriate content, harassment, scam, etc.) and submit. Our safety team responds within 2 hours. You can also block any user instantly.',
      },
      {
        q: 'How does profile verification work?',
        a: 'Profile verification is optional but recommended. You can verify via selfie photo check, which earns a Verified badge. A full ID verification is also available for maximum trust. Verified profiles consistently receive more engagement from serious members.',
      },
      {
        q: 'What happens to my data if I delete my account?',
        a: 'When you delete your account, your profile, photos, and messages are permanently removed from our systems within 30 days, in accordance with GDPR and applicable data protection laws. See our Privacy Policy for the full data retention details.',
      },
    ],
  },
  {
    section: 'Subscription & Billing',
    icon: '💳',
    questions: [
      {
        q: 'Can I cancel my subscription at any time?',
        a: 'Yes. You can cancel anytime from your account settings. Your premium access continues until the end of your billing period. No cancellation fees or penalties.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'We offer a 7-day money-back guarantee for new premium subscribers. If you\'re unsatisfied within 7 days of your first purchase, contact our support team and we\'ll refund you in full, no questions asked.',
      },
      {
        q: 'What is the Family / Wali plan?',
        a: 'The Family plan includes all Premium features, plus the ability to link up to 2 family members to your account in a formal Wali Mode, access to a shared shortlist, marriage consultation resources, and a dedicated family support team.',
      },
    ],
  },
]

export default function HelpPage() {
  const [openIdx, setOpenIdx] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [contactForm, setContactForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [lastSubmitMs, setLastSubmitMs] = useState(0)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const filteredFAQs = FAQ_SECTIONS.map(section => ({
    ...section,
    questions: section.questions.filter(
      q => !search || q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(s => s.questions.length > 0)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!contactForm.name.trim()) errs.name = 'Name is required'
    if (!isValidEmail(contactForm.email)) errs.email = 'Please enter a valid email address'
    if (!contactForm.message.trim()) errs.message = 'Message is required'
    if (Object.keys(errs).length) { setFormErrors(errs); return }

    const now = Date.now()
    if (submitting || now - lastSubmitMs < 5000) return

    setFormErrors({})
    setSubmitting(true)
    setLastSubmitMs(now)
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
    }, 700)
  }

  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero
        label="🙋 Help Center"
        title="How Can We"
        titleHighlight="Help You?"
        subtitle="Find answers to common questions, or reach out to our team — we're here for you."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Search */}
        <div className="relative mb-10 max-w-xl mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search the help center…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            maxLength={LIMITS.search}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all shadow-sm"
          />
        </div>

        {/* Quick links */}
        {!search && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {CATEGORY_CARDS.map(item => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all text-center group cursor-pointer"
                style={{ borderColor: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = item.color + '55')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
                  style={{ background: item.bg, color: item.color }}
                >
                  <item.Icon size={22} />
                </div>
                <p className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{item.label}</p>
              </button>
            ))}
          </div>
        )}

        {/* FAQ sections */}
        <div className="space-y-8">
          {filteredFAQs.map(section => {
            const sectionId =
              section.section === 'Getting Started'      ? 'getting-started' :
              section.section === 'Matching & Features'  ? 'matching'         :
              section.section === 'Privacy & Safety'     ? 'safety'           :
              section.section === 'Subscription & Billing' ? 'billing'        : ''
            return (
            <div key={section.section} id={sectionId} style={{ scrollMarginTop: 80 }}>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>{section.icon}</span> {section.section}
              </h2>
              <div className="space-y-2">
                {section.questions.map((item, i) => {
                  const key = `${section.section}-${i}`
                  const isOpen = openIdx === key
                  return (
                    <div key={key} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : key)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-800 text-sm pr-4">{item.q}</span>
                        {isOpen
                          ? <ChevronUp size={18} className="text-gray-400 flex-shrink-0" />
                          : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                        }
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5">
                          <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            )
          })}
        </div>

        {/* Contact form */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Our team is available 7 days a week across all time zones. We typically respond within 2–4 hours.
            </p>
            <div className="space-y-3">
              {[
                { icon: '📧', title: 'Email Support', sub: 'help@nikahapp.com' },
                { icon: '💬', title: 'Live Chat', sub: 'Available in-app on all plans' },
                { icon: '🛡️', title: 'Safety Reports', sub: 'safety@nikahapp.com — 24/7' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            {sent ? (
              <div className="text-center py-6">
                <CheckCircle size={40} className="mx-auto mb-3" style={{ color: '#1a6b4a' }} />
                <h3 className="font-bold text-gray-900 mb-2">Message sent!</h3>
                <p className="text-sm text-gray-500">We'll get back to you at <strong>{contactForm.email}</strong> within 4 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4" noValidate>
                <h3 className="font-bold text-gray-900">Send a message</h3>
                <div>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={e => { setContactForm(f => ({ ...f, name: e.target.value })); setFormErrors(er => ({ ...er, name: '' })) }}
                    maxLength={LIMITS.name}
                    autoComplete="name"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:ring-1 ${formErrors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'}`}
                  />
                  {formErrors.name && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertTriangle size={10} />{formErrors.name}</p>}
                </div>
                <div>
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    value={contactForm.email}
                    onChange={e => { setContactForm(f => ({ ...f, email: e.target.value })); setFormErrors(er => ({ ...er, email: '' })) }}
                    maxLength={LIMITS.email}
                    autoComplete="email"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:ring-1 ${formErrors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'}`}
                  />
                  {formErrors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertTriangle size={10} />{formErrors.email}</p>}
                </div>
                <select
                  value={contactForm.topic}
                  onChange={e => setContactForm(f => ({ ...f, topic: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 bg-white"
                >
                  <option value="">Select a topic…</option>
                  <option>Account & Profile</option>
                  <option>Matching & Features</option>
                  <option>Privacy & Safety</option>
                  <option>Billing & Subscription</option>
                  <option>Technical Issue</option>
                  <option>Other</option>
                </select>
                <div>
                  <textarea
                    required
                    placeholder="How can we help you?"
                    rows={4}
                    value={contactForm.message}
                    onChange={e => { setContactForm(f => ({ ...f, message: e.target.value })); setFormErrors(er => ({ ...er, message: '' })) }}
                    maxLength={LIMITS.message}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none focus:ring-1 ${formErrors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'}`}
                  />
                  <div className="flex justify-between mt-1">
                    {formErrors.message
                      ? <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle size={10} />{formErrors.message}</p>
                      : <span />
                    }
                    <p className="text-xs text-gray-400">{contactForm.message.length}/{LIMITS.message}</p>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-2xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
          Also see:{' '}
          <Link to="/safety" className="hover:underline" style={{ color: '#1a6b4a' }}>Safety Center</Link>
          {' · '}
          <Link to="/community-guidelines" className="hover:underline" style={{ color: '#1a6b4a' }}>Community Guidelines</Link>
          {' · '}
          <Link to="/privacy" className="hover:underline" style={{ color: '#1a6b4a' }}>Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}
