class Gameboard {
  missedShot = [];

  constructor() {
    this.ships = [];
    this.board = [];
  }

  placeShip(ship, startCoord, isVerticle) {
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
        return ship.ship.hit();
      }
    });

    return this.missedShot.push(hitCoord);
  }
}

export default Gameboard;
