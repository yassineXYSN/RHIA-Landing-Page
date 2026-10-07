import { useCopy, usePageTitle } from '../hooks.js'
import { appHref } from '../config.js'
import FeaturePage from '../components/FeaturePage.jsx'
import {
  DataDoc,
  InsightsDoc,
  JobsDoc,
  ProfileSetupDoc,
  RoomPreviewDoc,
  TrackDoc,
} from '../components/CandidateDocs.jsx'

const DOCS = {
  profile: ProfileSetupDoc,
  jobs: JobsDoc,
  tracking: TrackDoc,
  interview: RoomPreviewDoc,
  skills: InsightsDoc,
  data: DataDoc,
}

const LAYOUTS = { interview: 'desk' }

function Candidates() {
  const { c } = useCopy()
  const p = c.candidates
  usePageTitle(c.meta.candidates)
  return (
    <FeaturePage
      hero={p.hero}
      sections={p.sections}
      tabsLabel={p.tabsLabel}
      docs={DOCS}
      layouts={LAYOUTS}
      cta={{ href: appHref('/candidat/login'), label: c.common.candidateCta }}
      close={{ title: p.close.title, lead: p.close.lead }}
      audience="candidates"
    />
  )
}

export default Candidates
