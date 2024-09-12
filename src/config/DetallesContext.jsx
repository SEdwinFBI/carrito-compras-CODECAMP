import { createContext, useContext, useState } from "react";

const DetallesContexto = createContext();


export const DetallesProvider = ({children})=>{
    const [productoSeleccionado, setProductoSelecionado]=useState([]); //arreglo de objetos
    const [precioTotal, setPrecioTotal]=useState(0)
    const [cambio, setCambio]=useState(0)

    return (
        <DetallesContexto.Provider value={{productoSeleccionado,setProductoSelecionado,precioTotal,  setPrecioTotal,cambio, setCambio}}> 
        {children}
        </DetallesContexto.Provider>
    );
};

export const useDetalles = ()=>useContext(DetallesContexto);