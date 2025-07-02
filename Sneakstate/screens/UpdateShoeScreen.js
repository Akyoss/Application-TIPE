// UpdateShoeScreen.js
import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const UpdateShoeScreen = ({ navigation, route }) => {
  // TODO: Formulaire pour renseigner l'activité
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Mise à jour après activité</Text>
      {/* TODO: Inputs pour type, sol, durée, hauteur de saut */}
      <Button title="Valider" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default UpdateShoeScreen;
