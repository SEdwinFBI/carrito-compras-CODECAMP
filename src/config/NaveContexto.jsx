import { createContext, useContext, useState,useEffect } from 'react';

const NavigationContext = createContext();



export const NavigationProvider=({ children })=> {
  const [pathname, setPathname] = useState('');
  const [productoEditable, setProductoEditable]=useState(null);
  const [categoriaEditable,setCategoriaEditable]=useState(null)
  const [valor, setValor] = useState("")
  
 console.log(valor,"valor")
  useEffect(()=>{
    
    if (pathname!=""){
    setValor(pathname)
  }
},[pathname])

  return (
    <NavigationContext.Provider value={{pathname, setPathname,productoEditable, setProductoEditable,valor,categoriaEditable,setCategoriaEditable}}>
      {children}
    </NavigationContext.Provider>
  );
}
export const useNavegacion = ()=> useContext(NavigationContext)