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
      console.log("No se han ingresado los valores")
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
          console.log("Su clave no esta autorizada")
        });
    }
  }
  if (contextState.user.token) {
    navigation.navigate("Home")
    console.log("usted ingreso")
  }
  return (
    <SafeAreaView style={styles.container}>
<Text style={styles.label}>Usuario</Text>
      <TextInput
        type="text"
        placeholder={'Mail'}
        style={styles.input}
        name="email"
        onChangeText={(text) => setContextState({
          type: ActionTypes.SetEmail,
          value: text
        })
        }
      />

<Text style={styles.label}>Contraseña</Text>
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
        style={styles.button}
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
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#FFFAF0',  
  },
  input: {
      height: 40,
      borderColor: '#FF8C00', 
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#FFF5E1',  
      color: '#FF8C00',  
      fontSize: 16
  },
  button: {
      padding: 10,
      backgroundColor: '#FF4500',  
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20
  },
  buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold'
  },
  label: {
      color: '#FF8C00',  
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 15,
      marginBottom: 5
  }
});