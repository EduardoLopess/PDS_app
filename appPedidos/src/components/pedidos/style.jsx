import { StyleSheet } from "react-native"

export default PedidoStyle = StyleSheet.create({
    container: {
       
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center'
        
       
        
    },

    viewMesa: {
        width: "25%",
        alignItems: 'center'

    },

    viewHr: {
        width: '25%',
        alignItems: 'start'

    },

    viewTotal: {
        
        width: "40%",
        alignItems: 'start'
    },

    divisao: {
        height: "90%",
        width: 1,
        backgroundColor: 'black'

    },

    txt: {
        fontSize: 17

    },


    //MODAL

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
        zIndex: 5,
        position: 'relative'

    },

    containerBtn: {
        flexDirection: 'row',
        bottom: 0,
        position: 'absolute'

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
    }

   

    
   

    
})
