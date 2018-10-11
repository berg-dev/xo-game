import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Game from '../src/Game';

const initialGameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let game;
beforeEach(() => { game = new Game(); });

describe('Game', () => {
  it('Должен возвращать пустую игровую доску', () => {
    const board = game.getState();

    expect(board).to.deep.equal(initialGameBoard);
  });
});
