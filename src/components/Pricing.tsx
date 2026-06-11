import { Check, Star, Zap, Users } from 'lucide-react'
import { useState } from 'react'
import { useLang } from '../lib/LanguageContext'
import PaymentModal from './PaymentModal'

// Annual pricing = yearly total (monthly equivalent shown beneath)
// e.g. Premium: $119.88/yr ≈ $9.99/mo vs $14.99/mo billed monthly → saves $60/yr
const PLANS = [
  {
    id: 'free',
    icon: Star,
    nameKey: 'plan_free' as const,
    taglineKey: 'price_tagline_free' as const,
    price: { monthly: 0, annual: 0 },
    color: '#6b7280',
    featured: false,
    features: [
      'Create a detailed profile',
      'Browse up to 10 profiles/day',
      'Basic filters (age, country)',
      'Wali invitation feature',
      'Islamic values matching quiz',
      'Mobile app (iOS & Android)',
    ],
  },
  {
    id: 'premium',
    icon: Zap,
    nameKey: 'plan_premium' as const,
    taglineKey: 'price_tagline_premium' as const,
    price: { monthly: 14.99, annual: 9.99 },
    color: '#1a6b4a',
    featured: true,
    features: [
      'Unlimited profile browsing',
      'See who liked your profile',
      'Advanced filters (sect, education, lifestyle)',
      'Unlimited messaging',
      'Profile boost — 2× per month',
      'Read receipts',
      'Video introduction feature',
      'Priority support',
      'Completely ad-free experience',
    ],
  },
  {
    id: 'family',
    icon: Users,
    nameKey: 'plan_family' as const,
    taglineKey: 'price_tagline_family' as const,
    price: { monthly: 24.99, annual: 17.99 },
    color: '#c9a84c',
    featured: false,
    features: [
      'Everything in Premium',
      'Up to 4 family member accounts',
      'Family dashboard & oversight tools',
      'Shared wali/guardian access',
      'Family match review & approval',
      'Group family video calls',
      'Dedicated family support line',
    ],
  },
]

const SAVE_PCT = 33  // ~33% saved vs monthly

export default function Pricing() {
  const [annual, setAnnual] = useState(true)
  const [payingPlan, setPayingPlan] = useState<string | null>(null)
  const { t } = useLang()

  return (
    <section id="pricing" className="py-20 lg:py-28" style={{ background: '#faf8f4' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>
            {t.price_badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
            {t.price_title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">{t.price_subtitle}</p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setAnnual(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={!annual
                ? { background: '#1a6b4a', color: 'white', boxShadow: '0 2px 14px rgba(26,107,74,0.3)' }
                : { background: 'white', color: '#6b7280', border: '1px solid #e5e7eb' }}
            >
              {t.price_toggle_monthly}
            </button>

            <button
              onClick={() => setAnnual(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={annual
                ? { background: '#1a6b4a', color: 'white', boxShadow: '0 2px 14px rgba(26,107,74,0.3)' }
                : { background: 'white', color: '#6b7280', border: '1px solid #e5e7eb' }}
            >
              {t.price_toggle_yearly ?? 'Yearly'}
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={annual
                  ? { background: 'rgba(255,255,255,0.25)', color: 'white' }
                  : { background: 'rgba(26,107,74,0.12)', color: '#1a6b4a' }}>
                -{SAVE_PCT}%
              </span>
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            {annual
              ? 'One payment per year · cancel anytime'
              : 'Billed month to month · cancel anytime'}
          </p>
        </div>

        {/* ── Plan cards ─────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map(plan => {
            const Icon = plan.icon
            const perMonthRaw = annual ? plan.price.annual : plan.price.monthly
            const perMonth = String(perMonthRaw).replace('.', ',')
            const isFree   = plan.price.monthly === 0

            // Plan name + tagline from i18n (fallback to English)
            const planName    = t[plan.nameKey] ?? plan.nameKey
            const planTagline = (t as unknown as Record<string, string>)[plan.taglineKey] ?? ''

            return (
              <div key={plan.id}
                className={`relative rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.featured ? 'text-white' : 'bg-white border border-gray-100'
                }`}
                style={plan.featured ? { background: 'linear-gradient(160deg,#0d3d2b,#1a6b4a)' } : {}}>

                {/* Popular badge */}
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c96e)', color: '#1a1a2e' }}>
                      ✨ {t.price_popular}
                    </span>
                  </div>
                )}

                {/* Plan name + tagline */}
                <div className="flex items-center gap-3 mb-5 mt-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: plan.featured ? 'rgba(255,255,255,0.15)' : `${plan.color}18` }}>
                    <Icon size={20} style={{ color: plan.featured ? 'white' : plan.color }} />
                  </div>
                  <div>
                    <p className={`font-bold text-base ${plan.featured ? 'text-white' : 'text-gray-800'}`}>
                      {planName}
                    </p>
                    {planTagline && (
                      <p className={`text-xs ${plan.featured ? 'text-white/65' : 'text-gray-400'}`}>
                        {planTagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Price block ── */}
                <div className="mb-6" style={{ minHeight: 90 }}>
                  {isFree ? (
                    <>
                      <p className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-gray-800'}`}>
                        {t.plan_free ?? 'Free'}
                      </p>
                      <p className={`text-xs mt-2 ${plan.featured ? 'text-white/50' : 'text-gray-400'}`}>
                        Free forever · no credit card needed
                      </p>
                    </>
                  ) : annual ? (
                    /* Annual mode: show monthly equivalent rate — let user do their own math */
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-gray-800'}`}>
                          ${perMonth}
                        </span>
                        <span className={`text-sm ${plan.featured ? 'text-white/65' : 'text-gray-400'}`}>
                          {t.plan_month ?? '/mo'}
                        </span>
                      </div>
                      <p className={`text-xs mt-2 font-medium ${plan.featured ? 'text-white/60' : 'text-gray-400'}`}>
                        Billed yearly · cancel anytime
                      </p>
                      <p className="text-xs mt-1 font-semibold"
                        style={{ color: plan.featured ? '#86efac' : '#1a6b4a' }}>
                        Save {SAVE_PCT}% vs monthly
                      </p>
                    </>
                  ) : (
                    /* Monthly mode: show monthly price + nudge to switch */
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-gray-800'}`}>
                          ${perMonth}
                        </span>
                        <span className={`text-sm ${plan.featured ? 'text-white/65' : 'text-gray-400'}`}>
                          {t.plan_month ?? '/mo'}
                        </span>
                      </div>
                      <button
                        onClick={() => setAnnual(true)}
                        className="text-xs mt-2 underline underline-offset-2 font-semibold"
                        style={{ color: plan.featured ? '#86efac' : '#1a6b4a' }}>
                        Switch to yearly — save {SAVE_PCT}%
                      </button>
                    </>
                  )}
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: plan.featured ? 'rgba(255,255,255,0.2)' : `${plan.color}18` }}>
                        <Check size={10} style={{ color: plan.featured ? 'white' : plan.color }} />
                      </div>
                      <span className={`text-sm ${plan.featured ? 'text-white/85' : 'text-gray-600'}`}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <button
                  onClick={() => setPayingPlan(plan.id)}
                  className="w-full py-3 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
                  style={
                    plan.featured || plan.id === 'family'
                      ? { background: 'linear-gradient(135deg,#c9a84c,#e8c96e)', color: '#1a1a2e' }
                      : isFree
                      ? { background: '#1a6b4a', color: 'white' }
                      : { background: '#1a6b4a', color: 'white' }
                  }>
                  {isFree
                    ? (t.price_cta_free ?? 'Get Started Free')
                    : (t.price_cta_paid ?? 'Start Free Trial')}
                </button>

                {!isFree && (
                  <p className={`text-center text-xs mt-3 ${plan.featured ? 'text-white/40' : 'text-gray-300'}`}>
                    7-day free trial · no charge today
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Fine print */}
        <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
          {['✓ 7-day free trial', '✓ Cancel anytime', '✓ Secure payment', '✓ Prices in USD'].map(item => (
            <span key={item} className="text-xs text-gray-400 font-medium">{item}</span>
          ))}
        </div>
      </div>

      {/* Payment modal — opens when a plan CTA is clicked */}
      {payingPlan && payingPlan !== 'free' && (
        <PaymentModal
          planId={payingPlan as 'premium' | 'family'}
          annual={annual}
          onClose={() => setPayingPlan(null)}
        />
      )}
      {payingPlan === 'free' && (
        <PaymentModal
          planId="free"
          annual={false}
          onClose={() => setPayingPlan(null)}
        />
      )}
    </section>
  )
}
