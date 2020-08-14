
import { SITE_TITLE } from '../consts';
import App from '../lib/App';


const registerTemplate = require('../templates/register.hbs');

export default () => {
  // set the title of this page
  const title = `${SITE_TITLE} is ready to go!`;

  // render the template
  App.render(registerTemplate({ title }));

  // dom aanspreken
  const emailInput = document.getElementById('emailRegister');
  const passwordInput = document.getElementById('registerPassword');
  const btnLogin = document.getElementById('btnRegister');

  // knop event
  btnLogin.addEventListener('click', () => {

    const email = emailInput.value;
    const password = passwordInput.value;

    App.firebase.createUser(email, password)
      .then(() => {
        const userID = App.firebase.getAuth().currentUser.uid;
        console.log(userID);
        App.firebase.writeFirebaseUser(userID, email);
        App.router.navigate('/startscherm');
      });

    const currentUser = App.firebase.currentUser();
    console.log(currentUser);

    App.firebase.getAuth().onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        console.log('not logged in createAccount');
      }
    });
  });
};
