import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CircularProgress from './CircularProgress';

const ActivityRecap = ({ visible, onClose, recapData }) => {
  if (!visible) return null;
  // Valeur de vie de la chaussure (0-100)
  const shoeLife = recapData?.shoeLife ?? 80;
  const steps = recapData?.steps ?? 13809;
  const heart = recapData?.heart ?? 112;
  return (
    <LinearGradient
      colors={['#03083B', '#6C1D5F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.overlay}
    >
      <View style={styles.card}>
        <Text style={styles.header}>Aperçu en temps réel</Text>
        {/* Barre de vie circulaire pour la chaussure */}
        <View style={styles.lifeSection}>
          <View style={styles.cardSection}>
            <Text style={styles.sectionTitle}>ÉTAT DE LA CHAUSSURE</Text>
            <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 8}}>
              <CircularProgress size={90} strokeWidth={8} progress={shoeLife} color="#4caf50" bgColor="#222a" />
              <Text style={styles.lifeValueCard}>{shoeLife}%</Text>
            </View>
          </View>
        </View>
        {/* Fréquence cardiaque et pas */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>EFFORT & SANTÉ</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <MaterialCommunityIcons name="heart-pulse" size={32} color="#e53935" />
              <Text style={styles.statValue}>{heart}</Text>
              <Text style={styles.statLabel}>BPM</Text>
            </View>
            <View style={styles.statBox}>
              <MaterialCommunityIcons name="walk" size={32} color="#4caf50" />
              <Text style={styles.statValue}>{steps}</Text>
              <Text style={styles.statLabel}>Pas</Text>
            </View>
            <View style={styles.statBox}>
              <View style={styles.effortCircle}>
                <Text style={styles.effortValue}>{recapData?.effort ?? 41}<Text style={styles.percent}>%</Text></Text>
              </View>
              <Text style={styles.statLabel}>Effort</Text>
            </View>
          </View>
        </View>
        {/* Résumé */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RÉSUMÉ ACTIVITÉ</Text>
          <Text style={styles.label}>Type : <Text style={styles.value}>{recapData?.type || '-'}</Text></Text>
          <Text style={styles.label}>Durée : <Text style={styles.value}>{recapData ? `${Math.floor(recapData.duration/60)} min ${recapData.duration%60} sec` : '-'}</Text></Text>
          <Text style={styles.label}>Date : <Text style={styles.value}>{recapData?.date ? new Date(recapData.date).toLocaleString() : '-'}</Text></Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 28,
    padding: 22,
    minWidth: Math.min(width * 0.92, 380),
    maxWidth: 420,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  lifeSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  cardSection: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
  },
  lifeValueCard: {
    position: 'absolute',
    top: 32,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    zIndex: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 18,
  },
  statBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 12,
    minWidth: 90,
    marginHorizontal: 8,
  },
  statValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 2,
  },
  statLabel: {
    color: '#b0c4de',
    fontSize: 13,
    marginTop: 2,
  },
  section: {
    width: '100%',
    marginBottom: 18,
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#b0c4de',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
    letterSpacing: 1.2,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  effortCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.13)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  effortValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#a259e6',
  },
  effortLabel: {
    color: '#b0c4de',
    fontSize: 13,
    marginTop: 2,
  },
  effortSub: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
    marginTop: 2,
  },
  value: {
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  closeButton: {
    marginTop: 18,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ActivityRecap;
