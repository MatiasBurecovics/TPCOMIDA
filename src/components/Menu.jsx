import { StyleSheet, Text, FlatList } from 'react-native';
import React from 'react';
import { useContextState } from '../../contextState.js';
import Plato from './Plato.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Menu() {
  const navigation = useNavigation();
  const { contextState, setContextState } = useContextState();

  let acumulativoPrecio = 0;
  let promedioSalud = 0;
  let vegan = 0;
  let notVegan = 0;
  contextState.menu.forEach(e => {
    acumulativoPrecio += e.pricePerServing;
    promedioSalud += e.healthScore;
    e.vegan ? vegan++ : notVegan++;
  });

  const renderItem = ({ item }) => (
    <Plato plato={item} menu={true} />
  );

  return (
<SafeAreaView style={styles.container}>
  <Text style={styles.title}>Menu</Text>
  <TouchableOpacity
    style={styles.button}
    onPress={async () => {
      try {
        await navigation.navigate("Home");
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }}
  >
    <Text style={styles.buttonText}>Home</Text>
  </TouchableOpacity>
  <Text style={styles.infoText}>Acumulativo precio: {acumulativoPrecio}</Text>
  <Text style={styles.infoText}>
    Salud promedio: {contextState.menu.length >= 1 ? promedioSalud / contextState.menu.length : 0}
  </Text>
  <Text style={styles.infoText}>Platos veganos: {vegan}</Text>
  <Text style={styles.infoText}>Platos no veganos: {notVegan}</Text>
  <FlatList
    data={contextState?.menu}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', 
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6347', 
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF', 
  },
  infoText: {
    fontSize: 18,
    color: '#FFF', 
    marginBottom: 10,
  },
  flatList: {
    width: '100%',
  },
 
});