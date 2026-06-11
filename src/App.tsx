import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import HelpPage from './pages/HelpPage'
import AboutPage from './pages/AboutPage'
import CareersPage from './pages/CareersPage'
import BlogPage from './pages/BlogPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import SafetyCenterPage from './pages/SafetyCenterPage'
import CommunityGuidelinesPage from './pages/CommunityGuidelinesPage'
import CookiesPage from './pages/CookiesPage'
import ContactPage from './pages/ContactPage'
import DownloadPage from './pages/DownloadPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminPage from './pages/AdminPage'
import SocialPage from './pages/SocialPage'

export default function App() {
  return (
    <BrowserRouter>
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
          <Route path="/community-guidelines" element={<CommunityGuidelinesPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/social/:platform" element={<SocialPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
