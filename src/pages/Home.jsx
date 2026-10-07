import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { appHref } from '../config.js'
import { ArrowRight, Check } from 'lucide-react'
import { useActiveSection, useCopy, usePageTitle } from '../hooks.js'
import { Mark, Reveal } from '../components/primitives.jsx'
import DossierSpread from '../components/DossierSpread.jsx'
import DossierTabs from '../components/DossierTabs.jsx'
import FunnelBoard from '../components/FunnelBoard.jsx'
import EnginesIndex from '../components/EnginesIndex.jsx'
import ClosingCta from '../components/ClosingCta.jsx'
import {
  DecisionSlip,
  InterviewRoomDoc,
  JobDraftDoc,
  QuizSheet,
  RedactionDoc,
} from '../components/RecruiterDocs.jsx'

const STAGE_DOCS = {
  offer: JobDraftDoc,
  applications: RedactionDoc,
  screening: FunnelBoard,
  quiz: QuizSheet,
  interview: InterviewRoomDoc,
  decision: DecisionSlip,
}

function StageCopy({ stage }) {
  return (
    <div className="vt-stage__copy">
      <h3 className="vt-h3">{stage.title}</h3>
      <p className="vt-body">{stage.body}</p>
      <p className="vt-note">
        <Check size={16} strokeWidth={2.5} aria-hidden="true" />
        {stage.note}
      </p>
    </div>
  )
}

function Journey() {
  const { c } = useCopy()
  const j = c.home.journey
  const keys = useMemo(() => j.stages.map((s) => `stage-${s.key}`), [j.stages])
  const active = useActiveSection(keys)
  const items = j.stages.map((s) => ({ key: `stage-${s.key}`, label: s.tab }))

  return (
    <section className="vt-journey" aria-labelledby="vt-journey-title">
      <div className="vt-wrap vt-section-head">
        <Reveal as="h2" id="vt-journey-title" className="vt-h2">
          {j.title}
        </Reveal>
        <Reveal as="p" className="vt-lead vt-lead--ink" delay={80}>
          {j.lead}
        </Reveal>
        <p className="vt-synthetic">{c.syntheticNote}</p>
      </div>

      <DossierTabs items={items} active={active} label={j.title} />

      {j.stages.map((stage) => {
        const Doc = STAGE_DOCS[stage.key]
        const id = `stage-${stage.key}`
        if (stage.key === 'screening') {
          return (
            <article key={id} id={id} className="vt-stage vt-stage--wide">
              <div className="vt-wrap">
                <div className="vt-stage__copy vt-stage__copy--wide">
                  <h3 className="vt-h3">{stage.title}</h3>
                  <p className="vt-body">{stage.body}</p>
                  <p className="vt-note">
                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                    {stage.note}
                  </p>
                </div>
                <Doc />
              </div>
            </article>
          )
        }
        if (stage.key === 'interview') {
          return (
            <article key={id} id={id} className="vt-stage vt-stage--desk vt-desk">
              <div className="vt-wrap vt-stage__grid">
                <StageCopy stage={stage} />
                <Doc />
              </div>
            </article>
          )
        }
        if (stage.key === 'decision') {
          return (
            <article key={id} id={id} className="vt-stage vt-stage--center">
              <div className="vt-wrap vt-stage__grid vt-stage__grid--center">
                <StageCopy stage={stage} />
                <Doc />
              </div>
            </article>
          )
        }
        const flip = stage.key === 'applications'
        return (
          <article key={id} id={id} className="vt-stage">
            <div className={`vt-wrap vt-stage__grid${flip ? ' vt-stage__grid--flip' : ''}`}>
              <StageCopy stage={stage} />
              <Doc />
            </div>
          </article>
        )
      })}
    </section>
  )
}

function Home() {
  const { c } = useCopy()
  const h = c.home
  usePageTitle(c.meta.home)

  return (
    <>
      <section className="vt-hero vt-desk" aria-labelledby="vt-hero-title">
        <div className="vt-wrap vt-hero__inner">
          <div className="vt-hero__copy">
            <h1 id="vt-hero-title" className="vt-display">
              {h.hero.titleBefore}
              <Mark tone="hero" className="vt-mark--delay">{h.hero.titleMark}</Mark>
              {h.hero.titleAfter}
            </h1>
            <p className="vt-lead">{h.hero.lead}</p>
            <div className="vt-actions">
              <a href={appHref('/hr/login')} className="vt-btn vt-btn--paper">
                {c.common.recruiterCta}
                <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
              </a>
              <a href={appHref('/candidat/login')} className="vt-link vt-link--light">
                {c.common.jobSeeker}
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
          <DossierSpread />
        </div>
      </section>

      <Journey />

      <section className="vt-section vt-section--paper" aria-labelledby="vt-engines-title">
        <div className="vt-wrap vt-split">
          <div className="vt-split__head">
            <Reveal as="h2" id="vt-engines-title" className="vt-h2">
              {h.engines.title}
            </Reveal>
            <Reveal as="p" className="vt-body" delay={80}>
              {h.engines.lead}
            </Reveal>
          </div>
          <EnginesIndex />
        </div>
      </section>

      <section className="vt-doors" aria-label={`${h.doors.companies.title} / ${h.doors.candidates.title}`}>
        <div className="vt-wrap vt-doors__grid">
          {[
            ['/entreprises', h.doors.companies],
            ['/candidats', h.doors.candidates],
          ].map(([to, door]) => (
            <Link key={to} to={to} className="vt-door">
              <span className="vt-door__title">
                {door.title}
                <ArrowRight className="vt-door__arrow" size={28} strokeWidth={2} aria-hidden="true" />
              </span>
              <ul>
                {door.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <section className="vt-section vt-trustband" aria-labelledby="vt-trust-title">
        <div className="vt-wrap">
          <Reveal as="h2" id="vt-trust-title" className="vt-h2 vt-trustband__title">
            {h.trust.title}
          </Reveal>
          <dl className="vt-ledger-lite">
            {h.trust.items.map((it, i) => (
              <Reveal key={it.k} className="vt-ledger-lite__item" delay={i * 70}>
                <dt>{it.k}</dt>
                <dd>{it.v}</dd>
              </Reveal>
            ))}
          </dl>
          <Link to="/confiance" className="vt-link vt-link--ink">
            {h.trust.link}
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ClosingCta title={h.close.title} lead={h.close.lead} />
    </>
  )
}

export default Home
