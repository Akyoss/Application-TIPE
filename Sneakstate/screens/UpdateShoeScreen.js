// UpdateShoeScreen.js
import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const UpdateShoeScreen = ({ navigation, route }) => {
  // TODO: Formulaire pour renseigner l'activité
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mise à jour après activité</Text>
      {/* TODO: Inputs pour type, sol, durée, hauteur de saut */}
      <Button title="Valider" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#0a2342',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    marginTop: 40,
  },
});

export default UpdateShoeScreen;
