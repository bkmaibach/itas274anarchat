import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const ConvoListTile = ({title, onSelect}) => {
  return ( 
    <TouchableOpacity
      style={styles.listItem}
      onPress={onSelect}>
      <View><Text>{title}</Text></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create(
  {
    listItem: {
      backgroundColor: Colors.neutral,
      //flex: 1,
      margin: 15,
      height: 100,
      alignItems: 'stretch',
    },
  }
);

export default ConvoListTile;