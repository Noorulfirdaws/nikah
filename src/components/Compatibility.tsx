import { Sparkles } from 'lucide-react'

// Marriage compatibility dimensions used by the matching assessment.
const DIMENSIONS = [
  'Deen & practice', 'Prayer frequency', 'Madhab', 'Islamic knowledge',
  'Family values', 'Children preference', 'Family involvement', 'Living arrangements',
  'Career goals', 'Education', 'Location', 'Financial expectations',
  'Traditional vs modern roles', 'Relocation willingness', 'Marriage timeline',
]

// Example breakdown shown in the illustration card.
const EXAMPLE_FACTORS = [
  { label: 'Deen & prayer',        score: 98, note: 'Both pray five times daily and follow the same madhab' },
  { label: 'Family values',        score: 94, note: 'Both want family closely involved from the first introduction' },
  { label: 'Children & household', score: 90, note: 'Aligned on children within 2 years and shared responsibilities' },
  { label: 'Marriage timeline',    score: 92, note: 'Both ready for Nikah within 12 months' },
  { label: 'Location & relocation',score: 85, note: 'Same city; one is open to relocating after marriage' },
]

export default function Compatibility() {
  return (
    <section id="matching" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(45,111,165,0.1)', color: '#2d6fa5' }}>
            🧭 Marriage Compatibility
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
            Compatibility Measured on What Marriage Is Built On
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Not photos and small talk — deen, family, children, finances, and timeline.
            Every score is explained, so you understand <em>why</em> a candidate is compatible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: dimensions */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Assessed across 15 marriage dimensions</h3>
            <div className="flex flex-wrap gap-2">
              {DIMENSIONS.map(d => (
                <span key={d} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: 'rgba(26,107,74,0.08)', color: '#1a6b4a' }}>
                  {d}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6 leading-relaxed">
              You complete the assessment once during onboarding. We then introduce you only to verified
              candidates whose answers align with yours — and show you exactly where you align and where you differ,
              so families can make informed decisions together.
            </p>
          </div>

          {/* Right: example compatibility card */}
          <div className="rounded-3xl p-6 shadow-xl border border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} style={{ color: '#c9a84c' }} />
                <span className="font-bold text-gray-800 text-sm">Compatibility Report</span>
                <span className="text-xs text-gray-400">(example)</span>
              </div>
              <span className="text-lg font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>92%</span>
            </div>
            <div className="space-y-3">
              {EXAMPLE_FACTORS.map(f => (
                <div key={f.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700">{f.label}</span>
                    <span className="text-xs font-bold" style={{ color: '#1a6b4a' }}>{f.score}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${f.score}%`, background: 'linear-gradient(90deg, #1a6b4a, #c9a84c)' }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{f.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
