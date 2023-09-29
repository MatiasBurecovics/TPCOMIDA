import { StyleSheet, Text, Alert, Image, Modal, Pressable } from 'react-native';
import { getPlatosById } from '../services/axios.js';
import { useContextState, ActionTypes } from '../../contextState.js';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

export default function Plato({ plato, menu }) {
  const { contextState, setContextState } = useContextState();
  const [modalVisible, setModalVisible] = useState(false);
  const [platoModal, setPlatoModal] = useState();
  const [platoExistente, setPlatoExistente] = useState(false);
  let agregarVisible = false;
  let menuAux = contextState?.menu
  let vegan = 0
  let notVegan = 0
  
  useEffect(() => {
    const platoExiste = menuAux.find((item) => item.id === plato.id);
    if (platoExiste) {
      setPlatoExistente(true);
    } else{
      setPlatoExistente(false)
    }
  }, [plato.id, menuAux]);

  const disponibilidad = () => {
    contextState?.menu.forEach(e => { e?.vegan ? vegan++ : notVegan++ })
    if (vegan == 2 && platoModal.vegan) {  
      agregarVisible = true
      console.log("no podes agregar mas platos veganos")
    } else if (notVegan == 2 && !platoModal.vegan) {
      agregarVisible = true
      console.log("no podes agregar mas platos no veganos")
    }
    if (contextState?.menu.length == 4) {
      agregarVisible = true
    }
  }

  const axiosPlatos = async (itemId) => {
    await getPlatosById(itemId)
      .then((res) => {
        menuAux.push(res)
        const platoExiste = menuAux.find((item)=>item.id === res.id)
        if (platoExiste){
          setPlatoExistente(true)
        }
        
      })
      .catch(() => {
        Alert.alert("Fallo la busqueda de plato")
      });
  }

  const addPlato = () => {
   

    if (platoExistente){
      setContextState({
        type: ActionTypes.AddPlato,
        value: menuAux
      });
    } else{
      console.log('ya existe este plato en el menu')
    }
      
    
   
      
  };

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }} >
        <SafeAreaView style={styles.modal}>
          <Image
            style={styles.image}
            source={{ uri: platoModal?.image  }}
          />
          <Text style={styles.textChico}>Nombre: {platoModal?.title} </Text>
          <Text style={styles.textChico}>Precio: {platoModal?.pricePerServing} </Text>
          <Text style={styles.textChico}>Vegetariano: {platoModal?.vegetarian ? 'si' : 'no'} </Text>
          <Text style={styles.textChico}>Vegano: {platoModal?.vegan ? 'si' : 'no'} </Text>
          <Text style={styles.textChico}>Preparado en: {platoModal?.readyInMinutes} minutos </Text>
          <Text style={styles.textChico}>Gluten free: {platoModal?.glutenFree ? 'si' : 'no'} </Text>
          <Text style={styles.textChico}>Nv saludable: {platoModal?.healthScore} </Text>

          <Pressable
            style={styles.press}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textPress}>Cerrar</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>

      {menu ?
        <>
          <SafeAreaView style={styles.resultados}>
            <Text style={styles.textChico}>{plato?.title} </Text>
            <Text style={styles.buttonText}>Detalle</Text>
            <TouchableOpacity
            
              style={styles.input}
              title="Detalle"
              onPress={() => {
                setPlatoModal(plato)
                setModalVisible(true);
              }}
            />
              <Text style={styles.buttonText}>Eliminar</Text>
            <TouchableOpacity
              style={styles.input}
              title="Eliminar"
              onPress={() => {
                setContextState({
                  type: ActionTypes.DelPlato,
                  value: plato.id
                });
              }}
            />
          </SafeAreaView>
        </>
        :
        <>
          <SafeAreaView style={styles.resultados}>
            <Text style={styles.textChico}>{plato?.title} </Text>
            <Text style={styles.buttonText}>
              {platoExistente ? 'Ya esta en el menu' : 'Agregar'}
            </Text>
            <TouchableOpacity
              style={styles.input}
              title="Agregar"
              disabled={agregarVisible || platoExistente} // Disable if already in menu
              onPress={() => {
                disponibilidad();
                if (!agregarVisible && !platoExistente) {
                  axiosPlatos(plato.id);
                  addPlato();
                }
              }}
            />
            <Text style={styles.buttonText}>Detalle</Text>
            <TouchableOpacity
              style={styles.input}
              title="Detalle"
              onPress={async () => {
              
                getPlatosById(plato.id)
                .then((res) => {
                  
                  setPlatoModal(res)
                })
                .catch(() => {
                  Alert.alert("Fallo la busqueda de plato")
                });
            
                setModalVisible(true);
              }}
              
            />
          </SafeAreaView>
        </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: '#FFF', 
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: 200, 
    borderRadius: 10,
    marginBottom: 15,
  },
  textChico: {
    fontSize: 16,
    color: '#000000', 
    marginBottom: 5,
    textAlign: 'center',
  },
  press: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FF6347', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPress: {
    fontSize: 18,
    color: '#FFF', 
  },
  resultados: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FF6347', 
    color: '#FFF', 
  },
  

  buttonText: {
    color: 'white', 
    fontSize: 16, 
  },
});
