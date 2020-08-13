import { SITE_TITLE } from '../consts';
import App from '../lib/App';

const startschermTemplate = require('../templates/startscherm.hbs');

export default () => {
  // set the title of this page
  const title = `${SITE_TITLE} is ready to go!`;

  // render the template
  App.render(startschermTemplate({ title }));

  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', () => {
    App.firebase.logOut()
      .then(() => App.router.navigate('/login'));
  });
};
