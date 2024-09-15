import { Typography, CircularProgress, Container, Button, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAuth } from "../config/AuthContext";
import { useEffect, useState } from 'react';
import { useNavegacion } from '../config/NaveContexto';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Notificacion } from './AlertasPersonalizadas';

/**actualizar categoria */
const UpdateCategory = () => {
    /**contextos */
    const { categoriaEditable, setCategoriaEditable, setPathname } = useNavegacion();
    const { token, logout } = useAuth();
    /**estdos */
    const [categoria, setCategoria] = useState([]);
    const [valEstados, setVaEstados] = useState(0);
    const [estados, setEstados] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    const [info, setInfo] = useState(false);
    const [tipo, setTipo] = useState('');
    const [mensaje, setMensaje] = useState('');


/**categorai a editar */
    const fetchCategory = async () => {
        try {
            const response = await fetch(`http://localhost:3000/categoria-productos/${categoriaEditable}`, {
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
            return data[0]; //  dato
        } catch (err) {
            console.log(err);
            return null; // caso de error
        }
    };
    /**lista de estados */
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
            return data[0]; // Devuelve el dato
        } catch (err) {
            console.log(err);
            return null; // Devuelve null
        }
    };

/**obtencion de la categoria y la lista de estados */
    const fetchData = async () => {
        setIsLoading(true);/**cargando */
        const [categoria, estadosF] = await Promise.all([fetchCategory(), fetchEstados()]);

        if (categoria) {
            setCategoria(categoria);
        }

        if (estadosF) {
            setEstados(estadosF)
        }
        setIsLoading(false);
    };

    /**esquema */
    const schema = yup.object({
        nombre: yup
            .string()
            .required("El nombre es Requerido")
            .min(3, "El nombre debe tener al menos 3 caracteres"),
        fkEstado: yup
            .number()
            .required("Estado requerido"),
    }).required()

    /**uso de Form */
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
/**acutalizar categoria */
    const onSubmit = async (data) => {
        try {
            // Asigna fkEstado"
            data.fkEstado = valEstados;
            const response = await fetch(`http://localhost:3000/categoria-productos/${categoriaEditable}`, {
                method: 'PUT',
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
                setTimeout(() => {
                    setPathname('/categoria-productos/categorias');
                    setCategoriaEditable(null);
                }, 2000);
            } else {
                setTipo('error');
                setMensaje(result.mensaje);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setTipo('error');
            setMensaje("Error interno");
        }
        
        console.log(data);
        setInfo(false);
        setTimeout(() => {
            setInfo(true);
        }, 100);
        reset(); // Reiniciar campos
    };
    
    useEffect(() => {
        categoriaEditable && fetchData();
    }, [token, categoriaEditable]);


    useEffect(() => {
    /*prepara la lista de estados*/
        if (!isLoading && categoria.length > 0 && estados.length > 0) {
            estados.forEach((estado) => {
                if (estado.idEstado == categoria[0].fkEstado) {
                    setVaEstados(estado.idEstado)
                }
            })


        }
    }, [isLoading, categoria, estados]);

    if (isLoading) {
        return <CircularProgress color="success" />;
    }

    return (
        token && (
            <Container sx={{ mt:3,background:"white" }}>
                <Notificacion tipo={tipo} info={mensaje} onOpen={info}
                    onClose={() => setInfo(false)} />
                <Button onClick={() => { setPathname('/categoria-productos/categorias') }}>
                    Volver
                </Button>
                <Button onClick={() => {
                    setCategoriaEditable(null)
                    setPathname('/categoria-productos/categorias')
                }} >
                    cancelar
                </Button>

                <Box sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: 'center',
                }}>
                    {categoria.map((category) => (
                        <Box maxWidth="xs" key={category.idCategoriaProducto} sx={{
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
                                defaultValue={category.nombre}
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
                                defaultValue={category.fecha_creacion}
                                error={!!errors.fecha_creacion}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        )
    );
};

export default UpdateCategory;
