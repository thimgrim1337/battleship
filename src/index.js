import './style/main.scss';
import Game from './modules/Game';
import UI from './modules/UI';

Game.createGameboard();
const [player, ai] = Game.createPlayer('Dawid');
// Game.placeShip(Game.ships[0], '0', false);
// Game.placeShip(Game.ships[0], '25', false);
// Game.placeShip(Game.ships[0], '25', true);
Game.placeShipsAI();

UI.renderGameboard([player, ai]);
UI.initEventListeners();
UI.renderShips(ai);
