import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { Provider } from 'react-redux'
import store, { persistor } from './store'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

function BootstrappedApp() {
  const [ready, setReady] = React.useState(persistor.getState().bootstrapped)
  React.useEffect(() => {
    const unsub = persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        setReady(true)
        unsub()
      }
    })
    return unsub
  }, [])
  if (!ready) return null
  return <App />
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <BootstrappedApp />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
