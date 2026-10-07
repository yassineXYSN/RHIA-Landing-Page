import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks.js'

// Folder-tab dividers. The active state is a clipped copy of the whole list,
// so text and background change colour as one piece when the clip moves.
function DossierTabs({ items, active, label, tone = 'light' }) {
  const reduce = useReducedMotion()
  const listRef = useRef(null)
  const scrollerRef = useRef(null)
  const [clip, setClip] = useState(null)

  const measure = useCallback(() => {
    const list = listRef.current
    if (!list) return
    const el = list.querySelector(`[data-key="${active}"]`)
    if (!el) return
    const total = list.parentElement.clientWidth
    const left = el.offsetLeft
    const right = total - (el.offsetLeft + el.offsetWidth)
    setClip(`inset(0 ${right}px 0 ${left}px round 10px 10px 0 0)`)

    // Keep the active tab visible when the strip scrolls horizontally.
    const scroller = scrollerRef.current
    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      const target = el.offsetLeft - (scroller.clientWidth - el.offsetWidth) / 2
      scroller.scrollTo({ left: target, behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [active, reduce])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    if (ro && listRef.current) ro.observe(listRef.current)
    document.fonts?.ready?.then(measure)
    return () => ro?.disconnect()
  }, [measure])

  const onClick = (e, key) => {
    const target = document.getElementById(key)
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(history.state, '', `#${key}`)
  }

  const renderList = (copy) => (
    <ul className={copy ? 'vt-tabs__list vt-tabs__list--active' : 'vt-tabs__list'} ref={copy ? undefined : listRef}
      aria-hidden={copy || undefined} style={copy ? { clipPath: clip ?? 'inset(0 100% 0 0)' } : undefined}>
      {items.map((it) => (
        <li key={it.key} data-key={it.key}>
          <a
            href={`#${it.key}`}
            tabIndex={copy ? -1 : undefined}
            aria-current={!copy && active === it.key ? 'location' : undefined}
            onClick={(e) => onClick(e, it.key)}
          >
            {it.label}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <nav className={`vt-tabs vt-tabs--${tone}`} aria-label={label}>
      <div className="vt-tabs__scroller" ref={scrollerRef}>
        <div className="vt-tabs__inner">
          {renderList(false)}
          {renderList(true)}
        </div>
      </div>
    </nav>
  )
}

export default DossierTabs
