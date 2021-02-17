import AsyncStorage from "@react-native-community/async-storage";

export const storeAsyncStorageData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("storeAsyncStorageData error", error);
  }
};

export const retrieveAsyncStorageData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log("retrieveAsyncStorageData error", error);
    return null;
  }
};

export const removeAsyncStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("storeAsyncStorageData error", error);
  }
};

export default { storeAsyncStorageData, retrieveAsyncStorageData };
