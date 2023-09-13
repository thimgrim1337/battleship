import Gameboard from '../src/modules/Gameboard';
import Player from '../src/modules/Player';
import Ship from '../src/modules/Ship';

describe('Test class Player', () => {
  let player;
  let gameboard;

  beforeEach(() => {
    player = new Player('player 1');
    gameboard = new Gameboard();
    gameboard.placeShip(new Ship(3), [0, 0], false);
  });

  test('Player hit method', () => {
    expect(player.attack).toBeDefined();
    expect(player.attack([0, 0], gameboard)).toBe(true);
    expect(player.attack([3, 3], gameboard)).toBe(false);
  });

  test('AI randomAttack method', () => {
    expect(player.randomAttack).toBeDefined();
  });
});
