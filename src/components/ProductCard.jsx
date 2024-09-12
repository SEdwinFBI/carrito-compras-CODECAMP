import {  Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Grow } from '@mui/material';
import { useDetalles } from "../config/DetallesContext";
import { useNavegacion } from "../config/NaveContexto";

/**card producto */
const ProductCard = ({ idProducto, nombre, marca, codigo, stock, precio, estado, categoria, foto, time, editable }) => {

  //contexto navegacion
  const { setPathname, setProductoEditable } = useNavegacion()
  //contexto Detalles
  const { setProductoSelecionado, productoSeleccionado } = useDetalles();
  //estados
  const [add, setAdd] = useState('primary')
  const [carrito, setCarrito] = useState(false);
  const [text, setText] = useState('agregar');


  useEffect(() => {
    if (productoSeleccionado.some((prod) => prod.idProducto === idProducto)) {
      setCarrito(true);
      setAdd('warning');
      setText('eliminar');
    } else {
      setCarrito(false);
      setAdd('primary');
      setText('agregar');
      sessionStorage.removeItem(`cantidad_${idProducto}`);
    }
  }, [productoSeleccionado, idProducto]);
  const handlAdd = () => {

    if (carrito === false) {
      setCarrito(true);
      setAdd('warning')
      setText('eliminar');
      setProductoSelecionado(prevProductoSeleccionado => [...prevProductoSeleccionado, { idProducto, nombre, marca, precio, foto, stock }]);
    } else {
      setProductoSelecionado(productoSeleccionado.filter((prod) => { return prod.idProducto != idProducto }))
      setCarrito(false);
      setAdd('primary')
      setText('agregar');
      sessionStorage.removeItem(`cantidad_${idProducto}`);

    }
  }



  return (
    <>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...({ timeout: time || 1000 })}>

        <Card  >
          <CardActionArea sx={{
            height: { xs: 350, sm: 350 }, //mobil:pc
            width: { xs: 150, sm: 200 }
          }} >
            <CardMedia
              component="img"
              alt="producto img"
              height={217}

              image={foto}>
            </CardMedia>
            <CardContent >
              <Typography variant="p" component="div" sx={{ fontSize: 15 }}>
                {nombre}
              </Typography >
              <Typography variant="p" sx={{ color: 'text.secondary' }} >
                {marca} ° {editable && estado}
              </Typography>
              
              <Typography variant="h6" sx={{ color: 'black', fontSize: { xs: 18 } }} component="div">
                Q.{precio.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </Typography>
           
            </CardContent>
            {!editable && <Button size="small" variant="contained" color={add} sx={
              { mb: 1, ml: 1 }
            }
              onClick={handlAdd}>
              {text}
            </Button>}
            {editable && <Button size="small" variant="contained" color="warning" sx={
              { mb: 1, ml: 1 }
            }
              onClick={() => {
                setPathname('/productos/edit')
                setProductoEditable(idProducto);

              }}>
              Editar
            </Button>}
          </CardActionArea>
        </Card>
      </Grow>
    </>
  )
}

export default ProductCard