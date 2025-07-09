// ShoeDetailScreen.js
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Animated, Modal, Alert } from 'react-native';
import Toast from '../components/Toast';
import ActivityRecap from '../components/ActivityRecap';

const ShoeDetailScreen = ({ navigation, route, onRemoveShoe }) => {
  const shoe = route.params?.shoe;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lifeAnim = useRef(new Animated.Value(shoe?.life || 100)).current;
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [showStartWatchModal, setShowStartWatchModal] = useState(false);
  const [selectedWatchType, setSelectedWatchType] = useState('entrainement');
  const [showLiveTracking, setShowLiveTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);
  const [trackingInterval, setTrackingInterval] = useState(null);
  const [showRecap, setShowRecap] = useState(false);
  const [recapData, setRecapData] = useState(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(lifeAnim, {
      toValue: shoe?.life || 100,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [shoe]);

  const handleDelete = () => {
    setToast({ visible: true, message: 'Chaussure supprimée !' });
    setTimeout(() => {
      if (onRemoveShoe && shoe?.id) {
        onRemoveShoe(shoe.id);
      }
      navigation.goBack();
    }, 1200);
  };

  // Démarre le suivi en temps réel
  const startLiveTracking = () => {
    setShowStartWatchModal(false);
    setTrackingTime(0);
    setShowLiveTracking(true);
    const interval = setInterval(() => {
      setTrackingTime(prev => prev + 1);
    }, 1000);
    setTrackingInterval(interval);
  };

  // Arrête le suivi
  const stopLiveTracking = () => {
    if (trackingInterval) clearInterval(trackingInterval);
    setShowLiveTracking(false);
    setTrackingInterval(null);
    // Prépare les données pour le récap
    const recap = {
      type: selectedWatchType,
      duration: trackingTime,
      date: Date.now(),
      // Ajoute ici d'autres infos simulées pour le style
      battery: 44,
      stress: 20,
      stressAvg: 40,
      stressPeak: 86,
      stressLow: 1,
      effort: 41,
      exercise: '2h 29min',
      steps: 13809,
    };
    setRecapData(recap);
    // Ajoute à l'historique d'activités de la chaussure
    if (shoe && shoe.activities) {
      shoe.activities.push({
        id: Date.now().toString(),
        type: recap.type,
        sol: 'parquet', // à personnaliser si besoin
        duree: Math.floor(recap.duration/60),
        hauteur: null,
        date: new Date(recap.date).toISOString(),
        recap: recap,
      });
    }
    navigation.navigate('RecapScreen', { recap });
  };

  if (!shoe) {
    return <View style={styles.container}><Text style={{ color: '#fff' }}>Chaussure introuvable</Text></View>;
  }

  return (
    <View style={styles.screenBg}>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        {shoe.image && <Image source={{ uri: shoe.image }} style={styles.image} />}
        <Text style={styles.title}>{shoe.name}</Text>
        <Text style={styles.brand}>{shoe.brand}</Text>
        <View style={styles.lifeBarContainer}>
          <Animated.View style={[styles.lifeBar, { width: lifeAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
        </View>
        <Text style={styles.lifeText}>{shoe.life}%</Text>
        {/* Historique des activités */}
        {shoe.activities && shoe.activities.length > 0 && (
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>Historique des activités</Text>
            {shoe.activities.slice().reverse().map((act, idx) => (
              <TouchableOpacity key={act.id || idx} style={styles.activityItem} onPress={() => act.recap && navigation.navigate('RecapScreen', { recap: act.recap })}>
                <Text style={styles.activityText}>
                  {act.type === 'match' ? 'Match' : 'Entraînement'} sur {act.sol === 'autre' ? 'autre sol' : 'parquet'}
                  {act.duree ? `, ${act.duree} min` : ''}
                  {act.hauteur ? `, saut: ${act.hauteur} cm` : ''}
                </Text>
                <Text style={styles.activityDate}>{act.date ? new Date(act.date).toLocaleString() : ''}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('UpdateShoe', { shoeId: shoe.id })}>
          <Text style={styles.updateButtonText}>Mettre à jour après activité</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.updateButton, {backgroundColor: '#1E88E5', marginBottom: 16}]} onPress={() => setShowStartWatchModal(true)}>
          <Text style={styles.updateButtonText}>Démarrer une activité avec la montre</Text>
        </TouchableOpacity>
        {recapData && (
          <TouchableOpacity style={[styles.updateButton, {backgroundColor: '#6C1D5F', marginBottom: 16}]} onPress={() => setShowRecap(true)}>
            <Text style={styles.updateButtonText}>Voir le dernier récapitulatif</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Supprimer la chaussure</Text>
        </TouchableOpacity>
        <Toast visible={toast.visible} message={toast.message} onHide={() => setToast({ visible: false, message: '' })} />
      </Animated.View>

      {/* Modal pour démarrer une activité avec la montre */}
      <Modal visible={showStartWatchModal} transparent animationType="fade" onRequestClose={() => setShowStartWatchModal(false)}>
        <View style={styles.screenBg}>
          <View style={[styles.card, {maxWidth: 340, width: '100%'}]}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12, color: '#fff' }}>Démarrer une activité</Text>
            <Text style={{marginBottom: 8, color: '#fff'}}>Type d'activité :</Text>
            {['entrainement','match','course','autre'].map(type => (
              <TouchableOpacity
                key={type}
                style={[styles.updateButton, selectedWatchType === type && {backgroundColor: '#4caf50'}]}
                onPress={() => setSelectedWatchType(type)}
              >
                <Text style={styles.updateButtonText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.updateButton, {backgroundColor: '#4caf50', marginTop: 10}]} onPress={startLiveTracking}>
              <Text style={styles.updateButtonText}>Démarrer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.updateButton, {backgroundColor: '#e53935', marginTop: 10}]} onPress={() => setShowStartWatchModal(false)}>
              <Text style={styles.updateButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Suivi en temps réel */}
      <Modal visible={showLiveTracking} transparent animationType="fade" onRequestClose={stopLiveTracking}>
        <View style={styles.screenBg}>
          <View style={[styles.card, {maxWidth: 340, width: '100%', alignItems: 'center'}]}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff', marginBottom: 16 }}>Suivi en temps réel</Text>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>Activité : {selectedWatchType.charAt(0).toUpperCase() + selectedWatchType.slice(1)}</Text>
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 16 }}>{Math.floor(trackingTime/60).toString().padStart(2,'0')}:{(trackingTime%60).toString().padStart(2,'0')}</Text>
            <TouchableOpacity style={[styles.updateButton, {backgroundColor: '#e53935', marginTop: 10}]} onPress={stopLiveTracking}>
              <Text style={styles.updateButtonText}>Arrêter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Récapitulatif de l'activité */}
      <ActivityRecap visible={showRecap} onClose={() => setShowRecap(false)} recapData={recapData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#03083B',
  },
  screenBg: {
    flex: 1,
    backgroundColor: '#03083B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 32,
    alignItems: 'center',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 8,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 16,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: '#222',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  brand: {
    color: '#b0c4de',
    fontSize: 18,
    marginBottom: 24,
  },
  lifeBarContainer: {
    width: '80%',
    height: 18,
    backgroundColor: '#222',
    borderRadius: 9,
    overflow: 'hidden',
    marginBottom: 8,
  },
  lifeBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 9,
  },
  lifeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 24,
  },
  updateButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#e53935',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activityCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 20,
    padding: 12,
    marginBottom: 18,
    marginTop: 8,
  },
  activityTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 6,
  },
  activityItem: {
    marginBottom: 6,
  },
  activityText: {
    color: '#fff',
    fontSize: 15,
  },
  activityDate: {
    color: '#b0c4de',
    fontSize: 12,
  },
});

export default ShoeDetailScreen;
