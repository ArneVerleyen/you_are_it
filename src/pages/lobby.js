import { SITE_TITLE } from '../consts';
import App from '../lib/App';
import Lobby from '../lib/classes/lobby';

import 'firebase/firestore';
import 'firebase/auth';

const lobbyTemplate = require('../templates/lobby.hbs');
// const rulesLobbyTemplate = require('../templates/rulesLobby.hbs');

export default () => {
  // set the title of this page
  const title = `${SITE_TITLE} is ready to go!`;

  // render the template
  App.render(lobbyTemplate({ title }));

  const currentUserFB = App.firebase.getAuth().currentUser.email;
  localStorage.setItem('currentFbUser', currentUserFB);

  const lsGameName = localStorage.getItem('gameName');
  document.getElementById('gamename').innerHTML = localStorage.getItem('gameName');

  const lobby = new Lobby();

  // dom btn aanspreken
  const btnLeaveLobby = document.getElementById('LobbyLeaveBtn');
  btnLeaveLobby.addEventListener('click', () => {
    lobby.removePlayer(lsGameName, currentUserFB);
    App.router.navigate('/startscherm');
  });
  const btnLobbyStart = document.getElementById('LobbyStartBtn');
  btnLobbyStart.addEventListener('click', () => {
    lobby.StartGameBtn(lsGameName);
  });
  /*
  const playersUl = document.getElementById('playersUl');
  function playersInDom(playersArray) {
    for (let i = 0; i < playersArray.length; i++) {
      const li = document.createElement('li');
      const text = 'mijn naam';// document.createTextNode(playersArray[i]);
      li.appendChild(text);
      playersUl.innerHTML = li;
    }
  }
  */


  lobby.playersInLobby(lsGameName);
  lobby.checkAmountOfPlayers(lsGameName);
  lobby.StartGame(lsGameName, currentUserFB);
  /*
  const StartGame = (gameName) => {
    App.firebase.getFirestore().collection('games').doc(gameName)
      .onSnapshot((doc) => {
        if (doc.data().gameActive === true) {
          App.router.navigate('mapbox');
          clearInterval(playerIntervalID);
        }
      });
  };
  StartGame(lsGameName);
  */
};
