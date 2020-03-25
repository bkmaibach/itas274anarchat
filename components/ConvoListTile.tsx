import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ConvoListTile = ({title, onSelect}) => {
  return ( 
    <TouchableOpacity
      style={styles.gridItem}
      onPress={onSelect}>
      <View><Text>{title}</Text></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create(
  {
    gridItem: {
      backgroundColor: 'grey',
      flex: 1,
      margin: 15,
      height: 100
    },
  }
);

export default ConvoListTile;