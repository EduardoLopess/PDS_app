import { createContext, useContext, useState } from "react";

const pedidoContext = createContext()

export const PedidoProvider = ({children}) => {
  
    const [pedidoData, setPedidoData] = useState([])

    
    const criarPedido = (itensCarrinho, numeroMesa, idMesa, totalItens) => {
        // Logando os dados de entrada e o pedido
        console.log('Itens do carrinho:', itensCarrinho);
        console.log('Número da mesa:', numeroMesa);

        const agora = new Date();
        const hora = agora.getHours().toString().padStart(2, '0');
        const minutos = agora.getMinutes().toString().padStart(2, '0');
        const horaAtual = `${hora}:${minutos}`;
        
        const pedido = {
            idMesa,
            numeroMesa,
            itens: itensCarrinho,
            total: totalItens,
            hora: horaAtual
        };
    
        // Logando o pedido antes de adicionar ao estado
        console.log('Pedido criado:', pedido);
    
        setPedidoData(prevState => 
            [...prevState, pedido]
        );
        
    };

    const editarPedido = (id) => {
        console.log("ID RECEBIDO: ", id)
    }
    
    
    return (
        <pedidoContext.Provider value = {{ 
            pedidoData,
            criarPedido,
            editarPedido

        }}>
            {children}
        </pedidoContext.Provider>
    )



}

export const usePedido = () => useContext(pedidoContext)