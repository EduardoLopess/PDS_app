import { Alert, Modal, Text, TouchableOpacity, View } from "react-native"
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ModalStyle from '../produtos-categoria/stylesCategoria/ModalStyle'
import CarrinhoStyle from '../carrinho-compras/style'
import LinhaStyle from '../produtos-categoria/stylesCategoria/LinhaStyle'
import { useState } from "react";
import { useCarrinho } from "../../contexts/CarrinhoContext";
import { ScrollView } from "react-native-gesture-handler";

export const CarrinhoCompras = () => {
    const [modalVisivel, setModalVisivel] = useState(false)

    const {
        carrinhoVisivel,
        finalizarPedido,
        cancelarPedido,
        itemCarrinho,
        numeroMesa,
        removerItem,
        totalItens
    } = useCarrinho()


    const AlertaCancelar = () => {
        Alert.alert(
            `Deseja Cancelar o Pedido?`,
            '',
            [
                {
                    text: 'SIM',
                    onPress: () => cancelarPedido(),
                    style: 'cancel'
                },
                {
                    text: 'NAO',
                    onPress: () => { }

                }
            ],
            { cancelable: true }
        )
    }

    const AlertaFinalizar = () => {
        Alert.alert(
            `Finalizar o Pedido?`,
            '',
            [
                {
                    text: 'SIM',
                    onPress: () => finalizarPedido(numeroMesa),
                    style: 'cancel'
                },
                {
                    text: 'NAO',
                    onPress: () => { }

                }
            ],
            { cancelable: true }
        )
    }


    const openModal = () => setModalVisivel(true)
    const fecharModal = () => setModalVisivel(false)

    const renderCarrinhoCompras = () => {
        if (carrinhoVisivel) {
            return (
                <View style={CarrinhoStyle.container}>
                    <TouchableOpacity onPress={openModal}>
                        <Ionicons name="cart-outline" size={45} color="black" />
                    </TouchableOpacity>

                    <Modal
                        visible={modalVisivel}
                        onRequestClose={fecharModal}
                        animationType="slide"
                        transparent={true}
                    >
                        <View style={ModalStyle.conteudoModal}>
                            <View style={LinhaStyle.linhaHorizontal} />
                            <Text style={ModalStyle.tituloModal}>Carrinho</Text>
                            <View style={LinhaStyle.linhaHorizontal} />

                            <View style={CarrinhoStyle.mesaIdentificacao}>
                                <Text style={CarrinhoStyle.mesaTxt}>MESA {numeroMesa.numero} </Text>
                            </View>

                            <ScrollView>
                                {itemCarrinho.map((item) => (
                                    <View key={`${item.categoria}-${item.id}`} style={CarrinhoStyle.itemContainer}>

                                        <View style={CarrinhoStyle.viewTipo}>
                                            <Text style={ModalStyle.txtTipo}>{item.tipo}</Text>
                                        </View>
                                        <View style={CarrinhoStyle.viewNome}>
                                            <Text style={ModalStyle.txtProp}>{item.nome}</Text>
                                            {item.sabor && (
                                                <Text>SABOR: {item.sabor}</Text>
                                            )}
                                        </View>
                                        <View style={CarrinhoStyle.viewValor}>
                                            {typeof item.valor === "number" && (
                                                <Text style={ModalStyle.txtValor}>
                                                    {`R$: ${item.valor.toFixed(2).replace('.', ',')}`}
                                                </Text>
                                            )}
                                        </View>
                                        <View style={CarrinhoStyle.viewQtd}>
                                            <Text style={ModalStyle.txtProp}>{`${item.qtd}x`}</Text>
                                        </View>

                                        <View style={CarrinhoStyle.viewBtn}>
                                            <TouchableOpacity style={[CarrinhoStyle.BtnAddRemove, { backgroundColor: 'red' }]} onPress={() => removerItem(item.id, item.categoria)}>
                                                <Ionicons name="remove-outline" size={25} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                ))}

                            </ScrollView>

                            {totalItens && (
                                <View style={CarrinhoStyle.totalContainer}>
                                    <Text style={CarrinhoStyle.txtTotal}>{`TOTAL | R$: ${totalItens.toFixed(2).replace('.', ',')}`}</Text>
                                </View>

                            )}

                            <TouchableOpacity style={CarrinhoStyle.btnCancelar} onPress={AlertaCancelar}>
                                <Text style={CarrinhoStyle.txtBtnCancelar}>CANCELAR PEDIDO</Text>
                            </TouchableOpacity>


                            <View style={CarrinhoStyle.btnContainer}>
                                <TouchableOpacity onPress={fecharModal} style={[CarrinhoStyle.btn, { backgroundColor: '#E90000' }]}>
                                    <Text style={CarrinhoStyle.textBtn}>Fechar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={AlertaFinalizar} style={[CarrinhoStyle.btn, { backgroundColor: '#32CD32' }]}>
                                    <Text style={CarrinhoStyle.textBtn}>Finalizar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                </View>
            )
        }
    }


    return (
        <>
            {renderCarrinhoCompras()}

        </>
    )

}