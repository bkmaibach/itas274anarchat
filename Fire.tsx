import firebase from 'firebase';
import { IMessage } from "./types"
import { AsyncStorage } from 'react-native';
import getKeys from './keys';
import { RSA, RSAKeychain } from 'react-native-rsa-native';

class Fire {

  publicKey;
  privateKey;
  test;
  idToPubKeyMap;

  constructor() {
    //console.log("CONSTRUCTING FIRE");
    this.init();
    this.checkAuth();
    this.idToPubKeyMap = [];
    getKeys().then((keyPair) => {
      this.publicKey = keyPair.public;
      this.privateKey = keyPair.private;
    }).catch((err) => {
      console.log("Error retrieving keys: " + err)
    });

  }


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
    if (uid == this.uid) return this.publicKey;
    return this.idToPubKeyMap[uid];
  }

  send = (toId, publicKey, messages) => {
    console.log("SENDING MESSAGES: " + JSON.stringify(messages, null, 2));
    messages.forEach( async item => {
      const breakDown = publicKey.split("\\n");
      publicKey = breakDown.join("\n");
      console.log("PUBLIC KEY " + publicKey);
      this.idToPubKeyMap[toId] |= publicKey;
      const signature = await RSA.sign(item.text, this.privateKey);
      // const publicKey = this.getPublicKey(toId);
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

  get = async (recipientId, publicKey, callback) => {
    console.log("IN GET");
    this.idToPubKeyMap[recipientId] |= publicKey;
    // console.log("MY PUBKEY: " + this.publicKey);
    this.getConvo(recipientId).on('child_added', async (snapshot) => {
      // console.log("CHILD ADDED, SNAPSHOT IS " + JSON.stringify(snapshot, null, 2));
      try {
        console.log("IN TRY");
        const {key: _id} = snapshot;
        const {user, timestamp, text, signature} = snapshot.val();
        const createdAt = new Date(timestamp);
        console.log("FROM ID: " + recipientId);
        console.log("MY ID: " + this.uid);
        if (recipientId != this.uid) {
          console.log("MESSAGE WAS SENT BY ME");
          // The recipients private key is needed to run the decryption line, which this client
          // Does not have access to.
          // A new database table might be needed to store sent messages for future reference
          const message = {
            _id,
            createdAt,
            text: "LOCKED FOR RECIPIENT",
            user
          };
          callback(message);
        } else {
          const signedText = await RSA.decrypt(text, this.privateKey);
          console.log("IN GET22");
          // const signedText = text;
          // console.log("SIGNED TEXT:" + signedText);
    
          const warning = await RSA.verify(signature, signedText, this.getPublicKey(user._id)) ?
          "AUTHENTICATED " : "**WARNING** - THE SOURCE OF THIS MESSAGE COULD NOT BE VERIFIED AND IS LIKELY FRAUDULENT: ";
          console.log("AFTER VERIFY");
          const message = {
            _id,
            createdAt,
            text: warning + signedText,
            user
          };
          callback(message);
        }
  
      } catch (err) {
        console.log("GET ERROR ENCOUNTERED!");
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