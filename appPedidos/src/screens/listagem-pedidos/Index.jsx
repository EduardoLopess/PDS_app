import { View, Text } from "react-native"
import { Toast } from "../../utils/notificacao/toast/Index"
import ListaPedidoStyle from "./style"
import { Pedido } from "../../components/pedidos/Index"
import { usePedido } from "../../contexts/PedidoContext"
import { ScrollView } from "react-native-gesture-handler"


export const PedidosScreen = () => {
    const {pedidoData} = usePedido()
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
                            numero={pedido.numeroMesa.numero}
                            total={pedido.total}
                            hora={pedido.hora}
                            itens={pedido.itens}

                        
                        
                        />
                    ))}
                </View>
            </ScrollView>


        
           
            

         
            

        </View>
    )
}