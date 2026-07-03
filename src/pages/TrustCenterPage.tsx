import { Link } from 'react-router-dom'
import {
  ShieldCheck, Fingerprint, Flag, FileText, BookOpen, Scale, Lock, AlertCircle, BarChart3,
} from 'lucide-react'
import PageHero from '../components/PageHero'

// The nine pillars of the Trust Center. Each renders as an anchored section on
// this page; deep policy pages (/safety, /community-guidelines, /privacy) are
// linked where they already exist.
const SECTIONS = [
  {
    id: 'verification-standards',
    icon: Fingerprint,
    title: 'Verification Standards',
    color: '#1a6b4a',
    points: [
      'Government ID verification — a valid, government-issued document checked against the profile identity.',
      'Face verification — a live selfie matched to the ID photo to prevent stolen-photo profiles.',
      'Phone verification — one account per verified number; disposable/VoIP numbers are rejected.',
      'Education and profession verification (optional) — documents reviewed by a human moderator.',
      'Unverified accounts cannot send unrestricted messages and are clearly labeled.',
    ],
  },
  {
    id: 'safety-center',
    icon: ShieldCheck,
    title: 'Safety Center',
    color: '#2d6fa5',
    points: [
      'Photo protection: blurred-by-default photos, private albums, approval-based visibility.',
      'Consent-based communication — no one can message you without your acceptance.',
      'Chaperoned conversation mode with full family visibility.',
      'Block and restrict tools available on every profile and in every conversation.',
      'Emergency safety resources and local guidance per country.',
    ],
    link: { to: '/safety', label: 'Open the full Safety Center' },
  },
  {
    id: 'scam-prevention',
    icon: Flag,
    title: 'Scam Prevention',
    color: '#c94a4a',
    points: [
      'Zero tolerance: money requests, gift cards, crypto schemes, and fake overseas marriage requests mean a permanent ban.',
      'Automatic detection and risk scoring on message patterns and account behavior.',
      'Warnings shown to members when a conversation shows known scam signals.',
      'Manual review of every flagged account by a human moderator.',
      'Banned members\' verification details are blocked from re-registering.',
    ],
  },
  {
    id: 'transparency-reports',
    icon: BarChart3,
    title: 'Transparency Reports',
    color: '#c9a84c',
    points: [
      'Published metrics: verified-profile percentage, report resolution times, fraud attempts blocked, profile approval rate.',
      'No vanity metrics — we never publish invented member counts.',
      'Data updates as the live platform reports it; placeholders are always labeled.',
    ],
  },
  {
    id: 'community-guidelines',
    icon: BookOpen,
    title: 'Community Guidelines',
    color: '#7c4dbe',
    points: [
      'Marriage intent is required — the platform may not be used for casual purposes.',
      'Respectful, purposeful communication rooted in Islamic values.',
      'No harassment, no inappropriate content, no pressure tactics.',
    ],
    link: { to: '/community-guidelines', label: 'Read the full Community Guidelines' },
  },
  {
    id: 'moderation-process',
    icon: Scale,
    title: 'Moderation Process',
    color: '#1a6b4a',
    points: [
      'Every profile is reviewed by a human before it becomes visible.',
      'Reports are answered within 24 hours by a trained moderator.',
      'Escalation path: warning → restriction → suspension → permanent ban, with audit logs for every action.',
      'Appeals are reviewed by a different moderator than the one who made the original decision.',
    ],
  },
  {
    id: 'data-privacy',
    icon: Lock,
    title: 'Data Privacy',
    color: '#2d6fa5',
    points: [
      'GDPR-compliant handling of personal data; verification documents are deleted after review.',
      'Your profile is never indexed by search engines without your consent.',
      'Granular visibility controls: who sees your photos, your profile, and your activity.',
      'Full data export and account deletion available at any time.',
    ],
    link: { to: '/privacy', label: 'Read the Privacy Policy' },
  },
  {
    id: 'reporting-system',
    icon: AlertCircle,
    title: 'Reporting System',
    color: '#c94a4a',
    points: [
      'Report any profile, message, or photo in two taps.',
      'Reports are confidential — the reported member never learns who reported them.',
      'Every report receives a human response within 24 hours, with the outcome communicated to you.',
    ],
  },
  {
    id: 'annual-report',
    icon: FileText,
    title: 'Annual Transparency Report',
    color: '#c9a84c',
    points: [
      'A yearly public report covering moderation actions, scam prevention outcomes, verification statistics, and documented marriages.',
      'First report published after the platform\'s first full year of operation.',
    ],
  },
]

export default function TrustCenterPage() {
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#faf8f4' }}>
      <PageHero
        label="🛡️ Trust Center"
        title="How We Earn"
        titleHighlight="Your Trust"
        subtitle="Verification, moderation, scam prevention, and privacy — documented publicly, so you and your family know exactly how Nikah protects you."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Quick nav */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-emerald-600 hover:text-emerald-700 transition-colors">
              {s.title}
            </a>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {SECTIONS.map(s => {
            const Icon = s.icon
            return (
              <section key={s.id} id={s.id} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: '#1a1a2e' }}>{s.title}</h2>
                </div>
                <ul className="space-y-2">
                  {s.points.map(p => (
                    <li key={p} className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: s.color }}>✓</span> {p}
                    </li>
                  ))}
                </ul>
                {s.link && (
                  <Link to={s.link.to} className="inline-block mt-4 text-sm font-semibold hover:underline" style={{ color: '#1a6b4a' }}>
                    {s.link.label} →
                  </Link>
                )}
              </section>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
          >
            Create Your Verified Profile
          </Link>
          <p className="text-gray-400 text-sm mt-3">Every member starts with verification. Including you.</p>
        </div>
      </div>
    </div>
  )
}
