import { TouchableOpacity , View, Text, Image, Modal, SectionList, FlatList, StyleSheet, Alert } from 'react-native'
import CardStyle from '../stylesCategoria/CardStyle'
import ModalStyle from '../stylesCategoria/ModalStyle'
import LinhaStyle from '../stylesCategoria/LinhaStyle'
import { AlaminutaData } from '../../../../data/AlaminutaData'
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../../../contexts/CarrinhoContext'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'



export const CategoriaAlaminuta = ({ modalIdentificacao, abrirModal, fecharModal, modalVisible }) => {
    const route = useRoute()
    const { numero } = route.params
    const [modalAdicionalVisivel, setModalAdicionalVisivel] = useState(false)
    const [itemId, setItemId] = useState()
   

    const { addItemCarrinho, addAlaminutaCarrinho } = useCarrinho()

    const abrirModalAdicional = (id) => {
        setItemId(id)
        setModalAdicionalVisivel(true)
    }

    const fecharModalAdicional = () => setModalAdicionalVisivel(false)
    
    const adicionais = AlaminutaData.find(item => item.categoria === 'Adicionais').data
   

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
                    text: 'NAO',
                    onPress: () => addItemCarrinho(id, "Alaminuta")
                }
            ],
            { cancelable: true }
        )
    }

 
    
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
                        sections={AlaminutaData.filter(section => section.categoria !== 'Sabores')}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, section }) => (
                            <View style={ModalStyle.containerProp}>
                                <View style={ModalStyle.viewNome}>
                                    <Text style={ModalStyle.txtProp}>{item.nome}</Text>
                                </View>
                                {/* onPress={() => addItemCarrinho(item.id, "Alaminuta")}> */}
                                <View style={ModalStyle.viewValor}>
                                    <Text style={ModalStyle.txtValor}>{`R$: ${item.valor.toFixed(2).replace('.', ',')}`}</Text>
                                </View>

                                {numero && section.categoria != 'Adicionais' ? (
                                    <TouchableOpacity style={[ModalStyle.BtnAddRemove, { backgroundColor: '#4E9726' }]}
                                        onPress={() => Alerta(item.id)}>

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


                <Modal
                    visible={modalAdicionalVisivel}
                    onRequestClose={fecharModalAdicional}
                    animationType='slide'
                    transparent={true}
                >
                    <View style={styleModalAdicional.modalContainer}>
                        <View style={styleModalAdicional.containerAdicional}>
                            <Text style={styleModalAdicional.txtTitle}>ADICIONAIS</Text>
                        </View>
                        <FlatList
                            data={adicionais}
                            renderItem={({ item }) => (
                                <View style={styleModalAdicional.container}>

                                    <View style={styleModalAdicional.containerNome}>
                                        <Text style={styleModalAdicional.text}>{item.nome}</Text>
                                    </View>
                                    <View style={styleModalAdicional.containerValor}>
                                        <Text style={styleModalAdicional.text}>{`R$: ${item.valor.toFixed(2).replace('.', ',')}`}</Text>
                                    </View>
                                    <View style={styleModalAdicional.containerBtn}>
                                        <TouchableOpacity style={[ModalStyle.BtnAddRemove, { backgroundColor: '#4E9726' }]} onPress={() => {addAlaminutaCarrinho(item.id, itemId)}}>
                                            <Ionicons name="add-outline" size={30} />

                                        </TouchableOpacity>
                                    </View>


                                </View>
                            )}

                        />
                        <TouchableOpacity style={styleModalAdicional.btn} onPress={fecharModalAdicional}>
                            <Text>FECHAR</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>




            </Modal>


        </TouchableOpacity>

    )


}

const styleModalAdicional = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        height: '48%',
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

    container: {
        backgroundColor: '#4169E1',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 2,

    },

    text: {
        fontSize: 18,
        color: 'white'

    },
    txtTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C5C0C0',
        width: 120,
        height: 50,
        borderRadius: 15,
        marginBottom: 10

    },
    containerAdicional: {
        backgroundColor: '#4169E1',
        width: 140,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10


    },

    containerNome: {
        width: "40%"

    },
    containerValor: {
        width: "40%"


    },

    containerBtn: {
        width: "20%"

    }
})


