import { Image, Modal, SectionList, Text, TouchableOpacity, View } from 'react-native'
import CardStyle from '../stylesCategoria/CardStyle'
import ModalStyle from '../stylesCategoria/ModalStyle'
import LinhaStyle from '../stylesCategoria/LinhaStyle'
import { Ionicons } from '@expo/vector-icons';

import { CervejaData } from '../../../../data/CervejaData'
import { useRoute } from '@react-navigation/native'
import { useCarrinho } from '../../../contexts/CarrinhoContext'
import { agruparPorTipo } from '../../../utils/filtragem-produtos/AgruparProdutos';
import { formatarTipoProduto } from '../../../utils/formatar/FormatarTipo';

export const CategoriaCervejas = ({ produtos, modalIdentificacao, abrirModal, fecharModal, modalVisible }) => {
    const route = useRoute()
    const { numeroMesa } = route.params
    const { adicionarItemCarrinho } = useCarrinho()

    const produtosSection = agruparPorTipo(produtos)
    console.log("CERVEJAS", produtosSection)

    return (
        <TouchableOpacity onPress={abrirModal}>
            <View style={CardStyle.container}>
                <Image
                    style={CardStyle.img}
                    source={require('../../../../assets/cerveja.png')}
                />
                <Text style={CardStyle.txtTipo}>CERVEJAS</Text>
            </View>

            <Modal
                visible={modalVisible && modalIdentificacao === 'cerveja'}
                onRequestClose={fecharModal}
                animationType="slide"
                transparent={true}
            >
                <View style={ModalStyle.conteudoModal}>
                    <View style={LinhaStyle.linhaHorizontal} />
                    <Text style={ModalStyle.tituloModal}>CERVEJAS</Text>
                    <View style={LinhaStyle.linhaHorizontal} />

                    <SectionList
                        sections={produtosSection}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={ModalStyle.containerProp}>
                                <View style={ModalStyle.viewTipo}>
                                    <Text style={ModalStyle.txtTipo}>{formatarTipoProduto(item.tipoProduto)}</Text>

                                </View>
                                <View style={ModalStyle.viewNome}>
                                    <Text style={ModalStyle.txtProp}>{item.nomeProduto}</Text>
                                </View>

                                <View style={ModalStyle.viewValor}>
                                    <Text style={ModalStyle.txtValor}>R$: {item.precoProdutoFormatado}</Text>
                                </View>


                                {numeroMesa ? (
                                    <TouchableOpacity style={[ModalStyle.BtnAddRemove, { backgroundColor: '#4E9726' }]}
                                        onPress={() => adicionarItemCarrinho(item.id, "Cervejas")}>
                                        <Ionicons name="add-outline" size={25} />
                                    </TouchableOpacity>
                                ) : (
                                    <View style={ModalStyle.BtnAddRemove} />
                                )

                                }

                            </View>
                        )}
                        renderSectionHeader={({ section: { categoria } }) => (
                            <View style={ModalStyle.containerCategoria}>
                                <Text style={ModalStyle.txtCategoria}>{formatarTipoProduto(categoria)}</Text>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />



                    <TouchableOpacity style={ModalStyle.btnModal} onPress={fecharModal}>
                        <Text>FECHAR</Text>

                    </TouchableOpacity>
                </View>

            </Modal>

        </TouchableOpacity>
    )
}