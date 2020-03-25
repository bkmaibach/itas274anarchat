import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';

const ConvoListTile = ({title, onSelect}) => {
  return ( 
    <TouchableOpacity
      style={styles.listItem}
      onPress={onSelect}>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Image style={styles.imageStyle} source={require('../assets/defaultImg.jpg')}></Image>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', position: 'absolute', top: 50}}>
          <Text style={styles.summaryText}>This is where your newest messages would appear</Text>
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
      fontWeight: 'bold',
      marginLeft: 150,
      fontSize: 35,
    },
    summaryText: {
      marginLeft: 100,
    }
  }
);

export default ConvoListTile;