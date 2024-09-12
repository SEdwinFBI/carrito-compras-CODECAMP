
import ProductsEditable from './ProductosEditable'
import NavBar from './NavBar'
import { Box } from '@mui/material'
import Buscador from './Buscador'

/**productos dashboard */
const ProductsDashboard = () => {
  return (
    <>
      {/**
       * <Box sx={{ display: "flex", ml: 0, mr: 0, justifyContent: "Center", mt: 2 }}>
        <Buscador ancho="40" />
      </Box>
       */}
      <ProductsEditable />
    </>
  )
}

export default ProductsDashboard