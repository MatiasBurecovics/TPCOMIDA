import { StyleSheet, Alert, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Button, SearchBar } from 'react-native-elements';
import { getPlatosByNombre } from '../services/axios.js';
import Plato from './Plato.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const navigation = useNavigation();
  const [busquedaState, setBusquedaState] = useState("");
  const [platosBuscadosState, setPlatosBuscadosState] = useState([]);

  const axiosPlatos = async (busqueda) => {
    getPlatosByNombre(busqueda)
    .then((res) => {
        setPlatosBuscadosState(res)
    })
    .catch((err) => {
        Alert.alert("Fallo la busqueda de platos")
        console.log(err)
    });
  }

  const renderItem = ({ item }) => (
    <Plato plato={item} menu={false} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Escriba aquí..."
        onChangeText={(busqueda) => {
          setBusquedaState(busqueda);
          if (busqueda.length > 2) {
            axiosPlatos(busqueda)
          } else {
            setPlatosBuscadosState([]);
          }
        }}
        value={busquedaState}
      />

      <Button
        style={styles.input}
        title="Menu"
        onPress={ () => {
          navigation.navigate("Menu")
        }}
      />

      <FlatList
        data={platosBuscadosState.results}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
container: {
    flex: 1,
},
item: {
    padding: 10,
    fontSize: 18,
    height: 44,
},
input: {
    width: 200,
    height: 44,
    padding: 10,
    marginBottom: 10,
},
});
