// HomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CARD_SIZE = (Dimensions.get('window').width - 60) / 2; // 2 cartes par ligne avec marges

const HomeScreen = ({ navigation, shoes = [], onRemoveShoes }) => {
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [shoes]);

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
      {/* Bouton rapide pour ajouter une activité */}
      {!selectMode && (
        <TouchableOpacity style={{ marginTop: 6, backgroundColor: '#4caf50', borderRadius: 6, paddingVertical: 4, paddingHorizontal: 8 }} onPress={() => navigation.navigate('UpdateShoe', { shoeId: item.id })}>
          <Text style={{ color: '#fff', fontSize: 13 }}>+ Activité</Text>
        </TouchableOpacity>
      )}
      {selectMode && (
        <Text style={{ color: selected.includes(item.id) ? '#e53935' : '#0a2342', fontWeight: 'bold', marginTop: 6 }}>
          {selected.includes(item.id) ? 'Sélectionné' : 'Sélectionner'}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#03083B', '#6C1D5F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.infoButton}>
              <Text style={styles.infoIcon}>ℹ️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Compte')} style={styles.accountButton}>
              <Text style={styles.accountIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator} />
        {shoes.length === 0 && (
          <Text style={styles.emptyText}>Aucune chaussure enregistrée</Text>
        )}
        <Animated.View style={{ flex: 1, opacity: fadeAnim, width: '100%' }}>
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
            contentContainerStyle={{ gap: 16, paddingBottom: 24 }}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
        {selectMode && (
          <View style={styles.selectionBarBottom}>
            <Text style={styles.selectionCount}>
              {selected.length} sélectionnée{selected.length > 1 ? 's' : ''}
            </Text>
            <TouchableOpacity
              style={[styles.deleteButton, selected.length === 0 && { opacity: 0.5 }]}
              onPress={removeSelected}
              disabled={selected.length === 0}
            >
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => { setSelectMode(false); setSelected([]); }}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: 'transparent' },
  headerRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  logo: { width: 64, height: 64, marginTop: 16, marginBottom: 8, resizeMode: 'contain' },
  infoButton: { 
      padding: 8,
      borderRadius: 16,
      marginTop: 10,
      backgroundColor: 'rgba(255,255,255,0.08)' 
    },
  infoIcon: {
     color: '#fff',
     fontSize: 28, 
     fontWeight: 'bold' 
    },
  title: {
      fontSize: 24, 
      fontWeight: '600',
      color: '#fff', 
      letterSpacing: 1, 
      textTransform: 'capitalize',
      marginTop: 8, 
      marginBottom: 2,
      textAlign: 'center' 
    },
  date: { 
    color: '#b0c4de',
    fontSize: 15,
    marginBottom: 8, 
    textAlign: 'center', 
    textTransform: 'capitalize' 
  },
  separator: { 
    width: '90%', 
    height: 1, 
    backgroundColor: 'rgba(255,255,255,0.10)', 
    alignSelf: 'center', 
    marginVertical: 10, 
    borderRadius: 1 
  },
  emptyText: { 
    color: '#fff', 
    marginTop: 40, 
    fontSize: 18, 
    opacity: 0.7, 
    textAlign: 'center' 
  },
  addButton: { 
    backgroundColor: 'rgba(255,255,255,0.10)', 
    borderRadius: 32, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.10, 
    shadowRadius: 8, 
    elevation: 4, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.08)' 
  },
  addButtonText: { 
    fontSize: 54, 
    color: '#4caf50', 
    fontWeight: 'bold',
    opacity: 0.85, 
    marginBottom: 0 
  },
  addButtonLabel: { 
    fontSize: 15, 
    color: '#b0c4de', 
    fontWeight: '600', 
    opacity: 0.85, 
    marginTop: 2 
  },
  shoeCard: { 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    borderRadius: 32, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20, 
    marginLeft: 10, 
    padding: 16, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.10, 
    shadowRadius: 10, 
    elevation: 4, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.10)' 
  },
  shoeName: { 
    fontSize: 17, 
    fontWeight: '600', 
    color: '#fff',
    marginBottom: 8, 
    textAlign: 'center' 
  },
  lifeBarContainer: { 
    width: '80%', 
    height: 12, 
    backgroundColor: '#222b', 
    borderRadius: 6, 
    overflow: 'hidden', 
    marginTop: 6, 
    marginBottom: 2 
  },
  lifeBar: { 
    height: '100%', 
    backgroundColor: '#FFD600', 
    borderRadius: 6 
  },
  selectBubbleContainer: { 
    position: 'absolute', 
    top: 8, 
    left: 8, 
    zIndex: 2 
  },
  selectBubble: { 
    width: 22, 
    height: 22, 
    borderRadius: 11, 
    borderWidth: 2, 
    borderColor: '#0a2342', 
    backgroundColor: 'rgba(255,255,255,0.7)', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  selectBubbleFilled: { 
    backgroundColor: '#4caf50', 
    borderColor: '#4caf50' 
  },
  accountButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginTop: 10,
    marginLeft: 270,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'right',
    justifyContent: 'right',
  },
  accountIcon: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  selectionBarBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'rgba(3,8,59,0.98)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.10)',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  selectionCount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e53935',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginHorizontal: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
