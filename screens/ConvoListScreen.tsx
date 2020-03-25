import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoListScreen = ({navigation}) => {

  const renderListItem = (itemData) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => {navigation.navigate('Convo')}}>
      <View><Text>{itemData.item.title}</Text></View>
    </TouchableOpacity>
  );

  return (
    <>
    <Text>Hello From ConvoListScreen!</Text>
    <FlatList data={[{item: {title: "Something goes here"}}]} renderItem={renderListItem} />
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