import { ENGINES } from '../content.js'
import { useCopy, useInView } from '../hooks.js'

const SPELLINGS = ['JS', 'Javascript', 'Java Script']

function Normalizer() {
  const [ref, inView] = useInView({ margin: '0px 0px -25% 0px' })
  return (
    <div ref={ref} className="vt-normalize" data-in={inView || undefined}>
      <ul className="vt-normalize__in">
        {SPELLINGS.map((w, i) => (
          <li key={w} style={{ '--i': i }}>
            <span className="vt-chip vt-chip--raw">{w}</span>
          </li>
        ))}
      </ul>
      <svg className="vt-normalize__wires" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0 C 55 0, 45 30, 100 30" pathLength="1" style={{ '--i': 0 }} />
        <path d="M0 30 L 100 30" pathLength="1" style={{ '--i': 1 }} />
        <path d="M0 60 C 55 60, 45 30, 100 30" pathLength="1" style={{ '--i': 2 }} />
      </svg>
      <div className="vt-normalize__out">
        <span className="vt-token" data-state="match">javascript</span>
      </div>
    </div>
  )
}

function EnginesIndex() {
  const { c, lang } = useCopy()
  const e = c.home.engines
  const total = ENGINES.reduce((sum, x) => sum + x.count, 0)
  const fmt = new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB')
  return (
    <div className="vt-engines">
      <Normalizer />
      <table className="vt-engines__table">
        <caption className="vt-sr">{e.title}</caption>
        <tbody>
          {ENGINES.map((eng) => (
            <tr key={eng.key}>
              <th scope="row">{c.engineNames[eng.key]}</th>
              <td className="vt-engines__skills">
                {eng.skills.map((s) => (
                  <code key={s}>{s}</code>
                ))}
              </td>
              <td className="vt-engines__count">
                <span className="vt-num">{eng.count}</span> <span className="vt-engines__unit">{e.skills}</span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">{e.count}</th>
            <td />
            <td className="vt-engines__count">
              <span className="vt-num">{fmt.format(total)}</span> <span className="vt-engines__unit">{e.total}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default EnginesIndex
