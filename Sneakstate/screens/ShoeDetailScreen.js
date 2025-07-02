// ShoeDetailScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ShoeDetailScreen = ({ navigation, route }) => {
  // TODO: Afficher les détails de la chaussure et la barre de vie
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détail chaussure</Text>
      {/* TODO: Afficher la barre de vie */}
      <Button title="Mettre à jour après activité" onPress={() => navigation.navigate('UpdateShoe', { shoeId: route.params.shoeId })} />
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

export default ShoeDetailScreen;
