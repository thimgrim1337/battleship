import Ship from '../src/modules/Ship';

describe('Test class Ship', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(3);
  });

  afterEach(() => {
    ship = new Ship(3);
  });

  test('return an object with length', () => {
    expect(ship.getLength()).toBe(3);
  });

  test('hit() method is defined and work', () => {
    expect(ship.hit).toBeDefined();
  });

  test('isDestroyed() method', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.getSunk()).toBe(true);
  });
});
