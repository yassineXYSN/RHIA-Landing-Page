import { useInView } from '../hooks.js'

// Content is visible by default; the reveal only runs when the layout root
// has motion enabled (see VitrineLayout), so reduced motion shows everything.
export function Reveal({ as = 'div', className = '', delay = 0, children, ...rest }) {
  const Tag = as
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`vt-reveal ${className}`.trim()}
      data-in={inView || undefined}
      style={delay ? { '--vt-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// The highlighter stroke. `on` drives the left-to-right sweep; when omitted the
// mark sweeps in as it scrolls into view.
export function Mark({ on, children, tone = 'blue', className = '' }) {
  const [ref, inView] = useInView({ margin: '0px 0px -20% 0px' })
  const active = on ?? inView
  return (
    <mark ref={ref} className={`vt-mark vt-mark--${tone} ${className}`.trim()} data-on={active || undefined}>
      {children}
    </mark>
  )
}

export function Paper({ as = 'div', className = '', tag, children, ...rest }) {
  const Tag = as
  return (
    <Tag className={`vt-paper ${className}`.trim()} {...rest}>
      {tag ? <span className="vt-paper__tag">{tag}</span> : null}
      {children}
    </Tag>
  )
}

export function Token({ children, state, className = '' }) {
  return (
    <span className={`vt-token ${className}`.trim()} data-state={state || undefined}>
      {children}
    </span>
  )
}

export function SyntheticNote({ children }) {
  return <p className="vt-synthetic">{children}</p>
}
