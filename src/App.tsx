import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import { Resturants } from './pages/Resturants'
import Navbar from './components/Navbar'
import { AuthContextProvider } from './context/AuthContextProvider'
import { Food } from './pages/Food'

import { Home } from './pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/resturants' element={<Resturants />} />
            <Route path='/food/:id' element={<Food />} />
            
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
