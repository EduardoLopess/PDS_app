import { Alert, Modal, Text, TouchableOpacity, View } from "react-native"
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ModalStyle from '../produtos-categoria/stylesCategoria/ModalStyle'
import CarrinhoStyle from '../carrinho-compras/style'
import LinhaStyle from '../produtos-categoria/stylesCategoria/LinhaStyle'
import { useState } from "react";
import { useCarrinho } from "../../contexts/CarrinhoContext";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native";
import { usePedido } from "../../contexts/PedidoContext";
import { formatarTipoProdutoCarrinho } from "../../utils/formatar/FormatarTipo";
import { useNavigation } from "@react-navigation/native";


export const CarrinhoCompras = () => {
    const navigation = useNavigation();
    console.log("CarrinhoCompras renderizado");
    const [modalVisivel, setModalVisivel] = useState(false)
    const [modalAdicional, setModalAdicional] = useState(false)
    const [itemSelecionado, setItemSelecionado] = useState(null);



    const {
        carrinhoVisivel,

        itemCarrinho,
        totalItens,
        removerItemCarrinho,
        removerAdicionalDoItemCarrinho
    } = useCarrinho()

    const { cancelarPedido, numeroMesaContext, finalizarPedido } = usePedido()


    console.log("ITEM CARRINHO:\n", JSON.stringify(itemCarrinho, null, 2));


   
    console.log("NUMERO DA MESA DO CARRINHO: ", numeroMesaContext)





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
                    onPress: () => finalizarPedido(numeroMesaContext.numero),
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

    const openModalAdicional = (item) => {
        setItemSelecionado(item);
        setModalAdicional(true);
    };

    const fecharModalAdicional = () => {
        setItemSelecionado(null);
        setModalAdicional(false);
    };





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
                                <Text style={CarrinhoStyle.mesaTxt}>MESA {numeroMesaContext?.numero ?? '---'} </Text>
                            </View>

                            <ScrollView style={{ width: '100%' }}>
                                {itemCarrinho.map((item) => (
                                    <View key={item.idUnico} style={CarrinhoStyle.itemContainer}>

                                        <View style={CarrinhoStyle.viewTipo}>
                                            <Text style={ModalStyle.txtTipo}>{formatarTipoProdutoCarrinho(item.tipo)}</Text>
                                        </View>
                                        <View style={CarrinhoStyle.viewNome}>
                                            <Text style={ModalStyle.txtProp}>{item.nome}</Text>
                                            {item.sabor && (
                                                <Text>SABOR: {item.sabor}</Text>
                                            )}
                                        </View>

                                        <View style={CarrinhoStyle.viewValor}>
                                            <Text style={ModalStyle.txtValor}>R$: {item.preco}</Text>
                                        </View>

                                        <View style={CarrinhoStyle.viewQtd}>
                                            <Text style={ModalStyle.txtProp}>{`${item.qtd}x`}</Text>
                                        </View>

                                        <View style={CarrinhoStyle.viewBtn}>
                                            <TouchableOpacity style={[CarrinhoStyle.BtnAddRemove, { backgroundColor: 'red' }]} onPress={() =>
                                                removerItemCarrinho(item.idUnico)


                                            }>
                                                <Ionicons name="remove-outline" size={25} />
                                            </TouchableOpacity>
                                        </View>

                                        {/* AQUI MOSTRA OS ADICIONAIS */}
                                        {item.adicionais && item.adicionais.length > 0 && (
                                            <View style={CarrinhoStyle.containerAdicionais}>
                                                {item.adicionais.map((adicional) => (
                                                    <View key={adicional.id} style={CarrinhoStyle.adicionalItem}>
                                                        <Text>{adicional.adicionalNome} ({adicional.quantidade || 1}x) - R$: {adicional.precoAdicionalFormatado}</Text>
                                                        <TouchableOpacity onPress={() => removerAdicionalDoItemCarrinho(item.id, adicional.id, item.adicionaisKey)} style={{ padding: 4 }}>
                                                            <Ionicons name="remove-circle-outline" size={20} color="red" />
                                                        </TouchableOpacity>
                                                    </View>
                                                ))}
                                            </View>
                                        )}


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