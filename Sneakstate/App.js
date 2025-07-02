// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddShoeScreen from './screens/AddShoeScreen';
import ShoeDetailScreen from './screens/ShoeDetailScreen';
import UpdateShoeScreen from './screens/UpdateShoeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [shoes, setShoes] = useState([]);

  const handleAddShoe = (shoe) => {
    setShoes((prev) => [...prev, shoe]);
  };

  const handleRemoveShoes = (ids) => {
    setShoes((prev) => prev.filter((shoe) => !ids.includes(shoe.id)));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} shoes={shoes} onRemoveShoes={handleRemoveShoes} />}
        </Stack.Screen>
        <Stack.Screen name="AddShoe">
          {props => <AddShoeScreen {...props} onAddShoe={handleAddShoe} />}
        </Stack.Screen>
        <Stack.Screen name="ShoeDetail" component={ShoeDetailScreen} />
        <Stack.Screen name="UpdateShoe" component={UpdateShoeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
