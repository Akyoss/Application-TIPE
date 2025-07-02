// HomeScreen.js
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const HomeScreen = ({ navigation }) => {
  // TODO: Charger la liste des chaussures depuis le state
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sneakstate</Text>
      {/* TODO: Afficher la liste des chaussures */}
      <Button title="Ajouter une chaussure" onPress={() => navigation.navigate('AddShoe')} />
    </View>
  );
};

export default HomeScreen;
