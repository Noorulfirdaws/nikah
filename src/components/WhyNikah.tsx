import { UserX, Banknote, MessagesSquare, ShieldOff, Users, HeartOff } from 'lucide-react'

// The real problems Muslims face on generic matrimonial/dating apps — and what Nikah does about each.
const PROBLEMS = [
  {
    icon: UserX,
    problem: 'Fake profiles',
    solution: 'Every member completes government ID, face, and phone verification before they can freely interact.',
    color: '#1a6b4a',
  },
  {
    icon: Banknote,
    problem: 'Scammers',
    solution: 'AI risk scoring, message pattern detection, and human review catch money requests and romance scams early.',
    color: '#c94a4a',
  },
  {
    icon: MessagesSquare,
    problem: 'Endless messaging with no outcome',
    solution: 'Structured introductions with marriage timelines, so conversations move toward a decision — not years of chatting.',
    color: '#2d6fa5',
  },
  {
    icon: ShieldOff,
    problem: 'Unsafe interactions',
    solution: 'Chaperoned conversations, photo protection, consent-based messaging, and moderators who answer reports within 24 hours.',
    color: '#7c4dbe',
  },
  {
    icon: Users,
    problem: 'Families left out',
    solution: 'Wali and parent accounts, family review of proposals, and a family dashboard — involvement is built in, not bolted on.',
    color: '#c9a84c',
  },
  {
    icon: HeartOff,
    problem: 'No serious marriage intent',
    solution: 'Marriage intent screening and readiness badges filter out anyone who is not genuinely pursuing Nikah.',
    color: '#1a6b4a',
  },
]

export default function WhyNikah() {
  return (
    <section id="why-nikah" className="py-20 lg:py-28" style={{ background: '#faf9f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(201,74,74,0.1)', color: '#c94a4a' }}>
            ⚠️ Why Nikah Exists
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
            The Problems Other Platforms Ignore
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Muslims seeking marriage deserve better than fake profiles, scams, and casual chatting.
            Nikah was built to remove each of these obstacles.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map(item => {
            const Icon = item.icon
            return (
              <div key={item.problem} className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}15` }}>
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm">
                  <span className="line-through opacity-60">{item.problem}</span>
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.solution}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
