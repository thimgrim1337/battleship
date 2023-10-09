class Gameboard {
  missedShots = new Set();

  constructor() {
    this.board = [];
    this.boardSize = 9;
  }

  getSize = () => this.boardSize;

  placeShip(ship, startCoord, isVerticle) {
    const [x, y] = startCoord;

    if (
      x + ship.getLength() > this.boardSize ||
      y + ship.getLength() > this.boardSize
    )
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
    let hitIndex = undefined;
    !Array.isArray(hitCoord)
      ? (hitCoord = JSON.parse(hitCoord))
      : (hitCoord = hitCoord);

    return this.board.some((ship) => {
      hitIndex = ship.coords.findIndex(
        (coord) => coord[0] === hitCoord[0] && coord[1] === hitCoord[1]
      );

      if (hitIndex > -1) {
        this.takeDamage(ship);
        return hitCoord;
      }
      this.missedShots.add(hitCoord);
      return false;
    });
  }

  takeDamage(ship) {
    ship.ship.hit();
    this.isShipAvaiable();
  }

  isShipAvaiable() {
    const remainingShips = this.board.filter(
      (ship) => ship.ship.getSunk() === false
    );

    if (!remainingShips.length) console.log('The End');
  }
}

export default Gameboard;
