import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/ui/shared/Navbar'
import { useState } from 'react'
import Login from './components/ui/auth/Login'
import Signup from './components/ui/auth/Signup'
import Home from './components/ui/Home'
import Jobs from './components/ui/Jobs'
import Browse from './components/ui/Browse'
import Profile from './components/ui/Profile'
import JobDescription from './components/ui/JobDescription'


const AppWrapper = () => {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ['/login', '/signup']
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname)

  return (
    <>
      {shouldShowNavbar && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/description/:id" element={<JobDescription />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  )
}

export default App

