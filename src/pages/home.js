/**
 * The Home Page
 */

import { SITE_TITLE } from '../consts';
import App from '../lib/App';

// import DataSeeder from '../lib/DataSeeder';

const homeTemplate = require('../templates/home.hbs');

export default () => {
  // set the title of this page
  const title = `${SITE_TITLE} is ready to go!`;

  // const ds = new DataSeeder();

  // const player = ds.getUser();

  // render the template
  App.render(homeTemplate({ title }));
};
