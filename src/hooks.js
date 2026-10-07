import { useContext, useEffect, useRef, useState } from 'react'
import { LanguageContext } from './languageContext.js'
import { copy } from './content.js'

export function useCopy() {
  const { language, changeLanguage } = useContext(LanguageContext)
  const lang = language === 'en' ? 'en' : 'fr'
  return { c: copy[lang], lang, setLang: changeLanguage }
}

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  const [reduce, setReduce] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(REDUCE_QUERY).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(REDUCE_QUERY)
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduce
}

// Flips to true the first time the element is in view, then stops observing:
// marketing reveals fire once, re-animating on every scroll-by fights the reader.
export function useInView({ margin = '0px 0px -12% 0px', threshold = 0, once = true } = {}) {
  const ref = useRef(null)
  // Without IntersectionObserver there is nothing to wait for: show it all.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: margin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin, threshold, once])

  return [ref, inView]
}

// Tracks which section is under the reading line (40% down the viewport).
export function useActiveSection(keys) {
  const [active, setActive] = useState(keys[0])
  useEffect(() => {
    const els = keys.map((k) => document.getElementById(k)).filter(Boolean)
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [keys])
  return active
}

export function usePageTitle(title) {
  useEffect(() => {
    if (title) document.title = title
  }, [title])
}
