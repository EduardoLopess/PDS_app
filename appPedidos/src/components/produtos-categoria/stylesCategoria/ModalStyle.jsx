import { StyleSheet } from "react-native";

export default ModalStyle = StyleSheet.create({
    conteudoModal: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 10,
        width: '100%',
        maxHeight: '95%',
        overflow: 'scroll',
        paddingTop: 20,
        zIndex: 5
    },

    tituloModal: {
        fontSize: 30,
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
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
    },

    containerProp: {
        flexDirection: 'row',
        backgroundColor: '#C5C0C0',
        width: '100%',
        height: 55,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 5,
        alignItems: 'center',
    },

    containerCategoria: {
        backgroundColor: '#4169E1',
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        alignSelf: 'center',
    },

    txtCategoria: {
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
        color: 'white',
        fontWeight: 'bold',
    },

    viewNome: {
        width: '30%',
        justifyContent: 'flex-start', 
    },

    viewTipo: {
        width: '20%',
        alignItems: 'center'
    },

    viewValor: {
        width: '30%', 
        justifyContent: 'center', 
    },
   

    viewButton: {
        width: '20%', 
        alignItems: 'flex-end', 
    },

    txtProp: {
        fontSize: 17,
        marginHorizontal: 5,
    },

    txtValor: {
        fontSize: 18,
        textAlign: 'right', 
    },

    BtnAddRemove: {
        marginHorizontal: 10,
        width: 55,
        height: 32,
        alignItems: 'center',
    },
});
