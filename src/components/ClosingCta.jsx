import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CONTACT_EMAIL } from '../content.js'
import { appHref } from '../config.js'
import { useCopy } from '../hooks.js'
import { Reveal } from './primitives.jsx'

function ClosingCta({ title, lead, audience = 'companies' }) {
  const { c } = useCopy()
  const primary =
    audience === 'candidates'
      ? { href: appHref('/candidat/login'), label: c.common.candidateCta }
      : { href: appHref('/hr/login'), label: c.common.recruiterCta }
  const secondary =
    audience === 'candidates'
      ? { to: '/confiance', label: c.close.candidateSecondary }
      : { href: appHref('/candidat/login'), label: c.common.jobSeeker }
  const secondaryInner = (
    <>
      {secondary.label}
      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
    </>
  )

  return (
    <section className="vt-close vt-desk" aria-labelledby="vt-close-title">
      <div className="vt-wrap vt-close__inner">
        <Reveal as="h2" id="vt-close-title" className="vt-h2 vt-close__title">
          {title}
        </Reveal>
        <div className="vt-close__side">
          <p className="vt-lead">{lead}</p>
          <div className="vt-actions">
            <a href={primary.href} className="vt-btn vt-btn--paper">
              {primary.label}
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </a>
            {CONTACT_EMAIL && audience !== 'candidates' ? (
              <a href={`mailto:${CONTACT_EMAIL}`} className="vt-link vt-link--light">
                {c.common.contact}
              </a>
            ) : secondary.to ? (
              <Link to={secondary.to} className="vt-link vt-link--light">
                {secondaryInner}
              </Link>
            ) : (
              <a href={secondary.href} className="vt-link vt-link--light">
                {secondaryInner}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClosingCta
