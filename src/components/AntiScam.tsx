import { Ban, ShieldAlert, Scale, RefreshCcw } from 'lucide-react'

// Behavior Nikah explicitly prohibits — a defensive, user-protection commitment.
const PROHIBITED = [
  'Requests for money',
  'Gift card requests',
  'Crypto or investment schemes',
  'Fake overseas marriage requests',
  'Unverified profiles messaging freely',
  'Multiple hidden accounts',
  'Harassment of any kind',
  'Suspicious mass messaging',
]

// How enforcement works, in escalating order.
const ENFORCEMENT = [
  { icon: ShieldAlert, title: 'Automatic Detection & Risk Scoring', desc: 'Message patterns, account behavior, and reports feed a risk score. High-risk accounts are flagged before they can reach more members.' },
  { icon: Ban,         title: 'Warnings & Restrictions',            desc: 'Risky behavior triggers warnings and messaging restrictions immediately — a suspicious account cannot keep contacting people while under review.' },
  { icon: Scale,       title: 'Manual Review & Permanent Bans',     desc: 'A human moderator reviews every flagged account. Confirmed scammers are permanently banned and their verification details blocked from re-registering.' },
  { icon: RefreshCcw,  title: 'Refunds When Applicable',            desc: 'If a paying member is harmed by a failure of our safety systems, we review the case for a refund. We stand behind our protection.' },
]

export default function AntiScam() {
  return (
    <section id="anti-scam" className="py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #23233d 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(201,74,74,0.25)', color: '#ff9d9d' }}>
            🚫 Our Anti-Scam Commitment
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Zero Tolerance. Enforced by Systems and People.
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Marriage scams target hopeful people at their most trusting. We treat scam prevention
            as a core product feature — not a help-center page.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Prohibited list */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Ban size={18} style={{ color: '#ff9d9d' }} /> Never allowed on Nikah
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {PROHIBITED.map(p => (
                <li key={p} className="text-white/70 text-sm flex items-start gap-2">
                  <span style={{ color: '#ff9d9d' }}>✕</span> {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Enforcement */}
          <div className="space-y-4">
            {ENFORCEMENT.map(e => {
              const Icon = e.icon
              return (
                <div key={e.title} className="flex gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.2)' }}>
                    <Icon size={18} style={{ color: '#c9a84c' }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{e.title}</h4>
                    <p className="text-white/55 text-xs leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
