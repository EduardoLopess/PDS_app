import { Image, Text, TouchableOpacity, View, Modal, SectionList } from 'react-native'
import CardStyle from '../stylesCategoria/CardStyle'
import LinhaStyle from '../stylesCategoria/LinhaStyle'
import ModalStyle from '../stylesCategoria/ModalStyle'
import PorcoesData from '../../../../data/PorcoesData'
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'
import { useCarrinho } from '../../../contexts/CarrinhoContext'
import { agruparPorTipo } from '../../../utils/filtragem-produtos/AgruparProdutos'
import { formatarTipoProduto } from '../../../utils/formatar/FormatarTipo'


export const CategoriaPorcoes = ({ produtos, modalIdentificacao, abrirModal, fecharModal, modalVisible }) => {
    const route = useRoute()
    const { numeroMesa } = route.params
    const { adicionarItemCarrinho } = useCarrinho()

    const produtosSection = agruparPorTipo(produtos)

    return (
        <TouchableOpacity onPress={abrirModal}>
            <View style={CardStyle.container}>
                <Image
                    style={CardStyle.img}
                    source={require('../../../../assets/porcoes.png')}
                />
                <Text style={CardStyle.txtTipo}>PORÇÕES</Text>
            </View>

            <Modal
                visible={modalVisible && modalIdentificacao === 'porcoes'}
                onRequestClose={fecharModal}
                animationType="slide"
                transparent={true}
            >
                <View style={ModalStyle.conteudoModal}>
                    <View style={LinhaStyle.linhaHorizontal} />
                    <Text style={ModalStyle.tituloModal}>PORÇÕES</Text>
                    <View style={LinhaStyle.linhaHorizontal} />

                    <SectionList
                        sections={produtosSection}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={ModalStyle.containerProp}>
                                <View style={ModalStyle.viewTipo}>
                                    <Text style={ModalStyle.txtProp}>{formatarTipoProduto(item.tipoProduto)}</Text>
                                </View>
                                <View style={ModalStyle.viewNome}>
                                    <Text style={ModalStyle.txtProp}>{item.nomeProduto}</Text>
                                </View>

                                <View style={ModalStyle.viewValor}>
                                    <Text style={ModalStyle.txtValor}>{`R$: ${item.precoProdutoFormatado}`}</Text>
                                </View>

                                {numeroMesa ? (
                                    <TouchableOpacity style={[ModalStyle.BtnAddRemove, { backgroundColor: '#4E9726' }]} onPress={() => adicionarItemCarrinho(item.id)}>
                                        <Ionicons name="add-outline" size={25} />
                                    </TouchableOpacity>
                                ) : (
                                    <View style={ModalStyle.BtnAddRemove} />
                                )}
                            </View>
                        )}
                        renderSectionHeader={({ section: { categoria } }) => (
                            <View style={ModalStyle.containerCategoria}>
                                <Text style={ModalStyle.txtCategoria}>{categoria}</Text>
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