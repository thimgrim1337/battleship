class Player {
  takenMoves = [];
  constructor(name) {
    this.name = name;
  }

  attack = (coord, gameboard) => gameboard.recivedAttack(coord);

  randomAttack(gameboard) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (
      !this.takenMoves.find((coord) => coord[0] === col && coord[1] === row)
    ) {
      this.takenMoves.push([col, row]);
      return this.attack([col, row], gameboard);
    }
  }
}

export default Player;
