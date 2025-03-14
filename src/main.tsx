import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
)
