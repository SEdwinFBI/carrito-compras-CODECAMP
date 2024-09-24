import { Typography, CircularProgress, Container, Button, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAuth } from "../config/AuthContext";
import { useEffect, useState } from 'react';
import { useNavegacion } from '../config/NaveContexto';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Notificacion } from './AlertasPersonalizadas';

/**creacion nueva categoria */
const NuevaCategoria = () => {
    
    const { token, logout } = useAuth();


    const [valEstados, setVaEstados] = useState(0);
    const [estados, setEstados] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    const [info, setInfo] = useState(false);
    const [tipo, setTipo] = useState('');
    const [mensaje, setMensaje] = useState('');



  
    const fetchEstados = async () => {
        try {
            const response = await fetch(`http://localhost:3000/estados/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.log("error en la solicitud");
                return logout();
            }
            const data = await response.json();
            console.log(data, "estaods");
            return data[0]; // Devuelve el dato
        } catch (err) {
            console.log(err);
            return null; // Devuelve null en caso de error
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        const [ estadosF] = await Promise.all([ fetchEstados()]);
        if (estadosF) {
            setEstados(estadosF)
        }
        setIsLoading(false);
    };

    const schema = yup.object({
       
        nombre: yup
            .string()
            .required("El nombre es Requerido")
            .min(4, "El nombre debe tener al menos 4 caracteres"),
        
        fkEstado: yup
            .number()
            .required("Estado requerido"),

    }).required()

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(schema),
    });
    console.log(errors)


    const onSubmit = async (data) => {
        try {

            // Asigna el valor de "fkEstado" al objeto "data"
            data.fkEstado = valEstados;
        
            const response = await fetch(`http://localhost:3000/categoria-productos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data), 
            });
        
            const result = await response.json();
        
            if (response.ok) {
                console.log(result.mensaje);
                setTipo('success');
                setMensaje(result.mensaje);
                
            } else {
                console.log(result.mensaje);
                setTipo('error');
                setMensaje(result.mensaje);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setTipo('error');
            setMensaje("Error al crear la Categoria");
        }
        
        console.log(data);
        setInfo(false);
        setTimeout(() => {
            setInfo(true);
        }, 100);
        reset(); // Reiniciar campos
    };
    
    useEffect(() => {
        token && fetchData();
    }, [token]);

    useEffect(() => {
        if (!isLoading && estados.length > 0) {


            setVaEstados(1)


        }
    }, [isLoading, estados]);

    if (isLoading) {
        return <Box sx={{width:{md:600,lg:900}, ml:{lg:40,md:40} }}> <CircularProgress color="success" /></Box>;
    }

    return (
        token && (
            <Container sx={{ mt: 3,width:{md:600,lg:900}, ml:{lg:40,md:40} }}>
                <Notificacion tipo={tipo} info={mensaje} onOpen={info}
                    onClose={() => setInfo(false)} />

                <Box sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: 'center',
                }}>
                 
                        <Box  sx={{
                            display: "flex", flexDirection: 'column',
                            alignItems: 'center',
                            width:300
                        }}
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained" >
                                Aceptar
                            </Button>
                            <TextField
                                helperText={(errors.nombre && errors.nombre.message) || ""}
                                {...register("nombre")}
                                required
                                label="Nombre de la categoria"
                                margin="normal"
                                fullWidth
                                type="text"
                                
                                autoFocus
                                error={!!errors.nombre}
                            />
                          
                            <FormControl fullWidth>
                                <InputLabel id="select-Estados">Estado</InputLabel>
                                <Select
                                    helperText={(errors.fkEstado && errors.fkEstado.message) || ""}
                                    {...register("fkEstado")}
                                    labelId="select-Estados"
                                    id="Estados"
                                    margin="normal"
                                    value={valEstados}
                                    label="Estado"
                                    required
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setVaEstados(value);
                                        console.log(value);
                                    }}
                                    error={!!errors.fkEstado}
                                >
                                    {estados.slice(0, 2).map((estado) => (
                                        <MenuItem key={estado.idEstado} value={estado.idEstado}>
                                            {estado.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                
                                required
                                label="fecha_creacion"
                                margin="normal"
                                fullWidth
                                disabled={true}
                                type="text"
                              
                                error={!!errors.fecha_creacion}
                            />
                          
                        </Box>
                   
                </Box>
            </Container>
        )
    );
};

export default NuevaCategoria;
