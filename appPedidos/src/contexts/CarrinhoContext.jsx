import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState, useContext } from "react";

import 'react-native-get-random-values';
import { Toast } from 'toastify-react-native';

import { nanoid } from "nanoid";
import { useApiRequest } from "./apiRequestContext";




const carrinhoContext = createContext()

export const CarrinhoProvider = ({ children }) => {

    const {mesaData} = useApiRequest()

    const navigation = useNavigation()
    const [itemCarrinho, setItemCarrinho] = useState([])
    const [carrinhoVisivel, setCarrinhoVisivel] = useState(false)
    const [totalItens, setTotalItens] = useState()
    
    const [mesa, setMesa] = useState()

    // dados API para 
    const [produtosContext, setProdutosContext] = useState([])
    const [saboresContext, setSaboresContext] = useState([])


    useEffect(() => {
        setMesa(mesaData)
    }, [mesa])

    useEffect(() => {
        if (itemCarrinho.length === 0) {
            setCarrinhoVisivel(false)

        } else {
            setCarrinhoVisivel(true)
            console.log(itemCarrinho)
        }
        console.log("ESTADO DA MESA NO CARRINHO: ", mesa)


        const parsePreco = (preco) => Number(String(preco).replace(',', '.')) || 0;

        const total = itemCarrinho.reduce((acc, item) => {
            const precoItem = parsePreco(item.preco);
            const precoAdicionais = (item.adicionais || []).reduce((soma, adc) => {
                return soma + parsePreco(adc.precoAdicional || adc.valor) * (adc.quantidade || adc.qtd || 1);
            }, 0);
            return acc + (precoItem + precoAdicionais) * item.qtd;
        }, 0);

        setTotalItens(total)
    }, [itemCarrinho])


    const adicionarItemCarrinho = (produtoId) => {
        if (!Array.isArray(produtosContext) || produtosContext.length === 0)
            return

        const produto = produtosContext.find(p => p.id === produtoId)

        if (!produto) {
            console.warn('Produto não encontrado no context')
            return
        }

        setItemCarrinho(prevCarrinho => {
            const produtoPresenteCarrinho = prevCarrinho.find(
                item => item.id === produtoId && (!item.adicionais || item.adicionais.length === 0)
            );

            if (produtoPresenteCarrinho) {
                return prevCarrinho.map(item =>
                    item.id === produtoId && (!item.adicionais || item.adicionais.length === 0)
                        ? { ...item, qtd: item.qtd + 1 }
                        : item
                );
            } else {
                return [...prevCarrinho, {
                    idUnico: nanoid(8),
                    id: produto.id,
                    nome: produto.nomeProduto,
                    preco: produto.precoProdutoFormatado,
                    tipo: produto.tipoProduto,
                    qtd: 1,
                    adicionais: [],
                    adicionaisKey: '',
                }];
            }
        })
        Toast.show({
            type: 'success',
            text2: 'Item adicionado!',
            useModal: true,
            visibilityTime: 1000
        });

    }

    const adicionarDrinkSaborCarrinho = (idSabor, idDrink) => {
        console.log("DRINK, ", idDrink)
        console.log("Sabor, ", idSabor)

        const drink = produtosContext.find(p => p.id === idDrink)
        console.log("DRINK", drink)
        const sabor = saboresContext.find(s => s.id === idSabor)
        console.log("SABOR, ", sabor)



        const drinkSabor = {
            idUnico: nanoid(8),
            id: drink.id,
            nome: drink.nomeProduto,
            tipo: drink.tipoProduto,
            preco: drink.precoProdutoFormatado,
            sabor: sabor.nomeSabor,
            idSabor: sabor.id

        }

        setItemCarrinho(prevCarrinho => {
            const itemPresente = prevCarrinho
                .find(item => item.id === idDrink && item.idSabor === idSabor)

            if (itemPresente) {
                return prevCarrinho.map(drinkSabor =>
                    drinkSabor.id === idDrink && drinkSabor.idSabor === idSabor
                        ? { ...drinkSabor, qtd: itemPresente.qtd + 1 }
                        : drinkSabor
                )
            } else {
                const itemParaCarrinho = { ...drinkSabor, qtd: 1 }
                return [...prevCarrinho, itemParaCarrinho]
            }


        })

        Toast.show({
            type: 'success',
            text2: 'Item adicionado!',
            useModal: true,
            visibilityTime: 700
        });


    }

    const adicionarAdicionalCarrinho = (item) => {
        console.log("ITEM FUNC: ", item)
        setItemCarrinho(prevCarrinho => {
            const adicionaisKey = Array.isArray(item.adicionais)
                ? item.adicionais
                    .map(adc => `${adc.id}-${adc.quantidade || 1}`)
                    .sort()
                    .join(',')
                : '';

            const itemExistente = prevCarrinho.find(carrinhoItem =>
                carrinhoItem.id === item.id &&
                carrinhoItem.adicionaisKey === adicionaisKey
            );

            if (itemExistente) {
                // Soma qtd do item e também soma as quantidades dos adicionais
                const novosAdicionais = itemExistente.adicionais.map(adcExistente => {
                    const adcNovo = item.adicionais.find(a => a.id === adcExistente.id);
                    if (adcNovo) {
                        return {
                            ...adcExistente,
                            quantidade: (adcExistente.quantidade || 1) + (adcNovo.quantidade || 1)
                        };
                    }
                    return adcExistente;
                });

                return prevCarrinho.map(carrinhoItem =>
                    carrinhoItem.id === item.id && carrinhoItem.adicionaisKey === adicionaisKey
                        ? {
                            ...carrinhoItem,
                            qtd: carrinhoItem.qtd + 1,
                            adicionais: novosAdicionais
                        }
                        : carrinhoItem
                );
            } else {
                const novoItem = {
                    idUnico: nanoid(8),
                    id: item.id,
                    nome: item.nomeProduto,
                    preco: item.precoProdutoFormatado,
                    tipo: item.tipoProduto,
                    adicionais: item.adicionais,
                    adicionaisKey,
                    qtd: 1
                };
                return [...prevCarrinho, novoItem];
            }
        });

        Toast.show({
            type: 'success',
            text2: 'Item adicionado!',
            useModal: true,
            visibilityTime: 700
        });
    }


    const removerItemCarrinho = (idUnico) => {
        setItemCarrinho(prevCarrinho => {
            const updatedCarrinho = prevCarrinho.map(item => {
                if (item.idUnico !== idUnico) return item;

                if (item.qtd > 1) {
                    return { ...item, qtd: item.qtd - 1 };
                } else {
                    return null;
                }
            }).filter(Boolean);

            Toast.show({
                type: 'error',
                text2: 'ITEM DELETADO!',
                useModal: true,
                visibilityTime: 1000
            });

            return updatedCarrinho;
        });
    };


    const finalizarPedido = (numeroMesa) => {
        const mesaNumero = numeroMesa.numero
        const mesaId = mesa.find(item => item.numero === mesaNumero).id
        const attMesa = (mesaId) => {
            const novaMesa = mesa.map(mesa =>
                mesa.id === mesaId ? { ...mesa, status: !mesa.status } : mesa
            )
            setMesa(novaMesa)
        }
        attMesa(mesaId)
        criarPedido(itemCarrinho, numeroMesa, mesaId, totalItens)
        setItemCarrinho([])
        setMesa('')
        navigation.navigate('MESAS')

    }

    const removerAdicionalDoItemCarrinho = (produtoId, adicionalId, adicionaisKey) => {
        setItemCarrinho(prevCarrinho => {
            return prevCarrinho.map(item => {
                if (item.id !== produtoId) return item;
                if ((item.adicionaisKey || '') !== (adicionaisKey || '')) return item; // só altera o item com a chave correta

                if (!item.adicionais || item.adicionais.length === 0) return item;

                const adicionalPresente = item.adicionais.find(adicional => adicional.id === adicionalId);

                if (adicionalPresente) {
                    let novosAdicionais;

                    if (adicionalPresente.quantidade > 1) {
                        novosAdicionais = item.adicionais.map(adicional =>
                            adicional.id === adicionalId
                                ? { ...adicional, quantidade: adicional.quantidade - 1 }
                                : adicional
                        );
                    } else {
                        novosAdicionais = item.adicionais.filter(adicional => adicional.id !== adicionalId);
                    }

                    const novosAdicionaisKey = novosAdicionais.length > 0
                        ? novosAdicionais.map(a => `${a.id}-${a.quantidade}`).sort().join(',')
                        : '';

                    return {
                        ...item,
                        adicionais: novosAdicionais,
                        adicionaisKey: novosAdicionaisKey,
                    };
                }

                return item;
            });
        });

        Toast.show({
            type: 'error',
            text2: 'Adicional removido!',
            useModal: true,
            visibilityTime: 1000
        })
    };





    return (
        <carrinhoContext.Provider value={{
            setProdutosContext,
            adicionarItemCarrinho,
            setSaboresContext,
            adicionarDrinkSaborCarrinho,
            adicionarAdicionalCarrinho,
            removerItemCarrinho,
            removerAdicionalDoItemCarrinho,
            setCarrinhoVisivel,



            finalizarPedido,
            setItemCarrinho,
            carrinhoVisivel,
            itemCarrinho,


            totalItens,
            mesa

        }}>
            {children}

        </carrinhoContext.Provider>
    )

}

export const useCarrinho = () => useContext(carrinhoContext)