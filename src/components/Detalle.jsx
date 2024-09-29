import { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Grow } from '@mui/material';
import { Add, DeleteForever, Remove } from "@mui/icons-material";
import { useDetalles } from "../config/DetallesContext";

/**detalle de ordenes */
const Detalle = ({ idProducto, nombre, marca, precio, stock, foto, time ,cantidadOrden,precioOrden,subTotal,editable}) => {
    const {productoSeleccionado,setCambio,setProductoSelecionado}= useDetalles()
    // Cargar la cantidad desde sessionStorage si existe
    const [cantidad, setCantidad] = useState(() => {
        const savedCantidad = sessionStorage.getItem(`cantidad_${idProducto}`);
        return savedCantidad ? parseInt(savedCantidad) : 1;
    });

    const [precioTotal, setPrecioT] = useState(precio);

    useEffect(() => {
        // Guardar la cantidad en sessionStorage cuando cambie
        sessionStorage.setItem(`cantidad_${idProducto}`, cantidad);
        // Actualizar precioTotal cuando cambie la cantidad o el precio
        setPrecioT(precio * cantidad);
        
        sessionStorage.setItem(`precioTotalDetalle_${idProducto}`, precioTotal);
      
        //setPrecioTotal(precioTotal)
        setCambio(cantidad);
    }, [cantidad, idProducto,precio,precioTotal]);

    const manejadorPrecio = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };

    const manejadorPrecioMenos = () => {
        if (cantidad > 1) { // solo hasta 1
            setCantidad(cantidad - 1);
        }
    };
    const eliminarCarrito =()=>{
        setProductoSelecionado(productoSeleccionado.filter((prod)=>{return prod.idProducto != idProducto}))
        sessionStorage.removeItem(`cantidad_${idProducto}`)
    }

    return (
        <>
            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...({ timeout: time || 1000 })}
            >
                <Card sx={{
                    display: 'flex',
                    height: { xs: 140, sm: 140 },
                    width: { xs: 330, sm: 350,md:450,lg:650 },
                    justifyContent: "space-between"
                }} >
                    <CardMedia
                        component="img"
                        sx={{ width: { xs: 70, sm: 120 } }}
                        image={foto}
                        alt="orden"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="h6" component="div" sx={{ fontSize: { xs: 16, sm: 18 } }}>
                                {nombre}
                            </Typography >
                            <Typography variant="p" sx={{ color: 'text.secondary' }} >
                                {marca}
                            </Typography>
                            {
                               !(editable) &&  <Typography variant="h6" sx={{ color: 'text.secondary', fontSize: { xs: 19, sm: 20 }, mt: 2 }} component="div">
                                Q{precioOrden.toFixed(2) || ''}
                            </Typography >
                            }{editable&&
                                <Typography variant="h6" sx={{ color: 'black', fontSize: { xs: 19, sm: 20 }, mt: 2 }} component="div">
                                Q.{precio} 
                            </Typography>
                            }
                            
                        </CardContent>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "Center", justifyContent: "center",mr:2}}>
                   {
                    editable &&  <Box
                    sx={{ background:"white",borderRadius:3}}
                    >
                        <IconButton
                    color="default"
                    size="medium"
                    sx={{ height: 30}}
                    onClick={eliminarCarrito}
                >
                    <DeleteForever/>
                </IconButton>
                        </Box>
                   }
                        { editable &&
                            <Box sx={{ display: 'flex', alignItems: "Center" }}>

                            <IconButton
                                color="inherit"
                                size="small"
                                sx={{ height: 30 }}
                                onClick={manejadorPrecioMenos}
                            >
                                <Remove />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ fontSize: 18 }}>
                                {cantidad}
                            </Typography >
                            <IconButton
                                color="inherit"
                                size="small"
                                sx={{ height: 30,mr:1 }}
                                onClick={manejadorPrecio}
                            >
                                <Add />
                            </IconButton>
                        </Box>
                        
                        }
                        {cantidadOrden &&
                           <>
                            
                            <Typography variant="h6" component="div" sx={{ fontSize: { xs: 16, sm: 18 } }}>
                            Cantidad: {cantidadOrden}
                        </Typography >
                           </>
                        }
                        {
                            editable &&
                            <Typography variant="p" component="div" sx={{ color: 'text.secondary', fontSize: { xs: 17, sm: 18 } }}>
                            Q{precioTotal.toFixed(2) || ''}
                        </Typography >
                        }
                         {
                            subTotal &&
                            <>
                            <Typography variant="p" component="div" sx={{ color: 'text.secondary', fontSize: { xs: 17, sm: 18 } }}>
                           sub Total
                        </Typography >
                            <Typography variant="p" component="div" sx={{ color: 'text.secondary', fontSize: { xs: 17, sm: 18 } ,mt: 2}}>
                            Q{subTotal.toFixed(2) || ''}
                        </Typography >
                            </>
                        }
                        
                    </Box>
                </Card>
            </Grow>
        </>
    );
}

export default Detalle;
