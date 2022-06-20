import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Movies from './Components/Movies';
import MovieDetails  from './Components/MovieDetails';
import HomeScreen from './Components/HomeScreen';
import { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StoreContext} from './hooks/Store';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useStore } from './hooks/Store';

const Stack = createNativeStackNavigator();

export default function App() {

  const [favories,setFavories]=useState([]);
  return (
    <StoreContext.Provider value={{
      favories,
      setFavories
    }}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        <Stack.Screen name="Movies" component={Movies}/>
      </Stack.Navigator>
    </NavigationContainer>
    </StoreContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
