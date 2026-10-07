import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import { useCopy, useReducedMotion } from '../hooks.js'

// Spellings found in the CV → the general engine's canonical tokens
// (verified against services/skill_vocabulary_service.resolve_canonical).
const CANON = {
  'React.js': 'react',
  TypeScript: 'typescript',
  NodeJS: 'nodejs',
  Postgres: 'postgresql',
  Docker: 'docker',
}
const REQUIRED = ['react', 'typescript', 'nodejs', 'postgresql', 'docker', 'aws']
const CV_SKILLS = ['React.js', 'TypeScript', 'NodeJS', 'Postgres', 'Docker', 'Figma']
const PII = [
  ['NAME', 'Yasmine B.'],
  ['EMAIL', 'y.b@exemple.tn'],
  ['PHONE', '+216 20 000 000'],
  ['LINK', 'linkedin.com/in/yb'],
]
const FINAL_SCORE = 86
const ENTER_MS = 700
const MASK_MS = 650
const READ_MS = 2600

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

function Pii({ kind, raw, masked, i }) {
  return (
    <span className={`vt-pii vt-pii--${kind.toLowerCase()}`} data-masked={masked || undefined} style={{ '--i': i }}>
      <span className="vt-pii__raw" aria-hidden={masked || undefined}>{raw}</span>
      <span className="vt-pii__ph" aria-hidden={!masked || undefined}>[{kind}]</span>
    </span>
  )
}

function DossierSpread() {
  const { c } = useCopy()
  const s = c.spread
  const reduce = useReducedMotion()

  const bodyRef = useRef(null)
  const lineRef = useRef(null)
  const scoreRef = useRef(null)
  const rafRef = useRef(0)
  const timersRef = useRef([])

  // idle → masking → reading → done; reduced motion shows the finished state.
  const [playPhase, setPhase] = useState('idle')
  const phase = reduce ? 'done' : playPhase
  const [hits, setHits] = useState(() => new Set())
  const [run, setRun] = useState(0)
  const [notes, setNotes] = useState([])

  // Every skill occurrence in the CV body, in reading order.
  const occurrences = useMemo(() => {
    const list = []
    const addRich = (parts, prefix) =>
      parts.forEach((p, i) => {
        if (i % 2 === 1) list.push({ id: `${prefix}-${i}`, word: p, canon: CANON[p] })
      })
    addRich(s.cvExp1, 'e1')
    addRich(s.cvExp2, 'e2')
    CV_SKILLS.forEach((w, i) => list.push({ id: `sk-${i}`, word: w, canon: CANON[w] }))
    return list.filter((o) => o.canon)
  }, [s])

  const allIds = useMemo(() => new Set(occurrences.map((o) => o.id)), [occurrences])
  const firstOfCanon = useMemo(() => {
    const seen = new Set()
    const firsts = new Set()
    occurrences.forEach((o) => {
      if (!seen.has(o.canon)) {
        seen.add(o.canon)
        firsts.add(o.id)
      }
    })
    return firsts
  }, [occurrences])

  const done = phase === 'done'
  const shownHits = done ? allIds : hits
  const matched = REQUIRED.filter((t) => occurrences.some((o) => o.canon === t && shownHits.has(o.id)))

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    cancelAnimationFrame(rafRef.current)
  }

  const read = useCallback(() => {
    const body = bodyRef.current
    if (!body) return
    const height = body.clientHeight
    const marks = [...body.querySelectorAll('[data-occ]')].map((el) => ({
      id: el.dataset.occ,
      at: el.offsetTop + el.offsetHeight / 2,
    }))
    const seen = new Set()
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min(1, (now - start) / READ_MS)
      const p = easeInOut(t)
      const y = p * height
      if (lineRef.current) lineRef.current.style.transform = `translate3d(0, ${y}px, 0)`
      if (scoreRef.current) scoreRef.current.textContent = String(Math.round(FINAL_SCORE * p))

      let grew = false
      marks.forEach((m) => {
        if (!seen.has(m.id) && m.at <= y) {
          seen.add(m.id)
          grew = true
        }
      })
      if (grew) setHits(new Set(seen))

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setPhase('done')
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  // Margin notes sit level with the first mention of each skill; re-measured
  // whenever the CV reflows (font load, resize).
  useEffect(() => {
    const body = bodyRef.current
    if (!body) return undefined
    const measure = () => {
      let last = -Infinity
      const next = []
      body.querySelectorAll('[data-occ]').forEach((el) => {
        const id = el.dataset.occ
        if (!firstOfCanon.has(id)) return
        const top = Math.max(el.offsetTop, last + 24)
        last = top
        next.push({ id, canon: CANON[el.textContent.trim()] ?? '', top })
      })
      setNotes(next)
    }
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(body)
    document.fonts?.ready?.then(measure)
    return () => ro?.disconnect()
  }, [firstOfCanon, run])

  // Measurements need the real font, so the timeline starts once it is loaded.
  useLayoutEffect(() => {
    if (reduce) return undefined
    let cancelled = false
    if (scoreRef.current) scoreRef.current.textContent = '0'
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    fontsReady.then(() => {
      if (cancelled) return
      timersRef.current.push(
        setTimeout(() => setPhase('masking'), ENTER_MS),
        setTimeout(() => {
          setPhase('reading')
          read()
        }, ENTER_MS + MASK_MS),
      )
    })
    return () => {
      cancelled = true
      clearTimers()
    }
  }, [reduce, run, read])

  const replay = () => {
    clearTimers()
    setHits(new Set())
    setPhase('idle')
    setRun((r) => r + 1)
  }

  useEffect(() => {
    if (done && scoreRef.current) scoreRef.current.textContent = String(FINAL_SCORE)
  }, [done])

  const masked = phase !== 'idle'

  const renderRich = (parts, prefix) =>
    parts.map((p, i) => {
      if (i % 2 === 0) return <span key={i}>{p}</span>
      const id = `${prefix}-${i}`
      return (
        <span key={i} className="vt-occ" data-occ={id}>
          <mark className="vt-mark vt-mark--blue" data-on={shownHits.has(id) || undefined}>{p}</mark>
        </span>
      )
    })

  return (
    <div className="vt-spread" data-phase={phase} key={run}>
      <div className="vt-spread__label">
        <span>{s.label}</span>
        {!reduce ? (
          <button type="button" className="vt-replay" onClick={replay} disabled={!done}>
            <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
            <span className="vt-sr">{s.replay}</span>
          </button>
        ) : null}
      </div>

      <article className="vt-sheet vt-sheet--job" aria-label={s.jobTag}>
        <span className="vt-paper__tag">{s.jobTag}</span>
        <h3 className="vt-sheet__title">{s.jobTitle}</h3>
        <p className="vt-sheet__meta">{s.jobMeta}</p>
        <p className="vt-sheet__engine">{s.jobEngine}</p>
        <p className="vt-sheet__label">{s.jobSkills}</p>
        <ul className="vt-checklist">
          {REQUIRED.map((t) => {
            const ok = matched.includes(t)
            const missing = done && !ok
            return (
              <li key={t} data-ok={ok || undefined} data-missing={missing || undefined}>
                <span className="vt-checklist__box" aria-hidden="true">
                  <Check size={12} strokeWidth={3} />
                </span>
                <code>{t}</code>
              </li>
            )
          })}
        </ul>
      </article>

      <article className="vt-sheet vt-sheet--cv" aria-label={s.cvTag}>
        <header className="vt-cv__head">
          <p className="vt-cv__name">
            <Pii kind={PII[0][0]} raw={PII[0][1]} masked={masked} i={0} />
          </p>
          <p className="vt-cv__role">{s.cvRole}</p>
          <p className="vt-cv__contact">
            {PII.slice(1).map(([kind, raw], i) => (
              <Pii key={kind} kind={kind} raw={raw} masked={masked} i={i + 1} />
            ))}
          </p>
          <p className="vt-cv__masknote" data-on={masked || undefined}>{s.cvMasked}</p>
        </header>
        <div className="vt-cv__body" ref={bodyRef}>
          <span className="vt-readline" ref={lineRef} aria-hidden="true" />
          <ul className="vt-cv__notes" aria-hidden="true">
            {notes.map((n) => (
              <li key={n.id} style={{ top: n.top }} data-on={shownHits.has(n.id) || undefined}>
                {n.canon}
              </li>
            ))}
          </ul>
          <section>
            <h4>{s.cvExp}</h4>
            <p className="vt-cv__strong">{s.cvExpTitle}</p>
            <ul>
              <li>{renderRich(s.cvExp1, 'e1')}</li>
              <li>{renderRich(s.cvExp2, 'e2')}</li>
            </ul>
          </section>
          <section>
            <h4>{s.cvEdu}</h4>
            <p className="vt-cv__strong">{s.cvEduTitle}</p>
          </section>
          <section>
            <h4>{s.cvSkills}</h4>
            <p className="vt-cv__skills">
              {CV_SKILLS.map((w, i) => {
                const id = `sk-${i}`
                return (
                  <span key={w} className="vt-occ" data-occ={CANON[w] ? id : undefined}>
                    {CANON[w] ? (
                      <mark className="vt-mark vt-mark--blue" data-on={shownHits.has(id) || undefined}>{w}</mark>
                    ) : (
                      w
                    )}
                  </span>
                )
              })}
            </p>
          </section>
        </div>
      </article>

      <aside className="vt-sheet vt-sheet--slip" aria-label={s.scoreTag}>
        <span className="vt-paper__tag">{s.scoreTag}</span>
        <p className="vt-slip__score">
          <span ref={scoreRef}>{reduce ? FINAL_SCORE : 0}</span>
          <small>/100</small>
        </p>
        <dl className="vt-slip__rows">
          <div>
            <dt>{s.scoreRequired}</dt>
            <dd>
              {matched.length}/{REQUIRED.length}
            </dd>
          </div>
          <div data-show={done || undefined}>
            <dt>{s.scoreMissing}</dt>
            <dd>
              <code>aws</code>
            </dd>
          </div>
          <div data-show={done || undefined}>
            <dt>{s.scoreRank}</dt>
            <dd>{s.scoreRankValue}</dd>
          </div>
        </dl>
        <p className="vt-slip__status" data-show={done || undefined}>
          {s.scoreStatus}
        </p>
      </aside>
    </div>
  )
}

export default DossierSpread
