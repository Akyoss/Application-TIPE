// ShoeDetailScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const ShoeDetailScreen = ({ navigation, route }) => {
  // TODO: Afficher les détails de la chaussure et la barre de vie
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Détail chaussure</Text>
      {/* TODO: Afficher la barre de vie */}
      <Button title="Mettre à jour après activité" onPress={() => navigation.navigate('UpdateShoe', { shoeId: route.params.shoeId })} />
    </View>
  );
};

export default ShoeDetailScreen;
