import firebase from 'firebase';
import { RSA, RSAKeychain } from 'react-native-rsa-native';
const keyTag = "com.anarchat.mykey";

class Fire {

  pubKey;

  constructor() {
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
    console.log("RUNNING " + RSAKeychain );
    console.log("RUNNING " + RSA );
    // this.pubKey = await RSAKeychain.generateKeys(keyTag, 2048);
    console.log("INITIALIZED WITH PUBLIC KEY " + this.pubKey);
  }

  // TEMPORARY DUMMY FUNCTION
  getEncryptingKey(uid){
    return this.pubKey;
  }

  send = (toId, messages) => {
    

    messages.forEach( async item => {
      const signedText = await RSAKeychain.sign(item.text, keyTag)
      const encryptingKey = this.getEncryptingKey(toId);
      const cypherText = RSA.encrypt(signedText, encryptingKey)

      const message = {
        text: cypherText,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      }

      this.getConvo(toId).push(message);
    });
  }

  parse = message => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
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