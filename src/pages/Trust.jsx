import { ArrowRight } from 'lucide-react'
import { appHref } from '../config.js'
import { useCopy, usePageTitle } from '../hooks.js'
import { Reveal } from '../components/primitives.jsx'
import { RedactionDoc } from '../components/RecruiterDocs.jsx'
import ClosingCta from '../components/ClosingCta.jsx'

function Trust() {
  const { c } = useCopy()
  const t = c.trust
  usePageTitle(c.meta.trust)

  return (
    <>
      <section className="vt-cover vt-cover--trust vt-desk" aria-labelledby="vt-cover-title">
        <div className="vt-wrap vt-cover__inner">
          <h1 id="vt-cover-title" className="vt-display vt-display--page">
            {t.hero.title}
          </h1>
          <div className="vt-cover__side">
            <p className="vt-lead">{t.hero.lead}</p>
          </div>
        </div>
      </section>

      <section className="vt-section vt-section--ground" aria-labelledby="vt-ledger-title">
        <div className="vt-wrap">
          <Reveal as="h2" id="vt-ledger-title" className="vt-h2">
            {t.ledger.title}
          </Reveal>
          <div className="vt-ledger" role="table" aria-labelledby="vt-ledger-title">
            <div className="vt-ledger__head" role="row">
              {t.ledger.cols.map((col) => (
                <span key={col} role="columnheader">{col}</span>
              ))}
            </div>
            {t.ledger.rows.map((r, i) => (
              <Reveal key={r.step} className="vt-ledger__row" role="row" delay={i * 60}>
                <span role="rowheader" className="vt-ledger__step">{r.step}</span>
                <span role="cell" data-label={t.ledger.cols[1]}>{r.what}</span>
                <span role="cell" data-label={t.ledger.cols[2]} className="vt-ledger__kept">{r.kept}</span>
                <span role="cell" data-label={t.ledger.cols[3]} className="vt-ledger__never">{r.never}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vt-section vt-section--paper" aria-labelledby="vt-redact-title">
        <div className="vt-wrap vt-stage__grid">
          <div className="vt-stage__copy">
            <h2 id="vt-redact-title" className="vt-h3 vt-h3--lg">{t.principles.items[0].t}</h2>
            <p className="vt-body">{t.principles.items[0].d}</p>
          </div>
          <RedactionDoc />
        </div>
      </section>

      <section className="vt-section vt-section--ground" aria-labelledby="vt-principles-title">
        <div className="vt-wrap">
          <Reveal as="h2" id="vt-principles-title" className="vt-h2">
            {t.principles.title}
          </Reveal>
          <dl className="vt-principles">
            {t.principles.items.slice(1).map((it, i) => (
              <Reveal key={it.t} className="vt-principles__item" delay={(i % 3) * 70}>
                <dt>{it.t}</dt>
                <dd>{it.d}</dd>
              </Reveal>
            ))}
          </dl>
          <a href={appHref('/candidat/terms')} className="vt-link vt-link--ink">
            {t.terms}
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </section>

      <ClosingCta title={c.home.close.title} lead={c.home.close.lead} />
    </>
  )
}

export default Trust
