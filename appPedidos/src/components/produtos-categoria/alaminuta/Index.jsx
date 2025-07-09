import { TouchableOpacity, View, Text, Image, Modal, SectionList, Alert } from 'react-native'
import CardStyle from '../stylesCategoria/CardStyle'
import ModalStyle from '../stylesCategoria/ModalStyle'
import LinhaStyle from '../stylesCategoria/LinhaStyle'
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../../../contexts/CarrinhoContext'
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { agruparPorTipo } from '../../../utils/filtragem-produtos/AgruparProdutos'
import { getAdicionais } from '../../../services/adicionais-service/AdicionalService'
import { formatarTipoProduto } from '../../../utils/formatar/FormatarTipo'

export const CategoriaAlaminuta = ({ produtos, modalIdentificacao, abrirModal, fecharModal, modalVisible }) => {
    const route = useRoute()
    const { numeroMesa } = route.params
    const [modalAdicionalVisivel, setModalAdicionalVisivel] = useState(false)
    const [adicionaisData, setAdicionaisData] = useState([])
    const [adicionaisSelecionados, setAdicionaisSelecionados] = useState({})
    const [itemId, setItemId] = useState(null);

    const produtosSection = agruparPorTipo(produtos)
    const { adicionarItemCarrinho, adicionarAdicionalCarrinho, setAdicionaisDataContext } = useCarrinho()

    useEffect(() => {
        getAdicionais()
            .then(res => setAdicionaisData(res.data.data))
            .catch(err => console.log("Erro ao buscar os adicionais.", err))
    }, [])



    const adicionaisSection = {
        categoria: 'Adicionais',
        data: adicionaisData.map(adc => ({
            ...adc,
            tipoProduto: 'Adicional',
            nomeProduto: adc.adicionalNome,
            precoProdutoFormatado: adc.precoAdicionalFormatado
        }))
    }

    const secoesFinal = [...produtosSection, adicionaisSection]

    // Abrir modal adicionais e limpar seleção anterior
    const abrirModalAdicional = (id) => {
        setItemId(id)
        setAdicionaisSelecionados({})
        setModalAdicionalVisivel(true)
    }

    const buscarProdutoPorId = (id) => {
        for (const secao of secoesFinal) {
            const produto = secao.data.find(p => p.id === id);
            if (produto) {
                console.log("PRODUTO ACHADO -> ", produto);
                return produto;
            }
        }
        console.log("Produto não encontrado");
        return null;
    }



    const fecharModalAdicional = () => {
        const adicionaisSelecionadosArray = Object.entries(adicionaisSelecionados).map(([id, quantidade]) => {
            const adicional = adicionaisData.find(adc => adc.id === Number(id));
            return {
                ...adicional,
                quantidade
            };
        });

        const produtoSelecionado = buscarProdutoPorId(itemId);

        if (!produtoSelecionado) {
            console.warn("Produto selecionado não encontrado.");
            return;
        }

        const item = {
            ...produtoSelecionado,
            adicionais: adicionaisSelecionadosArray
        };

        adicionarAdicionalCarrinho(item);
        setModalAdicionalVisivel(false);
        setAdicionaisSelecionados({});
    }



    // Incrementa quantidade do adicional selecionado
    const adicionarAdicional = (id) => {
        setAdicionaisSelecionados(prev => {
            const current = prev[id] || 0
            return { ...prev, [id]: current + 1 }
        })
    }

    // Decrementa quantidade do adicional selecionado
    const removerAdicional = (id) => {
        setAdicionaisSelecionados(prev => {
            const current = prev[id] || 0
            if (current <= 1) {
                const { [id]: _, ...rest } = prev // remove o id se quantidade for 1 ou menos
                return rest
            }
            return { ...prev, [id]: current - 1 }
        })
    }

    const Alerta = (id) => {
        Alert.alert(
            'ADICIONAL?',
            '',
            [
                {
                    text: 'SIM',
                    onPress: () => abrirModalAdicional(id),
                    style: 'cancel'
                },
                {
                    text: 'NÃO',
                    onPress: () => adicionarItemCarrinho(id)
                }
            ],
            { cancelable: true }
        )
    }

    // Seção adicionais para SectionList


    return (
        <TouchableOpacity onPress={abrirModal}>
            <View style={CardStyle.container}>
                <Image
                    style={CardStyle.img}
                    source={require('../../../../assets/refeicao.png')}
                />
                <Text style={CardStyle.txtTipo}>À LA MINUTA</Text>
            </View>

            <Modal
                visible={modalVisible && modalIdentificacao === 'alaminuta'}
                onRequestClose={fecharModal}
                animationType='slide'
                transparent={true}
            >
                <View style={ModalStyle.conteudoModal}>
                    <View style={LinhaStyle.linhaHorizontal} />
                    <Text style={ModalStyle.tituloModal}>À LA MINUTA</Text>
                    <View style={LinhaStyle.linhaHorizontal} />

                    <SectionList
                        sections={secoesFinal}
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
                                    item.tipoProduto === 'Adicional' ? (
                                        item.disponibilidadeAdicional !== false ? (
                                            <TouchableOpacity
                                                style={[ModalStyle.BtnAddRemove, { backgroundColor: '#4E9726' }]}
                                                onPress={() => {
                                                    // Só adiciona diretamente adicionais aqui se quiser, mas no seu fluxo só no modal
                                                }}
                                            >
                                                <Ionicons name="add-outline" size={25} />
                                            </TouchableOpacity>
                                        ) : (
                                            <View style={[ModalStyle.BtnAddRemove, { justifyContent: 'center', alignItems: 'center' }]}>
                                                <Ionicons name="close-outline" size={25} color="red" />
                                            </View>
                                        )
                                    ) : (
                                        item.disponibilidadeProduto !== false ? (
                                            <TouchableOpacity
                                                style={[ModalStyle.BtnAddRemove, { backgroundColor: '#4E9726' }]}
                                                onPress={() => Alerta(item.id)}
                                            >
                                                <Ionicons name="add-outline" size={25} />
                                            </TouchableOpacity>
                                        ) : (
                                            <View style={[ModalStyle.BtnAddRemove, { justifyContent: 'center', alignItems: 'center' }]}>
                                                <Ionicons name="close-outline" size={25} color="red" />
                                            </View>
                                        )
                                    )
                                ) : (
                                    <View style={ModalStyle.BtnAddRemove} />
                                )}
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

                {/* Modal adicionais */}
                <Modal
                    visible={modalAdicionalVisivel}
                    onRequestClose={fecharModalAdicional}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={ModalStyle.conteudoModal}>
                        <View style={LinhaStyle.linhaHorizontal} />
                        <Text style={ModalStyle.tituloModal}>ADICIONAIS</Text>
                        <View style={LinhaStyle.linhaHorizontal} />

                        {adicionaisData.length === 0 ? (
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum adicional disponível.</Text>
                        ) : (
                            adicionaisData.map(item => {
                                const quantidade = adicionaisSelecionados[item.id] || 0
                                return (
                                    <View
                                        key={item.id}
                                        style={[
                                            ModalStyle.containerProp,
                                            quantidade > 0 && { backgroundColor: '#d0f0c0' }
                                        ]}
                                    >
                                        <View style={ModalStyle.viewTipo}>
                                            <Text style={ModalStyle.txtTipo}>Adicional</Text>
                                        </View>
                                        <View style={ModalStyle.viewNome}>
                                            <Text style={ModalStyle.txtProp}>{item.adicionalNome}</Text>
                                        </View>
                                        <View style={ModalStyle.viewValor}>
                                            <Text style={ModalStyle.txtValor}>{item.precoAdicionalFormatado}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                                            {item.disponibilidadeAdicional === false ? (
                                                <Ionicons name="close-outline" size={25} color="red" />
                                            ) : (
                                                <>
                                                    <TouchableOpacity
                                                        onPress={() => removerAdicional(item.id)}
                                                        disabled={quantidade === 0}
                                                    >
                                                        <Ionicons
                                                            name="remove-circle-outline"
                                                            size={25}
                                                            color={quantidade > 0 ? 'red' : 'gray'}
                                                        />
                                                    </TouchableOpacity>

                                                    <Text style={{ minWidth: 20, textAlign: 'center' }}>{quantidade}</Text>

                                                    <TouchableOpacity onPress={() => adicionarAdicional(item.id)}>
                                                        <Ionicons name="add-circle-outline" size={25} color="green" />
                                                    </TouchableOpacity>
                                                </>
                                            )}
                                        </View>
                                    </View>
                                )
                            })
                        )}

                        <TouchableOpacity style={ModalStyle.btnModal} onPress={fecharModalAdicional}>
                            <Text>FECHAR</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Modal>
        </TouchableOpacity>
    )
}
