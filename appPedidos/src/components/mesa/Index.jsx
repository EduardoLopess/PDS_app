import { Alert, Image, Text, TouchableOpacity, View } from "react-native"
import MesaStyle from './style'

import { usePedido } from "../../contexts/PedidoContext"

export const Mesa = ({ id, numero, status }) => {
    const { mesaLivre } = usePedido()


    const AlertIniciarPedido = (mesaId) => {
        mesaLivre(mesaId)
    
    }



    return (
        <TouchableOpacity onPress={() => { AlertIniciarPedido(id) }}>
            <View style={MesaStyle.container}>
                <View style={MesaStyle.mesaNumero}>
                    <Text style={MesaStyle.txtNumero}>{`MESA ${numero}`}</Text>
                </View>
                <View style={MesaStyle.imgContainer}>
                    <Image
                        style={MesaStyle.img}
                        source={require('../../../assets/mesa.png')}
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