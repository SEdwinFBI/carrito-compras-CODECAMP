import Detalle from "../components/Detalle";
import { Box, Grid2, List, ListItem, Typography } from '@mui/material';
import { useDetalles } from "../config/DetallesContext";
import { useEffect, useState } from "react";

/*Detalle de productos en carrito */
const Detalles = () => {
  /*contexto  */
  const { productoSeleccionado, setPrecioTotal, cambio } = useDetalles()
  /**estado */
  const [total, setTotal] = useState(0);


  useEffect(() => {
    let calculoTotal = 0;
    productoSeleccionado.forEach((prod) => {
      calculoTotal += parseFloat(sessionStorage.getItem(`precioTotalDetalle_${prod.idProducto}`));

    })
    console.log(calculoTotal)

    setTotal(calculoTotal);
    setPrecioTotal(calculoTotal)
  }, [cambio, productoSeleccionado])


  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">¡Buen dia! porfavor completa la  Orden</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Resumen del pedido</Typography>
          <Typography variant="h6">total en carreta:  Q.{total.toFixed(2)}</Typography>
        </Box>
        <List
          sx={{
            width: '100%',
            maxWidth: 700,
            bgcolor: 'white',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 500,
            '& ul': { padding: 0 },
          }}>
          <Grid2 container spacing={{ xs: 1.5, md: 3 }} sx={{
            display: "flex",
            flexDirection: "row",
            mt: 4,
            mb: 2,
            ml: 1
          }}
          >
            {productoSeleccionado.map((detalle) => (
              <ListItem key={detalle.idProducto} sx={{ display: "flex", justifyContent: "center" }}>
                <Detalle
                  idProducto={detalle.idProducto}
                  nombre={detalle.nombre}
                  marca={detalle.marca}
                  precio={detalle.precio}
                  stock={detalle.stock}
                  foto={detalle.foto}
                  editable={true}
                />
              </ListItem>
            ))}
          </Grid2>
        </List>
      </Box>
    </>
  )
}

export default Detalles