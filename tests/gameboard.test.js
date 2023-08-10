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

  test('prevent to place a ship out of the board', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [9, 0], true);
    expect(gameboard.board[0]).toEqual();
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
    expect(gameboard.board[0].ship.damage).toBe(0);
    expect(gameboard.missedShot).toEqual([[3, 3]]);
    expect(gameboard.board[0].coords).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  test('checkSunk method to report whether or not all of ships have been sunk.', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], true);
    gameboard.recivedAttack([0, 0]);
    gameboard.recivedAttack([1, 0]);
    gameboard.recivedAttack([2, 0]);
    expect(gameboard.board[0].ship.damage).toBe(3);
    expect(gameboard.board[0].coords).toEqual([]);
    expect(gameboard.checkSunk()).toBe('Koniec');
  });
});
