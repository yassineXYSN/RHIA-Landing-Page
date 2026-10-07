import { useEffect, useState } from 'react'
import { CalendarCheck, Check, CircleAlert, FileText, Mic, Video } from 'lucide-react'
import { useCopy, useInView, useReducedMotion } from '../hooks.js'
import { Token } from './primitives.jsx'

const DRAFT_SKILLS = ['react', 'typescript', 'nodejs', 'postgresql', 'docker']

export function JobDraftDoc() {
  const { c } = useCopy()
  const d = c.docs.draft
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="vt-doc vt-draft" data-in={inView || undefined}>
      <div className="vt-paper vt-draft__paste">
        <span className="vt-paper__tag">{d.pasteTag}</span>
        <p>{d.paste}</p>
      </div>
      <div className="vt-paper vt-draft__form">
        <span className="vt-paper__tag vt-paper__tag--violet">{d.formTag}</span>
        <dl className="vt-fields">
          {d.fields.map(([k, v], i) => (
            <div key={k} className="vt-fields__row" style={{ '--i': i }}>
              <dt>{k}</dt>
              <dd>
                {v}
                <span className="vt-proposed" title={d.proposed} aria-label={d.proposed} />
              </dd>
            </div>
          ))}
          <div className="vt-fields__row" style={{ '--i': d.fields.length }}>
            <dt>{d.skills}</dt>
            <dd className="vt-tokens">
              {DRAFT_SKILLS.map((t) => (
                <Token key={t}>{t}</Token>
              ))}
            </dd>
          </div>
          <div className="vt-fields__row" style={{ '--i': d.fields.length + 1 }}>
            <dt>{d.bonus}</dt>
            <dd className="vt-tokens">
              <Token state="bonus">aws</Token>
            </dd>
          </div>
          <div className="vt-fields__row vt-fields__row--flag" style={{ '--i': d.fields.length + 2 }}>
            <dt>{d.review}</dt>
            <dd>
              <CircleAlert size={15} strokeWidth={2} aria-hidden="true" />
              <span>
                <strong>Figma</strong> — {d.reviewNote}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

const MODEL_VIEW = [
  ['NAME', null],
  ['EMAIL', 'PHONE'],
  ['ADDRESS', 'LINK'],
]

export function RedactionDoc() {
  const { c } = useCopy()
  const r = c.docs.redact
  const s = c.spread
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="vt-doc vt-redact" data-in={inView || undefined}>
      <div className="vt-paper vt-redact__raw">
        <span className="vt-paper__tag">{r.rawTag}</span>
        <p className="vt-redact__name">Yasmine B.</p>
        <p className="vt-redact__line">y.b@exemple.tn · +216 20 000 000</p>
        <p className="vt-redact__line">12 rue de l’Exemple, Tunis · linkedin.com/in/yb</p>
        <p className="vt-redact__role">{s.cvRole}</p>
        <span className="vt-redact__ghost" aria-hidden="true" />
        <span className="vt-redact__ghost vt-redact__ghost--short" aria-hidden="true" />
      </div>
      <div className="vt-paper vt-redact__model">
        <span className="vt-paper__tag vt-paper__tag--blue">{r.modelTag}</span>
        {MODEL_VIEW.map((pair, i) => (
          <p key={i} className="vt-redact__ph-line">
            {pair.filter(Boolean).map((k, j) => (
              <code key={k} className="vt-ph" style={{ '--i': i * 2 + j }}>
                [{k}]
              </code>
            ))}
          </p>
        ))}
        <p className="vt-redact__role">{s.cvRole}</p>
        <span className="vt-redact__ghost" aria-hidden="true" />
        <span className="vt-redact__ghost vt-redact__ghost--short" aria-hidden="true" />
      </div>
      <div className="vt-paper vt-redact__profile">
        <span className="vt-paper__tag">{r.profileTag}</span>
        <dl className="vt-fields vt-fields--compact">
          {r.rows.map(([k, v]) => (
            <div key={k} className="vt-fields__row">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="vt-sheet__label">{r.skills}</p>
        <p className="vt-tokens">
          {DRAFT_SKILLS.map((t) => (
            <Token key={t} state="match">
              {t}
            </Token>
          ))}
        </p>
      </div>
    </div>
  )
}

export function QuizSheet() {
  const { c } = useCopy()
  const q = c.docs.quiz
  const [ref, inView] = useInView()
  const questions = [
    [q.q1, q.a1, 1],
    [q.q2, q.a2, 1],
  ]
  return (
    <div ref={ref} className="vt-doc vt-quiz" data-in={inView || undefined}>
      <div className="vt-paper vt-quiz__sheet">
        <div className="vt-quiz__head">
          <span className="vt-paper__tag vt-paper__tag--violet">{q.tag}</span>
          <span className="vt-quiz__source">
            <FileText size={14} strokeWidth={2} aria-hidden="true" />
            {q.source}
          </span>
        </div>
        <ol className="vt-quiz__list">
          {questions.map(([text, answers, correct], i) => (
            <li key={i} className="vt-quiz__q" style={{ '--i': i }}>
              <p>{text}</p>
              <ul>
                {answers.map((a, j) => (
                  <li key={a} data-correct={j === correct || undefined}>
                    <span className="vt-quiz__radio" aria-hidden="true" />
                    <code>{a}</code>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="vt-quiz__foot">
          <Check size={14} strokeWidth={2.5} aria-hidden="true" />
          {q.review}
        </p>
      </div>
    </div>
  )
}

// Live interview: transcript lines arrive one by one while in view.
export function InterviewRoomDoc() {
  const { c } = useCopy()
  const iv = c.docs.interview
  const reduce = useReducedMotion()
  const [ref, inView] = useInView({ margin: '0px 0px -25% 0px' })
  const total = iv.lines.length
  const [streamed, setShown] = useState(0)
  const shown = reduce ? total : streamed

  useEffect(() => {
    if (reduce || !inView || streamed >= total) return undefined
    const t = setTimeout(() => setShown((n) => n + 1), streamed === 0 ? 300 : 1100)
    return () => clearTimeout(t)
  }, [inView, streamed, total, reduce])

  const finished = shown >= total

  return (
    <div ref={ref} className="vt-doc vt-room" data-in={inView || undefined}>
      <div className="vt-room__stage">
        <div className="vt-room__video vt-room__video--main">
          <span className="vt-person" aria-hidden="true" />
          <span className="vt-room__badge">
            <span className="vt-live-dot" aria-hidden="true" />
            {iv.live}
          </span>
          <span className="vt-room__who">C-0412</span>
        </div>
        <div className="vt-room__video vt-room__video--self">
          <span className="vt-person" aria-hidden="true" />
          <span className="vt-room__who">{iv.recruiter}</span>
        </div>
        <div className="vt-room__controls" aria-hidden="true">
          <span><Mic size={15} strokeWidth={2} /></span>
          <span><Video size={15} strokeWidth={2} /></span>
        </div>
      </div>
      <div className="vt-room__side">
        <ul className="vt-room__indicators">
          {iv.indicators.map(([k, v]) => (
            <li key={k}>
              <span>{k}</span>
              <strong>{v}</strong>
            </li>
          ))}
        </ul>
        <ol className="vt-room__transcript" aria-live="off">
          {iv.lines.map(([who, text], i) => (
            <li key={i} data-who={who} data-on={i < shown || undefined}>
              <span className="vt-room__speaker">{who === 'r' ? iv.recruiter : iv.candidate}</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="vt-paper vt-room__report" data-on={finished || undefined}>
        <span className="vt-paper__tag">{iv.reportTag}</span>
        <p className="vt-room__score">
          78<small>/100</small>
        </p>
        <div className="vt-room__cols">
          <div>
            <p className="vt-sheet__label">{iv.strengths}</p>
            <ul>{iv.strengthsList.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div>
            <p className="vt-sheet__label">{iv.weaknesses}</p>
            <ul>{iv.weaknessesList.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DecisionSlip() {
  const { c } = useCopy()
  const d = c.docs.decision
  const [ref, inView] = useInView({ margin: '0px 0px -30% 0px' })
  return (
    <div ref={ref} className="vt-doc vt-decision" data-in={inView || undefined}>
      <div className="vt-paper vt-decision__sheet">
        <span className="vt-paper__tag">{d.tag}</span>
        <p className="vt-decision__who">{d.candidate}</p>
        <dl className="vt-decision__evidence">
          {d.evidence.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="vt-decision__by">{d.by}</p>
        <span className="vt-stamp" aria-hidden="true">{d.stamp}</span>
      </div>
    </div>
  )
}

export function TeamDoc() {
  const { c } = useCopy()
  const t = c.companies.team
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="vt-doc vt-team" data-in={inView || undefined}>
      <div className="vt-paper">
        <span className="vt-paper__tag">{t.tag}</span>
        <dl className="vt-fields">
          {t.roles.map(([role, scope], i) => (
            <div key={role} className="vt-fields__row" style={{ '--i': i }}>
              <dt>{role}</dt>
              <dd>{scope}</dd>
            </div>
          ))}
        </dl>
        <p className="vt-sheet__label">{t.departments}</p>
        <p className="vt-tokens">
          {t.deptList.map((x) => (
            <span key={x} className="vt-chip">{x}</span>
          ))}
        </p>
      </div>
    </div>
  )
}

export function SlotsDoc() {
  const { c } = useCopy()
  const s = c.companies.slots
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="vt-doc vt-slots" data-in={inView || undefined}>
      <div className="vt-paper">
        <span className="vt-paper__tag">{s.tag}</span>
        <ul className="vt-slots__list">
          {s.list.map((slot, i) => (
            <li key={slot} data-chosen={i === 2 || undefined} style={{ '--i': i }}>
              <span>{slot}</span>
              {i === 2 ? (
                <em>
                  <Check size={13} strokeWidth={3} aria-hidden="true" /> {s.chosen}
                </em>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="vt-slots__cal">
          <CalendarCheck size={15} strokeWidth={2} aria-hidden="true" />
          {s.calendar}
        </p>
      </div>
    </div>
  )
}
