import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from "../Fire";
// import { conversations } from '../data/convoListQuery';
// import { categories } from '../data/dummyData';
/* LIAM: Create a list of all ongoing conversations that the user can choose from */
const ConvoScreen = ({route, navigation}) => {
  const { convoId, title } = route.params;
  const convo = useSelector(state => state.convos.convos);
  const selectedConvo = convo.find( convo => convo.id === convoId);
  const [messages, setMessages] = useState([]);

  const getUser = () => ({
    _id: Fire.uid,
    name: title as string
  })


  useEffect(() => {
      Fire.get(message => 
        setMessages((previous) => (GiftedChat.append(previous, message))));
  }, []);

  useEffect(() => {
    return () => {
      Fire.off();
    }
  }, []);

  const chat = <GiftedChat messages={messages} onSend={Fire.send} user={getUser()} />
  return (
    <KeyboardAvoidingView
      style={styles.avoidingView}
      behavior="padding"
      keyboardVerticalOffset={30}
      enabled>
        {chat}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create(
  {
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    avoidingView: {
      flex: 1
    }
  }
);

export default ConvoScreen;