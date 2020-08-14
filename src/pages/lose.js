import { SITE_TITLE } from '../consts';
import App from '../lib/App';

const loseTemplate = require('../templates/lose.hbs');

export default () => {
  // set the title of this page
  const title = `${SITE_TITLE} is ready to go!`;

  // render the template
  App.render(loseTemplate({ title }));
  const btnStartSchermLose = document.getElementById('startSchermLose');
  const btnloseLogoutBtn = document.getElementById('loseLogoutBtn');
  btnStartSchermLose.addEventListener('click', () => {
    App.router.navigate('/startscherm');
  });
  btnloseLogoutBtn.addEventListener('click', () => {
    App.router.navigate('/login');
  });
};
