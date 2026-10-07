import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { FUNNEL_ROWS } from '../content.js'
import { useCopy, useInView } from '../hooks.js'

const TOTAL_APPLICATIONS = 38
const STATUS_KEYS = ['received', 'review', 'quiz', 'interview']

function Stepper({ label, value, min, max, onChange, name, c }) {
  return (
    <div className="vt-stepper">
      <span className="vt-stepper__label">{label}</span>
      <div className="vt-stepper__ctrl">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label={`${c.decrease} ${name}`}
        >
          <Minus size={14} strokeWidth={2.5} aria-hidden="true" />
        </button>
        <output aria-live="polite">
          <span className="vt-stepper__name">{name}</span> = {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label={`${c.increase} ${name}`}
        >
          <Plus size={14} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function FunnelBoard() {
  const { c } = useCopy()
  const f = c.docs.funnel
  const [ref, inView] = useInView({ margin: '0px 0px -20% 0px' })
  const [x, setX] = useState(8)
  const [y, setY] = useState(4)
  const [z, setZ] = useState(2)

  const rows = FUNNEL_ROWS
  const setXc = (v) => {
    const nx = Math.max(3, Math.min(rows.length, v))
    setX(nx)
    if (y > nx) setY(nx)
    if (z > Math.min(y, nx)) setZ(Math.min(y, nx))
  }
  const setYc = (v) => {
    const ny = Math.max(1, Math.min(x, v))
    setY(ny)
    if (z > ny) setZ(ny)
  }
  const setZc = (v) => setZ(Math.max(1, Math.min(y, v)))

  const statusOf = (i) => (i < z ? 'interview' : i < y ? 'quiz' : i < x ? 'review' : 'received')

  // The rule lines sit under the last row of each tier; before the board is
  // in view they rest at the top, so entering "narrows" the list.
  const rules = [
    ['x', x, f.x, 0],
    ['y', y, f.y, y === x ? 1 : 0],
    ['z', z, f.z, (z === y ? 1 : 0) + (z === x ? 1 : 0)],
  ]

  return (
    <div ref={ref} className="vt-doc vt-funnel" data-in={inView || undefined}>
      <div className="vt-paper vt-funnel__board">
        <div className="vt-funnel__top">
          <div>
            <span className="vt-paper__tag">{f.tag}</span>
            <p className="vt-funnel__count">
              <strong>{TOTAL_APPLICATIONS}</strong> {f.received}
            </p>
          </div>
          <div className="vt-funnel__ctrls" role="group" aria-label={f.hint}>
            <Stepper label={f.x} name="X" value={x} min={3} max={rows.length} onChange={setXc} c={f} />
            <Stepper label={f.y} name="Y" value={y} min={1} max={x} onChange={setYc} c={f} />
            <Stepper label={f.z} name="Z" value={z} min={1} max={y} onChange={setZc} c={f} />
          </div>
        </div>

        <div className="vt-funnel__table" role="table" aria-label={f.tag}>
          <div className="vt-funnel__head" role="row">
            <span role="columnheader">#</span>
            <span role="columnheader">ID</span>
            <span role="columnheader">{f.composite}</span>
            <span role="columnheader">{f.ai}</span>
            <span role="columnheader" className="vt-funnel__statuscol">{f.status}</span>
          </div>
          <div className="vt-funnel__rows" role="rowgroup">
            {rows.map((r, i) => {
              const st = statusOf(i)
              return (
                <div key={r.id} className="vt-funnel__row" role="row" data-status={st}>
                  <span role="cell" className="vt-funnel__rank">{i + 1}</span>
                  <span role="cell" className="vt-funnel__id">{r.id}</span>
                  <span role="cell" className="vt-funnel__bar">
                    <span className="vt-funnel__track">
                      <span className="vt-funnel__fill" style={{ transform: `scaleX(${r.composite / 100})` }} />
                    </span>
                    <span className="vt-num">{r.composite}</span>
                  </span>
                  <span role="cell" className="vt-num vt-funnel__ai">{i < x ? r.ai : '—'}</span>
                  <span role="cell" className="vt-status" data-status={st}>
                    {STATUS_KEYS.map((k) => (
                      <span key={k} data-on={k === st || undefined} aria-hidden={k !== st || undefined}>
                        {f.statuses[k]}
                      </span>
                    ))}
                  </span>
                </div>
              )
            })}
            {rules.map(([key, n, label, off]) => (
              <span
                key={key}
                className={`vt-funnel__rule vt-funnel__rule--${key}`}
                style={{ transform: `translateY(calc(var(--vt-row-h) * ${inView ? n : 0}))`, '--off': off }}
                aria-hidden="true"
              >
                <span>{label.split('·')[1]?.trim() ?? label}</span>
              </span>
            ))}
          </div>
          <p className="vt-funnel__more">
            + {TOTAL_APPLICATIONS - rows.length} {f.others}
          </p>
        </div>
      </div>

      <aside className="vt-paper vt-funnel__note">
        <span className="vt-paper__tag vt-paper__tag--blue">{f.justificationTag}</span>
        <p>{f.justification}</p>
      </aside>
    </div>
  )
}

export default FunnelBoard
