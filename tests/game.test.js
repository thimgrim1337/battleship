import Game from '../src/modules/Game';
import Gameboard from '../src/modules/Gameboard';
import Player from '../src/modules/Player';

describe('Test main game loop', () => {
  test('Create players', () => {
    Game.createPlayer('Dawid');
    expect(Game.player).toBeInstanceOf(Player);
    expect(Game.ai).toBeInstanceOf(Player);
  });

  test('Create gameboard', () => {
    Game.createGameboard();
    expect(Game.playerGameboard).toBeInstanceOf(Gameboard);
    expect(Game.aiGameboard).toBeInstanceOf(Gameboard);
  });

  test('Place ships', () => {
    Game.placeShips();
    expect(Game.playerGameboard.board.length).toBe(2);
    expect(Game.aiGameboard.board.length).toBe(2);
  });

  test('Take turn', () => {
    Game.takeTurn([0, 0]);
    expect(Game.aiGameboard.board[0].ship.damage).toBe(1);
  });
});
