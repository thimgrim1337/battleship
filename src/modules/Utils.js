function randomStartCoord() {
  return String(Math.floor(Math.random() * 100));
}
export function randomIsVerticle() {
  return Math.floor(Math.random() * 2) === 0 ? false : true;
}

export function randomMove() {
  return Math.floor(Math.random() * 100);
}

export default randomStartCoord;
