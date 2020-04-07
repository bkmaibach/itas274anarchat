import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import ConvoListTile from '../components/ConvoListTile';
import Contact from '../Contact';
import { IContact } from '../types';

// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoListScreen = ({navigation}) => {

  const convos = useSelector(state => state.convos.convos);
  const [contacts, setContacts] = useState<IContact[]>([]);

  useEffect(() => {
    const contacts = Contact.getRows().then( (rows) => {
      // console.log("OBTAINED CONTACTS: " + JSON.stringify(rows['item'](0), null, 2));
      for (let i = 0; i < rows.length; i++) {
        let row = rows['item'](i);
        setContacts( (previous) => previous.concat(row) );
      }
    } ).catch();
    return () => {
    }
  }, [])

  const renderListItem = (itemData) => {
    return <ConvoListTile 
      title={itemData.item.name}
      onSelect={() => { navigation.navigate('Convo', {
        recipientId: itemData.item._id,
        publicKey: itemData.item.publicKey,
        title: itemData.item.name
      })}}
    />
    };

  return (
    <View style={styles.screen}>
      <FlatList data={contacts} renderItem={renderListItem} />
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