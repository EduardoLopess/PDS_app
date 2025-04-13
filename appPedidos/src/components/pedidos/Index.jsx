import { Text, TouchableOpacity, View, Image, SectionList, ScrollView } from "react-native"
import PedidoStyle from "./style"
import { Ionicons } from '@expo/vector-icons';
import { Modal } from "react-native";
import ModalStyle from "../produtos-categoria/stylesCategoria/ModalStyle";
import LinhaStyle from "../produtos-categoria/stylesCategoria/LinhaStyle";
import { useState } from "react";
import { usePedido } from "../../contexts/PedidoContext";


export const Pedido = () => {
    const {pedidoData} = usePedido()
    console.log("PEDIDO NO MODAL: ", pedidoData)
    const [modalVisivel, setModalVisivel] = useState(false)
    const openModal = () => setModalVisivel(true)
    const fecharModal = () => setModalVisivel(false)
<<<<<<< HEAD
=======


    
>>>>>>> 9f6539efee6aa9633ba640a3f00e28d40c0c3cfc
    return (

        <TouchableOpacity onPress={openModal}>
            <View style={PedidoStyle.container}>
                <View style={PedidoStyle.viewMesa}>
<<<<<<< HEAD
                    <Text style={PedidoStyle.txt}>MESA - 12</Text>
=======
                    <Text style={PedidoStyle.txt}>MESA {pedidoData.numero}</Text>
>>>>>>> 9f6539efee6aa9633ba640a3f00e28d40c0c3cfc
                </View>
                <View style={PedidoStyle.divisao} />
                <View style={PedidoStyle.viewHr}>
                    <Text style={PedidoStyle.txt}>Hora: 12h30</Text>
                </View>
                <View style={PedidoStyle.divisao} />
                <View style={PedidoStyle.viewTotal}>

                    <Text style={PedidoStyle.txt}>TOTAL: R$: 20,00</Text>

                </View>
            </View>

            <Modal
                visible={modalVisivel}
                onRequestClose={null}
                animationType="slide"
                transparent={true}
            >
                <View style={PedidoStyle.conteudoModal}>
                    <View style = {LinhaStyle.linhaHorizontal}/>
                        <Text style = {ModalStyle.tituloModal}>PEDIDO n 2</Text>
                    <View style = {LinhaStyle.linhaHorizontal}/>

                    <View style = {PedidoStyle.mesaIdentificacao}>
                        <Text style = {PedidoStyle.mesaTxt}>MESA 2</Text>
                    </View>

                    <ScrollView>
                        
                    </ScrollView>
                    
                   






                    <View style={PedidoStyle.containerBtn}>
                        <TouchableOpacity onPress={fecharModal} style={[CarrinhoStyle.btn, { backgroundColor: '#E90000' }]}>
                            <Text style={CarrinhoStyle.textBtn}>Fechar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={null} style={[CarrinhoStyle.btn, { backgroundColor: '#32CD32' }]}>
                            <Text style={CarrinhoStyle.textBtn}>EDITAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </Modal>
        </TouchableOpacity>
    )
}