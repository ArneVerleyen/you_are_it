
/**
 * The Mapbox Page
 */

import { MAPBOX_API_KEY } from '../consts';
import MapBox from '../lib/core/MapBox';
import Game from '../lib/classes/Game';
import App from '../lib/App';
// import FireBase from '../lib/core/FireBase';
import 'firebase/firestore';
import 'firebase/auth';

const mapboxTemplate = require('../templates/mapbox.hbs');

export default () => {
  // set the title of this page
  const title = 'Mapbox';

  // render the template©
  App.render(mapboxTemplate({ title }));

  // create the MapBox options
  const mapBoxOptions = {
    container: 'mapbox',
    center: [3.670823, 51.087544],
    style: 'mapbox://styles/ziekemapbox/ck3zv6bai4or01ck0xvx5nc17',
    zoom: 13,
  };

  Notification.requestPermission();

  // create game instance
  const game = new Game();
  const gameName = localStorage.getItem('gameName');

  // const firebase = new FireBase();
  // const currentUser = firebase.currentUser();
  // console.log(currentUser);


  // get moderator lat and long to center map
  game.ModLatLong(gameName);
  const latMod = localStorage.getItem('modLatitude');
  const longMod = localStorage.getItem('modLongitude');

  // get tagger
  game.getRandomTagger(gameName);
  // Get current user
  const currentUser = localStorage.getItem('currentFbUser');
  // Get rules for game from firebase
  game.getGameRules(gameName);

  // eslint-disable-next-line no-unused-vars
  const radius = localStorage.getItem('radius');
  const time = localStorage.getItem('time');

  // VERANDEREN CHECKEN OF DE CLASS VERSIE ERVAN WERKT
  navigator.geolocation.watchPosition(
    async (position) => {
      // update location in db
      await game.updateLocation(gameName, position, currentUser);
      // Set location on map or update location
    },
    () => {
      console.log('watch position is kapüt!');
    },
    {
      enableHighAccuracy: true,
    },
  );

  // create a new MapBox instance
  // NOTE: make sure the HTML is rendered before making an instance of MapBox
  // (it needs an element to render)
  // eslint-disable-next-line prefer-const
  let players;
  const mapBox = new MapBox(MAPBOX_API_KEY, mapBoxOptions);
  mapBox.getMap().on('load', async () => {
    // When map loads set location to location of the moderator
    mapBox.flyTo(longMod, latMod);
    // eslint-disable-next-line no-new
    new Notification('The game has started run!!!');

    App.firebase.getFirestore().collection('games').doc(gameName).collection('players')
      .onSnapshot((docs) => {
      // get all member documents
        players = docs.docs.map((player) => ({
          email: player.id,
          data: player.data(),
        }));
        console.log(players);
        // Alle spelers op de kaart zetten
        players.forEach((player) => {
          console.log(player);
          // Eerst kijken of de huidige speler de tagger is
          if (player.data.tagger === true && player.email === currentUser) {
            console.log(player.email);
            console.log(player.data.lat);
            const coords = [player.data.long, player.data.lat];
            mapBox.displayTagger(coords, player.email);
            mapBox.flyTo(player.data.long, player.data.lat);
            // Speler op de kaart zetten als hij geen tagger is
          } else if (player.email === currentUser) {
            const coords = [player.data.long, player.data.lat];
            mapBox.displayPlayer(coords, player.email);
            mapBox.flyTo(player.data.long, player.data.lat);
            // Rest van de spelers tonen zolang ze niet de tagger zijn
          } else if (player.email !== currentUser && player.data.tagger === false) {
            const coords = [player.data.long, player.data.lat];
            mapBox.displayPlayer(coords, player.email);
          }
        });
      });
    const taggerInterval = setInterval(() => {
      game.whoSIt(gameName, 0.002);
    }, 5000);

    console.log(taggerInterval);
    function startTimer(duration) {
      // eslint-disable-next-line one-var
      let timerDurMinSec = duration,
        minutes,
        seconds;
      // eslint-disable-next-line no-unused-vars
      const timer = setInterval(() => {
        minutes = parseInt(timerDurMinSec / 60, 10);
        seconds = parseInt(timerDurMinSec % 60, 10);

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        console.log(`${minutes}:${seconds}`);
        if (--timerDurMinSec < 0) {
          console.log('time over');
          clearInterval(timer);
          clearInterval(taggerInterval);
          const winner = game.endGame(gameName, currentUser);
          if (winner) {
            App.router.navigate('/win');
          } else {
            App.router.navigate('/lose');
          }
        }
      }, 1000);
    }
    startTimer(time * 60);
  });
};
