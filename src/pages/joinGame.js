import { SITE_TITLE } from '../consts';
import App from '../lib/App';

import FireBaseUser from '../lib/classes/FireBaseUser';

const joinGameTemplate = require('../templates/joinGame.hbs');

export default () => {
  // set the title of this page
  const title = `${SITE_TITLE} is ready to go!`;

  // render the template
  App.render(joinGameTemplate({ title }));

  const joinForm = document.getElementById('joinInputField');
  const btnJoin = document.getElementById('btnJoin');

  // firebase class instantieren
  const fireBaseUser = new FireBaseUser();

  btnJoin.addEventListener('click', () => {
    const GivenGameName = joinForm.value;
    localStorage.setItem('gameName', GivenGameName);
    const GivenGameNameStr = GivenGameName.toString();

    // checken of de game naam in firebase bestaat, als hij erin zit speler toevoegen aan
    // players collectie
    App.firebase.getFirestore().collection('games').doc(GivenGameNameStr).get()
      .then((doc) => {
        // console.log(doc.id);
        if (GivenGameNameStr === doc.id) {
          console.log(doc.id, ' => ', doc.data());
          const userID = App.firebase.getAuth().currentUser.uid;
          const mail = App.firebase.getAuth().currentUser.email;

          fireBaseUser.joinGame(GivenGameNameStr, userID, mail);
          App.router.navigate('/lobby');
        }
      });
  });
};
