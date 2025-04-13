import { View } from "react-native"
import { Toast } from "../../utils/notificacao/toast/Index"
import ListaPedidoStyle from "./style"
import { Pedido } from "../../components/pedidos/Index"

export const PedidosScreen = () => {
    return (
        <View style = {ListaPedidoStyle.container}>
            <Pedido/>
            <Pedido/>
            <Pedido/>

            

         
            

        </View>
    )
}