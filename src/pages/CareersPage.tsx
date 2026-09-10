import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'
import { MapPin, Globe, X, Mail, Copy, Check } from 'lucide-react'
import { useState } from 'react'

const CAREERS_EMAIL = 'careers@nikahapp.com'

const JOBS = [
  { title: 'Senior Frontend Engineer',       dept: 'Engineering', location: 'Remote',        type: 'Full-time', highlight: true  },
  { title: 'iOS Engineer',                   dept: 'Engineering', location: 'Remote',        type: 'Full-time', highlight: false },
  { title: 'Android Engineer',               dept: 'Engineering', location: 'Remote',        type: 'Full-time', highlight: false },
  { title: 'Product Designer (UX/UI)',       dept: 'Design',      location: 'Remote',        type: 'Full-time', highlight: true  },
  { title: 'Head of Trust & Safety',         dept: 'Safety',      location: 'Remote',        type: 'Full-time', highlight: false },
  { title: 'Community Manager (Arabic)',     dept: 'Community',   location: 'Remote (MENA)', type: 'Full-time', highlight: false },
  { title: 'Community Manager (South Asia)', dept: 'Community',  location: 'Remote',        type: 'Full-time', highlight: false },
  { title: 'Marketing Manager (Europe)',     dept: 'Marketing',   location: 'Remote (EU)',   type: 'Full-time', highlight: false },
  { title: 'Data Analyst',                   dept: 'Data',        location: 'Remote',        type: 'Full-time', highlight: false },
]

const PERKS = [
  { icon: '🌍', title: 'Fully remote',       desc: 'Work from anywhere. We have team members on 5 continents.' },
  { icon: '🕌', title: 'Friday flexibility', desc: "We respect Jumu'ah. Flexible hours on Fridays for all team members." },
  { icon: '📚', title: 'Learning budget',    desc: '$2,000/year for courses, books, and conferences.' },
  { icon: '🏥', title: 'Health coverage',    desc: 'Comprehensive medical, dental, and mental health support.' },
  { icon: '💻', title: 'Equipment stipend',  desc: '$1,500 home office setup budget.' },
  { icon: '✈️', title: 'Annual team retreat', desc: 'One in-person gathering per year in a new city.' },
]

interface Job { title: string; dept: string; location: string; type: string; highlight: boolean }

function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const subject = `Application: ${job.title}`
  const body = `Hi Nikah team,\n\nI'd like to apply for the ${job.title} role (${job.dept}, ${job.location}).\n\nMy CV is attached. A short note on why I'm a good fit:\n\n\n\nName:\nLinkedIn / portfolio:\nLocation & time zone:\n`
  const mailto = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CAREERS_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable — the address is shown in plain text anyway */ }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Apply for ${job.title}`}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-gray-100">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-400" />
          </button>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#1a6b4a' }}>
            {job.dept} · {job.location}
          </p>
          <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
        </div>

        {/* Body — honest email-based application (no CV storage exists yet) */}
        <div className="px-7 py-6">
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            To apply, email your CV and a short cover note to our recruiting inbox. Use the button below to open
            a pre-filled message, or copy the address and attach your CV yourself.
          </p>

          <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-200 mb-4">
            <span className="text-sm font-mono text-gray-700 truncate">{CAREERS_EMAIL}</span>
            <button
              onClick={copyEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-colors"
              style={copied
                ? { background: '#f0fdf4', color: '#1a6b4a' }
                : { background: 'rgba(26,107,74,0.08)', color: '#1a6b4a' }}
            >
              {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
            </button>
          </div>

          <a
            href={mailto}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: 'linear-gradient(135deg,#1a6b4a,#2d9b6f)' }}
          >
            <Mail size={15} /> Open email to apply
          </a>

          <p className="text-xs text-gray-400 text-center mt-3">
            Put <strong>{subject}</strong> in the subject line so we route it correctly.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CareersPage() {
  const [applyingTo, setApplyingTo] = useState<Job | null>(null)

  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero
        label="💼 Careers at Nikah"
        title="Help Us Connect"
        titleHighlight="the Ummah"
        subtitle="Join a team of Muslims building technology that serves the global Muslim community with integrity, care, and purpose."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        {/* Why join */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Work that matters</h2>
          <p className="text-gray-600 leading-relaxed">
            At Nikah, your work directly helps Muslims around the world find righteous spouses and build halal families.
            We're a remote-first, Muslim-founded company with a culture of purpose, prayer, and productivity.
          </p>
        </div>

        {/* Perks */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">What we offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERKS.map(p => (
              <div key={p.title} className="p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all">
                <div className="text-2xl mb-2">{p.icon}</div>
                <p className="font-semibold text-gray-800 text-sm mb-1">{p.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open roles */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Open positions</h2>
          <div className="space-y-3">
            {JOBS.map(job => (
              <div
                key={job.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white border hover:shadow-md transition-all cursor-pointer"
                style={{ borderColor: job.highlight ? '#1a6b4a' : '#f0f0f0' }}
                onClick={() => setApplyingTo(job)}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {job.highlight && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(26,107,74,0.1)', color: '#1a6b4a' }}>
                        Featured
                      </span>
                    )}
                    <span className="text-xs font-medium text-gray-400">{job.dept}</span>
                  </div>
                  <p className="font-semibold text-gray-800">{job.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={11} />{job.location}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400"><Globe size={11} />{job.type}</span>
                  </div>
                </div>
                <button
                  className="mt-3 sm:mt-0 px-5 py-2 rounded-xl text-sm font-medium transition-all hover:shadow-sm hover:scale-105"
                  style={{ background: 'rgba(26,107,74,0.08)', color: '#1a6b4a' }}
                  onClick={e => { e.stopPropagation(); setApplyingTo(job) }}
                >
                  Apply →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* No role */}
        <div className="text-center p-8 rounded-3xl" style={{ background: 'rgba(26,107,74,0.06)' }}>
          <p className="font-semibold text-gray-800 mb-2">Don't see a role that fits?</p>
          <p className="text-gray-500 text-sm mb-4">
            Send us a general application. If you share our mission and have skills we need, we'd love to hear from you.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#1a6b4a,#2d9b6f)' }}>
            Get in touch
          </Link>
        </div>
      </div>

      {/* Application modal */}
      {applyingTo && <ApplyModal job={applyingTo} onClose={() => setApplyingTo(null)} />}
    </div>
  )
}
