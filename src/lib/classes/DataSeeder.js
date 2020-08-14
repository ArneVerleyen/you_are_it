/* eslint-disable prefer-const */
import Chance from 'chance';
import App from '../App';

import 'firebase/firestore';
import 'firebase/auth';

export default class DataSeeder {
  setUpTestGame() {
    App.firebase.getFirestore().collection('games').doc('testGame')
      .set({
        gameArea: 5,
        numberOfPlayers: 4,
        name: 'testGame',
        gameTime: 5,
      });
    App.firebase.getFirestore().collection('games').doc('testGame').collection('players')
      .doc('test@test.com')
      .set({
        mail: 'test@test.com',
        mod: true,
        tagger: false,
        uid: 1,
        lat: 51.050610,
        long: 3.711610,
      });
    App.firebase.getFirestore().collection('games').doc('testGame').collection('players')
      .doc('player1')
      .set({
        mail: 'player1',
        mod: false,
        tagger: false,
        uid: 2,
        lat: 51.051520,
        long: 3.713080,
      });
    App.firebase.getFirestore().collection('games').doc('testGame').collection('players')
      .doc('player2')
      .set({
        mail: 'player2',
        mod: false,
        tagger: false,
        uid: 3,
        lat: 51.050570,
        long: 3.710470,
      });
    App.firebase.getFirestore().collection('games').doc('testGame').collection('players')
      .doc('player3')
      .set({
        mail: 'player3',
        mod: false,
        tagger: false,
        uid: 4,
        lat: 51.050200,
        long: 3.71621,
      });
  }

  movePlayerTest() {
    let playerLat;
    let playerLong;
    let updatedLat;
    let updatedLong;
    // eslint-disable-next-line prefer-const
    playerLat = 51.050610;
    // eslint-disable-next-line prefer-const
    playerLong = 3.711610;
    const chance = new Chance();
    const randomIntLat = chance.floating({ min: -0.0015, max: 0.0015 });
    const randomIntLong = chance.floating({ min: -0.0015, max: 0.0015 });
    updatedLat = playerLat + randomIntLat;
    updatedLong = playerLong + randomIntLong;

    App.firebase.getFirestore().collection('games').doc('testGame').collection('players')
      .doc('test@test.com')
      .update({
        lat: updatedLat,
        long: updatedLong,
      });
  }

  async movePlayer(player) {
    let playerLat;
    let playerLong;
    let updatedLat;
    let updatedLong;
    await App.firebase.getFirestore().collection('games').doc('testGame').collection('players')
      .doc(player)
      .get()
      .then((doc) => {
        const playerDoc = doc.data();
        // eslint-disable-next-line prefer-const
        playerLat = playerDoc.lat;
        // eslint-disable-next-line prefer-const
        playerLong = playerDoc.long;
        const chance = new Chance();
        const randomIntLat = chance.floating({ min: -0.003, max: 0.003 });
        const randomIntLong = chance.floating({ min: -0.003, max: 0.003 });
        updatedLat = playerLat + randomIntLat;
        updatedLong = playerLong + randomIntLong;
      });

    App.firebase.getFirestore().collection('games').doc('testGame').collection('players')
      .doc(player)
      .update({
        lat: updatedLat,
        long: updatedLong,
      });
  }
}
