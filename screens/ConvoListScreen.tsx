import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { conversations } from '../data/dummyData';
// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoListScreen = ({navigation}) => {

  const renderListItem = (itemData) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => {navigation.navigate('Convo')}}>
      <View><Text>{itemData.item.contact}</Text></View>
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
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    gridItem: {
      backgroundColor: 'grey',
      flex: 1,
      margin: 15,
      height: 150
    },
  }
);

export default ConvoListScreen;