import numberGenerator from './Utils';

class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
  }

  attack = (coord, gameboard) => gameboard.recivedAttack(coord);
}

export class AI extends Player {
  takenMoves = [];
  constructor(name, gameboard) {
    super(name, gameboard);
  }

  randomAttack(gameboard) {
    let isValidMove = true;
    let [col, row] = numberGenerator();

    while (isValidMove) {
      if (
        this.takenMoves.find((coord) => coord[0] === col && coord[1] === row)
      ) {
        [col, row] = numberGenerator();
      } else {
        this.takenMoves.push([col, row]);
        isValidMove = !isValidMove;
        return this.attack([col, row], gameboard);
      }
    }
  }

  getLastMove = () =>
    JSON.stringify(this.takenMoves[this.takenMoves.length - 1]);
}

export default Player;
