import { Container } from "@mui/material"
import NavBar from "../components/NavBar"
import Products from "./Products"
import Orden from "../components/Orden"
import { useAuth } from "../config/AuthContext";
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from "react"
import HistorialCliente from "../components/HistorialOrden"
import HistorialDetalle from "../components/historial/HistorialDetalle"


const Home = () => {
  /**navegacion */
  const navigate = useNavigate();
  /**contexto */
  const { token } = useAuth();

  /**validar que exista el token */
  useEffect(() => {
    if (!token) return navigate('/login')
  }, [navigate, token])

  return (
    token && <>
      <NavBar position="relative" />
      <Container>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/detalles' element={<Orden/>} />
          <Route path='/historial' element={<HistorialCliente/>} />
          <Route path='/historial/detalles' element={<HistorialDetalle/>} />
          <Route path='*' element={<Navigate to="/inicio" />} />
        </Routes>
      </Container>

    </>
  )
}

export default Home