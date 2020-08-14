import { SITE_TITLE } from '../consts';
import App from '../lib/App';

const winTemplate = require('../templates/win.hbs');

export default () => {
  // set the title of this page
  const title = `${SITE_TITLE} is ready to go!`;

  // render the template
  App.render(winTemplate({ title }));
};
