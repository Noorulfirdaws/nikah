import { BadgeCheck, CalendarClock, Compass, Users, ShieldCheck } from 'lucide-react'

// Readiness badges members can earn and filter by.
const BADGES = [
  { icon: BadgeCheck,    label: 'Ready Now',           desc: 'Fully prepared for Nikah and actively seeking',            color: '#1a6b4a' },
  { icon: CalendarClock, label: 'Within 12 Months',    desc: 'Committed to marriage within the coming year',             color: '#c9a84c' },
  { icon: Compass,       label: 'Exploring Marriage',  desc: 'Serious about marriage, still defining the timeline',      color: '#2d6fa5' },
  { icon: Users,         label: 'Family Involved',     desc: 'Wali or family actively participating in the search',      color: '#7c4dbe' },
  { icon: ShieldCheck,   label: 'Fully Verified',      desc: 'ID, face, and phone verification all complete',            color: '#c94a4a' },
]

// What feeds the readiness score.
const SCORE_INPUTS = [
  'Verification completion', 'Profile completeness', 'Marriage intent assessment',
  'Lifestyle assessment', 'Financial stability questions', 'Marriage timeline',
  'Communication behavior', 'Family participation',
]

export default function MarriageReadiness() {
  return (
    <section id="readiness" className="py-20 lg:py-28" style={{ background: '#faf9f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>
            🎖️ Marriage Readiness
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
            Know Who Is Actually Ready for Nikah
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Every member earns a Marriage Readiness badge based on verified behavior — not self-promotion.
            Filter your candidates by readiness so no one wastes your time.
          </p>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {BADGES.map(b => {
            const Icon = b.icon
            return (
              <div key={b.label} className="p-5 rounded-2xl bg-white border border-gray-100 text-center hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3" style={{ background: `${b.color}15` }}>
                  <Icon size={22} style={{ color: b.color }} />
                </div>
                <p className="font-bold text-sm mb-1" style={{ color: b.color }}>{b.label}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{b.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Score inputs */}
        <div className="rounded-2xl p-6 bg-white border border-gray-100 text-center">
          <p className="font-semibold text-gray-700 text-sm mb-4">Your readiness score is built from:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {SCORE_INPUTS.map(s => (
              <span key={s} className="text-xs px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.12)', color: '#8a6d1f' }}>
                ✓ {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
