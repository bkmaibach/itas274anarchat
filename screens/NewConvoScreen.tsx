import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Fire from "../Fire";
import getKeys from "../keys";


const NewConvoScreen = ({}) => {

  const [publicKey, setPublicKey] = useState("");

  const onSuccess = (e) => {
    const data = e.data;
    console.log(data);
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)  
    // );
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