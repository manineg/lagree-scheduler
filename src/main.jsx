import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LagreePlanner from '../file.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LagreePlanner />
  </StrictMode>,
)
