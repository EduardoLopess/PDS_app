import { StyleSheet } from "react-native";

export default MesaStyle = StyleSheet.create({
    container: {
        width: 100,
        height: 160,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'relative',
        margin: 5,
    },

    txtNumero: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'

    },

    mesaNumero: {
        position: 'absolute',
        bottom: 0,
        left : 0,
        right: 0,
        top: 4
    },


    imgContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10

    },

    img: {
        width: '80%',
        height: '70%',
        justifyContent: 'center',
        resizeMode: 'contain',

    },

    containerStatus: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: 30,
        bottom: 0,
        left: 0,
        right: 0 
    },

    textStatus: {
        color: 'white',
        fontWeight: 'bold'
    }
})