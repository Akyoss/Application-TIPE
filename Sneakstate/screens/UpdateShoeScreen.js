// UpdateShoeScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal, Keyboard, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from '../components/Toast';
import DateTimePicker from '@react-native-community/datetimepicker';

const UpdateShoeScreen = ({ navigation, route, onAddActivity, shoes }) => {
  const [type, setType] = useState('entrainement');
  const [sol, setSol] = useState('parquet');
  const [duree, setDuree] = useState('');
  const [hauteur, setHauteur] = useState('');
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [useNow, setUseNow] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showSolMenu, setShowSolMenu] = useState(false);
  const [showWatchModal, setShowWatchModal] = useState(false);
  const hauteurRef = useRef();

  // Récupérer l'id de la chaussure depuis la navigation
  const shoeId = route.params?.shoeId;
  const shoe = shoes?.find(s => s.id === shoeId);

  const activityTypes = [
    { label: 'Entraînement', value: 'entrainement' },
    { label: 'Match', value: 'match' },
    { label: 'Course', value: 'course' },
    { label: 'Autre', value: 'autre' },
    
    // Ajoutez ici d'autres activités si besoin
  ];
  const solTypes = [
    { label: 'Parquet', value: 'parquet' },
    { label: 'Béton', value: 'béton' },
    // Ajoutez ici d'autres types de sol si besoin
  ];

  const [watchActivities] = useState([
    { id: '1', type: 'course', sol: 'béton', duree: 42, hauteur: 0, date: new Date(Date.now() - 3600 * 1000) },
    { id: '2', type: 'entrainement', sol: 'parquet', duree: 90, hauteur: 30, date: new Date(Date.now() - 2 * 3600 * 1000) },
    { id: '3', type: 'match', sol: 'parquet', duree: 48, hauteur: 35, date: new Date(Date.now() - 24 * 3600 * 1000) },
  ]);

  const handleSubmit = () => {
    if (!shoeId) return navigation.goBack();
    const activity = {
      id: Date.now().toString(),
      type,
      sol,
      duree: Number(duree),
      hauteur: hauteur ? Number(hauteur) : null,
      date: useNow ? new Date().toISOString() : date.toISOString(),
    };
    if (onAddActivity) {
      onAddActivity(shoeId, activity);
    }
    setToast({ visible: true, message: 'Activité ajoutée !' });
    setTimeout(() => {
      navigation.goBack();
    }, 1200);
  };

  const handleImportActivity = (activity) => {
    setType(activity.type);
    setSol(activity.sol);
    setDuree(activity.duree.toString());
    setHauteur(activity.hauteur ? activity.hauteur.toString() : '');
    setDate(activity.date);
    setShowWatchModal(false);
    Alert.alert('Activité importée', 'Les champs ont été remplis automatiquement.');
  };

  const CustomMenu = ({ visible, options, onSelect, onClose, selectedValue }) => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.menuModal}>
        <View style={styles.menuContainer}>
          <FlatList
            data={options}
            keyExtractor={item => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.menuOption,
                  selectedValue === item.value && styles.menuOptionSelected,
                ]}
                onPress={() => {
                  onSelect(item.value);
                  onClose();
                }}
              >
                <Text style={styles.menuOptionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.menuCancel} onPress={onClose}>
            <Text style={styles.menuCancelText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un entraînement ou un match</Text>
      <Text style={styles.label}>Type d'activité</Text>
      <TouchableOpacity
        style={styles.menuInput}
        onPress={() => setShowTypeMenu(true)}
      >
        <Text style={styles.menuInputText}>
          {activityTypes.find(a => a.value === type)?.label || 'Choisir'}
        </Text>
      </TouchableOpacity>
      <CustomMenu
        visible={showTypeMenu}
        options={activityTypes}
        onSelect={setType}
        onClose={() => setShowTypeMenu(false)}
        selectedValue={type}
      />
      <Text style={styles.label}>Type de sol</Text>
      <TouchableOpacity
        style={styles.menuInput}
        onPress={() => setShowSolMenu(true)}
      >
        <Text style={styles.menuInputText}>
          {solTypes.find(s => s.value === sol)?.label || 'Choisir'}
        </Text>
      </TouchableOpacity>
      <CustomMenu
        visible={showSolMenu}
        options={solTypes}
        onSelect={setSol}
        onClose={() => setShowSolMenu(false)}
        selectedValue={sol}
      />
      <Text style={styles.label}>Durée (minutes)</Text>
      <TextInput
        style={styles.input}
        placeholder="Durée en minutes"
        placeholderTextColor="#223"
        value={duree}
        onChangeText={setDuree}
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => hauteurRef.current && hauteurRef.current.focus()}
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Hauteur de saut (cm, optionnel)</Text>
      <TextInput
        ref={hauteurRef}
        style={styles.input}
        placeholder="Hauteur moyenne de saut"
        placeholderTextColor="#223"
        value={hauteur}
        onChangeText={setHauteur}
        keyboardType="numeric"
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      <Text style={styles.label}>Date de l'activité</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TouchableOpacity
          style={[styles.dateButton, useNow && styles.dateButtonActive]}
          onPress={() => setUseNow(true)}
        >
          <Text style={[styles.dateButtonText, useNow && styles.dateButtonTextActive]}>Maintenant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dateButton, !useNow && styles.dateButtonActive]}
          onPress={() => setUseNow(false)}
        >
          <Text style={[styles.dateButtonText, !useNow && styles.dateButtonTextActive]}>Choisir</Text>
        </TouchableOpacity>
        {!useNow && (
          <TouchableOpacity style={styles.datePickerIcon} onPress={() => setShowDatePicker(true)}>
            <Text style={{ color: '#4caf50', fontSize: 18 }}>📅</Text>
          </TouchableOpacity>
        )}
      </View>
      {!useNow && (
        <Text style={{ color: '#fff', marginBottom: 8 }}>{date.toLocaleString()}</Text>
      )}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      <TouchableOpacity style={styles.validateButton} onPress={handleSubmit}>
        <Text style={styles.validateButtonText}>Valider</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowWatchModal(true)} style={styles.watchButton}>
        <Text style={styles.watchButtonText}>Voir les activités passées</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.importWatchButton} onPress={() => setShowWatchModal(true)}>
        <Text style={styles.importWatchButtonText}>Importer depuis la montre</Text>
      </TouchableOpacity>
      
      <Toast visible={toast.visible} message={toast.message} onHide={() => setToast({ visible: false, message: '' })} />

      <Modal visible={showWatchModal} transparent animationType="fade" onRequestClose={() => setShowWatchModal(false)}>
        <View style={styles.menuModal}>
          <View style={styles.menuContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Activités récentes</Text>
            <FlatList
              data={watchActivities}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.menuOption} onPress={() => handleImportActivity(item)}>
                  <Text style={styles.menuOptionText}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)} - {item.duree} min - {item.sol} - {item.date.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.menuCancel} onPress={() => setShowWatchModal(false)}>
              <Text style={styles.menuCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    marginTop: 40,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    backgroundColor: '#f5f5fa',
    color: '#222',
    borderRadius: 12,
    marginBottom: 20,
    height: 48,
    justifyContent: 'center',
  },
  validateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  validateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginRight: 8,
  },
  dateButtonActive: {
    backgroundColor: '#4caf50',
  },
  dateButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  dateButtonTextActive: {
    color: '#fff',
  },
  datePickerIcon: {
    marginLeft: 4,
  },
  menuModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    minWidth: 260,
    maxWidth: 320,
    elevation: 8,
  },
  menuOption: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuOptionSelected: {
    backgroundColor: '#e0f7fa',
  },
  menuOptionText: {
    fontSize: 16,
    color: '#222',
  },
  menuCancel: {
    marginTop: 8,
    alignItems: 'center',
  },
  menuCancelText: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuInput: {
    width: '100%',
    backgroundColor: '#f5f5fa',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    justifyContent: 'center',
  },
  menuInputText: {
    color: '#222',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginBottom: 18,
    marginTop: -10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  watchButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  watchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  importWatchButton: {
    backgroundColor: '#6C1D5F',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    marginBottom: 18,
    marginTop: -10,
  },
  importWatchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 24,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  activityItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityText: {
    color: '#fff',
    fontSize: 16,
  },
  importButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  importButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f44336',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
});

export default UpdateShoeScreen;
