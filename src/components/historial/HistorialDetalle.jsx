import { useState, useEffect } from 'react';
import { useOrden } from '../../config/OrdenContex';
import { useAuth } from '../../config/AuthContext';
import { List, ListItem, Grid2, Typography, Box, Container } from '@mui/material';
import Detalle from '../Detalle';

const HistorialDetalle = () => {
    const { token, logout } = useAuth();
    const { ordenCliente } = useOrden();

    const [ordenDetalle, setOrdenDetalle] = useState([]);
    const [ordenEncabezado, setOrdenEncabezado] = useState([]);

    const fetchOrdenDetalle = async () => {
        try {
            const response = await fetch(`http://localhost:3000/Orden/detalles/${ordenCliente}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // autorizacion
                },
            });

            if (!response.ok) {
                console.log('error en la solicitud');
                logout();
                return null;
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const fetchOrdenEncabezado = async () => {
        try {
            const response = await fetch(`http://localhost:3000/Orden/${ordenCliente}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // autorizacion
                },
            });

            if (!response.ok) {
                console.log('error en la solicitud');
                logout();
                return null;
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const [detalleData, encabezadoData] = await Promise.all([fetchOrdenDetalle(), fetchOrdenEncabezado()]);

            if (detalleData) {
                setOrdenDetalle(detalleData);
            }

            if (encabezadoData) {
                setOrdenEncabezado(encabezadoData);
                console.log(encabezadoData)
            }
        };

        fetchData();
    }, [token]);

    return (
        <Container>
           
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        
            <Typography variant="h3">Datos del Pedido</Typography>
            {ordenEncabezado.map((encabezado) => (
                <>
                <Box key={encabezado.idOrden}>
                <Typography variant="h6" color="primary">
                <strong> Estado: {encabezado.nombreEstado} por {encabezado.fkUsuarioNombre} </strong>
                </Typography>
                <Typography >
                   <strong> Nombre del Cliente:</strong> {encabezado.nombreUsuario}
                </Typography>
                <Typography >
                  <strong>  Nombre del Destino:</strong> {encabezado.nombre_destino}
                </Typography>
                <Typography >
                  <strong>  Direccion de Destino:</strong> {encabezado.direccion}
                </Typography>
                <Typography >
                    <strong>Telefono de Confirmacion:</strong> {encabezado.telefono}
                </Typography>
                <Typography >
                   <strong> Correo para recibir Notificaciones:</strong> {encabezado.correo_confirmacion}
                </Typography>
                <Typography >
                    <strong>Fecha de entrega </strong>{encabezado.fecha_entrega}
                </Typography>
                <Typography >
                   <strong> Total de la Orden:</strong> Q.{encabezado.total.toFixed(2)}
                </Typography>
                </Box>
                
                </>
            ))}
            <List
                sx={{
                    
                    width: '100%',
                    maxWidth: 600,
                    bgcolor: 'paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 500,
                    '& ul': { padding: 0 },
                
                }}
            >
                <Grid2
                    container
                    spacing={{ xs: 1.5, md: 3 }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mt: 4,
                        mb: 2,
                        
                        ml:{
                            xs:0,sm:1
                        }
                    }}
                >
                    {ordenDetalle.map((detalle) => (
                        <ListItem key={detalle.idProducto} sx={{display:"flex",justifyContent:"center"}}>
                            <Detalle
                                idProducto={detalle.idProducto}
                                nombre={detalle.nombreProducto}
                                marca={detalle.marca}
                                foto={detalle.foto}
                                precioOrden={detalle.precio}
                                cantidadOrden={detalle.cantidad}
                                subTotal={detalle.subTotal}
                            />
                        </ListItem>
                    ))}
                </Grid2>
            </List>
        </Box>
        </Container>
    );
};

export default HistorialDetalle;
