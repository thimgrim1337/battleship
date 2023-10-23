class Gameboard {
  missedShots = new Set();

  constructor() {
    this.board = [];
    this.boardSize = 10;
  }

  getSize = () => this.boardSize;

  placeShip(ship, startCoord, isVerticle) {
    const coords = [];
    startCoord = parseInt(startCoord);

    for (let i = 0; i < ship.length; i++) {
      !isVerticle
        ? coords.push(startCoord + i)
        : coords.push(startCoord + i * this.boardSize);
    }

    const validCell = this.isValidCell(ship, coords, isVerticle);
    if (validCell === false) return false;

    console.log(validCell);

    this.board.push({
      ship,
      coords,
    });

    console.log(this.board);

    return true;
  }

  isValidCell(ship, checkedCoords, isVerticle) {
    let startCoord = checkedCoords[0];
    let [row, col] = String(startCoord).split('');

    if (col === undefined) {
      row = 0;
      col = startCoord;
    }

    let coordTaken = checkedCoords.some((coord) =>
      this.board.some((ship) => ship.coords.includes(coord))
    );

    if (
      (!isVerticle && parseInt(col) + ship.length - 1 > 9) ||
      (isVerticle && parseInt(row) + ship.length - 1 > 9) ||
      coordTaken
    )
      return false;

    return startCoord;
  }

  recivedAttack(hitCoord) {
    hitCoord = parseInt(hitCoord);
    return this.board.some((ship) => {
      if (ship.coords.includes(hitCoord)) {
        this.takeDamage(ship);
        return true;
      } else {
        this.missedShots.add(hitCoord);
        return false;
      }
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
