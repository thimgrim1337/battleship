class Ship {
  #isDestroyed;
  constructor(name, length) {
    this.length = length;
    this.name = name;
    this.damage = 0;
    this.#isDestroyed = false;
  }

  getLength = () => this.length;

  getSunk() {
    return this.#isDestroyed;
  }

  hit() {
    this.damage++;
    this.#isSunk();
    return true;
  }

  #isSunk = () =>
    (this.#isDestroyed = this.damage === this.length ? true : false);
}

export default Ship;
