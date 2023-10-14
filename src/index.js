import './style/main.scss';
import Game from './modules/Game';

Game.createGameboard();
Game.createPlayer('Dawid');
Game.placeShips('0', false);
Game.placeShips('45', true);

renderGameboard(Game.player);
renderGameboard(Game.ai);

renderShips(Game.player);
// renderShips(Game.ai);

document
  .querySelectorAll('.gameboard--ai .cell')
  .forEach((aiCell) =>
    aiCell.addEventListener('click', pickCell, { once: true })
  );

document.querySelectorAll('.ship').forEach((ship) => {
  ship.addEventListener('dragstart', dragStart);
});

document.querySelectorAll('.gameboard--player .cell').forEach((cell) => {
  cell.addEventListener('dragover', dragOver);
  cell.addEventListener('dragleave', dragLeave);
  cell.addEventListener('drop', dragDrop);
});

let selectedShip = undefined;

function dragStart(e) {
  selectedShip = e.target;
}

function dragOver(e) {
  e.preventDefault();
  e.target.style.backgroundColor = 'red';
}

function dragLeave(e) {
  e.target.style.backgroundColor = 'white';
}

function dragDrop(e) {
  e.preventDefault();
  const [x, y] = JSON.parse(e.target.dataset.coord);

  const cells = [];

  for (let i = 0; i < selectedShip.offsetWidth / 50; i++) {
    cells.push(
      document.querySelector(
        `.gameboard--player [data-coord='[${x - 1 + i},${y}]']`
      )
    );
  }

  cells.forEach((cell) => (cell.style.backgroundColor = 'red'));
}

function renderShips(player) {
  const name = player.name === 'AI' ? 'ai' : 'player';

  player.gameboard.board.forEach((ship) => {
    ship.coords.forEach((coord) => {
      const cell = document.querySelector(
        `.gameboard--${name} [data-coord='${coord}']`
      );
      cell.classList.add('cell--placed');
    });
  });
}

function pickCell(e) {
  const hitCoord = e.target.dataset.coord;
  console.log(e.target.dataset.coord);

  // renderShoot(Game.takeTurn(hitCoord));

  // setTimeout(() => {
  //   renderShoot(Game.takeTurnAI());
  // }, 2000);
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

function renderGameboard(player) {
  const name = player.name === 'AI' ? 'ai' : 'player';
  const cells = document.querySelector(`.gameboard--${name} .cells`);

  for (let i = 0; i < 10 * 10; i++) {
    const div = document.createElement('div');
    div.className = 'cell';
    div.dataset.coord = i;
    cells.append(div);
  }
}
