import { AI } from './Player';
import Player from './Player';
import Gameboard from './Gameboard';
import Ship from './Ship';

class Game {
  static ships = [
    {
      name: 'Carrier',
      length: 5,
    },
    {
      name: 'Battleship',
      length: 4,
    },
    {
      name: 'Destroyer',
      length: 3,
    },
    {
      name: 'Submarine',
      length: 3,
    },
    {
      name: 'Patrol Boat',
      length: 2,
    },
  ];
  static player;
  static playerGameboard;
  static ai;
  static aiGameboard;

  static activePlayer;

  static createPlayer(playerName) {
    this.player = new Player(playerName, this.playerGameboard);
    this.ai = new AI('AI', this.aiGameboard);

    return [this.player, this.ai];
  }

  static createGameboard() {
    this.playerGameboard = new Gameboard();
    this.aiGameboard = new Gameboard();
  }

  static placeShip({ name, length }, startCoord, isVerticle) {
    this.playerGameboard.placeShip(
      new Ship(name, length),
      startCoord,
      isVerticle
    );
    console.log(this.playerGameboard);
  }

  static placeShipsAI() {
    this.ships.forEach((ship) =>
      this.ai.randomPlaceShip(new Ship(ship.name, ship.length))
    );

    console.log('gotowe');
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
