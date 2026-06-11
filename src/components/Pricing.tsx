import { Check, Star, Zap, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../lib/LanguageContext'

const PLANS = [
  {
    id: 'free',
    icon: Star,
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    tagline: 'Start your journey today',
    color: '#555',
    features: [
      'Create a verified profile',
      'Browse up to 10 profiles/day',
      'Send 5 icebreaker messages/month',
      'Set basic faith & location filters',
      'Community guidelines access',
      'Report & block users',
    ],
    cta: 'Get Started Free',
    featured: false,
  },
  {
    id: 'premium',
    icon: Zap,
    name: 'Premium',
    price: { monthly: 14.99, annual: 9.99 },
    tagline: 'Unlimited connections',
    color: '#1a6b4a',
    features: [
      'Everything in Free',
      'Unlimited profile browsing',
      'Unlimited messaging',
      'Advanced filters (sect, prayer, lifestyle)',
      'Compatibility score access',
      'Photo blur & private albums',
      'Video intro prompts',
      'See who liked your profile',
      'Priority support',
    ],
    cta: 'Start Premium',
    featured: true,
  },
  {
    id: 'family',
    icon: Users,
    name: 'Family / Wali',
    price: { monthly: 24.99, annual: 17.99 },
    tagline: 'Include your family',
    color: '#c9a84c',
    features: [
      'Everything in Premium',
      'Wali / chaperone chat access',
      'Family profile review mode',
      'Up to 2 family members linked',
      'Shared shortlist with family',
      'Marriage consultation resources',
      'Dedicated family support team',
    ],
    cta: 'Start Family Plan',
    featured: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const navigate = useNavigate()
  const { t } = useLang()

  return (
    <section id="pricing" className="py-20 lg:py-28" style={{ background: '#faf8f4' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>
            {t.price_badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
            {t.price_title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            {t.price_subtitle}
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-sm font-medium ${!annual ? 'text-gray-800' : 'text-gray-400'}`}>{t.price_toggle_monthly}</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{ background: annual ? '#1a6b4a' : '#d1d5db' }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                style={{ transform: annual ? 'translateX(26px)' : 'translateX(2px)' }}
              />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-gray-800' : 'text-gray-400'}`}>
              {t.price_toggle_yearly}
            </span>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map(plan => {
            const Icon = plan.icon
            const price = annual ? plan.price.annual : plan.price.monthly

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.featured ? 'text-white' : 'bg-white border border-gray-100'
                }`}
                style={plan.featured ? { background: 'linear-gradient(160deg, #0d3d2b, #1a6b4a)' } : {}}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96e)', color: '#1a1a2e' }}>
                      ✨ {t.price_popular}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: plan.featured ? 'rgba(255,255,255,0.15)' : `${plan.color}15` }}
                  >
                    <Icon size={20} style={{ color: plan.featured ? 'white' : plan.color }} />
                  </div>
                  <div>
                    <p className={`font-bold text-base ${plan.featured ? 'text-white' : 'text-gray-800'}`}>{plan.name}</p>
                    <p className={`text-xs ${plan.featured ? 'text-white/65' : 'text-gray-400'}`}>{plan.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {price === 0 ? (
                    <p className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-gray-800'}`}>Free</p>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className={`text-4xl font-bold ${plan.featured ? 'text-white' : 'text-gray-800'}`}>
                        ${price}
                      </span>
                      <span className={`text-sm mb-1.5 ${plan.featured ? 'text-white/65' : 'text-gray-400'}`}>/mo</span>
                    </div>
                  )}
                  {annual && price > 0 && (
                    <p className={`text-xs mt-1 ${plan.featured ? 'text-white/50' : 'text-gray-400'}`}>
                      Billed annually · ${(price * 12).toFixed(2)}/year
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <div
                        className="w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: plan.featured ? 'rgba(255,255,255,0.2)' : `${plan.color}18` }}
                      >
                        <Check size={11} style={{ color: plan.featured ? 'white' : plan.color }} />
                      </div>
                      <span className={`text-sm ${plan.featured ? 'text-white/85' : 'text-gray-600'}`}>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => navigate(`/signup?plan=${plan.id}`)}
                  className="w-full py-3 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
                  style={
                    plan.featured
                      ? { background: 'linear-gradient(135deg, #c9a84c, #e8c96e)', color: '#1a1a2e' }
                      : plan.id === 'family'
                      ? { background: 'linear-gradient(135deg, #c9a84c, #e8c96e)', color: '#1a1a2e' }
                      : { background: '#1a6b4a', color: 'white' }
                  }
                >
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>

        {/* Fine print */}
        <p className="text-center text-gray-400 text-xs mt-8">
          All plans include a 7-day free trial. Cancel anytime. Prices shown in USD — local pricing may apply.
        </p>
      </div>
    </section>
  )
}
