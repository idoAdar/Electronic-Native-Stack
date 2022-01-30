import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async sessionData => {
  await AsyncStorage.setItem('userSessionData', JSON.stringify(sessionData));
};

export const fetchFromStorage = async () => {
  const userSession = await AsyncStorage.getItem('userSessionData');
  return JSON.parse(userSession);
};

export const clearStorage = () => {
  const keys = ['userSessionData'];
  AsyncStorage.multiRemove(keys);
};
