import { TouchableOpacity, View, Text, Image, SectionList, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import CardStyle from '../stylesCategoria/CardStyle'
import ModalStyle from '../stylesCategoria/ModalStyle'
import LinhaStyle from '../stylesCategoria/LinhaStyle'
import { useCarrinho } from '../../../contexts/CarrinhoContext';
import { useRoute } from '@react-navigation/native';
import { agruparPorTipo } from '../../../utils/filtragem-produtos/AgruparProdutos';
import { formatarTipoProduto } from '../../../utils/formatar/FormatarTipo';

export const CategoriaPasteis = ({ produtos, modalIdentificacao, abrirModal, fecharModal, modalVisible }) => {

    const route = useRoute()
    const { numeroMesa } = route.params
    const { adicionarItemCarrinho } = useCarrinho()

    const produtosSection = agruparPorTipo(produtos)
    console.log(" PASTEIS ", produtosSection)

    return (
        <TouchableOpacity onPress={abrirModal}>
            <View style={CardStyle.container}>
                <Image
                    style={CardStyle.img}
                    source={require('../../../../assets/pastel.png')}
                />
                <Text style={CardStyle.txtTipo}>PASTÉIS</Text>
            </View>

            <Modal
                visible={modalVisible && modalIdentificacao === 'pasteis'}
                onRequestClose={fecharModal}
                animationType="slide"
                transparent={true}
            >
                <View style={ModalStyle.conteudoModal}>
                    <View style={LinhaStyle.linhaHorizontal} />
                    <Text style={ModalStyle.tituloModal}>PASTÉIS</Text>
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
                                    <TouchableOpacity style={[ModalStyle.BtnAddRemove, { backgroundColor: '#4E9726' }]} onPress={() => adicionarItemCarrinho(item.id, "Pasteis")}>
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