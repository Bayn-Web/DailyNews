import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Default from './pages/default';
import Loader from './pages/loader';
import News from "./pages/news"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeTrigger from '@/comps/themTrigger'

function App() {
  const navigater = useNavigate();
  return (
    <>
      <div className="w-full">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="fixed top-0 right-0 cursor-pointer flex justify-center items-center space-x-1 m-2">
            <ThemeTrigger />
            <Avatar onClick={() => navigater("/")}>
              <AvatarImage />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
          </div>
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