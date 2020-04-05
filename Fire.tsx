import firebase from 'firebase';
import { RSA, RSAKeychain } from 'react-native-rsa-native';
import { IMessage } from "./types"
const keyTag = "com.anarchat.mykey";

class Fire {

  pubKey;
  test;

  constructor() {
    //console.log("CONSTRUCTING FIRE");
    this.init();
    this.checkAuth();
    this.initKeys();
    this.test = null;
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

  initKeys = async () => {
    const pubKeyObject = await RSAKeychain.generateKeys(keyTag, 2048);
    this.pubKey = pubKeyObject.public;
    // console.log("MY PUBLIC KEY IS: " + this.pubKey);
  }

  // TEMPORARY DUMMY FUNCTION
  getPublicKey(uid){
    //console.log("RETURNING PUBKEY" + this.pubKey);
    return this.pubKey;
  }

  send = (toId, messages) => {
    // console.log("SENDING MESSAGES: " + JSON.stringify(messages, null, 2));

    messages.forEach( async item => {
      //console.log("ITEM " + JSON.stringify(item));
      const signature = await RSAKeychain.sign(item.text, keyTag)
      const publicKey = this.getPublicKey(toId);
      const cypherText = await RSA.encrypt(item.text, publicKey)
      //console.log("CYPHER TEXT SENT: " + cypherText);
      const message = {
        text: cypherText,
        signature,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      }
      
      //console.log("MESSAGE " + JSON.stringify(message));
      this.getConvo(toId).push(message);
    });
  }

  parse = async message => {
    try {
      // console.log("IN PARSE");
      const {key: _id} = message;
      // console.log("MESSAGE IS: " + JSON.stringify(message, null, 2));
      // console.log("MESSAGE KEY IS: " + message.key);
      const {user, timestamp, text, signature} = message.val();
      const createdAt = new Date(timestamp);
      // console.log(JSON.stringify(message.val(), null, 2));
      // console.log("MESSAGE VALUE IS " + JSON.stringify(message, null, 2));

      // console.log("TEXT LENGTH IS " + text.length);
      // console.log("KEY TAG IS " + keyTag);
      if (!this.test){
        this.test = message.text;
      } else {
        console.log(this.test == message.text ? "TEXT IS THE SAME" : "TEXT IS DIFFERENT");
      }

      const signedText = await RSAKeychain.decrypt(text, keyTag);
      // const signedText = text;
      console.log("SIGNED TEXT:" + signedText);

      // const warning = await RSA.verify(signature, signedText, this.getPublicKey(user._id)) ?
      // "AUTHENTICATED " : "**WARNING** - THE SOURCE OF THIS MESSAGE COULD NOT BE VERIFIED AND IS LIKELY FRAUDULENT: ";
      const warning = "";

      const returnVal = {
        _id,
        createdAt,
        text: warning + signedText,
        user
      };
      // console.log("RETURNING " + JSON.stringify(returnVal, null, 2) );
      return returnVal;

    } catch (err) {
      console.log("PARSE ERROR ENCOUNTERED!");
      console.log(err.message);
    }
  };


  get = (fromId, callback) => {
    
    this.getConvo(fromId).on('child_added', async (snapshot) => {
      // console.log("CHILD ADDED, SNAPSHOT IS " + JSON.stringify(snapshot, null, 2));
      const callbackWith = await this.parse(snapshot);
      // console.log("CALLING BACK WITH " + JSON.stringify(callbackWith, null, 2));
      callback(callbackWith);
    });
  };

  off () {
    this.db.off();
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