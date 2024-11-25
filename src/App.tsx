import './App.css'
import { Routes, Route } from 'react-router-dom'
import Default from './pages/default';
import Loader from './pages/loader';
import News from "./pages/news"
import { ThemeProvider } from "@/components/theme-provider"
import Header from './layout/main';

function App() {
  return (
    <>
      <div className="w-full h-screen">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Header></Header>
          <Routes>
            <Route path="/" element={<Loader />} />
            <Route path="/news" element={<News />} />
            <Route path="/*" element={<Default />} />
          </Routes>
        </ThemeProvider>
      </div>
    </>)
}

export default App;