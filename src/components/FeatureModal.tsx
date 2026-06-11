import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { Check, ChevronRight } from 'lucide-react'

export interface FeatureDetail {
  title: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>
  color: string
  tagline: string
  description: string
  howItWorks: string[]
  benefits: string[]
  example?: {
    label: string
    items: string[]
    multi?: boolean   // true = checkboxes (multi-select), false/undefined = radio (single-select)
  }
  cta?: string
}

interface Props {
  feature: FeatureDetail | null
  onClose: () => void
}

export default function FeatureModal({ feature, onClose }: Props) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string[]>([])

  // Reset selection when feature changes
  const [lastFeature, setLastFeature] = useState<string | null>(null)
  if (feature && feature.title !== lastFeature) {
    setLastFeature(feature.title)
    setSelected([])
  }

  if (!feature) return null
  const Icon = feature.icon
  const multi = feature.example?.multi ?? false

  const toggle = (item: string) => {
    if (multi) {
      setSelected(prev =>
        prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
      )
    } else {
      setSelected(prev => (prev[0] === item ? [] : [item]))
    }
  }

  const isSelected = (item: string) => selected.includes(item)

  const handleCta = () => {
    onClose()
    navigate('/signup')
  }

  return (
    <Modal open={!!feature} onClose={onClose} size="lg">
      {/* Hero strip */}
      <div
        className="px-6 py-8 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}10)` }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
            style={{ background: feature.color }}
          >
            <Icon size={26} style={{ color: 'white' }} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: feature.color }}>Feature</p>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">{feature.title}</h2>
            <p className="text-gray-500 mt-1 text-sm">{feature.tagline}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-7">
        {/* Description */}
        <p className="text-gray-700 leading-relaxed">{feature.description}</p>

        {/* How it works */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white" style={{ background: feature.color }}>1</span>
            How It Works
          </h3>
          <ol className="space-y-3">
            {feature.howItWorks.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: `${feature.color}18`, color: feature.color }}
                >
                  {i + 1}
                </span>
                <span className="text-gray-600 text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Key Benefits</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {feature.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: `${feature.color}08` }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${feature.color}20` }}>
                  <Check size={11} style={{ color: feature.color }} />
                </div>
                <span className="text-sm text-gray-700 leading-snug">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive example options */}
        {feature.example && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">{feature.example.label}</h3>
              <span className="text-xs text-gray-400">
                {multi ? 'Select all that apply' : 'Select one'}
              </span>
            </div>
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              {feature.example.items.map((item, i) => {
                const sel = isSelected(item)
                return (
                  <button
                    key={i}
                    onClick={() => toggle(item)}
                    className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-50 last:border-0 transition-all text-left group"
                    style={{
                      background: sel ? `${feature.color}0e` : undefined,
                    }}
                  >
                    <span
                      className="text-sm font-medium transition-colors"
                      style={{ color: sel ? feature.color : '#374151' }}
                    >
                      {item}
                    </span>

                    {/* Radio / Checkbox indicator */}
                    <span
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        borderColor: sel ? feature.color : '#d1d5db',
                        background: sel ? feature.color : 'white',
                      }}
                    >
                      {sel && <Check size={11} className="text-white" strokeWidth={3} />}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Feedback message */}
            {selected.length > 0 && (
              <p className="text-xs mt-2 font-medium" style={{ color: feature.color }}>
                ✓ {selected.length} option{selected.length > 1 ? 's' : ''} selected
                {!multi && ` — "${selected[0]}"`}
              </p>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="pt-2 pb-1">
          <button
            onClick={handleCta}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
            style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}cc)` }}
          >
            {feature.cta ?? 'Get Started Free'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </Modal>
  )
}
