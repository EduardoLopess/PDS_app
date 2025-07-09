import { Text, TouchableOpacity, View, Image, SectionList, ScrollView } from "react-native"
import PedidoStyle from "./style"
import { Ionicons } from '@expo/vector-icons';
import { Modal } from "react-native";
import ModalStyle from "../produtos-categoria/stylesCategoria/ModalStyle";
import LinhaStyle from "../produtos-categoria/stylesCategoria/LinhaStyle";
import { useState } from "react";
import { usePedido } from "../../contexts/PedidoContext";
import btnStyles from "../../styles/btnStyles";
import { formatarTipoProdutoCarrinho } from "../../utils/formatar/FormatarTipo";


export const Pedido = ({ idMesa, numero, total, hora, itens }) => {
    const { editarPedido } = usePedido()
    const horaFormatada = hora.slice(11, 16)
    console.log("Itens recebidos no pedido:", itens, '\n')

    console.log("ID MESA", numero)



    const [modalVisivel, setModalVisivel] = useState(false)
    const openModal = () => setModalVisivel(true)
    const fecharModal = () => setModalVisivel(false)


    return (

        <TouchableOpacity onPress={openModal}>
            <View style={PedidoStyle.container}>
                <View style={PedidoStyle.viewMesa}>
                    <Text style={PedidoStyle.txt}>MESA: {numero}</Text>
                </View>
                <View style={PedidoStyle.divisao} />
                <View style={PedidoStyle.viewHr}>
                    <Text style={PedidoStyle.txt}>Hora: {horaFormatada}</Text>
                </View>
                <View style={PedidoStyle.divisao} />
                <View style={PedidoStyle.viewTotal}>
                    <Text style={PedidoStyle.txt}>TOTAL: R$: 120,00</Text>
                    {/* <Text style={PedidoStyle.txt}>
                        {`TOTAL: R$: ${total.toFixed(2).replace('.', ',')}`}
                    </Text> */}

                </View>
            </View>

            <Modal
                visible={modalVisivel}
                onRequestClose={null}
                animationType="slide"
                transparent={true}
            >
                <View style={PedidoStyle.conteudoModal}>
                    <View style={LinhaStyle.linhaHorizontal} />
                    <Text style={ModalStyle.tituloModal}>PEDIDO MESA - {numero}</Text>
                    <View style={LinhaStyle.linhaHorizontal} />

                    <View style={PedidoStyle.mesaIdentificacao}>
                        <Text style={PedidoStyle.mesaTxt}>Hora: {horaFormatada}</Text>
                    </View>

                    <ScrollView>
                        {itens.map((item) => (
                            <View key={`${item.categoria}-${item.id}-${item.idSabor}`} style={PedidoStyle.itemContainer}>
                                <View style={PedidoStyle.viewTipoProp}>
                                    <Text style={PedidoStyle.txtTipo}>{formatarTipoProdutoCarrinho(item.produto.tipoProduto)}</Text>
                                </View>
                                <View style={PedidoStyle.viewNomeProp}>
                                    <Text style={PedidoStyle.txtProp}>{item.produto.nomeProduto}</Text>
                                    {item.saborDrink && (
                                        <Text style={PedidoStyle.txtPropSabor}>SABOR: {item.saborDrink.nomeSabor}</Text>
                                    )}

                                </View>
                                <View style={PedidoStyle.viewQtdProp}>
                                    <Text style={PedidoStyle.txtProp}>qtd: {item.qtd}x</Text>
                                </View>
                                <View style={PedidoStyle.viewValorProp}>
                                    <Text style={PedidoStyle.txtProp}>R$: {item.produto.precoProdutoFormatado}</Text>
                                </View> *
                            </View>
                        ))}


                    </ScrollView>

                    {/* <View style={PedidoStyle.containerTotal}>
                        <Text style={PedidoStyle.txtTotal}>{`TOTAL - R$: ${total.toFixed(2).replace('.', ',')}`}</Text>

                    </View> */}

                    <View style={PedidoStyle.containerBtn}>
                        <TouchableOpacity onPress={fecharModal} style={btnStyles.btnFechar}>
                            <Text style={CarrinhoStyle.textBtn}>Fechar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => editarPedido(idMesa)} style={[CarrinhoStyle.btn, { backgroundColor: '#32CD32' }]}>
                            <Text style={CarrinhoStyle.textBtn}>EDITAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </Modal>
        </TouchableOpacity>




    )
}