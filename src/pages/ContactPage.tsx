import { useState } from 'react'
import PageHero from '../components/PageHero'
import { Send, CheckCircle, MapPin, AlertTriangle, Info } from 'lucide-react'
import { isValidEmail, LIMITS } from '../lib/security'
import { sendContactMessage, ApiError, API_CONNECTED } from '../lib/api'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [lastSubmitMs, setLastSubmitMs] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!isValidEmail(form.email)) e.email = 'Please enter a valid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const now = Date.now()
    if (submitting || now - lastSubmitMs < 5000) return

    setErrors({})
    setSubmitError('')
    setSubmitting(true)
    setLastSubmitMs(now)

    if (!API_CONNECTED) {
      setSubmitting(false)
      setSubmitError('Contact form is unavailable in offline demo mode.')
      return
    }

    try {
      await sendContactMessage({
        name: form.name,
        email: form.email,
        subject: form.subject || undefined,
        message: form.message,
      })
      setSubmitting(false)
      setSent(true)
    } catch (err) {
      setSubmitting(false)
      setSubmitError(err instanceof ApiError ? err.message : 'Could not reach the server. Please try again or email us directly.')
    }
  }

  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero label="📬 Contact" title="Get in" titleHighlight="Touch" subtitle="Questions, feedback, partnerships, or press — we'd love to hear from you." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Info */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Contact channels</h2>
            </div>
            {[
              { icon: '📧', title: 'General enquiries', detail: 'hello@nikahapp.com' },
              { icon: '🛡️', title: 'Safety & abuse', detail: 'safety@nikahapp.com' },
              { icon: '📰', title: 'Press & media', detail: 'press@nikahapp.com' },
              { icon: '🤝', title: 'Partnerships', detail: 'partners@nikahapp.com' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400 font-mono">{item.detail}</p>
                </div>
              </div>
            ))}
            <div className="p-4 rounded-2xl bg-white border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} style={{ color: '#1a6b4a' }} />
                <p className="font-semibold text-sm text-gray-800">Offices</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">London · Dubai · Kuala Lumpur</p>
              <p className="text-xs text-gray-400 mt-1">Fully remote team worldwide</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle size={44} className="mx-auto mb-4" style={{ color: '#1a6b4a' }} />
                <h3 className="font-bold text-xl text-gray-900 mb-2">Message received!</h3>
                <p className="text-gray-500 text-sm">Thank you, {form.name}. Your message has been logged for our team to review — our target is to respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Send us a message</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="ct-name" className="block text-xs font-medium text-gray-600 mb-1.5">Name</label>
                    <input
                      id="ct-name"
                      name="name"
                      required
                      type="text"
                      value={form.name}
                      onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
                      placeholder="Your name"
                      maxLength={LIMITS.name}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'ct-name-error' : undefined}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:ring-1 ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'}`}
                    />
                    {errors.name && <p id="ct-name-error" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertTriangle size={10} />{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="ct-email" className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                    <input
                      id="ct-email"
                      name="email"
                      required
                      type="email"
                      value={form.email}
                      onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }}
                      placeholder="you@email.com"
                      maxLength={LIMITS.email}
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'ct-email-error' : undefined}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:ring-1 ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'}`}
                    />
                    {errors.email && <p id="ct-email-error" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertTriangle size={10} />{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="ct-subject" className="block text-xs font-medium text-gray-600 mb-1.5">Subject</label>
                  <select
                    id="ct-subject"
                    name="subject"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 bg-white"
                  >
                    <option value="">Choose a topic…</option>
                    <option>General question</option>
                    <option>Technical support</option>
                    <option>Safety concern</option>
                    <option>Partnership enquiry</option>
                    <option>Press / media</option>
                    <option>Feedback or suggestion</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="ct-message" className="block text-xs font-medium text-gray-600 mb-1.5">
                    Message
                    <span className="text-gray-400 font-normal ml-1">({form.message.length}/{LIMITS.message})</span>
                  </label>
                  <textarea
                    id="ct-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })) }}
                    placeholder="How can we help?"
                    maxLength={LIMITS.message}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'ct-message-error' : undefined}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none focus:ring-1 ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'}`}
                  />
                  {errors.message && <p id="ct-message-error" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertTriangle size={10} />{errors.message}</p>}
                </div>
                {submitError && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-red-700 border border-red-100" style={{ background: '#fef2f2' }}>
                    <AlertTriangle size={15} className="flex-shrink-0" /> {submitError}
                  </div>
                )}
                {!API_CONNECTED && (
                  <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-xs text-blue-700 border border-blue-100" style={{ background: '#eff6ff' }}>
                    <Info size={13} className="flex-shrink-0 mt-0.5 text-blue-500" />
                    <span>Offline demo mode — this form can't reach a backend right now.</span>
                  </div>
                )}
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
                <p className="text-xs text-gray-400 text-center">We typically respond within 24 hours. For urgent safety concerns, email safety@nikahapp.com directly.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
