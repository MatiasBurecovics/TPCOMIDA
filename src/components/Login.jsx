import { StyleSheet, Alert, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { axiosLogIn } from '../services/axios';
import { useContextState, ActionTypes } from '../../contextState.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export function LogIn() {
  const navigation = useNavigation();
  const { contextState, setContextState } = useContextState();
  const [botonHabilitado, setbotonHabilitado] = useState(false);


  const validacion = async (event) => {
    event?.preventDefault()
    setbotonHabilitado(true)
    if (!contextState?.user?.email || !contextState?.user?.password) {
        setbotonHabilitado(false)
      Alert.alert("No se han ingresado los valores")
    }
    else {
      await axiosLogIn(contextState.user)
        .then((res) => {
          setContextState({
            type: ActionTypes.SetToken,
            value: res.token
          })
        })
        .catch(() => {
            setbotonHabilitado(false)
          Alert.alert("Su clave no esta autorizada")
        });
    }
  }
  if (contextState.user.token) {
    navigation.navigate("Home")
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>Usuario</Text>
      <TextInput
        type="text"
        placeholder={'Email'}
        style={styles.input}
        name="email"
        onChangeText={(text) => setContextState({
          type: ActionTypes.SetEmail,
          value: text
        })
        }
      />

      <Text>Contraseña</Text>
      <TextInput
        type="password"
        placeholder={'Password'}
        secureTextEntry={true}
        name="password"
        style={styles.input}
        onChangeText={(text) => setContextState({
          type: ActionTypes.SetPassword,
          value: text
        })
        }
      />

      <Button
        title={'Login'}
        style={styles.input}
        disabled={botonHabilitado}
        onPress={() => {
          validacion()
        }}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
