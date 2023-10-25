import Game from './Game';
class UI {
  static isVertical = false;
  static ships = document.querySelectorAll('.ship');
  static activePlayer = document.querySelector('.header__turn');

  static initGame() {
    Game.createGameboard();
    const [player, ai] = Game.createPlayer('Dawid');

    UI.renderGameboard([player, ai]);
    UI.initEventListeners();
  }

  static initEventListeners() {
    document
      .querySelectorAll('.gameboard--ai .cell')
      .forEach((aiCell) =>
        aiCell.addEventListener('click', UI.pickCell, { once: true })
      );

    document
      .querySelector('.btn--rotate')
      .addEventListener('click', UI.shipRotate);

    document
      .querySelector('.btn--reset')
      .addEventListener('click', UI.resetGame);

    UI.ships.forEach((ship) => {
      ship.addEventListener('dragstart', UI.dragStart);
    });

    document.querySelectorAll('.gameboard--player .cell').forEach((cell) => {
      cell.addEventListener('dragover', UI.dragOver);
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

  static renderTurn() {
    this.activePlayer.innerText = `${Game.activePlayer.name} turn`;
  }

  static shipRotate() {
    UI.ships.forEach((ship) => {
      ship.classList.toggle('ship--rotate');
      document.querySelector('.ships').classList.toggle('ships--expand');
    });
    UI.isVertical = !UI.isVertical;
  }

  static resetGame() {
    location.reload();
  }

  static pickCell(e) {
    const hitCoord = e.target.dataset.coord;
    UI.renderShoot(Game.takeTurn(hitCoord));
    UI.renderTurn();

    setTimeout(() => {
      UI.renderShoot(Game.takeTurnAI());
      UI.renderTurn();
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
  }

  static dragDrop(e) {
    e.preventDefault();
    const startCoord = e.target.dataset.coord;
    const ship = Game.ships[UI.draggedShip];

    if (Game.placeShip(ship, startCoord, UI.isVertical)) {
      UI.ships[UI.draggedShip].remove();
      UI.renderShips(Game.player);
    }

    if (UI.canStart()) {
      Game.placeShipsAI();
      document.querySelector('.gameboard--cover').classList.add('hide');
      document.querySelector('.ships').classList.remove('ships--expand');
      UI.renderTurn();
    }
  }
}

export default UI;
