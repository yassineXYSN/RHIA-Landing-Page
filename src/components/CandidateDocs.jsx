import { useState } from 'react'
import { Bookmark, Check, Download, KeyRound, Mic, Search, Trash2, Video } from 'lucide-react'
import { useCopy, useInView } from '../hooks.js'
import { Token } from './primitives.jsx'

export function ProfileSetupDoc() {
  const { c } = useCopy()
  const s = c.candidates.setup
  const [ref, inView] = useInView()
  const toReview = new Set([6, 7])
  return (
    <div ref={ref} className="vt-doc vt-setup" data-in={inView || undefined}>
      <div className="vt-paper">
        <span className="vt-paper__tag">{s.tag}</span>
        <div className="vt-progress" aria-hidden="true">
          <span className="vt-progress__fill" style={{ '--p': 6 / 8 }} />
        </div>
        <ol className="vt-setup__steps">
          {s.steps.map((step, i) => {
            const review = toReview.has(i)
            return (
              <li key={step} data-review={review || undefined} style={{ '--i': i }}>
                <span className="vt-setup__dot" aria-hidden="true">
                  {review ? null : <Check size={11} strokeWidth={3} />}
                </span>
                <span>{step}</span>
                <em>{review ? s.check : s.filled}</em>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export function JobsDoc() {
  const { c } = useCopy()
  const j = c.candidates.jobs
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="vt-doc vt-jobs" data-in={inView || undefined}>
      <div className="vt-paper">
        <span className="vt-paper__tag">{j.tag}</span>
        <p className="vt-jobs__search">
          <Search size={15} strokeWidth={2} aria-hidden="true" />
          <span>{j.search}</span>
        </p>
        <ul className="vt-jobs__list">
          {j.list.map(([title, meta], i) => (
            <li key={title} style={{ '--i': i }}>
              <div>
                <p className="vt-jobs__title">{title}</p>
                <p className="vt-jobs__meta">{meta}</p>
              </div>
              {i === 0 ? (
                <span className="vt-jobs__actions">
                  <span className="vt-jobs__saved">
                    <Bookmark size={14} strokeWidth={2} aria-hidden="true" />
                    {j.saved}
                  </span>
                  <span className="vt-jobs__apply">{j.apply}</span>
                </span>
              ) : (
                <Bookmark size={15} strokeWidth={2} className="vt-jobs__bm" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function TrackDoc() {
  const { c } = useCopy()
  const t = c.candidates.track
  const [ref, inView] = useInView()
  const current = 3
  return (
    <div ref={ref} className="vt-doc vt-track" data-in={inView || undefined}>
      <div className="vt-paper">
        <span className="vt-paper__tag">{t.tag}</span>
        <ol className="vt-track__steps" style={{ '--n': t.steps.length, '--cur': current }}>
          <span className="vt-track__line" aria-hidden="true">
            <span className="vt-track__line-fill" />
          </span>
          {t.steps.map((step, i) => (
            <li key={step} data-state={i < current ? 'done' : i === current ? 'current' : 'next'}>
              <span className="vt-track__dot" aria-hidden="true">
                {i < current ? <Check size={11} strokeWidth={3} /> : null}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="vt-track__current">{t.current}</p>
      </div>
    </div>
  )
}

export function RoomPreviewDoc() {
  const { c } = useCopy()
  const r = c.candidates.room
  const [blur, setBlur] = useState(true)
  return (
    <div className="vt-doc vt-preview">
      <div className="vt-preview__frame">
        <span className="vt-preview__bg" data-blur={blur || undefined} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="vt-person vt-person--preview" aria-hidden="true" />
        <span className="vt-preview__tag">{r.tag}</span>
      </div>
      <div className="vt-preview__bar">
        <button
          type="button"
          className="vt-switch"
          role="switch"
          aria-checked={blur}
          onClick={() => setBlur((b) => !b)}
        >
          <span className="vt-switch__track" aria-hidden="true">
            <span className="vt-switch__thumb" />
          </span>
          {r.blur}
        </button>
        <span className="vt-preview__chips" aria-hidden="true">
          <span><Video size={14} strokeWidth={2} /> {r.cam}</span>
          <span><Mic size={14} strokeWidth={2} /> {r.mic}</span>
        </span>
        <span className="vt-preview__join" aria-hidden="true">{r.join}</span>
      </div>
    </div>
  )
}

export function InsightsDoc() {
  const { c } = useCopy()
  const s = c.candidates.insights
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="vt-doc vt-insights" data-in={inView || undefined}>
      <div className="vt-paper">
        <span className="vt-paper__tag">{s.tag}</span>
        <p className="vt-sheet__label">{s.recommended}</p>
        <ul className="vt-insights__roles">
          {s.roles.map(([role, pct], i) => (
            <li key={role} style={{ '--i': i }}>
              <span className="vt-insights__role">{role}</span>
              <span className="vt-insights__track" aria-hidden="true">
                <span className="vt-insights__fill" style={{ '--p': pct / 100 }} />
              </span>
              <span className="vt-num">{pct}</span>
            </li>
          ))}
        </ul>
        <p className="vt-sheet__label">{s.next}</p>
        <p className="vt-tokens">
          {s.learn.map((t) => (
            <Token key={t} state="learn">
              {t}
            </Token>
          ))}
        </p>
      </div>
    </div>
  )
}

export function DataDoc() {
  const { c } = useCopy()
  const d = c.candidates.data
  return (
    <div className="vt-doc vt-data">
      <div className="vt-paper">
        <span className="vt-paper__tag">{d.tag}</span>
        <ul className="vt-data__rows">
          <li>
            <span>
              <Download size={16} strokeWidth={2} aria-hidden="true" />
              {d.export}
            </span>
            <span className="vt-data__btn">JSON</span>
          </li>
          <li>
            <span>
              <KeyRound size={16} strokeWidth={2} aria-hidden="true" />
              {d.twofa}
            </span>
            <span className="vt-data__on">{d.on}</span>
          </li>
          <li data-danger>
            <span>
              <Trash2 size={16} strokeWidth={2} aria-hidden="true" />
              {d.delete}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
