import { StrictMode, startTransition } from 'react'
import { createRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start/client'

// SPA mode: hydrate() from @tanstack/router-core requires window.$_TSR to exist,
// but in SPA mode there's no SSR data so it would throw "Invariant failed".
// Provide an empty hydration footgun so the router skips SSR hydration.
// The buffer is required for serialization adapters during router init.
// The h() function is called by Zl() after router hydration as a completion signal.
if (!window.$_TSR) {
  window.$_TSR = {
    router: { matches: [] as any },
    buffer: [] as any,
    h: () => {},
  } as any
}

const rootElement = document.getElementById('root')

if (rootElement) {
  startTransition(() => {
    createRoot(rootElement).render(
      <StrictMode>
        <StartClient />
      </StrictMode>,
    )
  })
} else {
  console.error('PREKLEAD: #root element not found')
}
