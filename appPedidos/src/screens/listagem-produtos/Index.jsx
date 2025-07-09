import { StyleSheet, View, Text } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { CategoriaDrink } from "../../components/produtos-categoria/drinks/Index";
import { CategoriaCervejas } from "../../components/produtos-categoria/cervejas/Index";
import { CategoriaPasteis } from "../../components/produtos-categoria/pasteis/Index";
import { CategoriaPorcoes } from "../../components/produtos-categoria/porcoes/Index";
import { CategoriaSemAlcool } from "../../components/produtos-categoria/sem-alcool/Index";
import { CategoriaAlaminuta } from "../../components/produtos-categoria/alaminuta/Index";
import { useCallback, useMemo, useState } from "react";
import { getProdutos } from "../../services/produtos-service/ProdutoService";
import { filtrarProdutosPorCategoria } from "../../utils/filtragem-produtos/ProdutosPorCategoria";
import { usePedido } from "../../contexts/PedidoContext";
import { useCarrinho } from "../../contexts/CarrinhoContext";



export const ProdutosScreen = () => {

    const {setProdutosContext} = useCarrinho()
    const route = useRoute()
    const { numeroMesa } = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [modalIdentificacao, setModalIdentificacao] = useState(null)
    const [produtosData, setProdutosData] = useState([])

    useFocusEffect(
        useCallback(() => {
            getProdutos()
                .then(res => {
                    console.log("Resposta api PRODUTOS:", res.data)
                    setProdutosData(res.data.data)
                    setProdutosContext(res.data.data)
                })
                .catch(err => console.error("Erro ao buscar produtos", err))
        }, [])
    )

    const produtosPorCategoria = useMemo(() => {
        return filtrarProdutosPorCategoria(produtosData)
    }, [produtosData])



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
        <View style={styles.container}>
            {numeroMesa && (
                <View style={styles.containerTable}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{`MESA: ${numeroMesa}`}</Text>
                </View>
            )}

            <View style={styles.containerConteudo}>
                <CategoriaDrink
                    abrirModal={() => abrirModal('drink')}
                    produtos={produtosPorCategoria['drink']}
                    fecharModal={fecharModal}
                    modalVisible={modalVisible}
                    modalIdentificacao={modalIdentificacao}
                />
                <CategoriaCervejas
                    produtos={produtosPorCategoria['cerveja']}
                    abrirModal={() => abrirModal('cerveja')}
                    fecharModal={fecharModal}
                    modalVisible={modalVisible}
                    modalIdentificacao={modalIdentificacao}
                />
                <CategoriaPasteis
                    produtos={produtosPorCategoria['pasteis']}
                    abrirModal={() => abrirModal('pasteis')}
                    fecharModal={fecharModal}
                    modalVisible={modalVisible}
                    modalIdentificacao={modalIdentificacao}
                />
                <CategoriaPorcoes
                    produtos={produtosPorCategoria['porcoes']}
                    abrirModal={() => abrirModal('porcoes')}
                    fecharModal={fecharModal}
                    modalVisible={modalVisible}
                    modalIdentificacao={modalIdentificacao}
                />
                <CategoriaSemAlcool
                    produtos={produtosPorCategoria['semalcool']}
                    abrirModal={() => abrirModal('semAlcool')}
                    fecharModal={fecharModal}
                    modalVisible={modalVisible}
                    modalIdentificacao={modalIdentificacao}
                />
                <CategoriaAlaminuta
                    produtos={produtosPorCategoria['alaminuta']}
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