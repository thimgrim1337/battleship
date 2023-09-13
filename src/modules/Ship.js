class Ship {
  #isDestroyed;
  constructor(length) {
    this.length = length;
    this.damage = 0;
    this.#isDestroyed = false;
  }

  getLength = () => this.length;
  getSunk = () => this.#isDestroyed;

  hit() {
    this.damage++;
    this.#isSunk();
    return true;
  }

  #isSunk = () =>
    (this.#isDestroyed = this.damage === this.length ? true : false);
}

export default Ship;
