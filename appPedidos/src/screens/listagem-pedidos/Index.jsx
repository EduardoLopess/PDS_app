import { View, Text } from "react-native"
import ListaPedidoStyle from "./style"
import { Pedido } from "../../components/pedidos/Index"
import { ScrollView } from "react-native-gesture-handler"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { getPedidos } from "../../services/pedidos-service/PedidoService"


export const PedidosScreen = () => {
    const [pedidoData, setPedidoData] = useState([])



    useFocusEffect(
        useCallback(() => {
            getPedidos()
                .then(res => {
                    console.log("Respota api PEDIDOS: ", res.data)
                    setPedidoData(res.data.data)
                })
                .catch(err => console.error("Erro ao buscar pedidos", err))
        }, [])
    )


    console.log("PEDIDO TELA" , pedidoData)
    return (
        <View style = {ListaPedidoStyle.container}>
             {pedidoData.length === 0 &&(
                <View style = {ListaPedidoStyle.containerPedido}>
                    <Text style= {ListaPedidoStyle.txtSemPedido}>SEM PEDIDO</Text>
                </View>
                
            )}


            <ScrollView>
                <View>
                    {pedidoData.map((pedido) => (
                        
                        <Pedido
                            key={pedido.idMesa}
                            idMesa={pedido.idMesa}
                            numero={pedido.numeroMesa}
                            total={pedido.total}
                            hora={pedido.dateTimeFormatado}
                            itens={pedido.itens}

                        
                        
                        />
                    ))}
                </View>
            </ScrollView>


        
           
            

         
            

        </View>
    )
}