import { useEffect, useState } from "react"
import '../style/login.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Notificacion } from "../components/AlertasPersonalizadas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"



export const Register = () => {
  /**estados */
  const [info, setInfo] = useState(false);
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [codigo, setCodigo] = useState('');

  /**para formatear la fecha */
  const getFecha = (date) => {
    if (date) {
      const selectedDate = new Date(date.$d);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const DateFormateado = `${year}-${month}-${day}`;

      setValue("fecha_nacimiento", DateFormateado);
      console.log(DateFormateado);
    }
  }
  //esquema
  const schema = yup.object({
    nombre: yup
      .string()
      .required("Nombre requerido")
      .min(6, "El nombre debe tener al menos 6 caracteres"),
    email: yup
      .string()
      .email("Correo electrónico inválido")
      .required("Correo requerido"),
    password_user: yup
      .string()
      .required("Contraseña requerida")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    password_user_confirm: yup
      .string()
      .oneOf([yup.ref("password_user"), null], "Las contraseñas no coinciden")
      .required("Confirma tu contraseña"),
    codigo: yup
      .string()
      .required("El código de país es requerido"),
    telefono: yup
      .string()
      .required("El número de teléfono es requerido"),
    direccion: yup
      .string()
      .required("La dirección es requerida"),
    fecha_nacimiento: yup
      .string()
      .required("La fecha de nacimiento es requerida"),
    fkRol: yup
      .number()
      .typeError("rol requerido")
      .min(1, "debe estar entre 1 y 2")
      .max(2, "debe estar entre 1 y 2")
      .required("rol requerido"),
  }).required();

  /**creacion de constantes de userForm */
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });


  /*envio al servidor */
  const onSubmit = async (data) => {
    /**obtener el codigo de pais */
    const telefonoCompleto = data.codigo + " " + data.telefono;
    data.telefono = telefonoCompleto;

    try {
      const response = await fetch('http://192.168.0.103:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),//cuerpo
      });

      const result = await response.json();


      if (response.ok) {
        setTipo('success')
        setMensaje(result.mensaje)
      } else {
        setTipo('error')
        setMensaje(result.mensaje)
      }

    } catch (error) {

      setTipo('error')
      setMensaje("error interno")
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

      <section className="register" id="register">

        <Notificacion tipo={tipo} info={mensaje} onOpen={info}
          onClose={() => setInfo(false)} />

        <Container maxWidth="xs" className="efects contenedorRegister" >

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} >

            <Typography component="h1" variant="h5">
              Buen dia!
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Porfavor registrate
            </Typography>
            {/**formulario */}
            <Box component="form" noValidate sx={{ mt: 1 }}
              onSubmit={handleSubmit(onSubmit)}>
              {/**nombre */}
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
              {/**email */}
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
                autoFocus
                {...register("email")}
                error={!!errors.email}
              />
              {/**contraseña */}
              <TextField
                helperText={(errors.password_user && errors.password_user.message) || ""}
                margin="normal"
                required
                fullWidth
                label="contraseña"
                type="password"
                autoComplete="current-password"
                {...register("password_user")}
                error={!!errors.password_user}
              />
              <Typography component="p" >
                confirma tu contraseña
              </Typography>
              <TextField
                helperText={(errors.password_user_confirm && errors.password_user_confirm.message) || ""}
                margin="normal"
                required
                fullWidth
                label="contraseña"
                type="password"
                autoComplete="current-password"
                {...register("password_user_confirm")}
                error={!!errors.password_user_confirm}
              />
              {/**contenedor de codigo y telefono */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'left'
                }}>
                {/**codigo de pais */}
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
                {/**telefono */}
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
              {/**direccion */}
              <TextField
                helperText={errors.direccion && "La direccion es requerida"}
                margin="normal"
                required
                type="text"
                fullWidth
                label="Direccion"
                autoFocus
                error={!!errors.direccion}
                {...register("direccion", {
                  required: true
                })}
              />
              <Box sx={{ display: "flex", minWidth: 148, height: 48, mt: 1,mb:2 }} >
                {/**fecha */}
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    {...register("fecha_nacimiento")}
                    onChange={getFecha}
                    label={errors.fecha_nacimiento ? "Fecha requerida" : "Fecha de Nacimiento"}

                  />
                </LocalizationProvider>
                {/**rol */}
                <TextField
                  helperText={errors.fkRol && errors.fkRol.message}

                  required
                  type="number"
                  sx={{ width: 225, ml: 2 }}
                  label="rol"
                  autoFocus
                  inputProps={{ min: 1, max: 2 }}
                  error={!!errors.fkRol}
                  {...register("fkRol", {
                    required: true,
                  
                  })}
                />
              </Box>
              {/**registrarse  */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                registrarse
              </Button>
              <Grid container>

                <Grid item>
                  <Link href="/login" variant="body2">
                    {"¿Tienes Cuenta?"}
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Box>

        </Container>


      </section>






    </>
  )
}

