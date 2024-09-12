import { createContext, useContext, useState } from 'react';

const OrdenContext = createContext();



export const OrdenProvider = ({ children }) => {

    const [ordenCliente, setOrdenCliente] = useState(null);
   

    
    return (
        <OrdenContext.Provider value={{  ordenCliente,setOrdenCliente }}>
            {children}
        </OrdenContext.Provider>
    );
}
export const useOrden = () => useContext(OrdenContext)