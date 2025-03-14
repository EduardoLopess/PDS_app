import { TouchableWithoutFeedback, View, Keyboard, Image, TextInput, TouchableOpacity, Text } from "react-native"
import { useEffect, useState } from "react"
import ListaMesaStyle from "./style"
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import { Mesa } from "../../components/mesa/Index";
import MesaData from "../../../data/MesaData";
import { Toast } from "../../utils/notificacao/toast/Index";

export const MesasScreen = () => {
     const data = MesaData
     const [termoBusca, setTermoBusca] = useState('')
     const [statusFiltro, setStatusFiltro] = useState(null)
     
     // Filtro
     const filtrarData = data.filter((item) => {
          if (termoBusca && !item.numero.toString().includes(termoBusca)) {
               return false
          } 
          if (statusFiltro !== null && item.status !== statusFiltro) {  
               return false
          }

          return true
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
                         {filtrarData.map((mesa) => (
                              <Mesa
                                   key={mesa.id}
                                   id={mesa.id}
                                   numero={mesa.numero}
                                   status={mesa.status}
                              />
                         ))}
                    </View>
               </ScrollView>
          </View>
     )
}
