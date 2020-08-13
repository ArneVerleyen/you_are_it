import App from '../App';

import 'firebase/firestore';
import 'firebase/auth';
/*
    @TODO Maak random tikker selector
    @TODO Aftellen naar game
    @TODO Spelgebied afbakenen + Waarschuwingen als je eruit komt
    @TODO Tik mechanisme
    @TODO Menu maken
*/
export default class Game {
  // Get moderator lat long
  async ModLatLong(gameName) {
    await App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
      .where('mod', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const modData = doc.data();
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const modLongitude = position.coords.longitude;
              const modLatitude = position.coords.latitude;

              // lat en long bereikbaar maken voor andere spelers van mod om middelpunt kaart
              localStorage.setItem('modLatitude', modLatitude);
              localStorage.setItem('modLongitude', modLatitude);

              App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
                .doc(modData.mail)
                .set({
                  mail: modData.mail,
                  uid: modData.uid,
                  mod: modData.mod,
                  tagger: modData.tagger,
                  lat: modLatitude,
                  long: modLongitude,
                });
            });
          }
        });
      });
  }

  getCurrentLocation(gameName, userID, email) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
          .doc(email)
          .update({
            mail: email,
            uid: userID,
            mod: false,
            tagger: false,
            lat: currentLatitude,
            long: currentLongitude,
          });
      });
    }
  }

  async getGameRadius(gameName) {
    await App.firebase.getFirestore().collection('games').doc(gameName)
      .get()
      .then((doc) => {
        const gameRules = doc.data();
        const radius = gameRules.gameArea;
        const numberOfPlayers = gameRules.amountOfPlayers;
        localStorage.setItem('radius', radius);
        localStorage.setItem('amountOfPlayers', numberOfPlayers);
      });
  }

  async getRandomTagger(gameName) {
    const playerDoc = await App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
      .get();
    const playersArray = [];
    playerDoc.forEach((player) => {
      playersArray.push(
        player.id,
      );
    });
    const { length } = playersArray;
    const randomIndex = Math.floor(Math.random() * length);
    const tagger = [playersArray[randomIndex]];
    console.log(tagger[0]);

    App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
      .doc(tagger[0])
      .update({
        tagger: true,
      });
  }

  async watchLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.locationAccuracy = position.coords.accuracy;
            resolve({
              coords: {
                long: position.coords.longitude,
                lat: position.coords.latitude,
              },
            });
          },
          (error) => {
            reject(error);
          },
          {
            // voor minder stroomverbruik false
            enableHighAccuracy: true,
            timeout: 10000,
          },
        );
      } else {
        reject();
      }
    });
  }

  // Update location to firestore
  async updateLocation(gameName, position, mail) {
    if (this.lastUpdate === undefined) {
      this.lastUpdate = new Date();
    }
    const time = new Date();
    if (Math.abs(this.lastUpdate - time) >= 1000 || this.lastUpdate === undefined) {
      await App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
        .doc(mail)
        .update({
          long: position.coords.longitude,
          lat: position.coords.latitude,
        });
    }
    this.lastUpdate = time;
    console.log(this.lastUpdate);
  }

  getPlayers(gameName) {
    this.players = {};
    App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const email = doc.id;
          this.players[email] = {
            latitude: doc.data().lat,
            longitude: doc.data().long,
            tagger: doc.data().tagger,
            moderator: doc.data().mod,
          };
        });
      });
    return this.players;
  }

  removePlayer(gameName, player) {
    App.firebase.getFirestore('games').doc(gameName).collection('players')
      .doc(player)
      .delete();
    console.log(player, ' is removed from the game.');
  }
}


// Data van coordinates omzetten!


/*
    @TODO

    - Make game timer
    - Tag system
    - Gerbuikers op map tonen
    - End game mechanics

*/
