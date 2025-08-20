import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import { Resturants } from './pages/Resturants'
import Navbar from './components/Navbar'
import { AuthContextProvider } from './context/AuthContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/resturants' element={<Resturants />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
