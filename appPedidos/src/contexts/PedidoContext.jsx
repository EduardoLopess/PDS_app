import { createContext, useContext, useState } from "react";

const pedidoContext = createContext()

export const PedidoProvider = ({children}) => {

    const [pedidoData, setPedidoData] = useState([])
    
    const criarPedido = (itensCarrinho, numeroMesa) => {
        // Logando os dados de entrada e o pedido
        console.log('Itens do carrinho:', itensCarrinho);
        console.log('Número da mesa:', numeroMesa);
        
        const pedido = {
            numeroMesa,
            itens: itensCarrinho
        };
    
        // Logando o pedido antes de adicionar ao estado
        console.log('Pedido criado:', pedido);
    
        setPedidoData(prevState => 
            [...prevState, pedido]
        );
    };
    
    
    return (
        <pedidoContext.Provider value = {{ 
            pedidoData,
            criarPedido

        }}>
            {children}
        </pedidoContext.Provider>
    )



}

export const usePedido = () => useContext(pedidoContext)