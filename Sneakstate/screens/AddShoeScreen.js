// AddShoeScreen.js
import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const AddShoeScreen = ({ navigation }) => {
  // TODO: Formulaire pour ajouter une chaussure
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Ajouter une chaussure</Text>
      {/* TODO: Inputs pour le nom, la marque, etc. */}
      <Button title="Valider" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddShoeScreen;
