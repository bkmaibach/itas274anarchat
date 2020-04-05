import firebase from 'firebase';
import { RSA, RSAKeychain } from 'react-native-rsa-native';
import { IMessage } from "./types"
import { AsyncStorage } from 'react-native';
const keyTag = "net.keither.keys";

class Fire {

  publicKey;
  privateKey;
  test;

  constructor() {
    //console.log("CONSTRUCTING FIRE");
    this.init();
    this.checkAuth();

  }

  storeKeys = async () => {
    const keyPair = await RSA.generateKeys(2048);
    const storeString = JSON.stringify(keyPair);
    try {
      await AsyncStorage.setItem(keyTag, storeString);
      this.publicKey = keyPair.public;
      this.privateKey = keyPair.private;
    } catch (error) {
      console.log(error);
    }
  };

  initKeys = async () => {
    try {
      const value = await AsyncStorage.getItem(keyTag);
      if (value !== null) {
        const keyPair = JSON.parse(value);
        this.publicKey = keyPair.public;
        this.privateKey = keyPair.private;
        console.log(value);
      } else {
        await this.storeKeys();
      }
    } catch (error) {
      console.log(error);
    }
  };

  init = async () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDaOvZWpTUAo3g0CxOruMVG4rxtEhEXEuw",
        authDomain: "anarchat-b800b.firebaseapp.com",
        databaseURL: "https://anarchat-b800b.firebaseio.com",
        projectId: "anarchat-b800b",
        storageBucket: "anarchat-b800b.appspot.com",
        messagingSenderId: "68448122217",
        appId: "1:68448122217:web:1501e0e46275eec4c439f8",
        measurementId: "G-EFHSQKM5K1"
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged( user => {
      if (!user) { firebase.auth().signInAnonymously(); }
    });
  };

  // TEMPORARY DUMMY FUNCTION
  getPublicKey(uid){
    return this.publicKey;
  }

  send = (toId, messages) => {
    // console.log("SENDING MESSAGES: " + JSON.stringify(messages, null, 2));

    messages.forEach( async item => {
      const signature = await RSA.sign(item.text, this.privateKey);
      const publicKey = this.getPublicKey(toId);
      const cypherText = await RSA.encrypt(item.text, publicKey)
      const message = {
        text: cypherText,
        signature,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      }
      this.getConvo(toId).push(message);
    });
  }

  get = async (fromId, callback) => {
    await this.initKeys();
    console.log("MY PUBKEY: " + this.publicKey);
    this.getConvo(fromId).on('child_added', async (snapshot) => {
      console.log("KEY TAG: " + keyTag);
      console.log("CHILD ADDED, SNAPSHOT IS " + JSON.stringify(snapshot, null, 2));
      try {
        const {key: _id} = snapshot;
        const {user, timestamp, text, signature} = snapshot.val();
        const createdAt = new Date(timestamp);
        const signedText = await RSA.decrypt(text, this.privateKey);
        // const signedText = text;
        console.log("SIGNED TEXT:" + signedText);
  
        const warning = await RSA.verify(signature, signedText, this.getPublicKey(user._id)) ?
        "AUTHENTICATED " : "**WARNING** - THE SOURCE OF THIS MESSAGE COULD NOT BE VERIFIED AND IS LIKELY FRAUDULENT: ";
  
        const message = {
          _id,
          createdAt,
          text: warning + signedText,
          user
        };
        callback(message);
  
      } catch (err) {
        console.log("PARSE ERROR ENCOUNTERED!");
        console.log(err.message);
      }
    });
  };

  off (secondId) {
    this.getConvo(secondId).off();
  };

  get db() {
    return firebase.database().ref("convos");
  };

  getConvo(secondId: string) {
    //console.log("MY UID IS " + this.uid);
    const convoId = [this.uid, secondId].sort().join();
    return this.db.child(convoId);
  };

  get uid() {
    return (firebase.auth().currentUser.uid);
  }
}

export default new Fire();