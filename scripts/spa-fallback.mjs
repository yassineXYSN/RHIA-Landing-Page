// GitHub Pages has no SPA rewrites: a direct visit to /entreprises would 404.
// Pages serves 404.html for unknown paths, so make it the app shell too and
// let the client router render the right page.
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
console.log('spa-fallback: dist/404.html written')
