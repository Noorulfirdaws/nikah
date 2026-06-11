import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { getT, applyLangToDocument, type Translations } from './i18n'

interface LanguageCtx {
  lang: string
  setLang: (l: string) => void
  t: Translations
}

const LanguageContext = createContext<LanguageCtx>({
  lang: 'EN',
  setLang: () => {},
  t: getT('EN'),
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<string>(() => {
    return localStorage.getItem('nikah_lang') ?? 'EN'
  })

  const setLang = (l: string) => {
    setLangState(l)
    localStorage.setItem('nikah_lang', l)
    applyLangToDocument(l)
  }

  // Apply on mount
  useEffect(() => { applyLangToDocument(lang) }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: getT(lang) }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
