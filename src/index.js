import './style/main.scss';
import Game from './modules/Game';
import UI from './modules/UI';

Game.createGameboard();
const [player, ai] = Game.createPlayer('Dawid');

UI.renderGameboard([player, ai]);
UI.initEventListeners();
