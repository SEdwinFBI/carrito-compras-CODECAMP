import ProductCard from "../components/ProductCard"
import { Container, Grid2 } from '@mui/material';
import { useAuth } from "../config/AuthContext";
import { useEffect, useState } from 'react';



/**todos los productos a editar */
const ProductsEditable = () => {
/**contexto */
    const { token,logout  } = useAuth();
/**estados */
    const [product, setProduct] = useState([]);
   
    /**obtener productos */
    const fetchProduct = async () => {
        try {
          const response = await fetch('http://localhost:3000/productos/', {
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
          setProduct(data)
        } catch (err) {
          console.log(err)
        }
      };

    useEffect(()=>{
        fetchProduct();
    },[token])
    
    return (
       token && <>
            <Container >
             
                <Grid2 container spacing={{ xs: 1.5, md: 3 }} sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    mt: 4,
                    mb: 2,
                    ml:1
                }}
                >
                    {product.map((prod)=>(<ProductCard 
                    key={prod.idProducto} 
                    idProducto={prod.idProducto}
                    nombre={prod.nombre} 
                    marca={prod.marca} 
                    stock={prod.stock}
                    precio={prod.precio} 
                    foto={prod.foto} 
                    estado={prod.estado}
                editable={true}
                    />))}
                </Grid2>
      
               
            </Container>

        </>
    )
}

export default ProductsEditable;
