import { useEffect, useState } from "react"
import ToastStyle from './style'
import { View, Text } from "react-native"

export const Toast = () => {

    const [toast, setToast] = useState('sucess')
    
    
    useEffect(() => {

    },[])
    
   

    const Toast = (titulo, texto) => {
        if(toast === 'sucess') {
            return (
                <View style = {ToastStyle.container}>
                    <View style = {[ToastStyle.faixa, {backgroundColor: '#32CD32'}]}/>
                    <View style = {ToastStyle.containerConteudo}>
                        <View style = {ToastStyle.containerTitulo}> 
                            <Text style = {[ToastStyle.txtTitulo, {color: '#32CD32'}]}>SUCESSO!</Text>
                        </View>
                        <View style = {ToastStyle.containerDescricao}>
                            <Text style = {ToastStyle.txtConteudo}>Item adcionado  ao carrinho!</Text>
                        </View>
                    </View>
                </View>
            )
        }
        if(toast === 'error') {
            return (
                <View style = {ToastStyle.container}>
                        <View style = {[ToastStyle.faixa, {backgroundColor: '#DC143C'}]}/>
                    <View style = {ToastStyle.containerConteudo}>
                        <View style = {ToastStyle.containerTitulo}> 
                            <Text style = {[ToastStyle.txtTitulo, {color: '#DC143C'}]}>REMOVIDO!</Text>
                        </View>
                        <View style = {ToastStyle.containerDescricao}>
                            <Text style = {ToastStyle.txtConteudo}>Item removido!</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }

    return(
        <>
            {Toast()}
        </>
    )
}