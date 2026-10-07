import { useMemo } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { useActiveSection, useCopy } from '../hooks.js'
import { Reveal } from './primitives.jsx'
import DossierTabs from './DossierTabs.jsx'
import ClosingCta from './ClosingCta.jsx'

// Shared template for /entreprises and /candidats: a navy folder cover with
// the section dividers sticking out of its bottom edge, then one section per
// divider. `layouts` picks a composition per section key: 'wide' (copy above
// a full-width document), 'desk' (navy band) or the default two columns.
function FeaturePage({ hero, sections, tabsLabel, docs, layouts = {}, cta, close, audience }) {
  const { c } = useCopy()
  const keys = useMemo(() => sections.map((s) => s.key), [sections])
  const active = useActiveSection(keys)
  const items = sections.map((s) => ({ key: s.key, label: s.tab }))

  return (
    <>
      <section className="vt-cover vt-desk" aria-labelledby="vt-cover-title">
        <div className="vt-wrap vt-cover__inner">
          <h1 id="vt-cover-title" className="vt-display vt-display--page">
            {hero.title}
          </h1>
          <div className="vt-cover__side">
            <p className="vt-lead">{hero.lead}</p>
            <div className="vt-actions">
              <a href={cta.href} className="vt-btn vt-btn--paper">
                {cta.label}
                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="vt-feature">
        <DossierTabs items={items} active={active} label={tabsLabel} tone="cover" />
        <p className="vt-wrap vt-synthetic">{c.syntheticNote}</p>
        {sections.map((s, i) => {
          const Doc = docs[s.key]
          const layout = layouts[s.key]
          const copy = (
            <div className={`vt-stage__copy${layout === 'wide' ? ' vt-stage__copy--wide' : ''}`}>
              <Reveal as="h2" className="vt-h3 vt-h3--lg">
                {s.title}
              </Reveal>
              <p className="vt-body">{s.body}</p>
              <ul className="vt-points">
                {s.points.map((p) => (
                  <li key={p}>
                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )
          if (layout === 'wide') {
            return (
              <section key={s.key} id={s.key} className="vt-stage vt-stage--wide" aria-label={s.tab}>
                <div className="vt-wrap">
                  {copy}
                  <Doc />
                </div>
              </section>
            )
          }
          const desk = layout === 'desk'
          const flip = !desk && i % 2 === 1
          return (
            <section
              key={s.key}
              id={s.key}
              className={`vt-stage${desk ? ' vt-stage--desk vt-desk' : ''}`}
              aria-label={s.tab}
            >
              <div className={`vt-wrap vt-stage__grid${flip ? ' vt-stage__grid--flip' : ''}`}>
                {copy}
                <Doc />
              </div>
            </section>
          )
        })}
      </div>

      <ClosingCta title={close.title} lead={close.lead} audience={audience} />
    </>
  )
}

export default FeaturePage
