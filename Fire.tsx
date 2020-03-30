import firebase from 'firebase';

class Fire {

  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
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
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = messages => {
    messages.forEach( item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      }

      this.db.push(message);
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

  get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  off () {
    this.db.off();
  };

  get db() {
    return firebase.database().ref("messages");
  };

  get uid() {
    return (firebase.auth().currentUser || {});
  }
}

export default new Fire();