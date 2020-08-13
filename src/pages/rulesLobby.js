import { SITE_TITLE } from '../consts';
import App from '../lib/App';

const rulesLobbyTemplate = require('../templates/rulesLobby.hbs');

export default () => {
  // set the title of this page
  const title = `${SITE_TITLE} is ready to go!`;

  // render the template
  App.render(rulesLobbyTemplate({ title }));

  // dom btn aanspreken
  /*
  const btnLobbyRules = document.getElementById('backToLobbyBtn');
  btnLobbyRules.addEventListener('click', () => {
    App.router.navigate('lobby');
  });
  */
};
