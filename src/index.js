import './style/main.scss';
import Game from './modules/Game';

Game.createGameboard();
Game.createPlayer('Dawid');
Game.placeShips();

const renderShips = (player) => {
  const name = player.name === 'AI' ? 'ai' : 'player';

  player.gameboard.board.forEach((ship) => {
    ship.coords.forEach((coord) => {
      const cell = document.querySelector(
        `.gameboard--${name} [data-coord='${coord}']`
      );
      cell.classList.add('cell--placed');
    });
  });
};

renderShips(Game.player);
renderShips(Game.ai);
