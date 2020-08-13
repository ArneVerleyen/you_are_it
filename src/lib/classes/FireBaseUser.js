import * as firebase from 'firebase/app';
import App from '../App';


import 'firebase/firestore';
import 'firebase/auth';

export default class FireBaseUser {
  constructor(email, password) {
    this.authentication = App.firebase.getAuth();
    this.provider = App.firebase.getGoogle();

    this.email = email;
    this.password = password;
  }

  loginUser(email, password) {
    return App.firebase.getAuth().signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return App.firebase.getAuth().signOut();
  }

  authState() {
    App.firebase.getAuth().onAuthStateChanged(() => {
      if (this.authentication.currentUser) {
        App.router.navigate('startscherm');
        console.log('You are logged in!');
      } else {
        console.log('not logged in');
      }
    });
  }

  writeFireBaseGame(gameName, amountOfPlayers, area, userID, email) {
    firebase.firestore().collection('games').doc(gameName).set({
      gameArea: area,
      numberOfPlayers: amountOfPlayers,
      name: gameName,
      gameActive: false,
      gameTime: 60000,
    });
    firebase.firestore().collection('games').doc(gameName).collection('players')
      .doc(email)
      .set({
        mail: email,
        uid: userID,
        mod: true,
        tagger: false,
      });
  }

  joinGame(gameName, userID, email) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const Mlongitude = position.coords.longitude;
        const Mlatitude = position.coords.latitude;
        App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
          .doc(email)
          .set({
            mail: email,
            uid: userID,
            mod: false,
            tagger: false,
            lat: Mlatitude,
            long: Mlongitude,
          });
      });
    }
  }
}
