// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveShoes = async (shoes) => {
  try {
    await AsyncStorage.setItem('SNEAKSTATE_SHOES', JSON.stringify(shoes));
  } catch (e) {
    // handle error
  }
};

export const loadShoes = async () => {
  try {
    const data = await AsyncStorage.getItem('SNEAKSTATE_SHOES');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};
