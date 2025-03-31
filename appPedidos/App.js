import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavegacaoInferior } from "./src/navigation/navegacao-Inferior/Index"
import { NavigationContainer } from "@react-navigation/native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MesasScreen } from "./src/screens/listagem-mesas/Index"
import { ProdutosScreen } from "./src/screens/listagem-produtos/Index"
import { PedidosScreen } from "./src/screens/listagem-pedidos/Index"
import { CarrinhoCompras } from "./src/components/carrinho-compras/Index"
import { CarrinhoProvider } from "./src/contexts/CarrinhoContext"
import { PedidoProvider } from "./src/contexts/PedidoContext"
import ToastManager, { Toast } from "toastify-react-native";


const Tab = createBottomTabNavigator()
export default function App() {
  return (

      <NavigationContainer>
        <ToastManager style={{ zIndex: 999999, position: 'absolute', elevation: 9999999}} />
        <PedidoProvider>
          <CarrinhoProvider>
              <GestureHandlerRootView style = {{flex: 1}}>
                <Tab.Navigator tabBar = {() => <NavegacaoInferior/>}
                  screenOptions = {{
                    headerTitleAlign: 'center',
                    headerRight: () => <CarrinhoCompras/>
                  }}
                >
                <Tab.Screen name="MESAS" component={MesasScreen} 
                  options={{
                    headerTitle: 'MESAS'
                  }}/>

        
                  <Tab.Screen name="PRODUTOS" component={ProdutosScreen} 
                    options={{
                      headerTitle: 'PRODUTOS'
                    }}/>
                          
                  <Tab.Screen name="PEDIDOS" component={PedidosScreen} 
                    options={{
                      headerTitleAlign: 'center',
                      headerTitle: 'PEDIDOS'
                  }}/>

                </Tab.Navigator>
              </GestureHandlerRootView>
          </CarrinhoProvider>
        </PedidoProvider>    
      </NavigationContainer>
      
  
  )
}