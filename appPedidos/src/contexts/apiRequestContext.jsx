import { createContext, useContext, useEffect, useState } from "react"
import { onNovaNotificacao, onPedidoAtualizado, onPedidoCancelado, onPedidoCriado, startConnection } from "../services/signalrServices/SignalrService"
import { getPedidos } from "../services/pedidos-service/PedidoService"
import { getProdutos } from "../services/produtos-service/ProdutoService"
import { getSabores } from "../services/sabores-service/SaborService"
import { getAdicionais } from "../services/adicionais-service/AdicionalService"
import { getMesas } from "../services/mesas-service/MesaService"
import { Notifier, NotifierComponents } from 'react-native-notifier';



const apiRequestContext = createContext()

export const ApiRequestProvider = ({ children }) => {

    const [pedidoData, setPedidoData] = useState([])
    const [produtoData, setProdutoData] = useState([])
    const [saborData, setSaborData] = useState([])
    const [adcionalData, setAdicionalData] = useState([])
    const [mesaData, setMesaData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resPedido = await getPedidos();
                setPedidoData(resPedido.data.data);

                const resProduto = await getProdutos();
                setProdutoData(resProduto.data.data);

                const resSabor = await getSabores();
                setSaborData(resSabor.data.data);

                const resAdc = await getAdicionais();
                setAdicionalData(resAdc.data.data);

                const resMesa = await getMesas()
                setMesaData(resMesa.data.data)
            } catch (err) {
                console.error("Erro ao carregar dados iniciais:", err);
            }
        };

        fetchData();


        startConnection()

        onPedidoCriado((pedido) => {
            const mesaPedido = pedido.numeroMesa
            carregarMesas()
            Notifier.showNotification({
                title: `✅ Novo PEDIDO CRIADO MESA ${mesaPedido}`,
                Component: NotifierComponents.Alert,
                duration: 3000,
            });


        });

        onPedidoAtualizado((pedido) => {

            // Atualiza estado
        });

        onPedidoCancelado((pedido) => {
            const mesaPedido = pedido.numeroMesa
            carregarMesas()
            Notifier.showNotification({
                description: `Mesa ${mesaPedido}`,

                Component: NotifierComponents.Alert,
                componentProps: {
                    alertType: 'error',
                    titleStyle: { fontSize: 20, fontWeight: 'bold' },
                    descriptionStyle: { fontSize: 17 },
                },
            });
        });

        onNovaNotificacao((msg) => {
           
        });


    }, []);


    const carregarMesas = async () => {
        try {
            const resMesa = await getMesas()
            setMesaData(resMesa.data.data)
        } catch (err) {
            console.error("Erro ao carregar mesas", err)
        }
    }



    return (
        <apiRequestContext.Provider value={{
            pedidoData,
            produtoData,
            saborData,
            adcionalData,
            mesaData,
            carregarMesas

        }}>
            {children}
        </apiRequestContext.Provider>
    )
}

export const useApiRequest = () => useContext(apiRequestContext)







// useEffect(() => {
//     startConnection()

//     onPedidoAtualizado((pedidoAtualizado) => {

//     })
// }, [])
