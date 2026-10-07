import { useCallback, useEffect, useState } from 'react'
import { LanguageContext } from './languageContext.js'

const KEY = 'rhia-language'

function readStored() {
  try {
    return localStorage.getItem(KEY) || 'fr'
  } catch {
    return 'fr'
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readStored)

  const changeLanguage = useCallback((next) => {
    setLanguage(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // Private mode or blocked storage: the choice just won't persist.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return <LanguageContext.Provider value={{ language, changeLanguage }}>{children}</LanguageContext.Provider>
}
