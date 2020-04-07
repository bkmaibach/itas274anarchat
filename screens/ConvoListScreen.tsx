import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import ConvoListTile from '../components/ConvoListTile';
import Contact from '../Contact';

// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoListScreen = ({navigation}) => {

  const convos = useSelector(state => state.convos.convos);

  useEffect(() => {
    const contacts = Contact.getRows().then( (rows) => {
      console.log("OBTAINED CONTACTS: " + JSON.stringify(rows, null, 2));
    } ).catch();
    return () => {

    }
  }, [])

  const renderListItem = (itemData) => {
    return <ConvoListTile 
      title={itemData.item.contact}
      onSelect={() => { navigation.navigate('Convo', {
        recipientId: itemData.item.id,
        title: itemData.item.contact
      })}}
    />
    };

  return (
    <View style={styles.screen}>
      <FlatList data={convos} renderItem={renderListItem} />
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