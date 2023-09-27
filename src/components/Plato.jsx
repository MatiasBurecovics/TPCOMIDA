import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, Modal, Button, Pressable, View } from 'react-native';
import { getPlatosById } from '../services/axios.js';
import { useContextState, ActionTypes } from '../../contextState.js';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Plato({ plato, menu }) {
  const { contextState, setContextState } = useContextState();
  const [modalVisible, setModalVisible] = useState(false);
  const [platoModal, setPlatoModal] = useState({});
  const [agregarVisible, setAgregarVisible] = useState(false);

  useEffect(() => {
    const fetchPlatoData = async () => {
      try {
        const response = await getPlatosById(plato.id);
        setPlatoModal(response);
      } catch (error) {
        console.error("Fallo la busqueda de plato", error);
      }
    };

    fetchPlatoData();
  }, [plato.id]);

  useEffect(() => {
    const disponibilidad = () => {
      let veganCount = 0;
      let notVeganCount = 0;

      contextState?.menu.forEach((e) => {
        e?.vegan ? (veganCount++) : (notVeganCount++);
      });

      if ((veganCount === 2 && platoModal.vegan) || (notVeganCount === 2 && !platoModal.vegan) || contextState?.menu.length === 4) {
        setAgregarVisible(true);
      } else {
        setAgregarVisible(false);
      }
    };

    disponibilidad();
  }, [contextState, platoModal]);

  const handleAgregarPlato = () => {
    if (!agregarVisible) {
      axiosPlatos(plato.id);
      addPlato();
    }
  };



  const addPlato = () => {
    setContextState({
      type: ActionTypes.AddPlato,
      value: menuAux,
    });
  };

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <SafeAreaView style={styles.modal}>
          <Image
            style={styles.image}
            source={{ uri: platoModal?.image }}
          />
          <Text style={styles.textChico}>Nombre: {platoModal?.title}</Text>
          <Text style={styles.textChico}>Precio: {platoModal?.pricePerServing}</Text>
          <Text style={styles.textChico}>Vegetariano: {platoModal?.vegetarian ? 'si' : 'no'}</Text>
          <Text style={styles.textChico}>Vegano: {platoModal?.vegan ? 'si' : 'no'}</Text>
          <Text style={styles.textChico}>Preparado en: {platoModal?.readyInMinutes} minutos</Text>
          <Text style={styles.textChico}>Gluten free: {platoModal?.glutenFree ? 'si' : 'no'}</Text>
          <Text style={styles.textChico}>Nv saludable: {platoModal?.healthScore}</Text>

          <Pressable
            style={styles.press}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textPress}>Cerrar</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>

      {menu ? (
        <View style={styles.resultados}>
          <Text style={styles.textChico}>{plato?.title}</Text>
          <Button
            style={styles.input}
            title="Detalle"
            onPress={() => {
              setPlatoModal(plato);
              setModalVisible(true);
            }}
          />
          <Button
            style={styles.input}
            title="Eliminar"
            onPress={() => {
              setContextState({
                type: ActionTypes.DelPlato,
                value: plato.id,
              });
            }}
          />
        </View>
      ) : (
        <View style={styles.resultados}>
          <Text style={styles.textChico}>{plato?.title}</Text>
          <Button
            style={styles.input}
            title="Agregar"
            disabled={agregarVisible}
            onPress={handleAgregarPlato}
          />
          <Button
            style={styles.input}
            title="Detalle"
            onPress={() => setModalVisible(true)}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 20,
    backgroundColor: '#FFFAF0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '40%',
    borderRadius: 10,
    marginBottom: 15,
  },
  textChico: {
    fontSize: 16,
    color: '#FF8C00',
    marginBottom: 5,
    textAlign: 'center',
  },
  press: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FF4500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPress: {
    fontSize: 18,
    color: '#FFF',
  },
  resultados: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFA07A',
    color: '#FFF',
  },
});
