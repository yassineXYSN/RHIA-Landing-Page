import { useCopy, usePageTitle } from '../hooks.js'
import { appHref } from '../config.js'
import FeaturePage from '../components/FeaturePage.jsx'
import FunnelBoard from '../components/FunnelBoard.jsx'
import {
  InterviewRoomDoc,
  JobDraftDoc,
  QuizSheet,
  RedactionDoc,
  SlotsDoc,
  TeamDoc,
} from '../components/RecruiterDocs.jsx'

function InterviewsDoc() {
  return (
    <div className="vt-stack">
      <SlotsDoc />
      <InterviewRoomDoc />
    </div>
  )
}

const DOCS = {
  offers: JobDraftDoc,
  applications: RedactionDoc,
  screening: FunnelBoard,
  quiz: QuizSheet,
  interviews: InterviewsDoc,
  team: TeamDoc,
}

const LAYOUTS = { screening: 'wide', interviews: 'desk' }

function Companies() {
  const { c } = useCopy()
  const p = c.companies
  usePageTitle(c.meta.companies)
  return (
    <FeaturePage
      hero={p.hero}
      sections={p.sections}
      tabsLabel={p.tabsLabel}
      docs={DOCS}
      layouts={LAYOUTS}
      cta={{ href: appHref('/hr/login'), label: c.common.recruiterCta }}
      close={c.home.close}
      audience="companies"
    />
  )
}

export default Companies
