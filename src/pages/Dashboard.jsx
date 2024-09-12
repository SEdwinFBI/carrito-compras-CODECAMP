
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useEffect, useMemo, useState } from 'react';
import { CategoryTwoTone as CategorySharp,AddBusiness, Category, Edit, StoreMallDirectory, StoreTwoTone, AddShoppingCart } from '@mui/icons-material';
import { useAuth } from "../config/AuthContext";
import { useNavigate } from 'react-router-dom';
import ProductsDashboard from '../components/ProductsDashboard';
import { useNavegacion } from '../config/NaveContexto';
import { NavigationProvider } from '../config/NaveContexto'
import NuevoProducto from '../components/nuevoProducto';
import CategoryDashboard from '../components/CategoryDashboard';
import NuevaCategoria from '../components/NuevaCategoria';
import OrdenEditables from '../components/orden/OrdenEditables';
import OrdenDetalles from '../components/orden/OrdenDetalles';
import { OrdenProvider } from '../config/OrdenContex';
import EditarProducto from './EditarProducto';
import EditarCategoria from './EditarCategoria';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

/* menu  */
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Principal',
  },
  {
    segment: 'ordenes',
    title: 'Ordenes',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Herramientas',
  },
  
  {
    segment: 'productos',
    title: 'Productos',
    icon: <StoreMallDirectory />,
    children: [
      {
        segment: 'allProducts',
        title: 'Todos los Productos',
        icon: <StoreTwoTone />,
      },
      {
        segment: 'crear',
        title: 'Crear',
        icon: <AddBusiness />,
      },
      {
        segment: 'edit',
        title: 'Continuar Editando',
        icon: <Edit />
      },
    ],
  },
  {
    segment: 'categoria-productos',
    title: 'Categoria de Productos',
    icon: <Category />,
    children: [
      {
        segment: 'categorias',
        title: 'Categorias',
        icon: <CategorySharp />,
      },
      {
        segment: 'crear',
        title: 'Crear',
        icon: <AddShoppingCart />,
      },
      {
        segment: 'edit',
        title: 'Continuar Editando',
        icon: <Edit />
      },
    ],
  },
  {
    kind:'divider'
  },
  {
    segment: 'salir',
    title: 'Deconectarse',
    icon:<LogoutIcon />
 
  }
];
/**tema de dashoard */
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#F9F9FE',
          paper: '#EEEEF9',
        },
      },
    },

  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
});



function RenderPages({ pathname: pathnameDashboard }) {
  /**contexto */
  const { pathname, setPathname } = useNavegacion()
  const { logout } = useAuth()
  /**estados */
  const [currPath, setCurrPath] = useState(pathnameDashboard);
  const [asign, setAsing] = useState(false);

  useEffect(() => {
    if (pathname != "" && !asign) {
      console.log(pathname)
      setCurrPath(pathname)
      setAsing(true)
    }else {
      if(asign){
        setPathname("")
        setAsing(false)

      }
      setCurrPath(pathnameDashboard)
    }
    
  }, [pathname,pathnameDashboard])

  /**renderizacion de componentes */
  switch (currPath) {
    case '/dashboard':
      return <OrdenEditables/>

      case '/ordenes':
      return (<>
        <OrdenEditables/>
      </>);
       case '/ordenes/detalle':
        return (<>
          <OrdenDetalles/>
        </>);

      case '/productos/allProducts':
      return <ProductsDashboard />
      case '/productos/edit':
        return (
          <>
         
          <EditarProducto/>
          </>
        );
        case '/categoria-productos/categorias':
        return (
          <>
           <CategoryDashboard/>
          
          </>
        );
        
        case '/productos/crear':
        return (
          <>
            <NuevoProducto/>
          </>
        );
        case '/categoria-productos/crear':
        return (
          <>
         <NuevaCategoria/>
          </>
        );
        case '/categoria-productos/edit':
        return (
          <>
      <EditarCategoria/>
          </>
        );
        case '/salir':
          return logout()
    
    default:
      return <Typography>{pathnameDashboard}</Typography>;
  }

}

RenderPages.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Dashboard() {
  /**navegacion */
  const navigate = useNavigate();
  /**contexto */
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return navigate('/login')
      
  }, [navigate, token])

/**ruta inicial */
  const [pathname, setPathname] = useState('/dashboard');
/**uso de rutas */
  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    

    token &&
    <NavigationProvider>
      <OrdenProvider>
      <AppProvider
        branding={{
          logo: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58f__Hs5QwGWIEcsawDwW1o5IQzaYNPONhQ&s" alt="MUI logo" />,
          title: 'Codecamp',
        }}
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
      >
        
        <DashboardLayout>

          <RenderPages pathname={pathname} />
          
        </DashboardLayout>

      </AppProvider>
      </OrdenProvider>
    </NavigationProvider>
    
  );
}


export default Dashboard;