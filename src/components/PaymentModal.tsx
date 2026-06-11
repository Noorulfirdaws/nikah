/**
 * PaymentModal — Stripe-ready payment flow
 *
 * HOW TO GO LIVE WITH STRIPE:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. npm install @stripe/react-stripe-js @stripe/stripe-js
 *
 * 2. In your .env file:
 *    VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxx   (or pk_test_xxxx for testing)
 *
 * 3. In main.tsx wrap your app:
 *    import { loadStripe } from '@stripe/stripe-js'
 *    import { Elements } from '@stripe/react-stripe-js'
 *    const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
 *    <Elements stripe={stripe}><App /></Elements>
 *
 * 4. Replace the STRIPE_TODO sections below with real Stripe hooks:
 *    import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
 *    const stripe = useStripe()
 *    const elements = useElements()
 *    const { error, paymentMethod } = await stripe.createPaymentMethod({
 *      type: 'card',
 *      card: elements.getElement(CardElement)!,
 *    })
 *
 * 5. Your backend endpoint POST /api/subscriptions should:
 *    - Receive { planId, paymentMethodId, email }
 *    - Create a Stripe Customer
 *    - Attach paymentMethodId to customer
 *    - Create a Stripe Subscription (priceId maps to your plan)
 *    - Return { subscriptionId, clientSecret } for 3D Secure if needed
 *    - Confirm with stripe.confirmCardPayment(clientSecret)
 *
 * Stripe price IDs (add yours here once created in Stripe Dashboard):
 *   Premium Monthly  → price_xxx
 *   Premium Annual   → price_xxx
 *   Family Monthly   → price_xxx
 *   Family Annual    → price_xxx
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import { X, Lock, CheckCircle, CreditCard, Shield } from 'lucide-react'

const PLANS = {
  free:    { name: 'Free',    monthly: 0,     annual: 0     },
  premium: { name: 'Premium', monthly: 14.99, annual: 9.99  },
  family:  { name: 'Family',  monthly: 24.99, annual: 17.99 },
}

type PlanId = keyof typeof PLANS

interface Props {
  planId: PlanId
  annual: boolean
  onClose: () => void
  onSuccess?: (planId: PlanId) => void
}

export default function PaymentModal({ planId, annual, onClose, onSuccess }: Props) {
  const plan = PLANS[planId]
  const price = annual ? plan.annual : plan.monthly
  const priceDisplay = String(price).replace('.', ',')
  const period = annual ? '/mo · billed yearly' : '/month'

  const [step, setStep] = useState<'details' | 'card' | 'success'>('details')
  const [form, setForm] = useState({ email: '', name: '' })
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))
  const setC = (k: keyof typeof card) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setCard(p => ({ ...p, [k]: e.target.value }))

  // Format card number with spaces
  const fmtCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  // Format expiry MM/YY
  const fmtExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  const validateDetails = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateCard = () => {
    const e: Record<string, string> = {}
    const num = card.number.replace(/\s/g, '')
    if (num.length !== 16) e.number = 'Enter a 16-digit card number'
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = 'Format: MM/YY'
    if (card.cvc.length < 3) e.cvc = '3-digit CVC required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleDetailsNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateDetails()) setStep('card')
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateCard()) return
    setLoading(true)

    // ─── STRIPE_TODO: Replace this block with real Stripe integration ─────────
    // const stripe   = useStripe()       ← must be called at component top level
    // const elements = useElements()
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement)!,
    //   billing_details: { name: form.name, email: form.email },
    // })
    // if (error) { setErrors({ card: error.message ?? 'Payment failed' }); setLoading(false); return }
    //
    // const res = await fetch('/api/subscriptions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     planId, annual,
    //     paymentMethodId: paymentMethod.id,
    //     email: form.email,
    //   }),
    // })
    // const { clientSecret, error: apiError } = await res.json()
    // if (apiError) { setErrors({ card: apiError }); setLoading(false); return }
    //
    // If 3D Secure is required:
    // const { error: confirmError } = await stripe.confirmCardPayment(clientSecret)
    // if (confirmError) { setErrors({ card: confirmError.message ?? 'Payment failed' }); setLoading(false); return }
    // ─── END STRIPE_TODO ───────────────────────────────────────────────────────

    // Demo: simulate 1.5s processing
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setStep('success')
    onSuccess?.(planId)
  }

  const inputCls = (err?: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
      err
        ? 'border-red-400 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
    }`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 pt-6 pb-5 border-b border-gray-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lock size={14} style={{ color: '#1a6b4a' }} />
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#1a6b4a' }}>
                Secure Checkout
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{plan.name} Plan</h2>
            {price > 0 && (
              <p className="text-sm text-gray-400 mt-0.5">
                ${priceDisplay}<span className="text-xs">{period}</span>
              </p>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors mt-1">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Step indicator */}
        {step !== 'success' && (
          <div className="flex items-center px-7 py-3 gap-2 border-b border-gray-50">
            {['Account', 'Payment'].map((label, i) => {
              const active = (i === 0 && step === 'details') || (i === 1 && step === 'card')
              const done   = i === 0 && step === 'card'
              return (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 && <div className="w-8 h-px bg-gray-200" />}
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={done ? { background: '#1a6b4a', color: 'white' } : active ? { background: '#1a6b4a', color: 'white' } : { background: '#e5e7eb', color: '#9ca3af' }}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span className={`text-xs font-medium ${active ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Body */}
        <div className="px-7 py-6">

          {/* ── Step 1: Account details ── */}
          {step === 'details' && (
            <form onSubmit={handleDetailsNext} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                <input
                  required value={form.name} onChange={set('name')}
                  placeholder="Your name"
                  className={inputCls(errors.name)}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
                <input
                  required type="email" value={form.email} onChange={set('email')}
                  placeholder="you@example.com"
                  className={inputCls(errors.email)}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Order summary */}
              {price > 0 && (
                <div className="rounded-2xl p-4 mt-2" style={{ background: 'rgba(26,107,74,0.05)', border: '1px solid rgba(26,107,74,0.12)' }}>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{plan.name} ({annual ? 'Annual' : 'Monthly'})</span>
                    <span className="font-semibold text-gray-800">${priceDisplay}/mo</span>
                  </div>
                  {annual && (
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Billed as one yearly payment</span>
                      <span>${String((price * 12).toFixed(2)).replace('.', ',')}/yr</span>
                    </div>
                  )}
                  <div className="mt-2 pt-2 border-t border-emerald-100 flex justify-between text-xs font-medium" style={{ color: '#1a6b4a' }}>
                    <span>✓ 7-day free trial included</span>
                    <span>No charge today</span>
                  </div>
                </div>
              )}

              <button type="submit"
                className="w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
                style={{ background: 'linear-gradient(135deg,#1a6b4a,#2d9b6f)' }}>
                Continue to Payment →
              </button>
            </form>
          )}

          {/* ── Step 2: Card details ── */}
          {step === 'card' && (
            <form onSubmit={handlePay} className="space-y-4">
              {/* STRIPE_TODO: Replace this entire card form with <CardElement /> from @stripe/react-stripe-js */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Card Number *</label>
                <div className="relative">
                  <input
                    required
                    value={card.number}
                    onChange={e => setC('number')({ ...e, target: { ...e.target, value: fmtCard(e.target.value) } })}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    className={inputCls(errors.number)}
                  />
                  <CreditCard size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
                </div>
                {errors.number && <p className="text-xs text-red-500 mt-1">{errors.number}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Expiry *</label>
                  <input
                    required
                    value={card.expiry}
                    onChange={e => setC('expiry')({ ...e, target: { ...e.target, value: fmtExpiry(e.target.value) } })}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={inputCls(errors.expiry)}
                  />
                  {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">CVC *</label>
                  <input
                    required type="password"
                    value={card.cvc}
                    onChange={e => setC('cvc')({ ...e, target: { ...e.target, value: e.target.value.replace(/\D/g, '').slice(0, 4) } })}
                    placeholder="•••"
                    maxLength={4}
                    className={inputCls(errors.cvc)}
                  />
                  {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>}
                </div>
              </div>

              {errors.card && (
                <p className="text-xs text-red-500 bg-red-50 rounded-xl px-3 py-2">{errors.card}</p>
              )}

              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 py-1">
                {['256-bit SSL', 'PCI Compliant', 'Stripe Secured'].map(b => (
                  <div key={b} className="flex items-center gap-1">
                    <Shield size={11} className="text-gray-300" />
                    <span className="text-xs text-gray-400">{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('details')}
                  className="px-4 py-3 rounded-2xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all">
                  ← Back
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg,#1a6b4a,#2d9b6f)' }}>
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Lock size={14} />
                      {price === 0 ? 'Activate Free Plan' : `Start Free Trial`}
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400">
                Your card won't be charged until after your 7-day free trial.
                Cancel anytime.
              </p>
            </form>
          )}

          {/* ── Step 3: Success ── */}
          {step === 'success' && (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(26,107,74,0.1)' }}>
                <CheckCircle size={36} style={{ color: '#1a6b4a' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">You're all set!</h3>
                <p className="text-gray-500 text-sm">
                  Welcome to <strong>{plan.name}</strong>. A confirmation has been sent to <strong>{form.email}</strong>.
                </p>
              </div>
              <div className="w-full rounded-2xl p-4 text-left space-y-2"
                style={{ background: 'rgba(26,107,74,0.05)', border: '1px solid rgba(26,107,74,0.12)' }}>
                {[
                  { label: 'Plan', value: `${plan.name} (${annual ? 'Annual' : 'Monthly'})` },
                  { label: 'Trial ends', value: `${new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}` },
                  { label: 'First charge', value: price > 0 ? `$${priceDisplay}/mo after trial` : 'Free forever' },
                ].map(r => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{r.label}</span>
                    <span className="font-medium text-gray-800">{r.value}</span>
                  </div>
                ))}
              </div>
              <button onClick={onClose}
                className="w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#1a6b4a,#2d9b6f)' }}>
                Start Using Nikah →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
