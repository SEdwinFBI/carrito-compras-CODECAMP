import UpdateProducts from '../components/updateProducts'
import { useNavegacion } from '../config/NaveContexto'
import { Typography } from '@mui/material'

const EditarProducto = () => {
    const { productoEditable } = useNavegacion()
    return (
        <>
            {!productoEditable && 
            <Typography sx={{display:"flex",height:"80vh",justifyContent:"center",alignItems:"center"}}>
                    Escoge un producto para editar...</Typography>
            }
            {productoEditable 
            && <UpdateProducts />}

        </>
    )
}
export default EditarProducto