class Gameboard {
  missedShots = new Set();

  constructor() {
    this.board = [];
    this.boardSize = 10;
  }

  getSize = () => this.boardSize;

  placeShip(ship, startCoord, isVerticle) {
    const coords = [];
    let [row, col] = startCoord.split('').map(Number);
    startCoord = parseInt(startCoord);

    if (startCoord < 10) {
      (row = 0), (col = startCoord);
    }

    if (
      (!isVerticle && col + ship.length - 1 > 9) ||
      (isVerticle && row + ship.length - 1 > 9)
    )
      return;

    for (let i = 0; i < ship.length; i++) {
      !isVerticle
        ? coords.push(startCoord + i)
        : coords.push(startCoord + i * 10);
    }

    this.board.push({
      ship,
      coords,
    });
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
