import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Game from '../src/Game';

const userMoveSymbol = '×';
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

  it('Записывает символ пользователя в ячейку по переданным координатам', () => {
    const x = 1;
    const y = 1;

    game.acceptUserMove(x, y);
    const board = game.getState();

    expect(board[x][y]).to.equal(userMoveSymbol);
  });

  it('Выкидывает исключение если пользователь ходит в занятую ячейку', () => {
    const x = 2;
    const y = 2;

    game.acceptUserMove(x, y);
    const func = game.acceptUserMove.bind(game, x, y);

    expect(func).to.throw('ячейка уже занята');
  });

  it('Компьютер ходит в верхнюю левую ячейку', () => {
    game.createComputerMove();
    const board = game.getState();

    expect(board[0][0]).to.equal('o');
  });
});
