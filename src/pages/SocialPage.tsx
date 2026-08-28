import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Bell, BellOff, Users } from 'lucide-react'

// ─── Branded SVG icons ────────────────────────────────────────────────────────

function IconX({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.962l4.265 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function IconInstagram({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function IconFacebook({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function IconYouTube({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

type PlatformIcon = React.ComponentType<{ size?: number }>

// No official Nikah social accounts exist yet on any platform — these pages
// are an honest "not live yet" state, not a simulation of a real presence.
// Real follower/post counts and a fabricated activity feed were removed;
// don't reintroduce placeholder numbers here without a real account to back them.
const PLATFORMS: Record<string, {
  name: string
  handle: string
  color: string
  bg: string
  Icon: PlatformIcon
  description: string
}> = {
  twitter: {
    name: 'X / Twitter',
    handle: 'Not live yet',
    color: '#000000',
    bg: '#f7f7f7',
    Icon: IconX,
    description: 'We plan to share Islamic relationship guidance, success stories, and app updates here once we launch.',
  },
  instagram: {
    name: 'Instagram',
    handle: 'Not live yet',
    color: '#E1306C',
    bg: '#fff0f5',
    Icon: IconInstagram,
    description: "We plan to share content about Islamic marriage, couple stories, and du'a reminders here once we launch.",
  },
  facebook: {
    name: 'Facebook',
    handle: 'Not live yet',
    color: '#1877F2',
    bg: '#f0f5ff',
    Icon: IconFacebook,
    description: 'We plan to build a Facebook community for Muslim singles and families here once we launch.',
  },
  youtube: {
    name: 'YouTube',
    handle: 'Not live yet',
    color: '#FF0000',
    bg: '#fff5f5',
    Icon: IconYouTube,
    description: 'We plan to share Islamic marriage advice, wali guides, and app tutorials here once we launch.',
  },
}

function PlatformPage({ current }: { current: typeof PLATFORMS[string] }) {
  const [notified, setNotified] = useState(false)
  const CurrentIcon = current.Icon

  return (
      <div style={{ paddingTop: 64, minHeight: '100vh', background: current.bg }}>
        <div className="max-w-2xl mx-auto px-4 py-10">
          {/* Back */}
          <Link
            to="/social"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to all social media
          </Link>

          {/* Platform header */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            {/* Cover */}
            <div className="h-32 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${current.color}22, ${current.color}44)` }}>
              <span style={{ color: current.color, opacity: 0.7 }}><CurrentIcon size={64} /></span>
            </div>
            {/* Avatar + info */}
            <div className="px-6 pb-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl -mt-10 mb-4 border-4 border-white shadow-md"
                style={{ background: current.color }}
              >
                <span className="text-white text-2xl">ن</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">{current.name}</h1>
              <p className="text-sm font-medium mb-1" style={{ color: current.color }}>{current.handle}</p>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{current.description}</p>

              {/* Notify — the one real action available here */}
              <button
                onClick={() => setNotified(v => !v)}
                aria-pressed={notified}
                className="w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                style={notified
                  ? { background: '#f0fdf4', borderColor: '#bbf7d0', color: '#1a6b4a' }
                  : { borderColor: '#e5e7eb', color: '#4b5563' }}
              >
                {notified ? <><BellOff size={14} /> We'll notify you</> : <><Bell size={14} /> Notify me when it launches</>}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
            <span className="flex justify-center mb-2" style={{ color: current.color }}><CurrentIcon size={36} /></span>
            <p className="text-sm font-medium text-gray-600 mb-1">Not live yet</p>
            <p className="text-xs text-gray-400">We haven't launched an official {current.name} account. Check back soon, or use the button above to get notified.</p>
          </div>
        </div>
      </div>
    )
}

export default function SocialPage() {
  const { platform } = useParams<{ platform?: string }>()
  const current = platform ? PLATFORMS[platform] : null

  if (current) {
    return <PlatformPage current={current} />
  }

  // ── Social hub (all platforms) ──────────────────────────────────────────────
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#faf8f4' }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
            style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
          >
            <Users size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Follow Nikah</h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            We haven't launched our official social accounts yet. Get notified the moment each one goes live.
          </p>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {Object.entries(PLATFORMS).map(([key, p]) => (
            <Link
              key={key}
              to={`/social/${key}`}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: p.color + '18', color: p.color }}
                >
                  <p.Icon size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-gray-900">{p.name}</p>
                  <p className="text-xs font-medium" style={{ color: p.color }}>{p.handle}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#f3f4f6', color: '#6b7280' }}>
                  Not live yet
                </span>
                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: p.color }}>
                  View <ArrowLeft size={11} className="rotate-180" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
