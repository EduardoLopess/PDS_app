import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavegacaoInferior } from "./src/navigation/navegacao-Inferior/Index"
import { NavigationContainer } from "@react-navigation/native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MesasScreen } from "./src/screens/listagem-mesas/Index"
import { ProdutosScreen } from "./src/screens/listagem-produtos/Index"
import { PedidosScreen } from "./src/screens/listagem-pedidos/Index"
import { CarrinhoCompras } from "./src/components/carrinho-compras/Index"
import { CarrinhoProvider, useCarrinho } from "./src/contexts/CarrinhoContext"
import { PedidoProvider } from "./src/contexts/PedidoContext"
import ToastManager, { Toast } from "toastify-react-native";
import { useEffect } from "react"
import * as NavigationBar from 'expo-navigation-bar';
import { Audio } from 'expo-av';
import { NotifierWrapper } from "react-native-notifier"
import { onPedidoAtualizado, onNovaNotificacao, startConnection } from "./src/services/signalrServices/SignalrService";
import { ApiRequestProvider } from "./src/contexts/apiRequestContext"




const Tab = createBottomTabNavigator()

const CarrinhoHeader = () => {
  const { carrinhoVisivel } = useCarrinho()

  if (!carrinhoVisivel) return null

  return <CarrinhoCompras />
}

export default function App() {



  useEffect(() => {
    async function hideNavBar() {
      await NavigationBar.setVisibilityAsync('hidden');
    }
    hideNavBar();
  }, []);

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: false,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_DUCK, // <- aqui
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false, // <- isso impede baixar o volume
      playThroughEarpieceAndroid: false,
    });
  }, []);


  return (


    <ApiRequestProvider>
      <ToastManager />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <NotifierWrapper>
            <CarrinhoProvider>
              <PedidoProvider>
                <Tab.Navigator lazy={true} tabBar={() => <NavegacaoInferior />}
                  screenOptions={{
                    headerTitleAlign: 'center',
                    headerRight: () => <CarrinhoHeader />
                  }}
                >
                  <Tab.Screen name="MESAS" component={MesasScreen}
                    options={{ headerTitle: 'MESAS' }} />
                  <Tab.Screen name="PRODUTOS" component={ProdutosScreen}
                    options={{ headerTitle: 'PRODUTOS' }} />
                  <Tab.Screen name="PEDIDOS" component={PedidosScreen}
                    options={{ headerTitleAlign: 'center', headerTitle: 'PEDIDOS' }} />
                </Tab.Navigator>
              </PedidoProvider>
            </CarrinhoProvider>
          </NotifierWrapper>
        </NavigationContainer>

      </GestureHandlerRootView>
    </ApiRequestProvider>

  );

}