import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'

import { Register } from './pages/Register'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import ProductCard from './components/ProductCard'
import Products from './pages/Products'
import Home from './pages/Home'
import { AuthProvider } from './config/AuthContext'
import Detalles from './pages/Detalles'
import { DetallesProvider } from './config/DetallesContext'
import { NavigationProvider } from './config/NaveContexto'
import { OrdenProvider } from './config/OrdenContex'

function App() {


  return (
    <>
      <AuthProvider>
        <NavigationProvider>
          <OrdenProvider>
            <DetallesProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/inicio/*' element={<Home />} />
                </Routes>
              </BrowserRouter>
            </DetallesProvider>
          </OrdenProvider>
        </NavigationProvider>
      </AuthProvider>
    </>
  )
}

export default App
