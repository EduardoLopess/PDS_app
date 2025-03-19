import { useNavigation } from "@react-navigation/native"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"


export const NavegacaoInferior = () => {
    const navigation = useNavigation()

    return (
        <View style = {styles.container}>
            <TouchableOpacity  style = {styles.containerNav} onPress={() => navigation.navigate('PRODUTOS' , { id: null })}>
                <View style = {styles.containerNav}>
                    <Image
                        style = {styles.imgNav}
                        source = {require('../../../assets/produtos.png')}
                    />
                    <Text style = {styles.textNav}>PRODUTOS</Text>
                </View>
            </TouchableOpacity>
 
            <View style = {styles.div}/>
              
            <TouchableOpacity  style = {styles.containerNav} onPress={() => navigation.navigate('MESAS')}> 
                <View style = {styles.containerNav}>
                    <Image
                        style = {styles.imgNav}
                        source = {require('../../../assets/mesa.png')}
                    />
                    <Text style = {styles.textNav}>MESAS</Text>

                </View>
            </TouchableOpacity>

            <View style = {styles.div}/>

            <TouchableOpacity style = {styles.containerNav} onPress={() => navigation.navigate('PEDIDOS')}>
                <View style = {styles.containerNav}>
                    <Image
                        style = {styles.imgNav}
                        source = {require('../../../assets/pedidos.png')}
                    />
                    <Text style = {styles.textNav}>PEDIDOS</Text>

                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 83,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 10000,
        bottom: 0,
        left: 0,
        right: 0
    },

    div: {
        backgroundColor: 'black',
        height: 70,
        width: 1,
        
    },

    imgNav: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
        
    },

    containerNav: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        flex: 1   
    },

    textNav: {
        paddingTop: 4
    }
})
