// AddShoeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from '../components/Toast';

const AddShoeScreen = ({ navigation, onAddShoe }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [submitting, setSubmitting] = useState(false);

  // Correction : demander la permission et utiliser launchImageLibraryAsync si launchCameraAsync échoue
  const pickImage = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      setError('Permission caméra refusée');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    } else if (result.canceled) {
      setError('Prise de photo annulée');
    }
  };

  // Nouvelle fonction pour choisir entre galerie et appareil photo
  const pickImageMenu = async () => {
    setError('');
    Alert.alert(
      'Ajouter une photo',
      'Choisissez une option',
      [
        {
          text: 'Prendre une photo',
          onPress: async () => {
            let permCam = await ImagePicker.requestCameraPermissionsAsync();
            if (permCam.status !== 'granted') {
              setError('Permission caméra refusée');
              return;
            }
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.7,
            });
            if (!result.canceled && result.assets && result.assets.length > 0) {
              setImage(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Choisir dans la galerie',
          onPress: async () => {
            let permGal = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permGal.status !== 'granted') {
              setError('Permission galerie refusée');
              return;
            }
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.7,
            });
            if (!result.canceled && result.assets && result.assets.length > 0) {
              setImage(result.assets[0].uri);
            }
          },
        },
        { text: 'Annuler', style: 'cancel' },
      ]
    );
  };

  const handleSubmit = () => {
    if (submitting) return;
    if (!name || !brand) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setSubmitting(true);
    const newShoe = {
      id: Date.now().toString(),
      name,
      brand,
      image,
      life: 100,
      activities: [],
    };
    if (onAddShoe) {
      onAddShoe(newShoe);
    }
    setToast({ visible: true, message: 'Chaussure ajoutée !' });
    setTimeout(() => {
      setSubmitting(false);
      navigation.goBack();
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une chaussure</Text>
      <Text style={styles.label}>Nom de la chaussure</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de la chaussure"
        placeholderTextColor="#223"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Marque</Text>
      <TextInput
        style={styles.input}
        placeholder="Marque"
        placeholderTextColor="#223"
        value={brand}
        onChangeText={setBrand}
      />
      <TouchableOpacity style={styles.photoButton} onPress={pickImageMenu}>
        <Text style={styles.photoButtonText}>{image ? 'Changer la photo' : 'Ajouter une photo'}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.preview} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.validateButton} onPress={handleSubmit} disabled={submitting}>
        <Text style={[styles.validateButtonText, submitting && { opacity: 0.5 }]}>Valider</Text>
      </TouchableOpacity>
      <Toast visible={toast.visible} message={toast.message} onHide={() => setToast({ visible: false, message: '' })} />
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
    color: '#1a2636',
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 2,
  },
  input: {
    width: '90%',
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#0a2342',
  },
  photoButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#0a2342',
    fontWeight: 'bold',
    fontSize: 16,
  },
  preview: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 4,
  },
  validateButton: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 10,
  },
  validateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default AddShoeScreen;
