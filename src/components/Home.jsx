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
      containerStyle={styles.searchBar}
      inputStyle={styles.searchInput}
    />
  
    <Button
      style={styles.menuButton}
      title="Menu"
      onPress={() => {
        navigation.navigate("Menu");
      }}
      titleStyle={styles.menuButtonText}
    />
  
    <FlatList
      data={platosBuscadosState.results}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      style={styles.flatList}
    />
  </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500', 
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 16,
    color: '#FFA500', 
  },
  menuButton: {
    backgroundColor: '#FF6347', 
    padding: 10,
    borderRadius: 5,
  },
  menuButtonText: {
    fontSize: 16,
    color: '#FFF', 
  },
  flatList: {
    width: '100%',
  },
  
});
