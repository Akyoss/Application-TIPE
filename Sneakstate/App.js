// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddShoeScreen from './screens/AddShoeScreen';
import ShoeDetailScreen from './screens/ShoeDetailScreen';
import UpdateShoeScreen from './screens/UpdateShoeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddShoe" component={AddShoeScreen} />
        <Stack.Screen name="ShoeDetail" component={ShoeDetailScreen} />
        <Stack.Screen name="UpdateShoe" component={UpdateShoeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
