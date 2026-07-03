// Meaningful trust metrics instead of vanity member counts.
// NOTE: values below are PLACEHOLDERS until the live platform reports real numbers —
// clearly labeled as such in the UI to avoid fabricated claims.
const METRICS = [
  { value: '—', label: 'Verified profile percentage' },
  { value: '—', label: 'Successful marriages reported' },
  { value: '—', label: 'Average first response time' },
  { value: '—', label: 'Scam reports resolved < 24h' },
  { value: '—', label: 'Profile approval rate' },
  { value: '—', label: 'Fraud attempts blocked' },
  { value: '50+', label: 'Countries served' },
  { value: '12', label: 'Languages supported' },
]

export default function Transparency() {
  return (
    <section id="transparency" className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>
            📊 Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#1a1a2e' }}>
            We Publish the Numbers That Matter
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            No inflated member counts. As the platform grows, these metrics are reported live
            and audited in our annual transparency report.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {METRICS.map(m => (
            <div key={m.label} className="text-center p-4 rounded-2xl" style={{ background: '#faf9f6' }}>
              <p className="text-2xl font-bold" style={{ color: '#1a6b4a' }}>{m.value}</p>
              <p className="text-gray-500 text-xs mt-1">{m.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">
          Metrics marked “—” will display live data at launch. We do not publish estimates or invented figures.
        </p>
      </div>
    </section>
  )
}
