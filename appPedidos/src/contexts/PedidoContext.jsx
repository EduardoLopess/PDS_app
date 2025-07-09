import { useNavigation } from "@react-navigation/native";
import { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { Toast } from 'toastify-react-native';
import { useCarrinho } from "./CarrinhoContext";
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { buscarPedidoPorMesa, getPedidoId, postPedido, putPedido } from "../services/pedidos-service/PedidoService";
import { useApiRequest } from "./apiRequestContext";

const pedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
    const { mesaData = [] } = useApiRequest(); //FONTE DE DADOS DA MESA
    const { setItemCarrinho, carrinhoVisivel, itemCarrinho, setCarrinhoVisivel, total } = useCarrinho();
    const navigation = useNavigation();

    const [pedidoAtual, setPedidoAtual] = useState(null);
    const [pedidoData, setPedidoData] = useState([]);
    const [numeroMesaContext, setNumeroMesa] = useState(null);


    const iniciarPedido = (mesaId) => {
        if (!mesaData || mesaData.length === 0) {
            Alert.alert("Dados das mesas ainda não carregados.");
            return;
        }

        const mesaValida = mesaData.find(m => m.id === mesaId);
        if (!mesaValida) {
            Alert.alert('FALHA AO INICIAR O PEDIDO');
            return;
        }
        if (mesaValida.statusMesa === true) {
            Alert.alert('Mesa já está OCUPADA');
            return;
        }
        if (carrinhoVisivel && itemCarrinho.length > 0 && mesaValida.numeroMesa !== numeroMesaContext?.numero) {
            Alert.alert('Pedido em andamento na', `MESA ${numeroMesaContext?.numero}`);
            return;
        }

        setNumeroMesa({ numero: mesaValida.numeroMesa, id: mesaValida.id });
        navigation.navigate('PRODUTOS', { numeroMesa: mesaValida.numeroMesa });

        Notifier.showNotification({
            title: 'PEDIDO INICIADO',
            description: `Mesa ${mesaValida.numeroMesa}`,
            Component: NotifierComponents.Alert,
            duration: 3000,
            showAnimationDuration: 300,
            hideOnPress: true,
        });
    };

    const mesaLivre = (mesaId) => {
        if (!mesaData || mesaData.length === 0) return;

        const mesa = mesaData.find(m => m.id === mesaId);
        if (!mesa) {
            Notifier.showNotification({
                title: 'Falha!, mesa não encontrada.',
                Component: NotifierComponents.Alert,
                duration: 3000,
                showAnimationDuration: 300,
            });
            return;
        }

        if (mesa.statusMesa) {
            Alert.alert(
                'Mesa ocupada',
                'Deseja editar o pedido',
                [
                    { text: 'Não', style: 'cancel' },
                    { text: 'Sim, editar', onPress: () => editarPedidoPorMesa(mesaId) }
                ]
            );
        } else {
            Alert.alert(
                'Iniciar pedido?',
                `Mesa ${mesa.numeroMesa}`,
                [
                    { text: 'Não', style: 'cancel' },
                    { text: 'Sim', onPress: () => iniciarPedido(mesaId) }
                ]
            );
        }
    };

    const editarPedidoPorMesa = async (mesaId) => {
        try {
            const resposta = await buscarPedidoPorMesa(mesaId);
            const pedido = resposta.data;
            
            if (pedido?.id) {
                await editarPedido(pedido.id);
                navigation.navigate('PRODUTOS', { numeroMesa: pedido.mesa.numeroMesa });
                console.log('PEDIDO.', pedido)

            } else {
                Notifier.showNotification({
                    title: 'Pedido não encontrado para edição',
                    Component: NotifierComponents.Alert,
                    alertType: 'error'
                });
            }
        } catch {
            Notifier.showNotification({
                title: '❌ FALHA!',
                description: 'Erro ao buscar pedido.',
                Component: NotifierComponents.Alert,
                componentProps: {
                    alertType: 'error',
                    titleStyle: { fontSize: 20, fontWeight: 'bold' },
                    descriptionStyle: { fontSize: 17 },
                },
            });
        }
    };

    const cancelarPedido = () => {
        setItemCarrinho([]);
        setNumeroMesa({ id: null, numero: null });
        navigation.navigate('MESAS');

        Notifier.showNotification({
            title: '❌ CANCELADO!',
            description: 'Pedido foi cancelado.',
            Component: NotifierComponents.Alert,
            componentProps: {
                alertType: 'error',
                titleStyle: { fontSize: 20, fontWeight: 'bold' },
                descriptionStyle: { fontSize: 17 },
            },
        });
    };

    // cria ou atualiza pedido local e chama API
    const criarOuAtualizarPedido = async (itensCarrinho, numeroMesa, idMesa, totalItens) => {
        const agora = new Date();
        const hora = agora.getHours().toString().padStart(2, '0');
        const minutos = agora.getMinutes().toString().padStart(2, '0');
        const horaAtual = `${hora}:${minutos}`;

        const pedidoObj = {
            idMesa,
            numeroMesa,
            itens: itensCarrinho,
            total: totalItens,
            hora: horaAtual,
        };

        try {
            // Chama API para criar ou atualizar
            if (pedidoAtual) {
                // atualizar
                await putPedido(pedidoAtual, pedidoObj);

                // Atualiza localmente pedidoData com o pedido editado
                setPedidoData(prev => prev.map(p => (p.id === pedidoAtual ? { ...p, ...pedidoObj } : p)));
            } else {
                // criar novo pedido
                const response = await postPedido(pedidoObj);
                const pedidoCriado = response.data;

                setPedidoData(prev => [...prev, pedidoCriado]);
                setPedidoAtual(pedidoCriado.id);
            }

            Notifier.showNotification({
                title: '✅ Pedido salvo com sucesso',
                description: `Mesa ${numeroMesa}`,
                Component: NotifierComponents.Alert,
                duration: 3000,
            });

            setItemCarrinho([]);
            setCarrinhoVisivel(false);
            setNumeroMesa(null);
            navigation.navigate('MESAS');

        } catch (error) {
            Toast.fire({ icon: 'error', title: 'Erro ao salvar o pedido.' });
            console.error("PEDIDO_CONTEXT_DEBUG: erro ao criar/atualizar pedido", error);
        }
    };


    const finalizarPedido = async () => {
        try {

            if (!numeroMesaContext?.id) {
                console.error("finalizarPedido foi chamado sem uma mesa selecionada.");
                return false;
            }

            const { id: mesaId } = numeroMesaContext;

            const itensArray = itemCarrinho.map(item => ({
                produtoId: item.id,
                qtd: item.qtd,
                adicionalIDs: item.adicionais?.map(adc => adc.id) || [],
                saborDrinkId: item.idSabor || null
            }));

            // Monta o objeto (payload) do pedido
            const pedidoPayload = {
                mesaId,
                dateTime: new Date().toISOString(),
                itens: itensArray
            };

            // Lógica para decidir entre ATUALIZAR (PUT) ou CRIAR (POST)
            if (pedidoAtual) {
                await putPedido(pedidoAtual, pedidoPayload);
            } else {
                await postPedido(pedidoPayload);
            }

            // Limpa todo o estado APENAS se a API retornar sucesso
            setItemCarrinho([]);
            setNumeroMesa(null);
            setCarrinhoVisivel(false);
            setPedidoAtual(null);
            navigation.navigate('MESAS');

            Notifier.showNotification({
                title: '✅ Pedido salvo com sucesso',
                Component: NotifierComponents.Alert,
                duration: 3000,
            });

            return true;


        } catch (error) {
            // Se qualquer parte do processo falhar, o erro é capturado aqui
            console.error("ERRO AO FINALIZAR PEDIDO (Contexto):", error);
            return false; // Retorna FALHA
        }
    };




    const editarPedido = async (idPedido) => {
        if (itemCarrinho.length > 0 && numeroMesaContext?.id && pedidoAtual !== idPedido) {
            Toast.fire({
                icon: 'error',
                title: `Finalize o pedido da mesa ${numeroMesaContext.numero || ''} ou cancele.`,
            });
            return;
        }

        try {
            const response = await getPedidoId(idPedido);
            const pedido = response.data.data;
            const numeroMesa = pedido.numeroMesa;

            setItemCarrinho([]);

            const itensConvertidos = pedido.itens
                .filter(item => item != null && item.produto)  // filtra itens inválidos
                .map((item) => {
                    const adicionaisKey = item.adicionais?.length > 0
                        ? item.adicionais.map(ad => `${ad.id}-${ad.quantidade || 1}`).sort().join(',')
                        : '';

                    return {
                        id: item.produtoId,
                        numeroMesa,
                        nome: item.produto.nomeProduto,
                        preco: item.produto.precoProdutoFormatado,
                        qtd: item.qtd,
                        categoria: item.produto.categoriaProduto,
                        tipo: item.produto.tipoProduto,
                        adicionais: item.adicionais?.map(ad => ({
                            id: ad.id,
                            adicionalNome: ad.adicionalNome,
                            preco: ad.precoAdicional,
                            precoAdicionalFormatado: ad.precoAdicionalFormatado,
                            quantidade: ad.quantidade || 1,
                        })),
                        sabor: item.saborDrink?.nomeSabor || null,
                        saborDrinkId: item.idSabor?.id || null,
                        idSabor: item.saborDrink?.id || null,
                        adicionaisKey,
                        idUnico: `${item.produtoId}-${adicionaisKey}`
                    };
                })
                .filter(item => item != null); // remove nulls que podem ter retornado no map

            setPedidoAtual(pedido.id);
            setItemCarrinho(itensConvertidos);
            setNumeroMesa({ id: pedido.mesaId, numero: numeroMesa });
            setCarrinhoVisivel(true);

            Notifier.showNotification({
                title: '✅ Edição Iniciada',
                description: `Mesa ${numeroMesa}`,
                Component: NotifierComponents.Alert,
                duration: 3000,
            });

        } catch (err) {
            Toast.fire({ icon: 'error', title: 'Erro ao buscar pedido para edição.' });
            console.error("PEDIDO_CONTEXT_DEBUG:", err);
        }
    };


    return (
        <pedidoContext.Provider value={{
            iniciarPedido,
            finalizarPedido,
            criarOuAtualizarPedido,
            cancelarPedido,
            editarPedido,
            numeroMesaContext,
            mesaLivre,
            pedidoData,
        }}>
            {children}
        </pedidoContext.Provider>
    );
};

export const usePedido = () => useContext(pedidoContext);
