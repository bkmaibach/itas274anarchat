import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Fire from "../Fire";
import getKeys from "../keys";
import AsyncStorage from '@react-native-community/async-storage';
import Contact from '../Contact';

const NewConvoScreen = ({navigation}) => {

  const [publicKey, setPublicKey] = useState("");
  const [name, setName] = useState("")

  var handleName = (enteredName) => {
    setName(enteredName)
    console.log(name);
  }
  const onSuccess = async (e) => {
    try {
      const qrString = e.data.replace("\"", "");
      console.log("OBTAINED QR STRING: " + qrString);

      const [id, publicKey] = qrString.split(",");
      console.log("SAVING ID " + id);
      console.log("SAVING PUBLIC KEY " + publicKey);
      const chosenName = name !+ "" ? name : "Anonymous";
      await Contact.addRow(id, publicKey, chosenName);
      navigation.navigate('ConvoList');
    } catch (err) {
      console.log("Key did not save" + err);
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

  const qrData = Fire.uid+","+publicKey;
  const stringData = JSON.stringify(qrData);
  // console.log(stringData);

  return(
    <View style={styles.screen}>
      <TextInput value={name} placeholder="Enter name here" onChangeText={name => handleName(name)} />
      <View style={styles.qrCode}>
        <QRCode
          value={stringData}
          size={330}
        />
      </View>
      <QRCodeScanner
          onRead={onSuccess}
          cameraStyle={styles.camera}
        />
    </View>
  );
};

const styles = StyleSheet.create(
  {
    screen: {
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    qrCode: {
      alignItems: 'center',
      paddingBottom: 30,

    },
    camera: {
      width: '80%',
      alignSelf: 'center',
    }

  }
);

export default NewConvoScreen;