/* eslint-disable max-len */
import App from '../App';

import 'firebase/firestore';
import 'firebase/auth';

export default class Lobby {
  // checken hoeveel players in de lobby zitten en hun emailadres in HTML zetten
  async playersInLobby(gameName) {
    const playersArray = [];
    const query = App.firebase.getFirestore().collection('games').doc(gameName).collection('players');
    query.onSnapshot((docs) => {
      docs.forEach((doc) => {
        playersArray.push(
          doc.id,
        );
      });
    });
    playersArray.forEach((player) => {
      const li = document.createElement('li');
      const text = document.createTextNode(player);
      li.appendChild(text);
      document.getElementById('playersUl').appendChild(li);
    });
    return playersArray;
  }

  // check amount of player in lobby and compare to the amount of player you need to start the game

  async checkAmountOfPlayers(gameName) {
    const playersArray = [];
    // collectie van spelers ophalen en in een array zetten
    App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
      .onSnapshot((docs) => {
        docs.forEach((player) => {
          playersArray.push(
            player.id,
          );
        });
      });

    // Aantal spelers in Array tellen
    const amountOfPlayersInLobby = playersArray.length;
    localStorage.setItem('amountOfPlayersInLobby', amountOfPlayersInLobby);
    await App.firebase.getFirestore().collection('games').doc(gameName)
      .get()
      .then((doc) => {
        const gameRules = doc.data();

        const amountOfPlayersNeeded = gameRules.numberOfPlayers;
        localStorage.setItem('amountOfPlayersNeeded', amountOfPlayersNeeded);
      });
    let amountOfPlayersNeeded = localStorage.getItem('amountOfPlayersNeeded');
    amountOfPlayersNeeded = parseInt(amountOfPlayersNeeded, 10);
    if (amountOfPlayersInLobby === amountOfPlayersNeeded) {
      console.log('start game');
      App.firebase.getFirestore().collection('games').doc(gameName)
        .update({
          gameActive: true,
        });
    } else {
      console.log('waiting for players');
    }
  }

  // Start Game if all players are there

  StartGame(gameName) {
    App.firebase.getFirestore().collection('games').doc(gameName)
      .onSnapshot((doc) => {
        if (doc.data().gameActive === true) {
          App.router.navigate('/mapbox');
        }
      });
  }

  StartGameBtn(gameName) {
    console.log('start game');
    App.firebase.getFirestore().collection('games').doc(gameName)
      .update({
        gameActive: true,
      });
  }

  removePlayer(gameName, player) {
    App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
      .doc(player)
      .delete();
  }
}
