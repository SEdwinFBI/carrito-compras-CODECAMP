import { useState } from "react"
import '../style/login.css'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Notificacion } from "../components/AlertasPersonalizadas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth } from "../config/AuthContext";


export const Login = () => {

  /*contexto */
  const { login } = useAuth()
  /*navegacion */
  const navigate = useNavigate();
  /**estados */
  const [info, setInfo] = useState(false);
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');

  /**esquema para yup */
  const schema = yup.object({
    email: yup
      .string()
      .email("Correo electrónico inválido")
      .required("Correo requerido"),
    password_user: yup
      .string()
      .required("Contraseña requerida")
  }).required();/*tiene que ser requerido */

  //formulario
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  /*enviar al servidor */
  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),//cuerpo, pasa al servidor
      });

      const result = await response.json();


      if (response.ok && result.tokenSession) {
        login(result.tokenSession);
        setTipo('success')
        setMensaje("exito")
        console.log(result)
        if (result.data === 2) return navigate("/inicio")
        if (result.data === 1) return navigate("/dashboard")
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
    reset();  //reinicar 

  }


  return (
    <>
      <section >
        <Notificacion tipo={tipo} info={mensaje} onOpen={info}
          onClose={() => setInfo(false)} />

        <Container maxWidth="xs" className="efects" >

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',


          }} >
            <Typography component="h1" variant="h5">
              Bienvenido!
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              iniciar sesion
            </Typography>
            {/**formulario */}
            <Box component="form" noValidate sx={{ mt: 1, }} onSubmit={handleSubmit(onSubmit)} >
              {/**correo  */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Correo electronico"
                autoFocus
                {...register("email")}
                error={!!errors.email}
              />
              {/**contraseña */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="contraseña"
                type="password"
                {...register("password_user")}
                error={!!errors.password_user}
              />
              {/**ingresar */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ingresar
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="register" variant="body2">
                    {"¿No tienes Cuentas"}
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

