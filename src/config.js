// Where the real RHIA application lives. The showcase's sign-in buttons and the
// terms link point there. Override at build time with VITE_APP_URL.
export const APP_URL = (import.meta.env.VITE_APP_URL || 'https://nexthire.itc4d.com').replace(/\/$/, '')

export const appHref = (path) => `${APP_URL}${path}`
