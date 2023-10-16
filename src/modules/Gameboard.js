class Gameboard {
  missedShots = new Set();

  constructor() {
    this.board = [];
    this.boardSize = 10;
  }

  getSize = () => this.boardSize;

  placeShip(ship, startCoord, isVerticle) {
    const coords = [];

    const validCell = this.isValidCell(ship, startCoord, isVerticle);

    if (validCell === false) return false;

    for (let i = 0; i < ship.length; i++) {
      !isVerticle
        ? coords.push(validCell + i)
        : coords.push(validCell + i * 10);
    }

    this.board.push({
      ship,
      coords,
    });

    return true;
  }

  isValidCell(ship, startCoord, isVerticle) {
    let [row, col] = startCoord.split('').map(Number);
    startCoord = parseInt(startCoord);

    const coordTaken = this.board.some((ship) =>
      ship.coords.includes(startCoord)
    );

    if (startCoord < 10) {
      (row = 0), (col = startCoord);
    }
    if (
      (!isVerticle && col + ship.length - 1 > 9) ||
      (isVerticle && row + ship.length - 1 > 9) ||
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
        console.log(hitCoord);
        console.log('trafiony');
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

    console.log(remainingShips);

    if (!remainingShips.length) console.log('The End');
  }
}

export default Gameboard;
