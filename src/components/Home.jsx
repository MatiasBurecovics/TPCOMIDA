import { StyleSheet, Alert, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Button, SearchBar } from 'react-native-elements';
import { getPlatosBySearchName } from '../services/axios.js';
import Plato from './Plato.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const navigation = useNavigation();
  const [busquedaState, setBusquedaState] = useState("");
  const [platosBuscadosState, setPlatosBuscadosState] = useState([]);

  const axiosPlatos = async (busqueda) => {
    getPlatosBySearchName(busqueda)
    .then((res) => {
        setPlatosBuscadosState(res)
        console.log(res)
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
          navigation.navigate('Menu')
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
      backgroundColor: '#FFEFD5', 
      padding: 20,
  },
  input: {
      marginVertical: 10,
      borderRadius: 10,
      backgroundColor: '#FF8C00', 
      color: '#FFF',
      textAlign: 'center',
      padding: 10,
      fontWeight: 'bold',
  },
  searchBar: {
      marginBottom: 15,
      borderRadius: 20,
      borderColor: '#FF7F50', 
      borderWidth: 1,
      backgroundColor: '#FFF',
      elevation: 5, 
      shadowOpacity: 0.5, 
      shadowRadius: 5,
      shadowColor: '#FF7F50',
      shadowOffset: { height: 3, width: 0 },
  },
});