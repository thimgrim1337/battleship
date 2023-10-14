import { AI } from './Player';
import Player from './Player';
import Gameboard from './Gameboard';
import Ship from './Ship';

class Game {
  static ships = [
    new Ship('Carrier', 5),
    new Ship('Battleship', 4),
    new Ship('Destroyer', 3),
    new Ship('Submarine', 3),
    new Ship('Patrol Boat', 2),
  ];
  static player;
  static playerGameboard;
  static ai;
  static aiGameboard;

  static activePlayer;

  static createPlayer(playerName) {
    this.player = new Player(playerName, this.playerGameboard);
    this.ai = new AI('AI', this.aiGameboard);

    this.activePlayer = this.player;
  }

  static createGameboard() {
    this.playerGameboard = new Gameboard();
    this.aiGameboard = new Gameboard();
  }

  static placeShips(startCoord, isVerticle) {
    this.playerGameboard.placeShip(this.ships[0], startCoord, isVerticle);
  }

  static takeTurn(coord) {
    return {
      isHit: this.player.attack(coord, this.aiGameboard),
      hitCoord: coord,
      player: this.player,
    };
  }

  static takeTurnAI() {
    return {
      isHit: this.ai.randomAttack(this.playerGameboard),
      hitCoord: this.ai.getLastMove(),
      player: this.ai,
    };
  }
}

export default Game;
