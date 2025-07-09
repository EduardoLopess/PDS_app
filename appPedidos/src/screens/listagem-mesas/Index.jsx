import { TouchableWithoutFeedback, View, Keyboard, Image, TextInput, TouchableOpacity, Text, ActivityIndicator } from "react-native"
import { useCallback, useEffect, useState } from "react"
import { useFocusEffect } from '@react-navigation/native';

import ListaMesaStyle from "./style"
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import { Mesa } from "../../components/mesa/Index";

import { getMesas } from "../../services/mesas-service/MesaService";
import { usePedido } from "../../contexts/PedidoContext";
import { useApiRequest } from "../../contexts/apiRequestContext";

export const MesasScreen = () => {
     const [termoBusca, setTermoBusca] = useState('')
     const [statusFiltro, setStatusFiltro] = useState(null)
     const { mesaData, carregarMesas } = useApiRequest()
     console.log("MESADATA -> ", mesaData)

     useFocusEffect(
          useCallback(() => {
               carregarMesas()
          }, [])
     )

     const filtrarData = mesaData.filter((item) => {
          if (termoBusca && !item.numeroMesa.toString().includes(termoBusca)) {
               return false;
          }
          if (statusFiltro !== null && item.statusMesa !== statusFiltro) {
               return false;
          }
          return true;
     })

     const btnStatusFiltro = (status) => {
          setStatusFiltro(status)
     }

     return (

          <View style={ListaMesaStyle.container}>
               <View style={ListaMesaStyle.containerBtn}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                         <View style={ListaMesaStyle.buscarBtn}>
                              <Ionicons name="search" size={35} />
                              <TextInput
                                   style={ListaMesaStyle.textInput}
                                   placeholder="Ex: 1"
                                   keyboardType="numeric"
                                   value={termoBusca}
                                   onChangeText={(text) => setTermoBusca(text)}
                              />
                         </View>
                    </TouchableWithoutFeedback>


                    {statusFiltro === null ? (
                         <>
                              <TouchableOpacity
                                   style={[ListaMesaStyle.btnStyle, { backgroundColor: '#4E9726' }]}
                                   onPress={() => btnStatusFiltro(false)}
                              >
                                   <Text style={ListaMesaStyle.textBtn}>LIVRES</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                   style={[ListaMesaStyle.btnStyle, { backgroundColor: '#E90000' }]}
                                   onPress={() => btnStatusFiltro(true)}
                              >
                                   <Text style={ListaMesaStyle.textBtn}>OCUPADAS</Text>
                              </TouchableOpacity>
                         </>
                    ) : (
                         <TouchableOpacity
                              style={[ListaMesaStyle.btnStyle, { backgroundColor: '#4169E1' }]}
                              onPress={() => btnStatusFiltro(null)}
                         >
                              <Text style={ListaMesaStyle.textBtn}>TODAS</Text>
                         </TouchableOpacity>
                    )}

               </View>

               <ScrollView>
                    <View style={ListaMesaStyle.containerLista}>
                         {filtrarData
                              .sort((a, b) => a.numeroMesa - b.numeroMesa)
                              .map((mesa) => (
                                   <Mesa
                                        key={mesa.id}
                                        id={mesa.id}
                                        numero={mesa.numeroMesa}
                                        status={mesa.statusMesa}
                                   />
                              ))
                         }
                    </View>

               </ScrollView>
          </View>
     )
}
