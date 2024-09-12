
import { Container, Grid2, Grow ,Button} from '@mui/material';

import { useEffect, useState } from 'react';
import OrdenCard from "./OrdenCard";
import { useAuth } from '../../config/AuthContext';




const OrdenEditables = () => {


    const { token, logout } = useAuth();

    const [ordenes, setOrden] = useState([]);


    const fetchOrdenes = async () => {
        try {
            const response = await fetch('http://192.168.0.103:3000/Orden/', {
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
            <Container >
          
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
                        editable={true}
                    />))}



                </Grid2>


            </Container>

        </>
    )
}

export default OrdenEditables;