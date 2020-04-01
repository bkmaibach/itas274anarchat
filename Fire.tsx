import firebase from 'firebase';
import { RSA, RSAKeychain } from 'react-native-rsa-native';
const keyTag = "com.anarchat.mykey";

class Fire {

  pubKey;

  constructor() {
    console.log("CONSTRUCTING FIRE");
    this.init();
    this.checkAuth();
    this.initKeys();
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
  }

  // TEMPORARY DUMMY FUNCTION
  getPublicKey(uid){
    console.log("RETURNING PUBKEY" + this.pubKey);
    return this.pubKey;
  }

  send = (toId, messages) => {
    console.log("IN SEND");

    messages.forEach( async item => {
      console.log("ITEM " + JSON.stringify(item));
      const signature = await RSAKeychain.sign(item.text, keyTag)
      const publicKey = this.getPublicKey(toId);
      const cypherText = await RSA.encrypt(item.text, publicKey)
      console.log("CYPHER TEXT SENT: " + cypherText);
      const message = {
        text: cypherText,
        signature,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      }
      
      console.log("MESSAGE " + JSON.stringify(message));
      this.getConvo(toId).push(message);
    });
  }

  parse = async message => {
    console.log("IN PARSE");
    const {user, timestamp, text, signature} = message.val();
    const signedText = await RSAKeychain.decrypt(text, keyTag);
    console.log("SIGNED TEXT: " + signedText);
    const warning = await RSAKeychain.verify(signature, signedText, this.getPublicKey(user._id)) ?
    "" : "**WARNING** - THE SOURCE OF THIS MESSAGE COULD NOT BE VERIFIED AND IS LIKELY FRAUDULENT: ";
    
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text: warning + signedText,
      user
    };
  };

  get = (fromId, callback) => {
    this.getConvo(fromId).on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  off () {
    this.db.off();
  };

  get db() {
    return firebase.database().ref("convos");
  };

  getConvo(secondId: string) {
    console.log("MY UID IS " + this.uid);
    const convoId = [this.uid, secondId].sort().join();
    return this.db.child(convoId);
  };

  get uid() {
    return (firebase.auth().currentUser.uid);
  }
}

export default new Fire();