import { SITE_TITLE } from '../consts';
import App from '../lib/App';

// import firebaseUser class
import FireBaseUser from '../lib/classes/FireBaseUser';

const startgameTemplate = require('../templates/startgame.hbs');

export default () => {
  // set the title of this page
  const title = `${SITE_TITLE} is ready to go!`;

  // render the template
  App.render(startgameTemplate({ title }));

  // class instantie maken
  const fireBaseUser = new FireBaseUser();

  // dom aanspreken
  const startBtn = document.getElementById('startBtn');
  const gameNameForm = document.getElementById('gameName');
  const amountOfPlayersForm = document.getElementById('amountOfPlayers');
  const areaForm = document.getElementById('area');
  const timeForm = document.getElementById('time');

  // default value
  function SetDefaultValue() {
    document.getElementById('amountOfPlayers').value = 2;
    document.getElementById('area').value = 500;
    document.getElementById('time').value = 5;
  }
  window.onload = SetDefaultValue();

  startBtn.addEventListener('click', () => {
    // const userID = App.firebase.currentUser.uid;
    const userID = App.firebase.getAuth().currentUser.uid;
    const mail = App.firebase.getAuth().currentUser.email;
    const gameName = gameNameForm.value;
    const amountOfPlayers = amountOfPlayersForm.value;
    const area = areaForm.value;
    const time = timeForm.value;
    // console.log(gameName, amountOfPlayers);
    fireBaseUser.writeFireBaseGame(gameName, amountOfPlayers, area, userID, mail, time);

    // store game name in local storage
    localStorage.setItem('gameName', gameName);


    App.router.navigate('/lobby');
  });
};
