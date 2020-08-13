
import App from '../lib/App';
import FireBaseUser from '../lib/classes/FireBaseUser';

const loginTemplate = require('../templates/login.hbs');

export default () => {
  // set the title of this page
  const title = 'Login';

  // render the template
  App.render(loginTemplate({ title }));

  App.firebase.logOut();


  const emailLogin = document.getElementById('emailLogin');
  const passwordLogin = document.getElementById('passwordLogin');
  const loginBtn = document.getElementById('loginBtn');

  loginBtn.addEventListener('click', () => {
    const email = emailLogin.value;
    const password = passwordLogin.value;

    App.firebase.getAuth().signInWithEmailAndPassword(email, password);
  });
  const fireBaseUser = new FireBaseUser();
  fireBaseUser.authState();
};
