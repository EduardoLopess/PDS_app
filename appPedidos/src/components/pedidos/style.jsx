import { StyleSheet } from "react-native"

export default PedidoStyle = StyleSheet.create({
    container: {
       
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 10
        
       
        
    },

  
  
    txtPropSabor: {
        textAlign: 'center'

    },


    viewMesa: {
        width: "25%",
        paddingStart: 10

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
        fontSize: 15

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
    },

    itemContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    
    viewNomeProp: {
        width: '33%',
        justifyContent: 'flex-start',
        
        
    },

    viewTipoProp: {
        width: '20%',
        alignItems: 'center',
        
        
    },

    viewValorProp: {
        width: '20%', 
        justifyContent: 'center',
        marginRight: 10 
    },

    viewQtdProp: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
        

    },

    txtTipoProp: {
        fontSize: 12
    },

    txtProp: {
        fontSize: 17,
        marginHorizontal: 4,
    },

    txtTipo: {
        fontSize: 15
    },

    containerTotal: {
        width: "80%",
        height: "10%",
        alignItems: 'center',
        marginBottom: 50

    },

    txtTotal: { 
        fontSize: 30,
        fontWeight: 'bold'

    }
   


    
   

    
})
