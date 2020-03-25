import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import ConvoListTile from '../components/ConvoListTile';

// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoListScreen = ({navigation}) => {

  const convosList = useSelector(state => state.convos.convosList);

  const renderListItem = (itemData) => {
    return <ConvoListTile 
      title={itemData.item.contact}
      onSelect={() => { navigation.navigate('Convo', {
        convoId: itemData.item.id,
        title: itemData.item.contact
      })}}
    />
    };

  return (
    <View style={styles.screen}>
      <FlatList data={convosList} renderItem={renderListItem} />
    </View>
  );
}

const styles = StyleSheet.create(
  { 
    screen: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center'
    }
  }
);

export default ConvoListScreen;