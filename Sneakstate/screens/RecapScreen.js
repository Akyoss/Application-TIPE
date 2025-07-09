import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RecapScreen = ({ route, navigation }) => {
  const { recap } = route.params;
  if (!recap) return <View style={styles.container}><Text style={styles.title}>Aucune donnée</Text></View>;
  return (
    <LinearGradient
      colors={['#03083B', '#6C1D5F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Aperçu en temps réel</Text>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>BATTERIE CORPORELLE</Text>
          <View style={styles.rowCenter}>
            <View style={styles.circleIcon}>
              <Text style={styles.batteryIcon}>⚡</Text>
            </View>
            <Text style={styles.bigValue}>{recap?.battery ?? 44} <Text style={styles.percent}>%</Text></Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.badge}>Regain d'énergie du soir</Text>
            <Text style={styles.subInfo}>16:59 - 20:59</Text>
          </View>
          <Text style={styles.subInfo}>La batterie se décharge plus lentement</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>STRESS DU JOUR</Text>
          <View style={styles.rowCenter}>
            <Text style={[styles.bigValue, {color:'#4caf50'}]}>{recap?.stress ?? 20}</Text>
            <Text style={styles.stressLabel}>Actuel Stress faible</Text>
          </View>
          <View style={styles.stressRow}>
            <Text style={styles.stressStat}>Moyenne
<Text style={styles.stressValue}>{recap?.stressAvg ?? 40}</Text></Text>
            <Text style={styles.stressStat}>Pic
<Text style={[styles.stressValue, {color:'#e53935'}]}>{recap?.stressPeak ?? 86}</Text></Text>
            <Text style={styles.stressStat}>Faible
<Text style={[styles.stressValue, {color:'#4caf50'}]}>{recap?.stressLow ?? 1}</Text></Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>EFFORT</Text>
          <View style={styles.rowCenter}>
            <View style={styles.effortCircle}>
              <Text style={styles.effortValue}>{recap?.effort ?? 41}<Text style={styles.percent}>%</Text></Text>
            </View>
            <View style={{marginLeft: 18}}>
              <Text style={styles.effortLabel}>Exercice</Text>
              <Text style={styles.effortSub}>{recap?.exercise ?? '2h 29min'}</Text>
              <Text style={styles.effortLabel}>Pas</Text>
              <Text style={styles.effortSub}>{recap?.steps ?? 13809}</Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>RÉSUMÉ ACTIVITÉ</Text>
          <Text style={styles.label}>Type : <Text style={styles.value}>{recap?.type || '-'}</Text></Text>
          <Text style={styles.label}>Durée : <Text style={styles.value}>{recap ? `${Math.floor(recap.duration/60)} min ${recap.duration%60} sec` : '-'}</Text></Text>
          <Text style={styles.label}>Date : <Text style={styles.value}>{recap?.date ? new Date(recap.date).toLocaleString() : '-'}</Text></Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>Retour</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    marginTop: 18,
    letterSpacing: 0.5,
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
    marginBottom: 18,
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 2,
  },
  circleIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.13)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  batteryIcon: {
    fontSize: 26,
    color: '#FFD600',
  },
  bigValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD600',
  },
  percent: {
    fontSize: 18,
    color: '#FFD600',
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: 'rgba(0,255,255,0.13)',
    color: '#00e6e6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 2,
  },
  subInfo: {
    color: '#00e6e6',
    fontSize: 13,
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  stressLabel: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    alignSelf: 'center',
  },
  stressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  stressStat: {
    color: '#b0c4de',
    fontSize: 13,
    textAlign: 'center',
    flex: 1,
  },
  stressValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#b0c4de',
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

export default RecapScreen;
