import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { CategoriaDrink } from "../../components/produtos-categoria/drinks/Index";
import { CategoriaCervejas } from "../../components/produtos-categoria/cervejas/Index";
import { CategoriaPasteis } from "../../components/produtos-categoria/pasteis/Index";
import { CategoriaPorcoes } from "../../components/produtos-categoria/porcoes/Index";
import { CategoriaSemAlcool } from "../../components/produtos-categoria/sem-alcool/Index";
import { CategoriaAlaminuta } from "../../components/produtos-categoria/alaminuta/Index";
import { useState } from "react";



export const  ProdutosScreen = () => {
    const route = useRoute()
    const {numero} = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [modalIdentificacao, setModalIdentificacao] = useState(null)

    const abrirModal = (identificacao) => {
        setModalIdentificacao(identificacao)
        setModalVisible(true)
        console.log(identificacao)

    }

    const fecharModal = () => {
        setModalVisible(false)
        setModalIdentificacao(null)
    }

    return (
        <View style = {styles.container}>
            { numero && (
                <View style = {styles.containerTable}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{`MESA: ${numero}`}</Text>
                </View>
            )}

            <View style = {styles.containerConteudo}>
                <CategoriaDrink
                    abrirModal={() => abrirModal('drink')} 
                    fecharModal={fecharModal}
                    modalVisible={modalVisible} 
                    modalIdentificacao={modalIdentificacao}
                 />
                <CategoriaCervejas
                    abrirModal={() => abrirModal('cerveja')} 
                    fecharModal={fecharModal}
                    modalVisible={modalVisible} 
                    modalIdentificacao={modalIdentificacao}
                />
                <CategoriaPasteis
                    abrirModal={() => abrirModal('pasteis')} 
                    fecharModal={fecharModal}
                    modalVisible={modalVisible} 
                    modalIdentificacao={modalIdentificacao}
                 />
                <CategoriaPorcoes
                    abrirModal={() => abrirModal('porcoes')} 
                    fecharModal={fecharModal}
                    modalVisible={modalVisible} 
                    modalIdentificacao={modalIdentificacao}
                 />
                <CategoriaSemAlcool
                    abrirModal={() => abrirModal('semAlcool')} 
                    fecharModal={fecharModal}
                    modalVisible={modalVisible} 
                    modalIdentificacao={modalIdentificacao}
                 />
                <CategoriaAlaminuta
                    abrirModal={() => abrirModal('alaminuta')} 
                    fecharModal={fecharModal}
                    modalVisible={modalVisible} 
                    modalIdentificacao={modalIdentificacao}
                 />

            </View>

            

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5C0C0',
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 30
        
    },

    containerConteudo: {
        alignContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 85
    },

    containerTable: {
        backgroundColor: 'white',
        height: 50,
        width: 100,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
});