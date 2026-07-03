import { useState } from 'react'
import { ChevronLeft, ChevronRight, Users, CalendarClock, HeartHandshake } from 'lucide-react'
import { useLang } from '../lib/LanguageContext'

// Marriage-journey format: anonymized names, country, timeline, compatibility
// factors, family involvement, and outcome. All entries are illustrative
// examples of the journey format until real, consented stories replace them.
const STORIES = [
  {
    initials: ['A', 'O'],
    names: 'A. & O. (names withheld)',
    location: 'United Kingdom 🇬🇧 / Egypt 🇪🇬',
    timeline: 'Introduction → Nikah in 7 months',
    factors: ['Same madhab', 'Aligned marriage timeline', 'Both wanted family involved early'],
    family: 'Wali joined the conversation from the second week; families met by video call in month 2.',
    outcome: 'Nikah completed 2024',
    colors: ['#1a6b4a', '#c9a84c'],
  },
  {
    initials: ['F', 'Y'],
    names: 'F. & Y. (names withheld)',
    location: 'Malaysia 🇲🇾 / Turkey 🇹🇷',
    timeline: 'Introduction → engagement in 6 months',
    factors: ['95% compatibility', 'Shared relocation plan', 'Matching children preference'],
    family: 'Both sets of parents used family accounts to review the proposal before the first meeting.',
    outcome: 'Engaged, wedding planned',
    colors: ['#2d6fa5', '#7c4dbe'],
  },
  {
    initials: ['Z', 'H'],
    names: 'Z. & H. (names withheld)',
    location: 'Canada 🇨🇦 / Morocco 🇲🇦',
    timeline: 'Introduction → Nikah in 5 months',
    factors: ['Aligned on deen & Islamic study', 'Same financial expectations', 'Ready Now badges'],
    family: 'Chaperoned conversations throughout; her wali approved the proposal in month 3.',
    outcome: 'Nikah completed 2025',
    colors: ['#c9a84c', '#1a6b4a'],
  },
  {
    initials: ['N', 'A'],
    names: 'N. & A. (names withheld)',
    location: 'United Kingdom 🇬🇧 / Pakistan 🇵🇰',
    timeline: 'Introduction → Nikah in 8 months',
    factors: ['Same prayer practice', 'Shared family vision', 'Compatible living arrangements'],
    family: 'Family-assisted search: his mother shortlisted the profile through a parent account.',
    outcome: 'Nikah completed 2025',
    colors: ['#c94a4a', '#2d6fa5'],
  },
  {
    initials: ['H', 'M'],
    names: 'H. & M. (names withheld)',
    location: 'France 🇫🇷 / Senegal 🇸🇳',
    timeline: 'Introduction → engagement in 9 months',
    factors: ['Cross-cultural alignment on values', 'French-language match', 'Same marriage timeline'],
    family: 'Families met via video call arranged through the family dashboard.',
    outcome: 'Engaged, Nikah scheduled',
    colors: ['#1a6b4a', '#c9a84c'],
  },
]

function StoryCard({ story }: { story: typeof STORIES[0] }) {
  return (
    <div className="bg-white rounded-3xl p-7 card-shadow-lg border border-gray-100 h-full flex flex-col">
      {/* Who & where */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex -space-x-2">
          {story.initials.map((init, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm"
              style={{ background: story.colors[i] }}
            >
              {init}
            </div>
          ))}
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">{story.names}</p>
          <p className="text-gray-400 text-xs">{story.location}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold" style={{ color: '#1a6b4a' }}>
        <CalendarClock size={14} /> {story.timeline}
      </div>

      {/* Compatibility factors */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
          <HeartHandshake size={13} style={{ color: '#c9a84c' }} /> Why they were compatible
        </p>
        <div className="flex flex-wrap gap-1.5">
          {story.factors.map(f => (
            <span key={f} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(26,107,74,0.08)', color: '#1a6b4a' }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Family involvement */}
      <div className="flex-1 mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
          <Users size={13} style={{ color: '#7c4dbe' }} /> Family involvement
        </p>
        <p className="text-gray-500 text-xs leading-relaxed">{story.family}</p>
      </div>

      {/* Outcome */}
      <div className="pt-4 border-t border-gray-100">
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.12)', color: '#b8942d' }}>
          💍 {story.outcome}
        </span>
      </div>
    </div>
  )
}

export default function SuccessStories() {
  const { t } = useLang()
  const [page, setPage] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(STORIES.length / perPage)
  const visible = STORIES.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="stories" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>
            {t.stories_badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
            {t.stories_title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            {t.stories_subtitle}
          </p>
          <p className="text-gray-400 text-xs mt-2">* Illustrative examples of our journey format. Real, consented member stories will replace these at launch.</p>
        </div>

        {/* Stories grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visible.map((story, i) => (
            <StoryCard key={i} story={story} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ background: page === i ? '#1a6b4a' : '#e5e5e5', transform: page === i ? 'scale(1.3)' : 'scale(1)' }}
            />
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Honest closing line — no invented totals */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 text-sm">
            Every completed Nikah is documented, with consent, in our annual transparency report.
          </p>
        </div>
      </div>
    </section>
  )
}
