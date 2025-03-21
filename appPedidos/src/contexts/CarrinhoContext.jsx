import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState, useContext } from "react";
import { Alert } from "react-native";
import MesaData from "../../data/MesaData";
import { CervejaData } from "../../data/CervejaData";
import SemAlcoolData from "../../data/SemAlcoolData";
import PasteisData from "../../data/PasteisData";
import { AlaminutaData } from "../../data/AlaminutaData";
import PorcoesData from "../../data/PorcoesData";
import { DrinkData } from "../../data/DrinkData";


const carrinhoContext = createContext()

export const CarrinhoProvider = ({ children }) => {
 
    const navigation = useNavigation()
    const [itemCarrinho, setItemCarrinho] = useState([])
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false)
    const [numeroMesa, setNumeroMesa] = useState({})
    const [totalItens, setTotalItens] = useState()
    const [mesaStatus, setMesaStatus] = useState('')

    useEffect(() => {
        if (itemCarrinho.length === 0) {
            setCarrinhoVisivel(false)

        } else {
            setCarrinhoVisivel(true)
            console.log(itemCarrinho)
        }
        
        const total = itemCarrinho.reduce((acc, item) => {
            return acc + item.valor * item.qtd;
        }, 0);

        setTotalItens(total)
    }, [itemCarrinho])

    


    const iniciarPedido = (id) => {
        const mesaValida = MesaData.find(mesa => mesa.id === id)
        const mesaOcupada = mesaValida.status
        const mesaAtual = mesaValida ? mesaValida.numero : null;
        console.log("Numero mesa:", numeroMesa.numero)


        if(mesaOcupada === true){
            Alert.alert('MESA OCUPADA')
            return
        }


        if(carrinhoVisivel === true && itemCarrinho.length > 0 && mesaAtual != numeroMesa.numero){
            Alert.alert('Pedido em andamento na ', `MESA ${numeroMesa.numero}`);
            return
        }

        if(mesaAtual === numeroMesa.numero){
            navigation.navigate('PRODUTOS', { numero: mesaValida.numero })
        }else if (mesaValida) {
            navigation.navigate('PRODUTOS', { numero: mesaValida.numero })
            setNumeroMesa({ numero: mesaValida.numero })
        } 

    }

    const finalizarPedido = () => {
        console.log("PEDIDO FINALIZADO")
        setItemCarrinho([])
        navigation.navigate('PEDIDOS')
        
    }

    const cancelarPedido = () => {
        setItemCarrinho([])
        Alert.alert("PEDIDO CANCELADO!")
        navigation.navigate('MESAS')
       
    }

    

    //ADD Alaminuta
    const addAlaminutaCarrinho = (idAdicional, itemId) => {
       
        const item = AlaminutaData
            .map(categoria => categoria.data)
            .flat()
            .find(item => item.id === itemId)
        
         const itemAdicional = AlaminutaData.
            find(item => item.categoria === 'Adicionais').data  

        const adicional = itemAdicional
            .find(adicional => adicional.id === idAdicional)
       // console.log("Adicional:", adicional, " ALA: ", item)

        const alaAdicional = [{
            alaminuta: item,
            adicional: adicional
            
        }];

        console.log(alaAdicional)

                      
    }

    //ADD item
    const addItemCarrinho = (id, identificacao) => {
        //console.log("ID: ", id, "ident: ", identificacao)
        let itemSelecionado
        switch (identificacao) {
            case "Cervejas":
                itemSelecionado = CervejaData
                    .map(categoria => categoria.data)
                    .flat()
                    .find(item => item.id === id);
                break
            case "Pasteis":
                itemSelecionado = PasteisData
                    .map(categoria => categoria.data)
                    .flat()
                    .find(item => item.id === id)
                break
            case "SemAlcool":
                itemSelecionado = SemAlcoolData
                    .map(categoria => categoria.data)
                    .flat()
                    .find(item => item.id === id)
                break
            case "Porcoes":
                itemSelecionado = PorcoesData
                    .map(categoria => categoria.data)
                    .flat()
                    .find(item => item.id === id)
                break
            case "Alaminuta":
                itemSelecionado = AlaminutaData
                    .map(categoria => categoria.data)
                    .flat()
                    .find(item => item.id === id)
                break
            case "Drink":
                itemSelecionado = DrinkData
                    .map(categoria => categoria.data)
                    .flat()
                    .find(item => item.id === id)
                break
            default:
                return
        }
        console.log("Item selecionado:", itemSelecionado);

        setItemCarrinho(prevCarrinho => {
            const itemPresente = prevCarrinho
                .find(item => item.id === id && item.categoria === identificacao);
        
            if (itemPresente) {
                return prevCarrinho.map(item =>
                    item.id === id && item.categoria === identificacao
                        ? { ...item, qtd: item.qtd + 1 }
                        : item
                );
            } else {
                return [...prevCarrinho, { 
                    ...itemSelecionado, qtd: 1, categoria: identificacao 
                }];
            }
            
        });
    
    }

    const removerItem = (id, categoria) => {
        setItemCarrinho((prevCarrinho) => {
            const itemPresente = prevCarrinho
                .find(itemCarrinho => itemCarrinho.id === id && itemCarrinho.categoria === categoria);
    
            if (itemPresente) {
                if (itemPresente.qtd > 1) {
                    return prevCarrinho.map(itemCarrinho =>
                        itemCarrinho.id === id && itemCarrinho.categoria === categoria
                            ? { ...itemCarrinho, qtd: itemCarrinho.qtd - 1 }
                            : itemCarrinho
                    );
                } else {
                    return prevCarrinho.filter(itemCarrinho =>
                        !(itemCarrinho.id === id && itemCarrinho.categoria === categoria)
                    );
                }
            }
            
            return prevCarrinho;
        });
        
      
       
    };
    
    
    


    return (
        <carrinhoContext.Provider value={{
            iniciarPedido,
            cancelarPedido,
            finalizarPedido,
            addItemCarrinho,
            addAlaminutaCarrinho,
            carrinhoVisivel,
            itemCarrinho,
            numeroMesa,
            removerItem,
            totalItens

        }}>
            {children}

        </carrinhoContext.Provider>
    )

}

export const useCarrinho = () => useContext(carrinhoContext)