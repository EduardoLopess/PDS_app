import { StyleSheet } from "react-native";

export default CarrinhoStyle = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },

    itemContainer:{
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
        
    },

    viewNome: {
        width: '35%',
        justifyContent: 'flex-start',
        
    },

    viewTipo: {
        width: '20%',
        alignItems: 'center',
        
        
    },

    txtTipo: {
        fontSize: 12
    },

    viewValor: {
        width: '20%', 
        justifyContent: 'center', 
    },

    viewQtd: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
        

    },

    viewBtn: {
        width: '10%', 
        alignItems: 'flex-end', 
    },

    BtnAddRemove: {
        marginHorizontal: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnAdicionais: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: "center",
        marginRight: 5,
        flexDirection: 'row'
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

    txtTotal: {
        fontSize: 30,
        fontWeight: 'bold'
    },

    btnContainer: {
        flexDirection: 'row'
    },


    containerAdc: {
        flexDirection: 'row',
        
    }
})
