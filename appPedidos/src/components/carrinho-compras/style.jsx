import { StyleSheet } from "react-native";

export default CarrinhoStyle = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },



    itemContainer: {
        width: '100%',
        // height: 55,   // remova a altura fixa para permitir conteúdo dinâmico
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 5,
        paddingVertical: 8, // dê um pouco mais de espaço vertical
        flexWrap: 'wrap',

    },

    viewTipo: {
        width: '15%',
        marginStart: 5,
        alignItems: 'flex-start',
    },

    viewNome: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    viewValor: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    viewQtd: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewBtn: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },


    BtnAddRemove: {
        marginHorizontal: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    mesaIdentificacao: {
        marginBottom: 20,
        maringTop: 20,
        width: 120,
        height: 50,
        backgroundColor: '#4169E1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    mesaTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18

    },


    btn: {
        width: 130,
        padding: 10,
        backgroundColor: '#E90000',
        marginTop: 15,
        marginBottom: 20,
        borderRadius: 5,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    textBtn: {
        fontWeight: 'bold',
        color: 'white',
        textAlignVertical: 'center'

    },

    btnCancelar: {
        marginBottom: 5


    },

    txtBtnCancelar: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },

    totalContainer: {
        width: "80%",
        height: "10%",
        alignItems: 'center',
        marginTop: 20


    },

    btnModalAdicional: {
        flexDirection: "row"
    },

    txtTotal: {
        fontSize: 30,
        fontWeight: 'bold'
    },

    btnContainer: {
        flexDirection: 'row'
    },


    containerAdc: {
        flexDirection: 'row',

    },

    containerAdicionais: {
        width: '100%',
        paddingLeft: 50,  // deixa um recuo para destacar que é "filho" do item
        marginTop: 4,
    },

    adicionalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 2,
    },

})
