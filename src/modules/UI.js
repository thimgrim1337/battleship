import Game from './Game';
class UI {
  static isVertical = false;
  static ships = document.querySelectorAll('.ship');

  static initEventListeners() {
    document
      .querySelectorAll('.gameboard--ai .cell')
      .forEach((aiCell) =>
        aiCell.addEventListener('click', UI.pickCell, { once: true })
      );

    document
      .querySelector('.btn--rotate')
      .addEventListener('click', UI.shipRotate);

    UI.ships.forEach((ship) => {
      ship.addEventListener('dragstart', UI.dragStart);
    });

    document.querySelectorAll('.gameboard--player .cell').forEach((cell) => {
      cell.addEventListener('dragover', UI.dragOver);
      cell.addEventListener('dragleave', UI.dragLeave);
      cell.addEventListener('drop', UI.dragDrop);
    });
  }

  static renderGameboard(players) {
    players.forEach((player) => {
      const name = player.name === 'AI' ? 'ai' : 'player';
      const cells = document.querySelector(`.gameboard--${name} .cells`);
      for (let i = 0; i < 10 * 10; i++) {
        const div = document.createElement('div');
        div.className = 'cell';
        div.dataset.coord = i;
        cells.append(div);
      }
    });
  }

  static renderShips(player) {
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

  static renderShoot({ isHit, hitCoord, player }) {
    const name = player.name === 'AI' ? 'player' : 'ai';
    const cell = document.querySelector(
      `.gameboard--${name} [data-coord='${hitCoord}']`
    );
    isHit === true
      ? cell.classList.add('cell--hit')
      : cell.classList.add('cell--miss');
  }

  static shipRotate() {
    UI.ships.forEach((ship) => ship.classList.toggle('ship--rotate'));
    UI.ships[0].parentElement.classList.toggle('ships--row');
    UI.isVertical = !UI.isVertical;
  }

  static pickCell(e) {
    const hitCoord = e.target.dataset.coord;
    UI.renderShoot(Game.takeTurn(hitCoord));

    setTimeout(() => {
      UI.renderShoot(Game.takeTurnAI());
    }, 1000);
  }

  static canStart() {
    return Game.playerGameboard.board.length === 5 ? true : false;
  }

  static draggedShip = undefined;
  static dragStart(e) {
    UI.draggedShip = e.target.id;
  }
  static dragOver(e) {
    e.preventDefault();
    e.target.classList.add('cell--placed');
  }
  static dragLeave(e) {
    e.target.classList.remove('cell--placed');
  }

  static dragDrop(e) {
    e.preventDefault();
    const startCoord = e.target.dataset.coord;
    const ship = Game.ships[UI.draggedShip];

    Game.placeShip(ship, startCoord, UI.isVertical);
    UI.renderShips(Game.player);

    if (UI.canStart()) Game.placeShipsAI();
  }
}

export default UI;
