import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import QRCode from 'react-native-qrcode-svg'
import QRCodeScanner from 'react-native-qrcode-scanner';

const NewConvoScreen = ({}) => {
  const key = {
    "_id": "pCs9SGdPvAS59NmtnzuGVImTn132",
    "publicKey": "-----BEGIN PUBLIC KEY-----MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQByDYC+/YyKYQplZ17iAyMq1XGLOMIcfSlKQCPGkIZWqrQsgGlTlRNeJHgbwpcR15S1qtwkWszeaanrB1h4BQaVV3yf8wlerui+1p+Yv24ZyUaRCyzTPjwaedFJ6iVYP0UA0iBrZUWfeWxcNimM+AWGQioKFhdD7BvIzvn9LBOt0x571D2v7K2LmWZPvLgE/gvwLT85gvcENQ3hamGpFaZuupeWvzHUeChS8mz2/fmEX9RTV1OSwLmWb438x6pLJ0OuZlUtJWpoxS0tVlnIzBIyCE98a0hj+a6rVLevrtxoSwrL+/TaQuU41nB3TfiPenyStJa/f2grB8UAwqb8w4pJAgMBAAE=-----END PUBLIC KEY-----" 
  }
  const stringKey = JSON.stringify({key}).slice(7,-1)

  const onSuccess = (e) => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)  
    );
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