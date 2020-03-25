import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { conversations } from '../data/dummyData';
import { enableScreens } from 'react-native-screens';
import ConvoListTile from '../components/ConvoListTile';

enableScreens();
// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoListScreen = ({navigation}) => {

  const renderListItem = (itemData) => (
    <ConvoListTile 
      title={itemData.item.contact}
      onSelect={() => { navigation.navigate('Convo', {
        convoId: itemData.item.id,
        title: itemData.item.contact
      })}}
    />
  );

  return (
    <View style={{flex: 1}}>
      <FlatList data={conversations} renderItem={renderListItem} />
    </View>
  );
}

const styles = StyleSheet.create(
  {
    imageStyle: {
      height: 55,
      width: 55,
      margin: 20,
      borderWidth: 2,
      borderColor: '#000000',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      // textAlign: 'right',
      //marginLeft: 150,
      margin: 25,
      fontSize: 35,
    },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }

  }
);

export default ConvoListScreen;