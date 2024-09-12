import { Typography } from "@mui/material";
import UpdateCategory from "../components/UpdateCategory";
import { useNavegacion } from "../config/NaveContexto"

const EditarCategoria = () => {
    const { categoriaEditable, } = useNavegacion();
    return (
        <>
            {!categoriaEditable && 
            <Typography sx={{ display: "flex", height: "80vh", justifyContent: "center", alignItems: "center" }}>
                Escoge una categoria para editar...</Typography>
            }
            {categoriaEditable && 
            <UpdateCategory />
            }
        </>
    )
}

export default EditarCategoria