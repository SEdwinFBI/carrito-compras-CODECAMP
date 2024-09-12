
import { Button, Container, Grid2, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import OrdenCard from './orden/OrdenCard';
import { useAuth } from '../config/AuthContext';
import { useNavigate } from 'react-router-dom';




const HistorialCliente = () => {

    const navigate = useNavigate()
    const { token, logout } = useAuth();

    const [ordenes, setOrden] = useState([]);


    const fetchOrdenes = async () => {
        try {
            const response = await fetch('http://192.168.0.103:3000/orden/historial', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` //autorizacion
                }
            });

            if (!response.ok) {
                console.log("error en la solicitud")
                logout();
            }

            const data = await response.json();
            console.log(data)
            setOrden(data[0])
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        fetchOrdenes();
    }, [token])



    return (
        token && <>
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }} >
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>

                    <Button variant="contained" onClick={() => navigate("/inicio")}>
                        volver
                    </Button>
                </Box>
                <Typography variant="h4" color="primary">
                    <strong> Historial </strong>
                </Typography>
                <Grid2 container spacing={{ xs: 1.5, md: 3 }} sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    mt: 4,
                    mb: 2,
                    ml: 1
                }}
                >
                    {ordenes
                        .map((orden) => (<OrdenCard
                            key={orden.idOrden}
                            idOrden={orden.idOrden}
                            nombre={orden.nombre}
                            nombreUser={orden.nombreUser}
                            direccion={orden.direccion}
                            fecha_entrega={orden.fecha_entrega}
                            total={orden.total}
                            fkUsuarioNombre={orden.fkUsuarioNombre}

                        />))}



                </Grid2>


            </Container>
            {ordenes == "" && <Typography variant="h4" sx={{ display: "flex", height: "60vh", justifyContent: "center", alignItems: "center" }}>
                Nada aun...</Typography>}
        </>
    )
}

export default HistorialCliente;