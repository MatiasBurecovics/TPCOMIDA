import { StyleSheet, Text, Alert, Image, Modal, Button, Pressable } from 'react-native';
import { getPlatosById } from '../services/axios.js';
import { useContextState, ActionTypes } from '../../contextState.js';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';

export default function Plato({ plato, menu }) {
  const { contextState, setContextState } = useContextState();
  const [modalVisible, setModalVisible] = useState(false);
  const [platoModal, setPlatoModal] = useState();
  let agregarVisible = false;
  let menuAux = contextState?.menu
  let vegan = 0
  let notVegan = 0

  useEffect(async () => {
    await getPlatosById(plato.id)
      .then((res) => {
        setPlatoModal(res)
      })
      .catch(() => {
        Alert.alert("Fallo la busqueda de plato")
      });
  }, [])

  const disponibilidad = () => {
    contextState?.menu.forEach(e => { e?.vegan ? vegan++ : notVegan++ })
    if (vegan == 2 && platoModal.vegan) {  
      agregarVisible = true
    } else if (notVegan == 2 && !platoModal.vegan) {
      agregarVisible = true
    }
    if (contextState?.menu.length == 4) {
      agregarVisible = true
    }
  }

  const axiosPlatos = async (itemId) => {
    await getPlatosById(itemId)
      .then((res) => {
        menuAux.push(res)
      })
      .catch(() => {
        Alert.alert("Fallo la busqueda de plato")
      });
  }

  const addPlato = () => {
    setContextState({
      type: ActionTypes.AddPlato,
      value: menuAux
    });
  }

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
            source={{ uri: platoModal?.image ?? 'https://dclgroup.com.ar/wp-content/themes/unbound/images/No-Image-Found-400x264.png' }}
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
            <Button
              style={styles.input}
              title="Detalle"
              onPress={() => {
                setPlatoModal(plato)
                setModalVisible(true);
              }}
            />
            <Button
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
            <Button
              style={styles.input}
              title="Agregar"
              disabled={agregarVisible}
              onPress={() => {
                disponibilidad()
                if (!agregarVisible) {
                  axiosPlatos(plato.id)
                  addPlato()
                }
              }}
            />
            <Button
              style={styles.input}
              title="Detalle"
              onPress={async () => {
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
    paddingTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textChico: {
    marginBottom: 10,
    textAlign: "center"
  },
  input: {
    width: 10,
    height: 44,
    paddingTop: 22,
  },
  resultados: {
    paddingTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    margin: 20,
    width: '90%',
    height: '90%',
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    justifyContent: 'center',
  },
  press: {
    backgroundColor: "blue",
    width: 65,
    height: 27,
    borderRadius: 5,
  },
  textPress: {
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  image: {
    width: '60%',
    height: '40%',
    borderRadius: 15,
  }
});
