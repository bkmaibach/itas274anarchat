import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { conversations } from '../data/dummyData';
// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoListScreen = ({navigation}) => {

  const renderListItem = (itemData) => (

    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {navigation.navigate({
        routeName: 'Convo',
        params: {
          convoId: itemData.item.id
        }
      })}}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Image style={styles.imageStyle} source={require('../assets/defaultImg.jpg')}></Image>
        <Text style={styles.textStyle}>{itemData.item.contact}</Text>
      </View>

    </TouchableOpacity>
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
    gridItem: {
      backgroundColor: '#b2b2b2',
      //flex: 1,
      margin: 15,
      height: 100,
      alignItems: 'stretch',
    },
  }
);

export default ConvoListScreen;