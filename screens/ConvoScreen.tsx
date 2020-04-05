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
  // const mockMessages = {
  //   "-M47Jyd0r-oOisHtC_X9" : {
  //     "signature" : "XvRcxZKWuY9wsunKYMbuPs0jsCaVdjCIyQYSLUFgGRmCkcHxelMxYVME3+4qlui/OnEBTK2uO+hy\ngSnkfPhQMXAFSXhmxpGBGXbYReQzsaIsIMl5kSDQx948/4lxYG4GzKga6iR2emZ7kuZMuJnSrB0e\nyFoMm5j13Bx6VY83SQj6L5eqDwsnR2yx0A5z44YQpwqcU7o3ageWKhulZ7BiztrGwB7fFFZZh5Gy\nOdizh2f8wh7LFDbQIoqxQAKH2v4yxMl8vkBFIBi0v4vfCsQeWEXJqTWdzpP6msYnXjJISrlRdkYY\nakbTI9/HNmmxxQHpKA501M2Vl2BPmQBU5h1NZA==\n",
  //     "text" : "hrKCUwi+oNBudQDjN0cCQlH12P8nsbZ0mht1XczbUb7SKfaqC2V2FJ+GDo115PKgrfx3ukLyG8Bp\nqZsM6GfVL8R3zOTGA1/+VMr2QMtdsKma/hbO/2L98ZsYP9uDU4JjuFRGeW/ZTR4QfYXn6cn37O7K\nsQwGZCn3DFuiOMMjyzNbV4nnyZvwfdScMe3LgJu2ZajaCQp34LJHQlLvQEGH0HhYtaq4TvIzH3DV\nSXCvpZlXr7wIv6Ngdv7/WZJVPYCJUx8jZCPTL3sr89rgq+qjOnJF5jQBjQh8olqCPCo/uZCKrkcf\niIGFEOaKiHmLhe2sQb9bgj58UwEGPGTF8pWIhg==\n",
  //     "timestamp" : 1586056391307,
  //     "user" : {
  //       "_id" : "pCs9SGdPvAS59NmtnzuGVImTn132",
  //       "name" : "Anonymous"
  //     }
  //   },
  //   "-M47KVP9gB6BMma-wnFW" : {
  //     "signature" : "OFmTaUuAhbfaJaQlKZ9cLZ9gZ8YiUCv5PEnJB34DTiUdkWWOb/rOgElBH1dZWxdgGW3GH99tKbjm\ndxBrv0CWs7xy/JgUynNwAaT5odjZgWOX+lWNKDw3zUVCFuk1ogh8NUtEcK74BlsoV7mDR+mPXnQH\nTWiaDMtbYlkJ+vFSryOCB6Ude+/VcPqQiz/ODHIR/0VH72OBo/f/+cCpfhde9buiktmmKU7ruYLy\ngAXooZJdtbifKtFlC+soL1yrfXdWxJ0oIx/NbZSXmThRHhnMvak/jdJbHFSJrUrtV9L8X0IRawI/\n7uoYxEXwRAqSRgvg++QNiqdVLZ5ayP73Dq7QyQ==\n",
  //     "text" : "g2YZAwTArMzTrErQXpkdnMUjJ1v+d/nEqR6N64q+aCfolEUY8sOlgSZCyeeXXirBh7AYi/I22K4d\nbyaDpJgTqtpoqnvA71bgaUNWAZw4gdurRcruHWqT6MeVHtD12aASuHqfyNAjRTCkIiWSz8PrnTr9\nN6vDn7ObdlgTRlrmKk4Gx5dBHfqTrvcjoa6XAK17xL+vqgesA0YsGUpU/+Xyo7srhhBqjeNebLq2\nBhn6aUJmqMiPOuSOYyVXAMbCHUXHhcJMkfrwVlt8xiH8B2Jx8JO6inDUOEVTLq8sfu/X9En7VXe2\ndE2o7t8S5/boR6tvj15/ac4weUNHWQ8LLg0Lww==\n",
  //     "timestamp" : 1586056529626,
  //     "user" : {
  //       "_id" : "pCs9SGdPvAS59NmtnzuGVImTn132",
  //       "name" : "Anonymous"
  //     }
  //   },
  //   "-M47KXfTwq4p_or7D6td" : {
  //     "signature" : "OFmTaUuAhbfaJaQlKZ9cLZ9gZ8YiUCv5PEnJB34DTiUdkWWOb/rOgElBH1dZWxdgGW3GH99tKbjm\ndxBrv0CWs7xy/JgUynNwAaT5odjZgWOX+lWNKDw3zUVCFuk1ogh8NUtEcK74BlsoV7mDR+mPXnQH\nTWiaDMtbYlkJ+vFSryOCB6Ude+/VcPqQiz/ODHIR/0VH72OBo/f/+cCpfhde9buiktmmKU7ruYLy\ngAXooZJdtbifKtFlC+soL1yrfXdWxJ0oIx/NbZSXmThRHhnMvak/jdJbHFSJrUrtV9L8X0IRawI/\n7uoYxEXwRAqSRgvg++QNiqdVLZ5ayP73Dq7QyQ==\n",
  //     "text" : "Mcl3xwKJY4LjfG6FgJwzMG1jFpnH9ePGCBSB0AG5KPwLzKefFII1H2TZxF2KECy6YWZQR9z4gES6\nCBCwIZ8V7Q/I1qfHppnErNxb2ApyP/eJjo/3Waaao/1jKI3fw2yYPB7UyMfbv8jRzmrBdNNH73Bx\nuqgRP0QGx3uuMOHwGu7dtZy/s9x/dupeY6R7CCIojvXK5HUK5YptLCwghqyywWZD0rOQYhdB2kE8\n3onMmVYTcs5jwRi1fHtfuJSgsG0K1Ex8v8Zer3+0+xN6IzirdXVJdsqvTucqtX4asho6q/cHWUMH\n0ejUda55inzEwwkkvzHZKuNohB05b3ZI5H/8pQ==\n",
  //     "timestamp" : 1586056539616,
  //     "user" : {
  //       "_id" : "pCs9SGdPvAS59NmtnzuGVImTn132",
  //       "name" : "Anonymous"
  //     }
  //   }
  // }

  useEffect(() => {
    console.log("USING EFFECT");
    // Fire.send(recipientId, messages)
    Fire.get(recipientId, message => {
      // console.log("GOT MESSAGE " + JSON.stringify(message, null, 2));
      return setMessages((previous) => (GiftedChat.append(previous, message)))
    });
    return () => {
      Fire.off(recipientId);
    }
  }, []);



  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior="padding"
        keyboardVerticalOffset={-200}
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