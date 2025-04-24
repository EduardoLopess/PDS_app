import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState, useContext } from "react";
import ToastManager, { Toast } from "toastify-react-native";
import { Alert } from "react-native";
import MesaData from "../../data/MesaData";
import { CervejaData } from "../../data/CervejaData";
import SemAlcoolData from "../../data/SemAlcoolData";
import PasteisData from "../../data/PasteisData";
import { AlaminutaData } from "../../data/AlaminutaData";
import PorcoesData from "../../data/PorcoesData";
import { DrinkData } from "../../data/DrinkData";
import { usePedido } from "./PedidoContext";


const carrinhoContext = createContext()

export const CarrinhoProvider = ({ children }) => {
    const { criarPedido, editarPedido } = usePedido()
    const navigation = useNavigation()
    const [itemCarrinho, setItemCarrinho] = useState([])
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false)
    const [numeroMesa, setNumeroMesa] = useState({})
    const [totalItens, setTotalItens] = useState()
    const [mesa, setMesa] = useState(MesaData)
    

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
        const mesaValida = mesa.find(mesa => mesa.id === id)
        const mesaOcupada = mesaValida.status
        const mesaAtual = mesaValida ? mesaValida.numero : null;
       
        
        if(mesaOcupada === true){
            Alert.alert('MESA OCUPADA')
            editarPedido(id)
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

    const finalizarPedido = (numeroMesa) => {
        const mesaNumero = numeroMesa.numero  
        const mesaId = mesa.find(item => item.numero === mesaNumero).id
        const attMesa = (mesaId) => {
            const novaMesa = mesa.map(mesa => 
                mesa.id === mesaId ? {...mesa, status: !mesa.status} : mesa
            )
            setMesa(novaMesa)
        }
        attMesa(mesaId)
        criarPedido(itemCarrinho, numeroMesa, mesaId, totalItens )
        setItemCarrinho([])
        setNumeroMesa('')
        navigation.navigate('MESAS')
        
    }



    const cancelarPedido = () => {
        setItemCarrinho([])
        Alert.alert("PEDIDO CANCELADO!")
        navigation.navigate('MESAS')
       
    }

    //ADD SABOR CAIPIRRINHA
    const addSaborDrink = (idSabor, idDrink) => {
        const drink = DrinkData.map(categoria => categoria.data)
            .flat()
            .find(item => item.id === idDrink)
        
        const saborData = DrinkData.find(item => item.categoria === "Sabores").data
        const sabor = saborData.find(item => item.id === idSabor)

        const drinkSabor = {
            id: drink.id,
            nome: drink.nome,
            tipo: drink.tipo,
            valor: drink.valor,
            sabor: sabor.nome,
            idSabor: sabor.id,
          } 

        setItemCarrinho(prevCarrinho => {
            const itemPresente = prevCarrinho
                .find(item => item.id === idDrink && item.idSabor === idSabor)

            if(itemPresente) {
                console.log("ITEM PRESENTE")
                return prevCarrinho.map(drinkSabor => 
                    drinkSabor.id === idDrink && drinkSabor.idSabor === idSabor
                    ? {...drinkSabor, qtd: itemPresente.qtd + 1}
                    : drinkSabor
                )
            } else {
                const itemParaCarrinho = { ...drinkSabor, qtd: 1 }
                console.log("SÓ MOSTRANDO, SEM ADICIONAR:", itemParaCarrinho)
                return [...prevCarrinho, itemParaCarrinho]
            }

        })
        Toast.success("ITEM ADICIONADO! ")  

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

        const adcAlaminuta = {
            id: item.id,
            tipo: item.tipo,
            nome: item.nome,
            valor: item.valor,
            adicional: [adicional]
        }

        setItemCarrinho(prevCarrinho => {
            const itemPresente = prevCarrinho.find(
                item => item.id === itemId && adicional.id === idAdicional
            )
            
            if(itemPresente){
                return prevCarrinho.map(item => {
                    if (item.id === itemId) {
                        const atualizado = {
                            ...item,
                            qtd: item.qtd + 1,
                            adicional: [...item.adicional, adicional]
                        };
                        console.log("Adicionais atualizados:", JSON.stringify(atualizado.adicional, null, 2));
                        return atualizado;
                    }
                    return item;
                });
            }else{
                const adicional = {...adcAlaminuta, qtd: 1}
                console.log("Adicional", JSON.stringify(adicional, null, 2));

                return [...prevCarrinho, adicional]
            }
        })
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
        // Toast.success("ITEM ADICIONADO! ")
        Toast.show({
            type: 'success',  
            text2: 'Item adicionado!',
            useModal: true,
            visibilityTime: 700
          })
        
    
    }

    //REMOVE ITENS
    const removerItem = (id, categoria, idSabor) => {
        if (idSabor) {
            setItemCarrinho(prevCarrinho => {
                const itemPresente = prevCarrinho.find(item => item.id === id && item.idSabor === idSabor);
    
                if (itemPresente) {
                    if (itemPresente.qtd > 1) {
                        return prevCarrinho.map(drinkSabor =>
                            drinkSabor.id === id && drinkSabor.idSabor === idSabor
                                ? { ...drinkSabor, qtd: drinkSabor.qtd - 1 }
                                : drinkSabor
                        );
                    } else {
                        return prevCarrinho.filter(drinkSabor =>
                            drinkSabor.id !== id || drinkSabor.idSabor !== idSabor
                        );
                    }
                } else {
                    return prevCarrinho;
                }
            });
        } else {
            setItemCarrinho(prevCarrinho => {
                const itemPresente = prevCarrinho.find(itemCarrinho => itemCarrinho.id === id && itemCarrinho.categoria === categoria);
    
                if (itemPresente) {
                    if (itemPresente.qtd > 1) {
                        return prevCarrinho.map(itemCarrinho =>
                            itemCarrinho.id === id && itemCarrinho.categoria === categoria
                                ? { ...itemCarrinho, qtd: itemCarrinho.qtd - 1 }
                                : itemCarrinho
                        );
                    } else {
                       
                        return prevCarrinho.filter(itemCarrinho =>
                            itemCarrinho.id !== id || itemCarrinho.categoria !== categoria
                        );
                    }
                }
    
                return prevCarrinho; 
            });
        }
    
        Toast.show({
            type: 'error',  
            text2: 'ITEM DELETADO!',
            useModal: true,
            visibilityTime: 1000
          })
    };
    
    
    
    
    


    return (
        <carrinhoContext.Provider value={{
            iniciarPedido,
            cancelarPedido,
            finalizarPedido,
            addItemCarrinho,
            addSaborDrink,
            addAlaminutaCarrinho,
            carrinhoVisivel,
            itemCarrinho,
            numeroMesa,
            removerItem,
            totalItens,
            mesa

        }}>
            {children}

        </carrinhoContext.Provider>
    )

}

export const useCarrinho = () => useContext(carrinhoContext)