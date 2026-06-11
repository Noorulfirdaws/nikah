import { UserPlus, SlidersHorizontal, Sparkles, MessageCircle, Users } from 'lucide-react'
import { useLang } from '../lib/LanguageContext'

const STEPS = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Create Your Verified Profile',
    desc: 'Sign up with a verified email and phone. Add your faith background, values, family expectations, and marriage intentions. Optional ID verification builds extra trust.',
    color: '#1a6b4a',
    highlights: ['Photo with privacy controls', 'ID/profile verification', 'Faith & background info'],
  },
  {
    icon: SlidersHorizontal,
    number: '02',
    title: 'Set Your Faith & Preferences',
    desc: 'Define what matters most — sect, prayer practice, halal lifestyle, marriage timeline, location preference, languages spoken, and cultural background.',
    color: '#c9a84c',
    highlights: ['Sunni / Shia / other', 'Prayer frequency', 'Marriage timeline'],
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Discover Compatible Matches',
    desc: 'Our compatibility engine surfaces profiles aligned with your faith, values, lifestyle, and location. Browse with purpose — every match is marriage-focused.',
    color: '#2d6fa5',
    highlights: ['Compatibility score', 'Faith-first filtering', 'Location & language filters'],
  },
  {
    icon: MessageCircle,
    number: '04',
    title: 'Chat Respectfully',
    desc: 'Start a conversation through icebreaker questions. All chats are respectful and purpose-driven. Share video intros and voice notes to connect meaningfully.',
    color: '#7c4dbe',
    highlights: ['Icebreaker questions', 'Video intro prompts', 'Respectful guidelines'],
  },
  {
    icon: Users,
    number: '05',
    title: 'Involve Your Wali or Chaperone',
    desc: 'When ready to take things further, invite a parent, wali, or trusted family member to join the conversation — all built into the app for a fully halal process.',
    color: '#c94a4a',
    highlights: ['Wali/chaperone invite', 'Family chat mode', 'Guided next steps'],
  },
]

export default function HowItWorks() {
  const { t } = useLang()
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>
            {t.hiw_badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
            {t.hiw_title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            {t.hiw_subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center lg:items-center text-center p-5 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
                  style={{ '--hover-shadow-color': step.color } as React.CSSProperties}
                >
                  {/* Icon circle */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: `${step.color}18` }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                  </div>

                  {/* Number */}
                  <span className="text-xs font-bold tracking-widest mb-2" style={{ color: step.color }}>
                    STEP {step.number}
                  </span>

                  <h3 className="font-bold text-gray-800 mb-2 text-sm leading-snug">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{step.desc}</p>

                  {/* Highlight chips */}
                  <div className="flex flex-col gap-1 w-full">
                    {step.highlights.map(h => (
                      <span
                        key={h}
                        className="text-xs px-2 py-1 rounded-lg text-left"
                        style={{ background: `${step.color}10`, color: step.color }}
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
          >
            {t.hero_cta_free}
          </a>
          <p className="text-gray-400 text-sm mt-3">No credit card required · Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}
