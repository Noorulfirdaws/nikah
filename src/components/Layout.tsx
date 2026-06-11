import { useEffect, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useLang } from '../lib/LanguageContext'

export default function Layout() {
  const { lang, setLang } = useLang()
  const [country, setCountry] = useState('US')
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

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
