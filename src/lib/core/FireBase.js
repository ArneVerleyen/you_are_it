/**
 * A FireBase Wrapper
 * docs: https://firebase.google.com/docs
 *
 * @author Tim De Paepe <tim.depaepe@arteveldehs.be>
 */

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class FireBase {
  constructor(apiKey, projectId, messagingSenderId) {
    this.apiKey = apiKey;
    this.projectId = projectId;
    this.messagingSenderId = messagingSenderId;
    this.initializeApp();
    this.db = this.getFirestore();
  }

  initializeApp() {
    firebase.initializeApp(this.getFireBaseConfig());
  }


  getFireBaseConfig() {
    return {
      apiKey: `${this.apiKey}`,
      authDomain: `${this.projectId}.firebaseapp.com`,
      databaseURL: `https://${this.projectId}.firebaseio.com`,
      projectId: `${this.projectId}`,
      storageBucket: `${this.projectId}.appspot.com`,
      messagingSenderId: `${this.messagingSenderId}`,
    };
  }

  getFirestore() {
    return firebase.firestore();
  }

  getAuth() {
    return firebase.auth();
  }

  getGoogle() {
    return new firebase.auth.GoogleAuthProvider();
  }

  currentUser() {
    return firebase.auth().currentUser;
  }


  registerUser(email, password) {
    return firebase.getAuth().createUserWithEmailAndPassword(email, password);
  }


  resetPassword(email) {
    return firebase.getAuth().sendPasswordResetEmail(email);
  }

  createUser(email, password) {
    const p = new Promise((resolve) => {
      this.getAuth().createUserWithEmailAndPassword(email, password).catch((error) => {
        resolve(error);
      });
    });
    return p;
  }
  /*
  writeFirebaseUser(email, userID) {
    firebase.firestore().collection('users').doc(userID).set({
      mail: email,
      uid: userID,
    });
  }
  */

  writeFireBaseGame(gameName, amountOfPlayers, area, userID, email) {
    firebase.firestore().collection('games').doc(gameName).set({
      gameArea: area,
      numberOfPlayers: amountOfPlayers,
      name: gameName,
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
    this.getFirestore.collection('games').doc(gameName).collection('players').doc(email)
      .set({
        mail: email,
        uid: userID,
        mod: false,
        tagger: false,
      });
  }

  logOut() {
    return firebase.auth().signOut();
  }
}

export default FireBase;
