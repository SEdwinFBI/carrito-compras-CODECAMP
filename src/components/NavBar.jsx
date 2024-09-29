
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../config/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useDetalles } from '../config/DetallesContext';
import { useEffect, useState } from 'react';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 15,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const IconoBusqueda = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavBar = ({ position }) => {
  const navigate = useNavigate();

  const {productoSeleccionado}=useDetalles();
  console.log(productoSeleccionado.length,"tamaño")
  const [productos,setProductos]=useState(0);

useEffect(()=>{
  setProductos(productoSeleccionado.length)
},[productoSeleccionado.length])

  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);//abre
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    logout();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={menuClose}
    >
      <MenuItem onClick={menuClose}>Profile</MenuItem>
      <MenuItem onClick={menuClose} >My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* item carrito*/}
     
        <MenuItem
        onClick={()=>{
          //uso de switch route
          navigate("/inicio/detalles")
          handleMobileMenuClose()
         }}>

          <IconButton size="large" aria-label="carrito" color="inherit"
          >
            <Badge badgeContent={productos} color="error">
              <ShoppingCartIcon />{/*carrito */}
            </Badge>
          </IconButton>

          <p>Carrito Mobile</p>
        </MenuItem>
     
      {/* item historial*/}
     
        <MenuItem onClick = {()=>{
          //uso de switch route
              navigate("/inicio/historial");
              handleMobileMenuClose();
            }}>

          <IconButton
            size="large"
            aria-label="Historial"
            color="inherit"
            
          >
            <Badge badgeContent={0} color="error">
              <ManageSearchIcon />
            </Badge>

          </IconButton>

          <p>Historial</p>
        </MenuItem>
  
      {/* item salir*/}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>salir</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position={position ? position : "fixed"} color="success">
        <Toolbar>
          {/* menu categorias */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 5 }}
          >
            <MenuIcon />{/*botton menu */}
          </IconButton>
          {/*nombre */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            CODECAMP
          </Typography>
          {/**<Search>
            <IconoBusqueda>{//estilos busqueda }
              <SearchIcon />
            </IconoBusqueda>
            <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />{/* opciones a la derecha */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>{/*opciones desabilitadas mobil*/}
            {/*boton carrito */}
            <IconButton size="large" aria-label="show 4 new mails" color="inherit"
            onClick={()=>navigate("/inicio/detalles")}>
            
                <Badge badgeContent={productos} color="error">
                  <ShoppingCartIcon />
                </Badge>
             
            </IconButton>
            {/*boton historial */}
            <IconButton
              size="large"
              color="inherit"
            onClick={()=>navigate("/inicio/historial")}
            >
             
                <Badge badgeContent={0} color="error">
                  <ManageSearchIcon />

                </Badge>
             
            </IconButton>
            {/*boton salir */}
            <IconButton
              size="large"
              edge="end"
              aria-label="salilr"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
            <LogoutIcon />
            </IconButton>
          </Box>
          {/* menu izquierada */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {/* f menu izquierada */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
export default NavBar;