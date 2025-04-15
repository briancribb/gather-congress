import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Gather from './Gather.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gather />
  </StrictMode>,
)
