import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 text-center"
      style={{ paddingTop: 64, background: '#faf8f4' }}
    >
      <div>
        <div className="text-6xl mb-4">🕌</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist. Let's get you back on your journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-7 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
          >
            Go Home
          </Link>
          <Link
            to="/help"
            className="px-7 py-3 rounded-2xl text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Help Center
          </Link>
        </div>
      </div>
    </div>
  )
}
