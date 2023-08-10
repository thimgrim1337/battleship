class Gameboard {
  missedShot = [];

  constructor() {
    this.ships = [];
    this.board = [];
  }

  placeShip(ship, startCoord, isVerticle) {
    const [x, y] = startCoord;
    const boardSize = 9;

    if (x + ship.getLength() > boardSize || y + ship.getLength() > boardSize)
      return;

    this.board.push({
      ship,
      coords: this.getCoords(ship.getLength(), startCoord, isVerticle),
    });
  }

  getCoords(shipLength, startCoord, isVerticle) {
    const coords = [startCoord];
    const [x, y] = startCoord;

    if (!isVerticle) {
      for (let i = 1; i < shipLength; i++) {
        coords.push([x, y + i]);
      }
      return coords;
    }

    for (let i = 1; i < shipLength; i++) {
      coords.push([x + i, y]);
    }
    return coords;
  }

  recivedAttack(hitCoord) {
    this.board.forEach((ship) => {
      const hitIndex = ship.coords.findIndex(
        (coord) => coord[0] === hitCoord[0] && coord[1] === hitCoord[1]
      );

      if (hitIndex > -1) {
        ship.coords.splice(hitIndex, 1);
        ship.ship.hit();
        return this.checkSunk();
      }
    });

    return this.missedShot.push(hitCoord);
  }

  checkSunk() {
    const remainingShips = this.board.filter(
      (ship) => ship.ship.getSunk() === false
    );

    if (!remainingShips.length) return 'Koniec';
  }
}

export default Gameboard;
