import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useLang } from '../lib/LanguageContext'

// All names, stories, and details are entirely fictional and for demonstration purposes only.
const STORIES = [
  {
    initials: ['AH', 'OB'],
    names: 'Amira & Omar',
    location: 'London, UK & Cairo, Egypt',
    flags: '🇬🇧🇪🇬',
    months: 4,
    story: 'I never expected to find someone so aligned with my values — Omar was respectful, faith-focused, and honest from the very first message. After four months of getting to know each other on Nikah, with our families involved every step of the way, we got engaged. The wali chat feature made everything feel right and proper.',
    colors: ['#1a6b4a', '#c9a84c'],
    tags: ['Sunni', 'Arabic-speaking', 'Verified profiles'],
    year: 2024,
    highlight: '92% compatibility match',
  },
  {
    initials: ['FI', 'YA'],
    names: 'Fatima & Yusuf',
    location: 'Kuala Lumpur, Malaysia & Istanbul, Turkey',
    flags: '🇲🇾🇹🇷',
    months: 6,
    story: 'Being in different countries felt like a barrier until Nikah\'s international filters connected us. We spoke different languages but found common ground in our faith and life goals. The compatibility score was 95% — and it showed. We flew to meet each other\'s families and are now planning our wedding.',
    colors: ['#2d6fa5', '#7c4dbe'],
    tags: ['International', 'Multilingual', '95% match'],
    year: 2024,
    highlight: '95% compatibility match',
  },
  {
    initials: ['ZN', 'HM'],
    names: 'Zainab & Hassan',
    location: 'Toronto, Canada & Casablanca, Morocco',
    flags: '🇨🇦🇲🇦',
    months: 3,
    story: 'Hassan\'s profile mentioned his love for Islamic studies and his dedication to community. I knew immediately this was a serious person. Three months later, after long calls with our families involved, we knew. Nikah made it easy to involve my wali and keep everything halal and purposeful.',
    colors: ['#c9a84c', '#1a6b4a'],
    tags: ['Diaspora connection', 'Wali involved', 'Verified'],
    year: 2025,
    highlight: 'Met via icebreaker questions',
  },
  {
    initials: ['NR', 'AK'],
    names: 'Noor & Arif',
    location: 'Birmingham, UK & Lahore, Pakistan',
    flags: '🇬🇧🇵🇰',
    months: 5,
    story: 'I had been on other apps and felt like they didn\'t respect the Islamic values I hold dear. Nikah was different from day one. The prayer-level filters and sect preferences meant I saw profiles that actually matched what I was looking for. Arif and I shared the same vision for family life. Alhamdulillah, we\'re married now.',
    colors: ['#c94a4a', '#2d6fa5'],
    tags: ['British-Pakistani', 'Faith filters', 'Alhamdulillah'],
    year: 2025,
    highlight: 'Married after 5 months',
  },
  {
    initials: ['HB', 'MA'],
    names: 'Hana & Malik',
    location: 'Paris, France & Dakar, Senegal',
    flags: '🇫🇷🇸🇳',
    months: 7,
    story: 'Coming from different cultures — Algerian-French and Senegalese — we were surprised how much our values aligned. Malik\'s profile was thoughtful and sincere. We used the French-language interface and it felt so natural. Our families met via video call arranged through the family chat feature. Now we\'re planning for life together.',
    colors: ['#1a6b4a', '#c9a84c'],
    tags: ['French-language', 'Cross-cultural', 'Family involved'],
    year: 2025,
    highlight: 'Connected across cultures',
  },
]

function StoryCard({ story }: { story: typeof STORIES[0] }) {
  return (
    <div className="bg-white rounded-3xl p-7 card-shadow-lg border border-gray-100 h-full flex flex-col">
      {/* Top */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
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
            <p className="font-bold text-gray-800">{story.names}</p>
            <p className="text-gray-400 text-xs">{story.location} {story.flags}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={13} fill="#c9a84c" style={{ color: '#c9a84c' }} />
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="relative flex-1 mb-5">
        <Quote size={20} className="absolute -top-1 -left-1 opacity-20" style={{ color: '#1a6b4a' }} />
        <p className="text-gray-600 text-sm leading-relaxed pl-4 italic">
          "{story.story}"
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {story.tags.map(tag => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(26,107,74,0.08)', color: '#1a6b4a' }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.12)', color: '#b8942d' }}>
          ✨ {story.highlight}
        </span>
        <span className="text-xs text-gray-400">{story.year}</span>
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
          <p className="text-gray-400 text-xs mt-2">* All stories and names are fictional and for illustrative purposes only.</p>
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

        {/* Stats */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 text-sm">
            Join <span className="font-semibold text-gray-600">42,000+</span> couples who found their spouse on Nikah
          </p>
        </div>
      </div>
    </section>
  )
}
