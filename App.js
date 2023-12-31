import React from 'react';
import { StyleSheet } from 'react-native';
import { LogIn } from './src/components/Login.jsx'
import { Home } from './src/components/Home'
import { Menu } from './src/components/Menu.jsx';
import { ContextProvider } from './contextState.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  function LogInScreen() {
    return (
      <LogIn />
    );
  }
  function HomeScreen() {
    return (
      <Home />
    );
  }
function MenuScreen()
{
  return (
    <Menu />
  );
}

  return (
    <NavigationContainer>
        <ContextProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
        </Stack.Navigator>
        </ContextProvider>
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    display: "flex",
  },
});
