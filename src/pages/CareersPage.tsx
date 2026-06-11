import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'
import { MapPin, Globe, X, Upload, CheckCircle } from 'lucide-react'
import { useState } from 'react'

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
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [fileName, setFileName] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app this would POST to an API
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-400" />
          </button>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#1a6b4a' }}>
            {job.dept} · {job.location}
          </p>
          <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
        </div>

        {/* Body */}
        <div className="px-7 py-6 max-h-[70vh] overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
              <CheckCircle size={52} style={{ color: '#1a6b4a' }} />
              <h3 className="text-xl font-bold text-gray-900">Application Sent!</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Thank you, <strong>{form.name}</strong>. We'll review your application and get back to you at <strong>{form.email}</strong> within 5–7 business days.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg,#1a6b4a,#2d9b6f)' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">LinkedIn / Portfolio URL</label>
                <input
                  type="url"
                  value={form.linkedin}
                  onChange={set('linkedin')}
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
              </div>

              {/* CV upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">CV / Resume *</label>
                <label className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl border border-dashed border-gray-300 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all">
                  <Upload size={16} className="text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-500 truncate">
                    {fileName || 'Click to upload PDF or DOCX'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFile}
                  />
                </label>
              </div>

              {/* Cover note */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Cover Note</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Tell us why you want to join Nikah and what makes you a great fit..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
                style={{ background: 'linear-gradient(135deg,#1a6b4a,#2d9b6f)' }}
              >
                Submit Application →
              </button>
            </form>
          )}
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
