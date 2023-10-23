import randomStartCoord from './Utils';
import { randomIsVerticle } from './Utils';
import { randomMove } from './Utils';

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

  randomPlaceShip(ship) {
    let startCoord, isVerticle;
    let searchCell = true;

    while (searchCell) {
      startCoord = randomStartCoord();
      isVerticle = randomIsVerticle();
      if (this.gameboard.placeShip(ship, startCoord, isVerticle)) {
        searchCell = false;
        return true;
      }
    }
  }

  randomAttack(gameboard) {
    let move = randomMove();
    let moveTaken = this.takenMoves.includes(move);

    this.takenMoves.push(move);

    while (moveTaken) {
      move = randomMove();
      if (!this.takenMoves.includes(move)) {
        this.takenMoves.push(move);
        moveTaken = false;
      }
    }

    return gameboard.recivedAttack(move);
  }

  getLastMove = () => this.takenMoves[this.takenMoves.length - 1];
}

export default Player;
