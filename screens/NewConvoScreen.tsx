import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg'

const NewConvoScreen = ({}) => {
  const key = {
    "_id": "pCs9SGdPvAS59NmtnzuGVImTn132",
    "publicKey": "-----BEGIN PUBLIC KEY-----MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQByDYC+/YyKYQplZ17iAyMq1XGLOMIcfSlKQCPGkIZWqrQsgGlTlRNeJHgbwpcR15S1qtwkWszeaanrB1h4BQaVV3yf8wlerui+1p+Yv24ZyUaRCyzTPjwaedFJ6iVYP0UA0iBrZUWfeWxcNimM+AWGQioKFhdD7BvIzvn9LBOt0x571D2v7K2LmWZPvLgE/gvwLT85gvcENQ3hamGpFaZuupeWvzHUeChS8mz2/fmEX9RTV1OSwLmWb438x6pLJ0OuZlUtJWpoxS0tVlnIzBIyCE98a0hj+a6rVLevrtxoSwrL+/TaQuU41nB3TfiPenyStJa/f2grB8UAwqb8w4pJAgMBAAE=-----END PUBLIC KEY-----" 
  }
  const stringKey = JSON.stringify({key}).slice(7,-1)
  return(
    <View style={styles.qrCode}>
    
      <QRCode
        value={stringKey}
        size={300}
      />
    </View>
  );
};

const styles = StyleSheet.create(
  {
    qrCode: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
);

export default NewConvoScreen;