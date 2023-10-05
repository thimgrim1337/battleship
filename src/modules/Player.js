class Player {
  takenMoves = [];
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
  }

  attack = (coord, gameboard) => gameboard.recivedAttack(coord);

  randomAttack(gameboard) {
    let flag = true;
    let [col, row] = this.numberGenerator();

    while (flag) {
      if (
        this.takenMoves.find((coord) => coord[0] === col && coord[1] === row)
      ) {
        [col, row] = this.numberGenerator();
      }
      this.takenMoves.push([col, row]);
      flag = false;
      return this.attack([col, row], gameboard);
    }
  }

  numberGenerator = () => {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    return [col, row];
  };
}

export default Player;
