// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList } from 'react-native';

const CARD_SIZE = (Dimensions.get('window').width - 60) / 2; // 2 cartes par ligne avec marges

const HomeScreen = ({ navigation, shoes = [], onRemoveShoes }) => {
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const removeSelected = () => {
    if (onRemoveShoes && selected.length > 0) {
      onRemoveShoes(selected);
    }
    setSelected([]);
    setSelectMode(false);
  };

  const renderShoe = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.shoeCard,
        { width: CARD_SIZE, height: CARD_SIZE },
        selectMode && selected.includes(item.id) ? { borderColor: '#e53935', borderWidth: 3 } : null,
      ]}
      onPress={() =>
        selectMode ? toggleSelect(item.id) : navigation.navigate('ShoeDetail', { shoe: item })
      }
      onLongPress={() => setSelectMode(true)}
    >
      {selectMode && (
        <View style={styles.selectBubbleContainer}>
          <View style={[styles.selectBubble, selected.includes(item.id) && styles.selectBubbleFilled]} />
        </View>
      )}
      {item.image ? (
        <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 10, marginBottom: 8 }} />
      ) : (
        <View style={{ width: 60, height: 60, borderRadius: 10, backgroundColor: '#ccc', marginBottom: 8 }} />
      )}
      <Text style={styles.shoeName}>{item.name}</Text>
      <Text style={{ color: '#0a2342', fontSize: 13 }}>{item.brand}</Text>
      <View style={styles.lifeBarContainer}>
        <View style={[styles.lifeBar, { width: `${item.life}%` }]} />
      </View>
      <Text style={{ color: '#0a2342', fontSize: 12, marginTop: 2 }}>{item.life}%</Text>
      {selectMode && (
        <Text style={{ color: selected.includes(item.id) ? '#e53935' : '#0a2342', fontWeight: 'bold', marginTop: 6 }}>
          {selected.includes(item.id) ? 'Sélectionné' : 'Sélectionner'}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sneakstate</Text>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginBottom: 10, backgroundColor: '#fff', borderRadius: 8, padding: 8, opacity: 0.8 }}
        onPress={() => setSelectMode((v) => !v)}
      >
        <Text style={{ color: '#0a2342', fontWeight: 'bold' }}>{selectMode ? 'Annuler' : 'Sélectionner'}</Text>
      </TouchableOpacity>
      {selectMode && (
        <TouchableOpacity
          style={{ alignSelf: 'flex-end', marginBottom: 10, backgroundColor: '#e53935', borderRadius: 8, padding: 8 }}
          onPress={removeSelected}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Supprimer</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={[{ add: true }, ...shoes]}
        keyExtractor={(item, idx) => item.add ? 'add' : item.id}
        numColumns={2}
        renderItem={({ item }) =>
          item.add ? (
            <TouchableOpacity style={[styles.addButton, { width: CARD_SIZE, height: CARD_SIZE }]} onPress={() => navigation.navigate('AddShoe')}>
              <Text style={styles.addButtonText}>+</Text>
              <Text style={styles.addButtonLabel}>Ajouter une Chaussure</Text>
            </TouchableOpacity>
          ) : renderShoe({ item })
        }
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#0a2342', // bleu forêt
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.45)', // plus transparent
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 60,
    color: '#0a2342',
    fontWeight: 'bold',
    opacity: 0.85,
    marginBottom: 0,
  },
  addButtonLabel: {
    fontSize: 16,
    color: '#0a2342',
    fontWeight: '600',
    opacity: 0.85,
    marginTop: 2,
  },
  shoeCard: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 0,
    padding: 10,
  },
  shoeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a2342',
    marginBottom: 10,
  },
  lifeBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  lifeBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  selectBubbleContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
  },
  selectBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#0a2342',
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBubbleFilled: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
});

export default HomeScreen;
