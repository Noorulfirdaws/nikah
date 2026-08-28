import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, AlertTriangle, Info } from 'lucide-react'
import PageHero from '../components/PageHero'
import { isValidEmail, LIMITS } from '../lib/security'
import { loginAccount, saveToken, ApiError, API_CONNECTED } from '../lib/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [showPass,    setShowPass]    = useState(false)
  const [emailError,  setEmailError]  = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting,  setSubmitting]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    if (!password) return

    if (!API_CONNECTED) {
      setSubmitError('Sign-in is unavailable in offline demo mode. Please configure VITE_API_URL.')
      return
    }

    setSubmitting(true)
    try {
      const { token } = await loginAccount({ email, password })
      saveToken(token)
      navigate('/')
    } catch (e) {
      setSubmitting(false)
      if (e instanceof ApiError) {
        setSubmitError(e.status === 401
          ? 'Incorrect email or password.'
          : e.message)
      } else {
        setSubmitError('Could not reach the server. Please try again.')
      }
    }
  }

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: '#faf8f4' }}>
      <PageHero label="🔑 Welcome Back" title="Sign In to" titleHighlight="Nikah" subtitle="Continue your marriage journey." />

      <div className="max-w-md mx-auto px-4 py-10">
        <div className="flex items-start gap-2 px-4 py-3 rounded-xl mb-6 text-xs text-blue-700 border border-blue-100" style={{ background: '#eff6ff' }}>
          <Info size={14} className="flex-shrink-0 mt-0.5 text-blue-500" />
          <span>
            {API_CONNECTED
              ? <><strong>Connected to nikah-api</strong> — signs in against your real account.</>
              : <><strong>Demo only</strong> — no backend is configured, sign-in cannot complete.</>}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-7 border border-gray-100 space-y-4" noValidate>
          <div>
            <label htmlFor="li-email" className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Mail size={14} /> Email Address
            </label>
            <input
              id="li-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailError(''); setSubmitError('') }}
              placeholder="you@email.com"
              maxLength={LIMITS.email}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'li-email-error' : undefined}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-1 transition-colors ${emailError ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-200'}`}
            />
            {emailError && (
              <p id="li-email-error" className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertTriangle size={11} /> {emailError}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="li-password" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Lock size={14} /> Password
              </label>
              <Link to="/help" className="text-xs font-medium hover:underline" style={{ color: '#1a6b4a' }}>Forgot password?</Link>
            </div>
            <div className="relative">
              <input
                id="li-password"
                name="password"
                type={showPass ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={e => { setPassword(e.target.value); setSubmitError('') }}
                placeholder="Your password"
                maxLength={LIMITS.password}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
                aria-pressed={showPass}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {submitError && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-red-700 border border-red-100" style={{ background: '#fef2f2' }}>
              <AlertTriangle size={15} className="flex-shrink-0" /> {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !email || !password}
            className="w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="text-center text-xs text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium hover:underline" style={{ color: '#1a6b4a' }}>Create one</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
