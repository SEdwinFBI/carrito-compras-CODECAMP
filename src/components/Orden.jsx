
import Detalles from '../pages/Detalles'
import { Container, Button, Box, Typography } from '@mui/material'
import OrdenEncabezado from './OrdenEncabezado'
import { useDetalles } from "../config/DetallesContext";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
/**vista de orden completa */
const Orden = () => {
  //uso de rutas
  const navigate = useNavigate()
  
  const { productoSeleccionado, setProductoSelecionado } = useDetalles()
  const [productos, setProductos] = useState(0);

  useEffect(() => {
    setProductos(productoSeleccionado.length)
  }, [productoSeleccionado.length])


  return (
    <>
      <Container >

        {(productos != 0) &&

          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>


              <Button variant="contained" color="warning" onClick={() => setProductoSelecionado([])}>
                cancelar pedido
              </Button>
              <Button variant="contained" onClick={() => navigate("/inicio")}>
                volver
              </Button>
            </Box>
            <Box sx={{ display: { sm: "flex", md: "flex", lg: "flex" }, mt: 5 }}>

              <Detalles />
              <OrdenEncabezado />
            </Box>
          </>
        }
        {!(productos != 0) &&
          <>
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>

                <Button variant="contained" onClick={() => navigate("/inicio")}>
                  volver
                </Button>
              </Box>
              <Typography variant="h4" sx={{ display: "flex", height: "60vh", justifyContent: "center", alignItems: "center" }}>
                Carrito Vacio...</Typography>
            </Container>
          </>
        }

      </Container>
    </>
  )
}

export default Orden