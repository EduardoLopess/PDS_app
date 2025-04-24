import { Image, TouchableOpacity, View, Text, Modal, SectionList } from 'react-native'
import CardStyle from '../stylesCategoria/CardStyle'
import ModalStyle from '../stylesCategoria/ModalStyle'
import LinhaStyle from '../stylesCategoria/LinhaStyle'
import { Ionicons } from '@expo/vector-icons';


import SemAlcoolData from '../../../../data/SemAlcoolData'
import { useRoute } from '@react-navigation/native';
import { useCarrinho } from '../../../contexts/CarrinhoContext';


export const CategoriaSemAlcool = ({ modalIdentificacao, abrirModal, fecharModal, modalVisible }) => {
    const route = useRoute()
    const { numero } = route.params
    const { addItemCarrinho } = useCarrinho()

    
    return (
        <TouchableOpacity onPress={abrirModal}>
            <View style={CardStyle.container}>
                <Image
                    style={CardStyle.img}
                    source={require('../../../../assets/noalcool.png')}
                />
                <Text style={CardStyle.txtTipo}>SEM ÁLCOOL</Text>
            </View>

            <Modal
                visible={modalVisible && modalIdentificacao === 'semAlcool'}
                onRequestClose={fecharModal}
                animationType='slide'
                transparent={true}
            >
                <View style={ModalStyle.conteudoModal}>
                    <View style={LinhaStyle.linhaHorizontal} />
                    <Text style={ModalStyle.tituloModal}>SEM ÁLCOOL</Text>
                    <View style={LinhaStyle.linhaHorizontal} />

                    <SectionList
                        sections={SemAlcoolData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={ModalStyle.containerProp}>
                                <View style={ModalStyle.viewTipo}>
                                    <Text style={ModalStyle.txtPropTipo}>{item.tipo}</Text>
                                </View>
                                
                                <View style={ModalStyle.viewNome}>
                                    <Text style={ModalStyle.txtProp}>{item.nome}</Text>
                                </View>

                                <View style={ModalStyle.viewValor}>
                                    <Text style={ModalStyle.txtValor}>{`R$: ${item.valor.toFixed(2).replace('.', ',')}`}</Text>
                                </View>

                                {numero ? (
                                    <TouchableOpacity style={[ModalStyle.BtnAddRemove, {backgroundColor: '#4E9726'}]} onPress={() => addItemCarrinho(item.id, "SemAlcool")}>
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
                    <TouchableOpacity style = {ModalStyle.btnModal} onPress={fecharModal}>
                        <Text>FECHAR</Text>
                    </TouchableOpacity>

                </View>




            </Modal>

        </TouchableOpacity>
    )
}