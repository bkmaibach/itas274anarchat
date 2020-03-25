import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
// import { conversations } from '../data/convoListQuery';
// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoScreen = ({route, navigation}) => {
  const { convoId, title } = route.params;
  const convo = useSelector(state => state.convos.convos);
  const selectedConvo = convo.find( convo => convo.id === convoId);
  return (
    <View style={styles.screen}>
      <Text>{JSON.stringify(selectedConvo, null, 2)}</Text>
    </View>
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

export default ConvoScreen;