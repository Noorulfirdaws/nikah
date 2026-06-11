import { useState } from 'react'
import PageHero from '../components/PageHero'
import { Send, CheckCircle, MapPin, AlertTriangle } from 'lucide-react'
import { isValidEmail, LIMITS } from '../lib/security'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [lastSubmitMs, setLastSubmitMs] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!isValidEmail(form.email)) e.email = 'Please enter a valid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const now = Date.now()
    if (submitting || now - lastSubmitMs < 5000) return

    setErrors({})
    setSubmitting(true)
    setLastSubmitMs(now)
    // Simulate async send (replace with real API call in production)
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
    }, 700)
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
                <p className="text-gray-500 text-sm">Thank you, {form.name}. We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Send us a message</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Name</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
                      placeholder="Your name"
                      maxLength={LIMITS.name}
                      autoComplete="name"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:ring-1 ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'}`}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertTriangle size={10} />{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }}
                      placeholder="you@email.com"
                      maxLength={LIMITS.email}
                      autoComplete="email"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:ring-1 ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'}`}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertTriangle size={10} />{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Subject</label>
                  <select
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
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Message
                    <span className="text-gray-400 font-normal ml-1">({form.message.length}/{LIMITS.message})</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })) }}
                    placeholder="How can we help?"
                    maxLength={LIMITS.message}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none focus:ring-1 ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'}`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertTriangle size={10} />{errors.message}</p>}
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
                <p className="text-xs text-gray-400 text-center">We typically respond within 24 hours. For urgent safety concerns, email safety@nikahapp.com directly.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
