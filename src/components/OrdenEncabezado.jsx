import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Container, Input, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { Notificacion } from "./AlertasPersonalizadas";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState,useEffect } from "react";
import { useDetalles } from "../config/DetallesContext";
import { useAuth } from "../config/AuthContext";
import { useNavigate } from "react-router-dom";

/**cracion de la orden encabezado cliente */
const OrdenEncabezado = () => {
  /**contexto */
  const {token}=useAuth();
  const {productoSeleccionado,setProductoSelecionado,precioTotal}=useDetalles();
  /**navegacion */
  const navigate = useNavigate();
    const [info, setInfo] = useState(false);
    const [tipo, setTipo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [codigo, setCodigo] = useState('');

    useEffect(() => {
      getTotal()
      obtenerDetalle()
    }, [precioTotal,productoSeleccionado]);
    
    /**calcular total */
    const getTotal=()=>{
      if(precioTotal!= 0) {
        setValue("total", precioTotal);
      } else{setValue("total", null)}
    }
//fecha
const getFecha = (date) => {
    if (date) {
      const selectedDate = new Date(date.$d);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const DateFormateado = `${year}-${month}-${day}`;

      setValue("fecha_entrega", DateFormateado);
      console.log(DateFormateado);
    }
  }
  /**obtener los productos seleccionados */
  const obtenerDetalle = ()=>{
    console.log(productoSeleccionado)
    setValue("detalles", productoSeleccionado.map((prod) => {
      return {
          ...prod, // Copiamos todos los campos originales del objeto
          fkProducto: prod.idProducto, // Cambiamos idProducto por fkProducto
          cantidad: parseInt(sessionStorage.getItem(`cantidad_${prod.idProducto}`)), // Agregamos el campo cantidad
      };
  }));
  }

/**esquema */
  const schema = yup.object({
    nombre:yup
    .string()
    .required("Nombre Requerido"),
    email:yup
    .string()
    .required("Correo requerido")
    .email("Correo electronico invalido"),
    codigo:yup
    .string()
    .required("Codigo de pais requerido"),
    direccion: yup
    .string()
    .required("direccion requerida"),
    telefono:yup
    .string()
    .required("Telefono requerido"),
    fecha_entrega:yup
    .string()
    .required("fecha de entrega requerida"),
    total:yup
    .number()
    .required("total"),
    detalles:yup
    .array()
    .required("detalles")
  } ).required();

  /**uso form */
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });

/**enviar al sevidor */
  const onSubmit = async (data) => {
    const telefonoCompleto = data.codigo+" "+ data.telefono;
    data.telefono = telefonoCompleto;
    try {
      const response = await fetch('http://192.168.0.103:3000/orden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` //autorizacion
        },
        body: JSON.stringify(data),//cuerpo
      });
      const result = await response.json();

      if (response.ok) {
        setTipo('success')
        setMensaje(result.mensaje)
        setTimeout(() => {
          setProductoSelecionado([]);
          navigate("/inicio")
        }, 3000);
       
      } else {
        setTipo('error')
        setMensaje(result.mensaje)
      }

    } catch (error) {
     
      setTipo('error')
      setMensaje("error interno front")
    }
    console.log(data);
    setInfo(false);
    setTimeout(() => {
      setInfo(true);
    }, 100);
    reset();  //reinicar campos

  }

  return (
    <>
      <Notificacion tipo={tipo} info={mensaje} onOpen={info}
          onClose={() => setInfo(false)} />
    <Container>
    <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} >
            <Typography component="h1" variant="h5">
             llene el formulario con los datos requeridos
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}
              onSubmit={handleSubmit(onSubmit)}>

              <TextField
                helperText={(errors.nombre && errors.nombre.message) || ""}
                margin="normal"
                required
                type="texto"
                fullWidth
                label="Nombre Completo"
                autoFocus
                {...register("nombre")}
                error={!!errors.nombre}

              />
              <TextField
                helperText={(errors.email && errors.email.message) || ""}
                margin="normal"
                required
                type="email"
                fullWidth
                id="email2"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                
                {...register("email")}
                error={!!errors.email}
              />   
              <Box
                sx={{
                  display: "flex",
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'left'
                }}>
                <Box sx={{ minWidth: 148, height: 48 }} >
                  <FormControl fullWidth  >
                    <InputLabel id="select-codigo" color={errors.codigo && "error"}
                    >Codigo de pais</InputLabel>
                    <Select
                      labelId="select-codigo"
                      id="codigo"
                      {...register("codigo")}
                      value={codigo}
                      label="Codigo de pais"
                      error={!!errors.codigo}
                      required
                      onChange={(event) => {
                        const value = event.target.value;
                        setCodigo(value);
                      }}
                    >

                      <MenuItem value={502}>Guatemala</MenuItem>
                      <MenuItem value={52}>Mexico</MenuItem>
                      <MenuItem value={503}>El Salvador</MenuItem>
                      <MenuItem value={504}>Honduras</MenuItem>
                      <MenuItem value={505}>Nicaragua</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <TextField
                  margin="normal"
                  required
                  sx={{ width: 225, ml: 2 }}
                  name="telefono"
                  label={errors.telefono ? "Numero de telefono requerido" : "Telefono"}
                  color={errors.telefono && "error"}
                  type="tel"
                  {...register("telefono")}
                  error={!!errors.telefono}
                />
              </Box>
              <TextField
                helperText={errors.direccion && "La direccion es requerida"}
                margin="normal"
                required
                type="text"
                fullWidth
                label="Direccion"
              
                error={!!errors.direccion}
                {...register("direccion", {
                  required: true
                })}

              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...register("fecha_entrega")}
                  onChange={getFecha}
                  label={errors.fecha_entrega ? "Fecha requerida" : "Fecha de entrega"}

                />
              </LocalizationProvider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                completar orden!
              </Button>
            </Box>
          </Box>
    </Container>
    
    </>
  )
}

export default OrdenEncabezado