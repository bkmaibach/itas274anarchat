import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { conversations } from '../data/dummyData';
// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoScreen = ({route, navigation}) => {
  const { convoId } = route.params;
  const selectedConvo = conversations.find( convo => convo.id === convoId);
  return (
    <View style={styles.screen}>
      <Text>Hello From ConvoScreen!</Text>
      <Text>Showing conversation with contact: {selectedConvo.contact}</Text>
    </View>
  );
}

ConvoScreen.navigationOptions = (navigationData) => {
  const convoId = navigationData.navigation.getParam('convoId');
  const selectedConvo = conversations.find( convo => convo.id === convoId);

  return {
    headerTitle: selectedConvo.contact
  };
};


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