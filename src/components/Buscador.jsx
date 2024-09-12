import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { SearchTwoTone } from '@mui/icons-material';



const Buscador = ({ancho,anchoM}) => {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: 15,
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.black, 0.20),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: 'auto',
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
        color: 'black',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
         
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: `${anchoM || '20'}ch`,
          [theme.breakpoints.up('md')]: {
            width: `${ancho || '30'}ch`,
          },
        },
      }));
  return (
    <>
      <Search>
            <IconoBusqueda>{/*estilos busqueda */}
              <SearchTwoTone />
            </IconoBusqueda>
            <StyledInputBase
            onChange={(e)=>{
                console.log(e.target.value)
            }}
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

    </>
  )
}

export default Buscador
