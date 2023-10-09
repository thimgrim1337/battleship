function numberGenerator() {
  const row = Math.floor(Math.random() * 9);
  const col = Math.floor(Math.random() * 9);
  return [col, row];
}

export default numberGenerator;
