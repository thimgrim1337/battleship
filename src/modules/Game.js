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
    this.player = new Player(playerName);
    this.ai = new Player('AI');

    this.activePlayer = this.player;
  }

  static createGameboard() {
    this.playerGameboard = new Gameboard();
    this.aiGameboard = new Gameboard();
  }

  static placeShips() {
    this.playerGameboard.placeShip(this.ships[0], [0, 0], false);
    this.playerGameboard.placeShip(this.ships[1], [2, 3], false);
    this.aiGameboard.placeShip(this.ships[0], [0, 0], false);
    this.aiGameboard.placeShip(this.ships[1], [2, 3], false);
  }

  static takeTurn(coord) {
    if (this.activePlayer === this.player) {
      this.player.attack(coord, this.aiGameboard);
      this.activePlayer = this.ai;
    }

    if (this.activePlayer === this.ai) {
      this.ai.randomAttack(this.playerGameboard);
      this.activePlayer = this.player;
    }
  }
}

export default Game;
