import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Grow } from '@mui/material';
import { useDetalles } from "../../config/DetallesContext";
import { useNavigate } from "react-router-dom";
import { useNavegacion } from "../../config/NaveContexto";
import { useOrden } from "../../config/OrdenContex";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../config/AuthContext";

const OrdenCard = ({ idOrden, nombre, nombreUser, direccion, fecha_entrega, total, fkUsuarioNombre, time, editable }) => {
    
    const { token } = useAuth();
    const [valEstados, setVaEstados] = useState(0);
    const [update, setUpdate] = useState(false);
    const { setPathname } = useNavegacion();
    const { setOrdenCliente } = useOrden();
    const navigate = useNavigate();
    const [estado,setEstado]=useState(nombre)
    const [autorizo,setAutorizo]=useState(fkUsuarioNombre)
    
  
    const schema = yup.object({
        fkEstado: yup.number().optional(),
    });

    const { register, handleSubmit, setValue, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            console.log(valEstados)
          

            const response = await fetch(`http://localhost:3000/orden/${idOrden}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ fkEstado: valEstados })
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result.mensaje);
            } else {
                console.log(result.mensaje);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }

        reset(); // Reiniciar campos
    };


    return (
        <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...({ timeout: time || 1000 })}
        >
            <Card sx={{
                display: 'flex',
                height: { xs: 250, sm: 160 },
                width: { xs: 330, sm: 650 },
                
                justifyContent: "space-between"
            }}>
                <CardMedia
                    component="img"
                    sx={{ width: { xs: 70, sm: 120 } }}
                    image="https://media.istockphoto.com/id/801862898/es/vector/recibo-y-la-lupa-pico-blanco-y-lupa-plano-de-moderna-concepci%C3%B3n-ilustraci%C3%B3n-de-vector.jpg?s=612x612&w=0&k=20&c=-TGrHOwrzCorxzbumURi4Bdm-FWZcIR87mdGwH7Pk6g="
                    alt="orden"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="h6" component="div" sx={{ fontSize: { xs: 16, sm: 18 }, textAlign: "justify" }}>
                            <strong> Estado: </strong>{estado} por {autorizo}
                        </Typography >
                        <Typography variant="body1" component="div" sx={{ color: 'text.secondary', fontSize: { xs: 14, sm: 15 } }}>
                            <strong> Cliente: </strong>{nombreUser}
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ color: 'text.secondary', fontSize: { xs: 14, sm: 15 } }}>
                            <strong> Dirección: </strong>{direccion}
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ color: 'text.secondary', fontSize: { xs: 14, sm: 15 } }}>
                            <strong> Fecha entrega:</strong> {fecha_entrega}
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ color: 'text.secondary', fontSize: { xs: 14, sm: 15 } }}>
                            <strong> Total: </strong> Q{total.toFixed(2)}
                        </Typography>
                    </CardContent>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", width: 100, mr: 1, justifyContent: "space-evenly" }}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}>

                    <Button variant="contained" onClick={() => {
                        if (editable) {
                            navigate("/dashboard/ordenes/detalle");
                            setOrdenCliente(idOrden);
                        } else {
                            navigate('/inicio/historial/detalles');
                            setOrdenCliente(idOrden);
                        }
                    }}>
                        Ver
                    </Button>

                    {(nombre === "Confirmado") && editable && (!update)&& (
                        <>
                            <Button variant="contained" color="success"
                                
                                type="submit"
                                onClick={() => {setVaEstados(3);
                                   setTimeout(()=>{
                                    setEstado("Entregado")
                                    setUpdate(true)
                                    setAutorizo("Administrador")
                                   },100)
                                }}>
                                Entregar
                            </Button>

                            <Button variant="contained" color="error"
                                onClick={() =>{ setVaEstados(5);
                                    setTimeout(()=>{
                                        setEstado("Rechazado")
                                        setAutorizo("Administrador")
                                        setUpdate(true)
                                       },100)
                                }}
                                type="submit">
                                Rechazar
                            </Button>
                        </>
                    )}

                </Box>
            </Card>
        </Grow>
    );
};

export default OrdenCard;
