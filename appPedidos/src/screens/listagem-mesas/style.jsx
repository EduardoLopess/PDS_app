import { StyleSheet } from "react-native";

export default ListaMesaStyle = StyleSheet.create({
    container: {
        backgroundColor: '#C5C0C0',
        flex: 1,
        
    },

    containerBtn: {
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: "center"  

    },

    buscarBtn: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 120,
        borderRadius: 150,
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 10,
        paddingHorizontal: 10, 

    },

    buscaImg: {
        width: 25,
        height: 25,

    },

    textInput: {
        fontSize: 20,
        paddingVertical: 5,
        marginLeft: 5, 
        flex: 1, 
    },

    btnStyle: {
        color: 'white',
        width: 110,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textBtn: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },

    containerLista: {
        justifyContent: 'center',
        backgroundColor: '#C5C0C0',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        paddingBottom: 100,
    }

})