import { createContext, useContext, useState } from "react";

const pedidoContext = createContext()

export const PedidoProvider = ({children}) => {

    const [pedido, setPedido] = useState([])
    
    const CriarPedido = () => {

    }
    
    return (
        <pedidoContext.Provider value = {{

        }}>
            {children}
        </pedidoContext.Provider>
    )



}

export const usePedido = () => useContext(pedidoContext)