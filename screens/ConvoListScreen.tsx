import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { conversations } from '../data/dummyData';
// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoListScreen = ({navigation}) => {

  const renderListItem = (itemData) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => {navigation.navigate('Convo')}}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Image style={styles.imageStyle} source={require('../assets/defaultImg.jpg')}></Image>
        <Text style={styles.textStyle}>{itemData.item.contact}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    <FlatList data={conversations} renderItem={renderListItem} />
    </>
  );
}

const styles = StyleSheet.create(
  {
    imageStyle: {
      height: 45,
      width: 45,
      margin: 25,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'right',
      margin: 25,
      fontSize: 35,
    },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    gridItem: {
      backgroundColor: 'grey',
      flex: 1,
      margin: 15,
      height: 100
    },
  }
);

export default ConvoListScreen;