import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import sinon from 'sinon';
import Game from '../src/Game';

const userName = 'user';
const computerName = 'computer';
const userMoveSymbol = '×';
const computerMoveSymbol = 'o';
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

  it('Игра сохраняет ходы пользователя в историю', () => {
    const x = 1;
    const y = 1;

    game.acceptUserMove(x, y);
    const history = game.getMoveHistory();

    expect(history).to.deep.equal([{ turn: userName, x, y }]);
  });

  it('Игра сохраняет ходы компьютера в историю', () => {
    const stub = sinon.stub(Math, 'random').returns(0.5);

    game.createComputerMove();
    const history = game.getMoveHistory();

    expect(history).to.deep.equal([{ turn: computerName, x: 1, y: 1 }]);
    stub.restore();
  });

  it('Игра последовательно сохраняет 1 ход пользователя и 1 ход компьютера в историю', () => {
    const x = 1;
    const y = 1;

    game.acceptUserMove(x, y);
    game.createComputerMove();
    const history = game.getMoveHistory();

    expect(history.length).to.equal(2);
    expect(history[0].turn).to.equal(userName);
    expect(history[1].turn).to.equal(computerName);
  });

  it('Компьютер случайно выбирает ячейку для хода', () => {
    const stub = sinon.stub(Math, 'random').returns(0.5);

    game.createComputerMove();
    const board = game.getState();

    expect(board[1][1]).to.equal(computerMoveSymbol);
    stub.restore();
  });
});
