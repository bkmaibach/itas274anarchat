import React, { useState, useEffect } from 'react';
import {
  StyleSheet, 
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  YellowBox,
  Keyboard,
  TouchableWithoutFeedback, } from 'react-native';
import { useSelector } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from "../Fire";
import { Header } from '@react-navigation/stack';
// import { conversations } from '../data/convoListQuery';
// import { categories } from '../data/dummyData';


const ConvoScreen = ({route, navigation}) => {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const { recipientId, title } = route.params;

  const [messages, setMessages] = useState([]);


  useEffect(() => {
      Fire.get(recipientId, message => 
        setMessages((previous) => (GiftedChat.append(previous, message))));
      return () => {
        Fire.off();
      }
  }, []);



  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior="padding"
        keyboardVerticalOffset={80}
        enabled>
          <GiftedChat
            messages={messages}
            onSend={(messages) => { Fire.send(recipientId, messages) }}
            user={{_id: Fire.uid, name: "Anonymous" }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create(
  {
    screen: {
      flex: 1
    }
  }
);

export default ConvoScreen;