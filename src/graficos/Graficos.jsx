import { Bar, Line } from 'react-chartjs-2'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../config/AuthContext';
import { useEffect, useState } from 'react';







export const Graphics = () => {

    const { token } = useAuth()
    const [topProducts, setTopProducts] = useState([]);
    const [topLeastProducts, setTopLeastProducts] = useState([]);
        const [ultimasVentas, setUltimasVentas] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchTopTenProducts = async () => {
        try {
            const response = await fetch("http://localhost:3000/view/toptenproducts", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                return data;
            } else {
                return []
            }

        } catch (error) {
            console.log(error)
        }

    }
    const fetchTopTenLeastProducts = async () => {
        try {
            const response = await fetch("http://localhost:3000/view/toptenleastproducts", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                return data;
            } else {
                return []
            }

        } catch (error) {
            console.log(error)
        }

    }
    const fetchUltimasVentas = async () => {
        try {
            const response = await fetch("http://localhost:3000/view/ultimasventas", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                return data;
            } else {
                return []
            }

        } catch (error) {
            console.log(error)
        }

    }

    const fetchData = async () => {
        setIsLoading(true);
        const [topTen,Least,ventas] = await Promise.all([fetchTopTenProducts(),fetchTopTenLeastProducts(),fetchUltimasVentas()]);
        if (topTen) {
            setTopProducts(topTen);
        }
        if (Least) {
            setTopLeastProducts(Least);
        }
        if (ventas) {
            setUltimasVentas(ventas);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData()


    }, [])

 

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        Filler
    );
    const datosLeast = topLeastProducts.map((product) => product.total_venta)
    const nombreLeast = topLeastProducts.map((product) => product.nombre)

    const createChart = {
        labels: nombreLeast,
        datasets: [
            {
                label: "Productos Menos Vendidos",
                data: datosLeast,
                
                backgroundColor: "rgba(255, 112, 112, 0.637)",
                
            }
        ]
    };
    const datosVentas = ultimasVentas.map((dia) => dia.Total_dia)
    const fecha = ultimasVentas.map((dia) => dia.Fecha)
    
    const createChartVentas = {
        labels: fecha,
        datasets: [
            {
                label: "Total Ventas ultimos 10 dias. Cifras en Q",
                data: datosVentas,
                tension: 0.5,
                fill: true,
                borderColor: " rgba(0, 124, 52, 0.918)",
                backgroundColor: "rgba(42, 255, 131, 0.568)",
                pointRadius: 5,
                pointBorderColor: "rgb(23, 177, 87)",
                pointBackgroundColor: "rgb(23, 177, 87)"
            }
        ]
    };
    const datosTen = topProducts.map((product) => product.total_venta)
    const nombreTen = topProducts.map((product) => product.nombre)
    const createChartBar = {
        labels: nombreTen,
        datasets: [
            {
                label: "Top 10 Productos Mas Vendidos",
                data: datosTen,
                backgroundColor: "rgba(42, 255, 131, 0.568)",

            }
        ]
    };
    let options = {

    }


    if (isLoading) {
        return <Box sx={{ width: { md: 600, lg: 900 }, ml: { lg: 40, md: 40 } }}> <CircularProgress color="success" /></Box>;
    }


    return (
        token&&  <><Box
            sx={{
                ml: { lg: 40, md: 40 }, display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                flexDirection:"Column"
            }
            }>
                <Box sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center', mt: 3, background: "white", width: { md: 500, lg: 800 },
            }}><Line data={createChartVentas} options={options}></Line></Box>
            <Box sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center', mt: 3, background: "white", width: { md: 500, lg: 800 },
            }}><Bar data={createChart} options={options}></Bar></Box>
            <Box sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center', mt: 3, background: "white", width: { md: 500, lg: 800 },
            }}><Bar data={createChartBar} options={options} /></Box>
        </Box>

        </>
    )
}