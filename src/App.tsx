import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'

// Everything except the homepage is code-split — most visitors land on "/"
// and never touch most of these routes (especially /admin, which alone was
// a large share of the single-bundle weight).
const SignUpPage              = lazy(() => import('./pages/SignUpPage'))
const HelpPage                = lazy(() => import('./pages/HelpPage'))
const AboutPage               = lazy(() => import('./pages/AboutPage'))
const CareersPage             = lazy(() => import('./pages/CareersPage'))
const BlogPage                = lazy(() => import('./pages/BlogPage'))
const TermsPage               = lazy(() => import('./pages/TermsPage'))
const PrivacyPage             = lazy(() => import('./pages/PrivacyPage'))
const SafetyCenterPage        = lazy(() => import('./pages/SafetyCenterPage'))
const TrustCenterPage         = lazy(() => import('./pages/TrustCenterPage'))
const CommunityGuidelinesPage = lazy(() => import('./pages/CommunityGuidelinesPage'))
const CookiesPage             = lazy(() => import('./pages/CookiesPage'))
const ContactPage             = lazy(() => import('./pages/ContactPage'))
const DownloadPage            = lazy(() => import('./pages/DownloadPage'))
const NotFoundPage            = lazy(() => import('./pages/NotFoundPage'))
const AdminPage               = lazy(() => import('./pages/AdminPage'))
const SocialPage              = lazy(() => import('./pages/SocialPage'))

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full animate-spin"
        style={{ border: '3px solid rgba(26,107,74,0.15)', borderTopColor: '#1a6b4a' }}
      />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Admin — own full-screen layout, no public header/footer */}
          <Route path="/admin" element={<AdminPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/safety" element={<SafetyCenterPage />} />
            <Route path="/trust" element={<TrustCenterPage />} />
            <Route path="/community-guidelines" element={<CommunityGuidelinesPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/social" element={<SocialPage />} />
            <Route path="/social/:platform" element={<SocialPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
