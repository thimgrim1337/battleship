class Ship {
  #length;
  #damage;
  #isSunk;

  constructor(length) {
    this.#length = length;
    this.#damage = 0;
    this.#isSunk = false;
  }

  getLength = () => this.#length;
  getSunk = () => this.#isSunk;

  hit = () => {
    this.#damage++;
    this.#isDestroyed();
  };

  #isDestroyed = () =>
    (this.#isSunk = this.#damage === this.#length ? true : false);
}

export default Ship;
