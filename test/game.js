import { expect } from 'chai';
import { describe, it } from 'mocha';

class Game {
  constructor() {
    this.state = null;
  }

  getState() {
    return this.state;
  }
}

describe('Game', () => {
  it('Should return empty game board', () => {
    const game = new Game();
    const board = game.getState();

    expect(board).to.deep.equal([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
  });
});
