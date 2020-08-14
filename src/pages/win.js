import { SITE_TITLE } from '../consts';
import App from '../lib/App';

const winTemplate = require('../templates/win.hbs');

export default () => {
  // set the title of this page
  const title = `${SITE_TITLE} is ready to go!`;

  // render the template
  App.render(winTemplate({ title }));
  const btnStartSchermWin = document.getElementById('btnWinStart');
  const btnWinLogoutBtn = document.getElementById('btnLogoutWin');
  btnStartSchermWin.addEventListener('click', () => {
    App.router.navigate('/startscherm');
  });
  btnWinLogoutBtn.addEventListener('click', () => {
    App.router.navigate('/login');
  });
};
