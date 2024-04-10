import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';
import SideBar from './components/commons/SideBar';
import Navbar from './components/commons/NavBar';
import DisplayHeader from './components/commons/DisplayHeader';
import { Toaster } from './components/ui/toaster';
import Home from './routes/pages/dashboard/page';
import AllTrades from './routes/pages/allTrades/page';
import NotesPage from './routes/pages/notes/page';
import Analytics from './routes/pages/analytics/page';
import Insights from './routes/pages/insights/page';
import SettingsContextProvider from './context/SettingsContext';
import Swing from './routes/pages/swing/swing';


function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const tokenData = sessionStorage.getItem("token");

    if (tokenData === null) {
      return navigate("/login")
    }
  }, [])

  return <SettingsContextProvider>
    <div className={"flex flex-col h-screen md:flex-row min-h-screen max-h-screen "}>
      <aside className='flex-none z-10 hidden md:block py-3 px-2 md:w-[20%] md:min-h-full md:max-h-full lg:py-10 bg-main'>
        <SideBar />
      </aside>
      <Navbar className={"flex-none z-10 md:hidden h-16 py-3 px-4 w-full mx-auto bg-main flex flex-row justify-between"} />
      <main className='flex flex-col grow overflow-y-scroll md:overflow-hidden divide-y'>
        <DisplayHeader className='flex-none bg-background p-3' />

        <Routes>
          <Route path='/alltrades/*' element={<AllTrades />} />
          <Route path='/notes/' element={<NotesPage />} />
          <Route path='/insights/' element={<Insights />} />
          <Route path='/analytics/' element={<Analytics />} />
          <Route path='/swing/' element={<Swing />} />
          <Route path='*' element={<Home />} />
        </Routes>

        <Toaster />
      </main>
    </div>
  </SettingsContextProvider>

}

export default App
