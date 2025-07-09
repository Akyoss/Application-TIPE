// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddShoeScreen from './screens/AddShoeScreen';
import ShoeDetailScreen from './screens/ShoeDetailScreen';
import UpdateShoeScreen from './screens/UpdateShoeScreen';
import AboutScreen from './screens/AboutScreen';
import RecapScreen from './screens/RecapScreen'; // adapte le chemin si besoin
import { saveShoes, loadShoes } from './utils/storage';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [shoes, setShoes] = useState([]);
  const [loadError, setLoadError] = useState(null);

  // Charger les chaussures au démarrage
  useEffect(() => {
    loadShoes()
      .then((data) => {
        if (Array.isArray(data)) {
          setShoes(data);
          setLoadError(null);
        } else {
          setShoes([]);
          setLoadError('Données corrompues. Réinitialisation.');
        }
      })
      .catch(() => {
        setShoes([]);
        setLoadError('Erreur lors du chargement des données.');
      });
  }, []);

  // Sauvegarder à chaque modification
  useEffect(() => {
    saveShoes(shoes);
  }, [shoes]);

  const handleAddShoe = (shoe) => {
    setShoes((prev) => [...prev, { ...shoe, activities: shoe.activities || [] }]);
  };

  const handleRemoveShoes = (ids) => {
    setShoes((prev) => prev.filter((shoe) => !ids.includes(shoe.id)));
  };

  const handleRemoveShoe = (id) => {
    setShoes((prev) => prev.filter((shoe) => shoe.id !== id));
  };

  // Fonction JS équivalente au module C
  function computeNewLife(current_life, duration, type, sol, jump_height) {
    let fatigue = duration * 0.1;
    if (type === 'match') fatigue *= 1.2;
    if (sol === 'autre') fatigue *= 1.5;
    if (jump_height) fatigue += jump_height * 0.05;
    let new_life = current_life - Math.round(fatigue);
    if (new_life < 0) new_life = 0;
    return new_life;
  }

  // Ajout d'une activité à une chaussure + recalcul de la vie
  const handleAddActivity = (shoeId, activity) => {
    setShoes((prev) =>
      prev.map((shoe) => {
        if (shoe.id === shoeId) {
          const lastLife = typeof shoe.life === 'number' ? shoe.life : 100;
          const newLife = computeNewLife(
            lastLife,
            activity.duree || 0,
            activity.type,
            activity.sol,
            activity.hauteur || 0
          );
          return {
            ...shoe,
            life: newLife,
            activities: [...(shoe.activities || []), activity],
          };
        }
        return shoe;
      })
    );
  };

  return (
    <NavigationContainer>
      {loadError && (
        <View style={{ position: 'absolute', top: 40, left: 0, right: 0, zIndex: 100 }}>
          <Text style={{ color: 'red', backgroundColor: '#fff', textAlign: 'center', padding: 8, borderRadius: 8, margin: 10 }}>{loadError}</Text>
        </View>
      )}
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} shoes={shoes} onRemoveShoes={handleRemoveShoes} />}
        </Stack.Screen>
        <Stack.Screen name="AddShoe">
          {props => <AddShoeScreen {...props} onAddShoe={handleAddShoe} />}
        </Stack.Screen>
        <Stack.Screen name="ShoeDetail">
          {props => <ShoeDetailScreen {...props} onRemoveShoe={handleRemoveShoe} />}
        </Stack.Screen>
        <Stack.Screen name="UpdateShoe">
          {props => <UpdateShoeScreen {...props} onAddActivity={handleAddActivity} shoes={shoes} />}
        </Stack.Screen>
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen
          name="RecapScreen"
          component={RecapScreen}
          options={{ headerShown: true, title: 'Récapitulatif activité' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
