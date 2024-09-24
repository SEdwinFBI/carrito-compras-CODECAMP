import {  Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import {  Grow } from '@mui/material';
import { useNavegacion } from "../config/NaveContexto";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ idCategoriaProducto, nombre, estado, fecha_creacion,editable,time}) => {
  
  const {setPathname,setCategoriaEditable} =useNavegacion()
  const navigate =useNavigate();

  return (
    <>



      <Grow
       in={true}
       style={{ transformOrigin: '0 0 0' }}
       {...({ timeout: time || 1000 } )}>
       
      <Card  >
        <CardActionArea sx={{
          height: { xs: 350, sm: 340 }, //mobil:pc
          maxWidth: { xs: 150, sm: 250 }
        }} >
          <CardMedia
            component="img"
            alt="producto img"
            height="200"
            image="https://westerngrocer.com/wp-content/uploads/2016/10/Shopping-Cart-Logo-lg-891x1024.jpg">
          </CardMedia>
          <CardContent >
            <Typography variant="p" component="div" sx={{ fontSize: 15 }}>
              {nombre}
            </Typography >
            <Typography variant="p" sx={{ color: 'text.secondary' }} >
              {estado}
            </Typography>
            <Typography variant="p" sx={{ color: 'text.secondary' }} >
              {fecha_creacion}
            </Typography>
          
          </CardContent>
         { !editable && <Button size="small" variant="contained"  sx={
            { mb: 1, ml: 1 }
       
          }
            >
           
          </Button>}
          { editable && <Button size="small" variant="contained" color="warning" sx={
            { mb: 1, ml: 1 }
          }
            onClick={()=>{
              navigate('/dashboard/categoria-productos/edit')
              setCategoriaEditable(idCategoriaProducto);
           
              }}>
            Editar
          </Button>}
        </CardActionArea>
      </Card>
      </Grow>   
    </>
  )
}

export default CategoryCard