import { StyleSheet } from "react-native";

export default ToastStyle = StyleSheet.create({
    container: {
        flex: 0.15,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'green',
        flexDirection: 'row',
        zIndex: 9999999
    },

    faixa: {
        width: "15%",
        height: "100%",
        

    },

    containerConteudo: {
       

    },

    containerDescricao: {
     padding: 10,
     
     flex: 1
        
    },

    containerTitulo: {
        padding: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
       
    },

    txtTitulo: {
        fontSize: 28,
        color: 'green',
        fontWeight: 'bold'
        
    },

    txtConteudo: {
        fontSize: 23
       
         

    }

})