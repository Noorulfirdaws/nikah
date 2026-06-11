interface Props {
  label?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  children?: React.ReactNode
}

export default function PageHero({ label, title, titleHighlight, subtitle, children }: Props) {
  return (
    <div
      className="relative py-16 lg:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a2e1f 0%, #0d3d2b 40%, #1a6b4a 100%)' }}
    >
      {/* Decorative */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #c9a84c, transparent)' }} />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #2d9b6f, transparent)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-5 text-[120px] flex items-center justify-end pr-8 text-white select-none">✦</div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {label && (
          <span
            className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(201,168,76,0.2)', color: '#e8c96e' }}
          >
            {label}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          {title}{' '}
          {titleHighlight && (
            <span style={{
              background: 'linear-gradient(135deg, #c9a84c, #e8c96e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {titleHighlight}
            </span>
          )}
        </h1>
        {subtitle && <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  )
}
