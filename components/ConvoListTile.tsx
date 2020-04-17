import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';

const ConvoListTile = ({title, onSelect, onDelete, summaryText}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={onSelect}
      onLongPress={onDelete}
    >
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.imageStyle} source={require('../assets/defaultImg.jpg')}></Image>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', position: 'absolute', top: 50}}>
          <Text style={styles.summaryText}>{summaryText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create(
  {
    imageStyle: {
      height: 55,
      width: 55,
      margin: 20,
      marginBottom: 1,
      borderWidth: 2,
      borderColor: '#000000',
    },
    listItem: {
      backgroundColor: Colors.neutral,
      margin: 8,
      height: 100,
      alignItems: 'stretch',
    },
    headerText: {
      color: 'white',
      flexWrap: 'wrap',
      fontWeight: 'bold',
      marginLeft: 50,
      fontSize: 35,
      marginBottom: 50
    },
    summaryText: {
      marginLeft: 100,
    }
  }
);

export default ConvoListTile;