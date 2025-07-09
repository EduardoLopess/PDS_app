import { FlatList, Image, Modal, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CardStyle from "../stylesCategoria/CardStyle"
import { Ionicons } from '@expo/vector-icons';
import LinhaStyle from "../stylesCategoria/LinhaStyle"
import ModalStyle from "../stylesCategoria/ModalStyle"

import { useRoute } from "@react-navigation/native";
import { useCarrinho } from "../../../contexts/CarrinhoContext";
import { DrinkData } from "../../../../data/DrinkData";
import { useEffect, useState } from "react";
import { agruparPorTipo } from "../../../utils/filtragem-produtos/AgruparProdutos";
import { getSabores } from "../../../services/sabores-service/SaborService";
import { formatarTipoProduto } from "../../../utils/formatar/FormatarTipo";


export const CategoriaDrink = ({ produtos, modalIdentificacao, abrirModal, fecharModal, modalVisible }) => {
    const route = useRoute()
    const { numeroMesa } = route.params
    const { addItemCarrinho, adicionarItemCarrinho, adicionarDrinkSaborCarrinho, addSaborDrink, setSaboresContext } = useCarrinho()
    const [modalSaboresVisivel, setModalSaboresVisivel] = useState(false)

    const [saboresData, setSaboresData] = useState([])
    const [idDrinkState, setIdDrinkState] = useState('')
    const produtosSection = agruparPorTipo(produtos)


    useEffect(() => {
        if (modalVisible && modalIdentificacao === 'drink') {
            getSabores()
                .then(res => {
                    console.log("Resposta API SABOR: ", res.data)
                    setSaboresData(res.data.data)
                    setSaboresContext(res.data.data)
                })
                .catch(err => console.error("Erro ao buscar sabores. ", err))
        }
    }, [modalVisible, modalIdentificacao])


    const abrir = () => {
        setModalSaboresVisivel(true)
    }


    const tipoDrink = (idDrink) => {
        
        const todosProdutos = produtosSection.flatMap(categoria => categoria.data);
        const produto = todosProdutos.find(item => item.id === idDrink);

        if (!produto) {
            console.log("Produto não encontrado");
            return;
        }

        if (produto.tipoProduto === 'Caipirinha') {
            console.log("É CAIPIRINHA");
            setIdDrinkState(idDrink)
            setModalSaboresVisivel(true)
        } else {
            adicionarItemCarrinho(idDrink)
        }
    };


    // const tipoDrink = (id) => {
    //     const tipo = produtosSection.find(categoria => categoria.data.some(item => item.id === id))

    //     console.log(tipo.categoria)

    //     if (tipo.categoria === "Caipirinhas") {
    //         setItemID(id)
    //         setModalSaboresVisivel(true)
    //     } else {
    //         addItemCarrinho(id, "Drink")
    //     }
    // }

    const fechar = () => setModalSaboresVisivel(false)


    return (
        <TouchableOpacity onPress={abrirModal}>
            <View style={CardStyle.container}>
                <Image
                    style={CardStyle.img}
                    source={require('../../../../assets/drink.png')}
                />
                <Text style={CardStyle.txtTipo}>DRINKS</Text>
            </View>


            <Modal
                visible={modalVisible && modalIdentificacao === 'drink'}
                onRequestClose={fecharModal}
                animationType="slide"
                transparent={true}
            >
                <View style={ModalStyle.conteudoModal}>
                    <View style={LinhaStyle.linhaHorizontal} />
                    <Text style={ModalStyle.tituloModal}>DRINKS</Text>
                    <View style={LinhaStyle.linhaHorizontal} />

                    <SectionList
                        sections={produtosSection.filter(section => section.categoria !== 'Sabores')}
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
                                {/* () => addItemCarrinho(item.id, "Drink") */}
                                {numeroMesa ? (
                                    <TouchableOpacity style={[ModalStyle.BtnAddRemove, { backgroundColor: '#4E9726' }]} onPress={() => tipoDrink(item.id)}>
                                        <Ionicons name="add-outline" size={25} />
                                    </TouchableOpacity>
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

                <Modal
                    visible={modalSaboresVisivel}
                    onRequestClose={fechar}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styleModalSabores.modalContianer}>
                        <View style={styleModalSabores.containerSabor}>
                            <Text style={styleModalSabores.txtTitle}>SABORES</Text>
                        </View>

                        <FlatList
                            data={saboresData}
                            renderItem={({ item }) => (
                                <View style={styleModalSabores.container}>
                                    <View style={styleModalSabores.containerNome}>
                                        <Text style={styleModalSabores.txtProp}>{item.nomeSabor}</Text>
                                    </View>
                                    <View style={styleModalSabores.containerDisponivel}>
                                        <Text style={styleModalSabores.txtProp}>{item.disponivel}</Text>
                                    </View>
                                    <View style={styleModalSabores.containerBtnAdd}>
                                        <TouchableOpacity style={styleModalSabores.btnAdd} onPress={() => adicionarDrinkSaborCarrinho(item.id, idDrinkState)}>
                                            <Ionicons name="add-outline" size={30} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            )}


                        />
                        <TouchableOpacity style={styleModalSabores.btnModal} onPress={fechar}>
                            <Text>FECHAR</Text>
                        </TouchableOpacity>

                    </View>




                </Modal>

            </Modal>

        </TouchableOpacity>
    )
}

const styleModalSabores = StyleSheet.create({
    modalContianer: {
        backgroundColor: 'white',
        height: '40%',
        width: '90%',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 0.5,
        marginTop: '7%',
        paddingTop: 20,
        marginHorizontal: '5%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },

    containerSabor: {
        backgroundColor: '#4169E1',
        width: 140,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

    txtTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

    container: {
        backgroundColor: '#4169E1',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 2
    },

    containerNome: {
        width: '50%',
        paddingLeft: 10

    },

    containerBtnAdd: {
        widt: "50%"
    },

    txtProp: {
        fontSize: 18,
        color: 'white'
    },

    btnAdd: {
        marginHorizontal: 10,
        width: 60,
        height: 32,
        alignItems: 'center',
        backgroundColor: '#4E9726'
    },

    btnModal: {
        backgroundColor: '#C5C0C0',
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
    }

})