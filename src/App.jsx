import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import VitrineLayout from './VitrineLayout.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Companies = lazy(() => import('./pages/Companies.jsx'))
const Candidates = lazy(() => import('./pages/Candidates.jsx'))
const Trust = lazy(() => import('./pages/Trust.jsx'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<VitrineLayout />}>
        <Route index element={<Home />} />
        <Route path="entreprises" element={<Companies />} />
        <Route path="candidats" element={<Candidates />} />
        <Route path="confiance" element={<Trust />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
