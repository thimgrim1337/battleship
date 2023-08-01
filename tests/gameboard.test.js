import { experiments } from 'webpack';
import Gameboard from '../src/modules/Gameboard';
import Ship from '../src/modules/Ship';

describe('test class Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('place a ship horizontal', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], false);
    expect(gameboard.board[0]).toEqual({
      ship: ship,
      coords: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
    });
  });

  test('place a ship verticaly', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], true);
    expect(gameboard.board[0]).toEqual({
      ship: ship,
      coords: [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
    });
  });

  test('receiveAttack method to be defined', () => {
    expect(gameboard.recivedAttack).toBeDefined();
  });

  test('receiveAttack hit work', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], true);
    gameboard.recivedAttack([0, 0]);
    expect(gameboard.board[0].ship.damage).toBe(1);
    expect(gameboard.board[0].coords).toEqual([
      [1, 0],
      [2, 0],
    ]);
  });

  test('receiveAttack miss work', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], true);
    gameboard.recivedAttack([3, 3]);
    expect(gameboard.missedShot).toEqual([[3, 3]]);
  });
});
