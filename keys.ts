import { AsyncStorage } from 'react-native';
import { RSA, RSAKeychain } from 'react-native-rsa-native';
import { IKeyPair } from './types'; 
const keyTag = "net.keither.keys";

const storeKeys = async () => {
  const keyPair = await RSA.generateKeys(2048);
  const storeString = JSON.stringify(keyPair);
  try {
    AsyncStorage.setItem(keyTag, storeString);
    return keyPair;
  } catch (error) {
    console.log(error);
  }
};

const getKeys = async (): Promise<KeyPair> => {
  try {
    const value = await AsyncStorage.getItem(keyTag);
    if (value !== null) {
      const keyPair = JSON.parse(value);
      console.log(value);
      return keyPair;
    } else {
      return await storeKeys();
    }
  } catch (error) {
    console.log(error);
  }
};

export default getKeys;