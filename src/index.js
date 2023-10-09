import './style/main.scss';
import Game from './modules/Game';

Game.createGameboard();
Game.createPlayer('Dawid');
Game.placeShips();

renderShips(Game.player);
renderShips(Game.ai);

document
  .querySelectorAll('.gameboard--ai .cell')
  .forEach((aiCell) =>
    aiCell.addEventListener('click', (e) => pickCell(e), { once: true })
  );

function renderShips(player) {
  const name = player.name === 'AI' ? 'ai' : 'player';

  player.gameboard.board.forEach((ship) => {
    ship.coords.forEach((coord) => {
      const cell = document.querySelector(
        `.gameboard--${name} [data-coord='[${coord}]']`
      );
      cell.classList.add('cell--placed');
    });
  });
}

function pickCell(e) {
  const hitCoord = e.target.dataset.coord;

  renderShoot(Game.takeTurn(hitCoord));

  setTimeout(() => {
    renderShoot(Game.takeTurnAI());
  }, 2000);
}

function renderShoot({ isHit, hitCoord, player }) {
  const name = player.name === 'AI' ? 'player' : 'ai';
  const cell = document.querySelector(
    `.gameboard--${name} [data-coord='${hitCoord}']`
  );
  isHit === true
    ? cell.classList.add('cell--hit')
    : cell.classList.add('cell--miss');
}
