import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Fire from "../Fire";
import getKeys from "../keys";
import AsyncStorage from '@react-native-community/async-storage';

const NewConvoScreen = ({}) => {

  const [publicKey, setPublicKey] = useState("");
  const [name, setName] = useState("")

  var handleName = (enteredName) => {
    setName(enteredName)
    console.log(name);
  }
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

  useEffect(() => {
    console.log("USING EFFECT FOR KEY RETRIEVAL");
    getKeys().then( (keys) => {
      setPublicKey(keys.public);
    }).catch( (err) => {
      console.log(err);
    });
  }, []);

  const qrData = {_id: Fire.uid, publicKey};
  const stringData = JSON.stringify(qrData);
  console.log(stringData);

  return(
    <>
      <View style={styles.qrCode}>
        <QRCode
          value={stringData}
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