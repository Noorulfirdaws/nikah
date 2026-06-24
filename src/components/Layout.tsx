import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useLang } from '../lib/LanguageContext'

export default function Layout() {
  const { lang, setLang } = useLang()
  const [country, setCountry] = useState('US')
  const location = useLocation()
  const { pathname, hash } = location

  useEffect(() => {
    if (hash) {
      // Wait for the page to render then scroll to the anchor
      const id = hash.replace('#', '')
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id)
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 80)
        }
      }
      tryScroll()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash])

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header lang={lang} setLang={setLang} country={country} setCountry={setCountry} />
      <main>
        <Outlet />
      </main>
      <Footer lang={lang} setLang={setLang} country={country} setCountry={setCountry} />
    </div>
  )
}
