import '@fontsource-variable/mona-sans/wdth.css'
import '@fontsource-variable/jetbrains-mono'
import './vitrine.css'

import { Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import BrandLogo from './components/BrandLogo.jsx'
import { appHref } from './config.js'
import { CONTACT_EMAIL } from './content.js'
import { useCopy, useReducedMotion } from './hooks.js'

const PAGES = [
  ['/entreprises', 'companies'],
  ['/candidats', 'candidates'],
  ['/confiance', 'trust'],
]

function LangSwitch({ className = '' }) {
  const { c, lang, setLang } = useCopy()
  return (
    <div className={`vt-lang ${className}`.trim()} role="group" aria-label={c.nav.language}>
      {['fr', 'en'].map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} lang={l}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}

function VitrineLayout() {
  const { c } = useCopy()
  const reduce = useReducedMotion()
  const { pathname, hash } = useLocation()
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(pathname)

  // Navigating closes the mobile menu.
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setMenuOpen(false)
  }

  // New page: start at the top (or at the requested section).
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.classList.add('vt-lock')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('vt-lock')
    }
  }, [menuOpen])

  // Sign-in lives in the real application, not on this static site.
  const spaceLink = appHref('/hr/login')
  const spaceLabel = c.nav.recruiter

  return (
    <div className={`vt${reduce ? '' : ' vt-m'}`}>
      <a href="#vt-main" className="vt-skip">
        {c.nav.skip}
      </a>

      <header className="vt-nav" data-scrolled={scrolled || menuOpen || undefined}>
        <div className="vt-wrap vt-nav__inner">
          <Link to="/" className="vt-nav__brand" aria-label={`RHIA — ${c.nav.home}`}>
            <BrandLogo title="RHIA" />
          </Link>

          <nav className="vt-nav__links" aria-label={c.nav.primary}>
            {PAGES.map(([to, key]) => (
              <NavLink key={to} to={to} className="vt-nav__link">
                {c.nav[key]}
              </NavLink>
            ))}
          </nav>

          <div className="vt-nav__end">
            <LangSwitch className="vt-nav__lang" />
            <a href={appHref('/candidat/login')} className="vt-nav__quiet">
              {c.nav.candidate}
            </a>
            <a href={spaceLink} className="vt-btn vt-btn--paper vt-btn--sm vt-nav__cta">
              {spaceLabel}
            </a>
            <button
              type="button"
              className="vt-nav__burger"
              aria-expanded={menuOpen}
              aria-controls="vt-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={22} strokeWidth={2} aria-hidden="true" /> : <Menu size={22} strokeWidth={2} aria-hidden="true" />}
              <span className="vt-sr">{menuOpen ? c.nav.close : c.nav.menu}</span>
            </button>
          </div>
        </div>
      </header>

      <div id="vt-menu" className="vt-menu" data-open={menuOpen || undefined} hidden={!menuOpen}>
        <nav aria-label={c.nav.primary}>
          <ul>
            <li style={{ '--i': 0 }}>
              <NavLink to="/" end>{c.nav.home}</NavLink>
            </li>
            {PAGES.map(([to, key], i) => (
              <li key={to} style={{ '--i': i + 1 }}>
                <NavLink to={to}>{c.nav[key]}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="vt-menu__foot">
          <a href={spaceLink} className="vt-btn vt-btn--paper">
            {spaceLabel}
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </a>
          <a href={appHref('/candidat/login')} className="vt-link vt-link--light">
            {c.nav.candidate}
          </a>
          <LangSwitch />
        </div>
      </div>

      <main id="vt-main" tabIndex={-1}>
        <Suspense fallback={<div className="vt-page-loading" />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="vt-footer">
        <div className="vt-wrap vt-footer__grid">
          <div className="vt-footer__brand">
            <BrandLogo title="RHIA" />
            <p>{c.footer.tagline}</p>
          </div>
          <div>
            <p className="vt-footer__head">{c.footer.product}</p>
            <ul>
              {PAGES.map(([to, key]) => (
                <li key={to}>
                  <Link to={to}>{c.nav[key]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="vt-footer__head">{c.footer.access}</p>
            <ul>
              <li><a href={appHref('/hr/login')}>{c.nav.recruiter}</a></li>
              <li><a href={appHref('/candidat/login')}>{c.nav.candidate}</a></li>
              {CONTACT_EMAIL ? (
                <li><a href={`mailto:${CONTACT_EMAIL}`}>{c.common.contact}</a></li>
              ) : null}
            </ul>
          </div>
          <div>
            <p className="vt-footer__head">{c.footer.legal}</p>
            <ul>
              <li><a href={appHref('/candidat/terms')}>{c.footer.terms}</a></li>
            </ul>
          </div>
        </div>
        <div className="vt-wrap vt-footer__base">
          <p>{c.footer.rights}</p>
          <LangSwitch />
        </div>
      </footer>
    </div>
  )
}

export default VitrineLayout
