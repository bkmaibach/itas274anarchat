import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg'
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-community/async-storage';

const NewConvoScreen = ({}) => {
  const [name, setName] = useState("")

  var handleName = (enteredName) => {
    setName(enteredName)
    console.log(name);
  }

  const key = {
    "_id": "pCs9SGdPvAS59NmtnzuGVImTn132",
    "publicKey": `-----BEGIN PUBLIC KEY-----
    MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQByDYC+/YyKYQplZ17iAyMq
    1XGLOMIcfSlKQCPGkIZWqrQsgGlTlRNeJHgbwpcR15S1qtwkWszeaanrB1h4BQaV
    V3yf8wlerui+1p+Yv24ZyUaRCyzTPjwaedFJ6iVYP0UA0iBrZUWfeWxcNimM+AWG
    QioKFhdD7BvIzvn9LBOt0x571D2v7K2LmWZPvLgE/gvwLT85gvcENQ3hamGpFaZu
    upeWvzHUeChS8mz2/fmEX9RTV1OSwLmWb438x6pLJ0OuZlUtJWpoxS0tVlnIzBIy
    CE98a0hj+a6rVLevrtxoSwrL+/TaQuU41nB3TfiPenyStJa/f2grB8UAwqb8w4pJ
    AgMBAAE=
    -----END PUBLIC KEY-----`
  }

  const stringKey = JSON.stringify(key);

  const onSuccess = async (e) => {
    try {
      var e = JSON.parse(e);
      e.name = name;
      e = JSON.stringify(e);
      await AsyncStorage.setItem(e.data._id,e.data);
      console.log(e.data);
    } catch (e) {
      console.log("Key did not save" + e)
    }
  };

  return(
    <>
      <View  style={styles.qrCode}>
        <QRCode
          value={stringKey}
          size={300}
        />
      </View>
      <View>
        <QRCodeScanner
          onRead={onSuccess}
          cameraStyle={{ height: 200, marginTop: 20, width: 200, alignSelf: 'center', justifyContent: 'center' }}
        />
        <TextInput value={name} placeholder="something" onChangeText={name => handleName(name)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create(
  {
    qrCode: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 30,
      paddingTop: 20
    }

  }
);

export default NewConvoScreen;