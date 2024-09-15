import { Typography, CircularProgress, Container, Button, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAuth } from "../config/AuthContext";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Notificacion } from './AlertasPersonalizadas';


const NuevoProducto = () => {

    const { token, logout } = useAuth();

    const [categorias, setCategorias] = useState([]);
    const [valCategorias, setValCategoria] = useState(1);
    const [valEstados, setVaEstados] = useState(1);
    const [estados, setEstados] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [fileName, setFileName] = useState('');


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
            return data[0]; // Devuelve el dato
        } catch (err) {
            console.log(err);
            return null; // Devuelve null en caso de error
        }
    };


    const fetchCategorias = async () => {
        try {
            const response = await fetch(`http://localhost:3000/categoria-productos/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                console.log("error en la solicitud");
                return [];
            }
            const data = await response.json();

            return data[0]; // Devuelve el dato
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        const [categoriasF, estadosF] = await Promise.all([fetchCategorias(), fetchEstados()]);
        if (categoriasF) {
            setCategorias(categoriasF);
        }
        if (estadosF) {
            setEstados(estadosF)
        }


        setIsLoading(false);
    };

    const schema = yup.object({
        fkCategoriaProducto: yup
            .string()
            .required("Categoria requerida"),
        nombre: yup
            .string()
            .required("El nombre es Requerido")
            .min(3, "El nombre debe tener al menos 3 caracteres"),
        marca: yup
            .string()
            .required("Marca requerida")
            .min(2, "la marca al menos tiene que tener 2 caracteres")
            .max(30, "El maxino es de 30 caracteres"),
        codigo: yup
            .string()
            .required("Codigo requerido")
            .max(40, "El maximo es de 40 caracteres"),
        stock: yup
            .number()
            .typeError("No puede quedar en blanco")
            .required("No puede quedar en blanco")
            .min(0, "El stock no puede ser negativo"),
        fkEstado: yup
            .number()
            .required("Estado requerido"),
        precio: yup
            .number()
            .typeError("Precio no puede quedar en blanco")
            .required("Precio no puede quedar en blanco")
            .min(0, "El precio no puede ser negativo"),
        foto: yup
            .mixed()
            .required("es necesario la foto")
            .test('fileType', 'Necesita subir imagen jpeg/png', (value) => {
                return !value || ['image/jpeg', 'image/png'].includes(value.type);
            }),
            

    }).required()

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(schema),
    });
   
    const onSubmit = async (data) => {
       
        try {
          
            setValue("fkEstado", valEstados)
            setValue("fkCategoriaProducto", valCategorias)
            const formData = new FormData();

            
            formData.append('codigo', data.codigo);
            formData.append('fkCategoriaProducto', valCategorias);
            formData.append('fkEstado', valEstados);
            formData.append('marca', data.marca);
            formData.append('nombre', data.nombre);
            formData.append('precio', data.precio);
            formData.append('stock', data.stock);
            formData.append('foto', data.foto);

            console.log(formData, "formdata")
            const response = await fetch(`http://localhost:3000/productos/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setTipo('success');
                setMensaje(result.mensaje);
               

            } else {
                setTipo('error');
                setMensaje(result.mensaje);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setTipo('error');
            setMensaje("Error interno");
        }
        setInfo(false);
        setTimeout(() => {
            setInfo(true);
        }, 100);
        reset(); // Reiniciar campos
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
            setValue("foto", event.target.files[0])
        if (file != undefined) {
            setFileName(file.name);
        }else{
            setFileName("")
        }
    };
    useEffect(() => {
        token && fetchData();
    }, [token]);

    useEffect(() => {
        if (errors.foto && errors.foto.message) {
            setMensaje(errors.foto.message);
            setTipo("error");
            setInfo(true);
        }
    }, [errors]);
    
    if (isLoading) {
        return <CircularProgress color="success" />;
    }

    return (
        token && (
            <Container sx={{ mt: 3 }}>
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
                            variant="contained" 
                            onClick={()=> setFileName("")}>
                                
                            Aceptar
                        </Button>
                        <TextField
                            helperText={(errors.nombre && errors.nombre.message) || ""}
                            {...register("nombre")}
                            required
                            label="Nombre del producto"
                            margin="normal"
                            fullWidth
                            type="text"

                            autoFocus
                            error={!!errors.nombre}
                        />
                        <TextField
                            {...register("marca")}
                            helperText={(errors.marca && errors.marca.message) || ""}
                            required
                            label="Marca del producto"
                            margin="normal"
                            fullWidth
                            type="text"

                            error={!!errors.marca}
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
                            helperText={(errors.codigo && errors.codigo.message) || ""}
                            {...register("codigo")}
                            required
                            label="Código del producto"
                            margin="normal"
                            fullWidth
                            type="text"

                            error={!!errors.codigo}

                        />
                        <FormControl fullWidth>
                            <InputLabel id="select-Categoria">Categoría</InputLabel>
                            <Select
                                helperText={(errors.fkCategoriaProducto && errors.fkCategoriaProducto.message) || ""}
                                {...register("fkCategoriaProducto")}
                                margin="normal"
                                labelId="select-Categoria"
                                id="Categoria"
                                value={valCategorias}
                                label="Categoría"
                                required
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setValCategoria(value);
                                    console.log(value);
                                }}
                                error={!!errors.fkCategoriaProducto}
                            >
                                {categorias.map((categoria) => (
                                    <MenuItem key={categoria.idCategoriaProducto} value={categoria.idCategoriaProducto}>
                                        {categoria.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            helperText={(errors.stock && errors.stock.message) || ""}
                            {...register("stock")}
                            required
                            label="En Stock"
                            margin="normal"
                            fullWidth
                            type="number"

                            error={!!errors.stock}
                        />
                        <TextField
                            helperText={(errors.precio && errors.precio.message) || ""}
                            {...register("precio")}
                            required
                            label="Precio en Quetzales"
                            margin="normal"
                            type="number"
                            fullWidth

                            error={!!errors.precio}
                        />
                        <input
                            {...register("foto")}
                            type="file"
                            accept="image/jpeg, image/png"
                            style={{ display: 'none' }}
                            id="file-upload"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload">
                            <Button variant="contained" component="span" >
                                Subir archivo
                            </Button>
                        </label>
                        {fileName && (
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Archivo subido: {fileName}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Container>
        )
    );
};

export default NuevoProducto;
