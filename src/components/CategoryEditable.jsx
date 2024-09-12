import { Container, Grid2 } from '@mui/material';
import { useAuth } from "../config/AuthContext";
import { useEffect, useState } from 'react';
import CategoryCard from "./CategoryCard";




const CategoryEditable = () => {


    const { token, logout } = useAuth();

    const [categories, setCategories] = useState([]);


    const fetchCategories = async () => {
        try {
            const response = await fetch('http://192.168.0.103:3000/categoria-productos/', {
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
            console.log(data[0])
            setCategories(data[0])
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        fetchCategories();
    }, [token])


    return (
        token && <>
            <Container >

                <Grid2 container spacing={{ xs: 1.5, md: 3 }} sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    mt: 4,
                    mb: 2,
                    ml: 1
                }}
                >

                    {categories.map((category) => (<CategoryCard
                        key={category.idCategoriaProducto}
                        idCategoriaProducto={category.idCategoriaProducto}
                        nombre={category.nombre}
                        estado={category.estado}
                        fecha_creacion={category.fecha_creacion}
                        editable={true}
                    />))}
                </Grid2>


            </Container>

        </>
    )
}

export default CategoryEditable;