import { useState } from 'react'
import {
  BookOpen, MapPin, Globe, Filter, Heart, Camera, ShieldCheck,
  MessageSquare, Video, BarChart2, Moon, Star, User, Clock, ChevronRight
} from 'lucide-react'
import FeatureModal, { type FeatureDetail } from './FeatureModal'
import { useLang } from '../lib/LanguageContext'

const FEATURE_CATEGORIES = [
  { id: 'faith', label: '🕌 Faith & Religion' },
  { id: 'matching', label: '🔍 Matching' },
  { id: 'privacy', label: '🔒 Privacy' },
  { id: 'communication', label: '💬 Communication' },
]

const FEATURES: (FeatureDetail & { category: string })[] = [
  {
    category: 'faith',
    icon: BookOpen,
    color: '#1a6b4a',
    title: 'Sect & Madhhab Preferences',
    tagline: 'Match with someone who shares your Islamic tradition',
    description: 'Islam is a vast and beautiful religion with rich diversity in scholarly tradition and practice. Nikah allows you to specify your sect — Sunni, Shia, Ibadi — and, within Sunni Islam, your preferred madhhab: Hanafi, Maliki, Shafi\'i, or Hanbali. This ensures you\'re connected with someone whose understanding of fiqh aligns with yours, which matters deeply for marriage.',
    howItWorks: [
      'On your profile, select your sect from the available options.',
      'Optionally choose your preferred madhhab within your sect.',
      'Set your preference for your future spouse — whether you prefer the same sect or are open to others.',
      'The app surfaces profiles based on your preferences while always showing compatibility clearly.',
    ],
    benefits: [
      'No confusion about religious practices',
      'Shared understanding of prayer and fiqh',
      'Deeper compatibility from the start',
      'Respectful of all Islamic traditions',
    ],
    example: {
      label: 'Sect options available',
      items: ['Sunni — Hanafi', 'Sunni — Maliki', 'Sunni — Shafi\'i', 'Sunni — Hanbali', 'Shia — Jafari', 'Ibadi', 'Prefer not to say', 'Open to all'],
    },
    cta: 'Set My Faith Preferences',
  },
  {
    category: 'faith',
    icon: Moon,
    color: '#1a6b4a',
    title: 'Prayer Level',
    tagline: 'Find someone who shares your level of daily devotion',
    description: 'Prayer is the pillar of Islam and a cornerstone of daily Muslim life. Being aligned on how you each practice salah removes a potential source of friction in marriage. Nikah lets you honestly describe your prayer practice and filter matches based on theirs — not to judge, but to find genuine compatibility.',
    howItWorks: [
      'Select your honest prayer level from the options on your profile.',
      'Indicate what prayer level you\'re looking for in a spouse.',
      'The filter applies as a preference, not a hard block, unless you choose.',
      'You can update your prayer level at any time as your practice grows.',
    ],
    benefits: [
      'Find someone equally devout',
      'Honesty over pretense',
      'Shared spiritual rhythm at home',
      'No judgment — only matching',
    ],
    example: {
      label: 'Prayer level options',
      items: ['5 times daily — consistently', 'Mostly daily with occasional gaps', 'Sometimes — working on it', 'Friday prayers + occasional', 'Currently learning and growing'],
    },
    cta: 'Update My Prayer Level',
  },
  {
    category: 'faith',
    icon: Star,
    color: '#1a6b4a',
    title: 'Halal Lifestyle',
    tagline: 'Align on the lifestyle choices that matter',
    description: 'From diet to dress, Islamic lifestyle choices are deeply personal and can significantly affect marital harmony. Nikah\'s halal lifestyle filters allow you to be clear about your own practices and what you\'re looking for in a spouse — whether it\'s hijab, halal diet, no smoking, alcohol avoidance, or modesty in general.',
    howItWorks: [
      'Complete the lifestyle section of your profile with your current practices.',
      'Mark your preferences for your future spouse with flexibility levels.',
      'Filter matches based on compatible lifestyle values.',
      'See lifestyle compatibility breakdown in each profile.',
    ],
    benefits: [
      'Align on diet — strictly halal, certified, or flexible',
      'Set expectations on hijab and modesty preferences',
      'Filter for non-smoking households',
      'Avoid surprises after marriage',
    ],
    example: {
      label: 'Lifestyle filter options',
      items: ['Strictly halal diet (certified)', 'Halal diet (non-certified accepted)', 'Wears hijab — essential for me', 'Wears hijab — preferred but flexible', 'Non-smoker — essential', 'Alcohol-free household'],
    },
    cta: 'Set Lifestyle Preferences',
  },
  {
    category: 'faith',
    icon: Clock,
    color: '#1a6b4a',
    title: 'Marriage Timeline',
    tagline: 'Be upfront about when you\'re ready',
    description: 'One of the most common sources of disappointment in marriage apps is mismatched timelines. Some people are ready to get married within months; others are still exploring. Nikah makes your timeline transparent from day one, so you only connect with people whose readiness matches yours.',
    howItWorks: [
      'Select your marriage readiness on your profile.',
      'Match only with people in your timeline range.',
      'Update your timeline as your situation changes.',
      'Timeline is displayed clearly on profile cards.',
    ],
    benefits: [
      'No wasted months with incompatible timelines',
      'Set clear expectations from the first message',
      'Respects everyone\'s readiness',
      'Update anytime as circumstances change',
    ],
    example: {
      label: 'Timeline options',
      items: ['Ready now — actively looking', 'Within 6 months', 'Within the next year', '1–2 years', 'Open to the right person whenever'],
    },
    cta: 'Set My Timeline',
  },
  {
    category: 'matching',
    icon: MapPin,
    color: '#c9a84c',
    title: 'Country & City Filters',
    tagline: 'Search locally, nationally, or across the world',
    description: 'Whether you want to find someone in the same city or are open to long-distance relationships that lead to marriage, Nikah\'s location filters give you full control. Search by country, city, or radius. With members in over 50 countries, your options are truly global.',
    howItWorks: [
      'Set your home location (city, region, country).',
      'Choose search radius: 10 km, 50 km, 100 km, national, or worldwide.',
      'Filter by specific countries or cities you\'re open to.',
      'For diaspora members, filter for your home country to find cultural matches.',
    ],
    benefits: [
      'Find someone in your city for easier meetings',
      'Search your home country for cultural compatibility',
      'International search for those open to relocation',
      'Radius-based search for practical matching',
    ],
    example: {
      label: 'Location filter options',
      items: ['Within 25 km of my location', 'Within 100 km', 'Same country only', 'Any country', 'Specific countries (multi-select)', 'Diaspora match (home country)'],
    },
    cta: 'Set My Location Preferences',
  },
  {
    category: 'matching',
    icon: Globe,
    color: '#c9a84c',
    title: 'Language Filters',
    tagline: 'Match with someone you can truly communicate with',
    description: 'Language is the foundation of communication and deep connection. Nikah supports 13 languages and lets you filter matches by the languages they speak — fluently or conversationally. Find someone you can speak your mother tongue with, or someone who bridges cultures through shared language.',
    howItWorks: [
      'Add all languages you speak to your profile with fluency levels.',
      'Set your language preferences for a spouse.',
      'The app surfaces profiles who speak at least one common language.',
      'Browse by specific language communities.',
    ],
    benefits: [
      'Full app experience in 13 languages',
      'Filter by mother tongue or secondary languages',
      'RTL support for Arabic and Urdu',
      'Connect across language communities',
    ],
    example: {
      label: 'Supported languages',
      items: ['English', 'Arabic (العربية)', 'French (Français)', 'Turkish (Türkçe)', 'Urdu (اردو)', 'Bengali (বাংলা)', 'Bahasa Indonesia', 'Somali (Af Soomaali)'],
    },
    cta: 'Set Language Preferences',
  },
  {
    category: 'matching',
    icon: User,
    color: '#c9a84c',
    title: 'Ethnicity & Culture',
    tagline: 'Honour your heritage or explore beyond it',
    description: 'Cultural background deeply shapes family life, celebration, food, communication style, and values. Nikah lets you specify your own cultural heritage and your openness to marrying within or across cultures — with full respect for both choices. There\'s no right answer, only honest ones.',
    howItWorks: [
      'Add your ethnic and cultural background to your profile.',
      'Set your preference: same culture, specific cultures, or any.',
      'Cultural compatibility is reflected in the match score.',
      'Culture tags appear clearly on profile cards.',
    ],
    benefits: [
      'Find someone who shares your cultural celebrations',
      'Or discover beautiful cross-cultural matches',
      'Reduces post-marriage surprises about family expectations',
      'Respect for all ethnic backgrounds',
    ],
    example: {
      label: 'Culture options',
      items: ['Arab', 'South Asian (Pakistani / Indian / Bangladeshi)', 'Southeast Asian (Malaysian / Indonesian)', 'Turkish / Central Asian', 'West African / East African', 'Western Muslim (convert or heritage)'],
    },
    cta: 'Set Cultural Preferences',
  },
  {
    category: 'matching',
    icon: BarChart2,
    color: '#c9a84c',
    title: 'Compatibility Score',
    tagline: 'Understand your match before the first message',
    description: 'Nikah\'s compatibility engine analyses dozens of data points — faith values, lifestyle, location, language, personality traits, family expectations, and marriage goals — to calculate a meaningful percentage score for every match. It\'s not a gimmick; it\'s a tool to help you prioritise.',
    howItWorks: [
      'Complete your full profile including preferences and personality answers.',
      'The algorithm processes your responses across 6 key dimensions.',
      'Each profile card shows an overall % plus subcategory breakdowns.',
      'Score updates automatically as you refine your preferences.',
    ],
    benefits: [
      'Focus attention on the most compatible matches',
      'See breakdowns: Faith, Values, Lifestyle, Goals, Location, Language',
      'Saves time filtering through incompatible profiles',
      'Scientifically structured, Islamically intentional',
    ],
    example: {
      label: 'Compatibility dimensions',
      items: ['Faith alignment (prayer, sect, practice)', 'Shared values (family, community)', 'Lifestyle match (diet, modesty, habits)', 'Life goals (children, career, location)', 'Personality fit (communication style)', 'Language & culture overlap'],
    },
    cta: 'Complete Profile for Full Score',
  },
  {
    category: 'matching',
    icon: Filter,
    color: '#c9a84c',
    title: 'Interest Tags',
    tagline: 'Find someone who shares your passions',
    description: 'Beyond faith and lifestyle, shared interests create the joy of daily life together. Nikah\'s interest tags let you express what you love and filter for matches who share it — from Islamic studies and community service to hiking, cooking, or travel.',
    howItWorks: [
      'Browse and select up to 20 interest tags from curated categories.',
      'Tags appear on your profile for matches to see.',
      'Filter by specific tags when browsing profiles.',
      'Common interests are highlighted in profile views.',
    ],
    benefits: [
      'Instant conversation starters',
      'Find shared hobbies and weekend interests',
      'Reflect your full personality, not just faith stats',
      'Makes meaningful connections easier',
    ],
    example: {
      label: 'Sample interest tags',
      items: ['Islamic studies & Quran', 'Travel & exploration', 'Cooking & food culture', 'Fitness & sports', 'Reading & literature', 'Community service & charity', 'Nature & outdoors', 'Tech & entrepreneurship'],
    },
    cta: 'Add My Interests',
  },
  {
    category: 'privacy',
    icon: Camera,
    color: '#7c4dbe',
    title: 'Photo Blur & Private Photos',
    tagline: 'Your image, your rules',
    description: 'Privacy is a fundamental right, and your photos should be shared on your terms. Nikah blurs your photos by default — you decide who gets to see your face. Create a private album and approve requests individually. This is especially important for sisters who prefer modesty in their early interactions.',
    howItWorks: [
      'Upload your photos — they are blurred to all users by default.',
      'When someone interests you, you can approve their view request.',
      'You can also proactively share your photos with specific matches.',
      'Private album lets you keep your best photos for serious connections.',
    ],
    benefits: [
      'Full control over who sees your face',
      'Protects against screenshots and misuse',
      'Blur stays on until you decide otherwise',
      'Private album for trusted connections only',
    ],
    example: {
      label: 'Photo control settings',
      items: ['Blur all photos (default)', 'Visible to approved matches only', 'Visible to all members (optional)', 'Private album — invite only', 'Request to view my photo', 'Approve or decline photo requests'],
    },
    cta: 'Control My Photo Privacy',
  },
  {
    category: 'privacy',
    icon: ShieldCheck,
    color: '#7c4dbe',
    title: 'Verified Profiles',
    tagline: 'Know you\'re speaking with a real person',
    description: 'Nikah\'s verification system gives serious members a way to signal their authenticity. Optional photo and ID verification earns a verified badge that appears on your profile, building trust with potential matches and their families. Verified profiles consistently receive more responses.',
    howItWorks: [
      'Submit a selfie and optionally an ID document through secure verification.',
      'Our team reviews and approves within 24 hours.',
      'Earn a verified badge displayed prominently on your profile.',
      'Filter to show only verified profiles in your search.',
    ],
    benefits: [
      'Build trust with potential matches and families',
      'Verified badge increases profile engagement',
      'Reduces risk of fake profiles',
      'Optional — but strongly recommended',
    ],
    example: {
      label: 'Verification tiers',
      items: ['Email verified (basic)', 'Phone verified', 'Photo verified (selfie check)', 'ID verified (full trust badge)', 'Wali-confirmed profile'],
    },
    cta: 'Verify My Profile',
  },
  {
    category: 'communication',
    icon: Heart,
    color: '#c94a4a',
    title: 'Icebreaker Questions',
    tagline: 'Start every conversation with purpose',
    description: 'The first message is often the hardest. Nikah\'s icebreaker system provides thoughtful, faith-aligned prompts that make starting a conversation natural and meaningful — no generic "hi" messages. Both parties answer the same question, creating an instant shared context.',
    howItWorks: [
      'Both users answer a shared prompt before the chat unlocks.',
      'Prompts are curated around values, faith, family, and goals.',
      'Answers appear as the first messages in your conversation.',
      'New prompts are added regularly to keep them fresh.',
    ],
    benefits: [
      'Eliminates awkward first messages',
      'Immediately reveals values and personality',
      'Creates a respectful, purposeful tone',
      'Works especially well for those new to the process',
    ],
    example: {
      label: 'Sample icebreaker prompts',
      items: ['"What does a typical Friday evening look like for you?"', '"What\'s one quality in a spouse you consider non-negotiable?"', '"Describe your ideal home life in three words."', '"What does your relationship with your family look like?"', '"What are you most excited about in marriage?"'],
    },
    cta: 'Answer My First Icebreaker',
  },
  {
    category: 'communication',
    icon: MessageSquare,
    color: '#c94a4a',
    title: 'Wali / Chaperone Chat',
    tagline: 'Keep the process fully halal',
    description: 'Islam encourages that conversations between non-mahram individuals happen with the presence of a wali or trusted family member. Nikah\'s Wali Mode lets you invite a parent, guardian, or sibling into your chat thread — so every conversation happens with full transparency and Islamic etiquette.',
    howItWorks: [
      'Once a conversation reaches a serious stage, invite your wali via email.',
      'Your wali joins as a read-only or participating member of the thread.',
      'All parties can see the full conversation history.',
      'Your wali can communicate directly if both sides agree.',
    ],
    benefits: [
      'Fully halal process — no one is alone in conversation',
      'Builds trust with the other family immediately',
      'Satisfies traditional family expectations',
      'Easy to set up — no separate app needed',
    ],
    example: {
      label: 'Wali mode options',
      items: ['Invite wali via email link', 'Wali read-only mode', 'Wali participating mode', 'Both families in same thread', 'Request wali verification from match', 'Wali-confirmed profile badge'],
      multi: true,
    },
    cta: 'Explore Wali Mode',
  },
  {
    category: 'communication',
    icon: Video,
    color: '#c94a4a',
    title: 'Video Intro Prompts',
    tagline: 'Let your sincerity speak for itself',
    description: 'A written profile can only say so much. Nikah\'s video intro prompts let you record short, structured video responses to faith and values questions — giving potential matches a genuine feel for who you are beyond text. It\'s the closest thing to a face-to-face introduction on an app.',
    howItWorks: [
      'Choose from a library of curated prompt questions.',
      'Record a 30–90 second video response from your profile page.',
      'Videos are blurred thumbnails by default — approved matches see them.',
      'You can record multiple prompts and pick your best.',
    ],
    benefits: [
      'Show your personality and sincerity directly',
      'Builds trust before any direct conversation',
      'Video prompts are faith-focused and respectful',
      'Optional — but highly valued by serious members',
    ],
    example: {
      label: 'Sample video prompt questions',
      items: ['"Tell me about your relationship with the Quran."', '"What does family mean to you?"', '"What does a day in your life look like?"', '"What are you looking for in a spouse?"', '"Share something you\'re passionate about."'],
    },
    cta: 'Record My Video Intro',
  },
]

export default function Features() {
  const { t } = useLang()
  const [activeTab, setActiveTab] = useState('faith')
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail | null>(null)

  const CATEGORY_LABELS: Record<string, string> = {
    faith: t.feat_tab_faith,
    matching: t.feat_tab_matching,
    privacy: t.feat_tab_privacy,
    communication: t.feat_tab_comm,
  }

  const filtered = FEATURES.filter(f => f.category === activeTab)

  return (
    <section id="features" className="py-20 lg:py-28" style={{ background: '#faf8f4' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}
          >
            {t.feat_badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a1a2e' }}>
            {t.feat_title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            {t.feat_subtitle}
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FEATURE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
              style={
                activeTab === cat.id
                  ? { background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)', color: 'white' }
                  : { background: 'white', color: '#555', border: '1px solid #e5e5e5' }
              }
            >
              {CATEGORY_LABELS[cat.id] ?? cat.label}
            </button>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((feat, i) => {
            const Icon = feat.icon
            return (
              <button
                key={i}
                onClick={() => setSelectedFeature(feat)}
                className="group text-left p-6 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': feat.color } as React.CSSProperties}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"
                    style={{ background: `${feat.color}15` }}
                  >
                    <Icon size={22} style={{ color: feat.color }} />
                  </div>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    style={{ background: `${feat.color}12`, color: feat.color }}
                  >
                    Learn more <ChevronRight size={11} />
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1.5">{feat.title}</h3>
                <p className="text-gray-400 text-xs font-medium mb-2">{feat.tagline}</p>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {feat.description.slice(0, 100)}…
                </p>
              </button>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            {FEATURES.length} features · Click any card to learn more
          </p>
        </div>
      </div>

      {/* Feature detail modal */}
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
    </section>
  )
}
