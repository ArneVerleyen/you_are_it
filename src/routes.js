// import pages
import HomePage from './pages/home';
import FirebasePage from './pages/firebase';
import MapboxPage from './pages/mapbox';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import startschermPage from './pages/startscherm';
import rulesPage from './pages/rules';
import startgamePage from './pages/startgame';
import lobbyPage from './pages/lobby';
import rulesLobbyPage from './pages/rulesLobby';
import joinGamePage from './pages/joinGame';
import testGamePage from './pages/testGame';
import winPage from './pages/win';
import losePage from './pages/lose';

export default [
  { path: '/home', view: HomePage },
  { path: '/firebase', view: FirebasePage },
  { path: '/mapbox', view: MapboxPage },
  { path: '/login', view: LoginPage },
  { path: '/register', view: RegisterPage },
  { path: '/startscherm', view: startschermPage },
  { path: '/rules', view: rulesPage },
  { path: '/startgame', view: startgamePage },
  { path: '/lobby', view: lobbyPage },
  { path: '/rulesLobby', view: rulesLobbyPage },
  { path: '/joinGame', view: joinGamePage },
  { path: '/testGame', view: testGamePage },
  { path: '/win', view: winPage },
  { path: '/lose', view: losePage },
];
