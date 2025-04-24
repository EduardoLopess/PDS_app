import { Alert, Image, Text, TouchableOpacity, View } from "react-native"
import MesaStyle from './style'
import { useCarrinho } from "../../contexts/CarrinhoContext"
import { usePedido } from "../../contexts/PedidoContext"

export const Mesa = ({id, numero, status}) => {
    const { iniciarPedido } = useCarrinho()
    const { pedidoData } = usePedido()
    
 

    return (
        <TouchableOpacity onPress = {() => {iniciarPedido(id)}}>
            <View style = {MesaStyle.container}>
                <View style = {MesaStyle.mesaNumero}>
                    <Text style = {MesaStyle.txtNumero}>{`MESA ${numero}`}</Text>
                </View>
                <View style = {MesaStyle.imgContainer}>
                    <Image
                        style = {MesaStyle.img}
                        source = {require('../../../assets/mesa.png')}
                    />

                </View>
                <View
                    style={[
                        MesaStyle.containerStatus,
                        { backgroundColor: status ? '#E90000' : '#32CD32' },
                        
                    ]}
                >
                    <Text style={MesaStyle.textStatus}>{status ? 'OCUPADA' : 'LIVRE'}</Text>
                </View>


            </View>
        </TouchableOpacity>
    )
}