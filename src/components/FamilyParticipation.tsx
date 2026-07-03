import { Users, UserCheck, Search, FileCheck, MessagesSquare, LayoutDashboard, Lightbulb, Eye } from 'lucide-react'
import { useLang } from '../lib/LanguageContext'
import { tr } from '../lib/tr'

const FAMILY_FEATURES = [
  { icon: Users,           title: 'Parent Accounts',            desc: 'Parents can hold their own linked account to follow and support the search.' },
  { icon: UserCheck,       title: 'Wali Participation',         desc: 'A wali can be invited into any introduction from the very first message.' },
  { icon: Search,          title: 'Family-Assisted Search',     desc: 'Family members can browse and shortlist candidates on your behalf.' },
  { icon: FileCheck,       title: 'Family Review of Proposals', desc: 'Proposals can require family approval before an introduction begins.' },
  { icon: MessagesSquare,  title: 'Chaperoned Conversations',   desc: 'Conversations can include a chaperone who sees every message.' },
  { icon: LayoutDashboard, title: 'Family Dashboard',           desc: 'A dedicated view of active introductions, proposals, and progress.' },
  { icon: Lightbulb,       title: 'Suggestions for Parents',    desc: 'Compatible candidate suggestions parents can pass to their son or daughter.' },
  { icon: Eye,             title: 'Family Visibility Settings', desc: 'You choose exactly what your family can see — full, partial, or summary.' },
]

export default function FamilyParticipation() {
  const { lang } = useLang()
  return (
    <section id="family" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(124,77,190,0.1)', color: '#7c4dbe' }}>
            {tr(lang, '👨‍👩‍👧 Family Participation')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
            {tr(lang, 'Marriage Is a Family Matter — So Is Nikah')}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {tr(lang, 'The only platform where wali and family involvement is a first-class feature, not an afterthought. Every family tool is optional and controlled by you.')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FAMILY_FEATURES.map(f => {
            const Icon = f.icon
            return (
              <div key={f.title} className="p-5 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(124,77,190,0.1)' }}>
                  <Icon size={18} style={{ color: '#7c4dbe' }} />
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{tr(lang, f.title)}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{tr(lang, f.desc)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
