export default class Game {
  constructor() {
    this._userMoveSymbol = '×';
    this._computerMoveSymbol = 'o';
    this._board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }

  getState() {
    return this._board;
  }

  acceptUserMove(x, y) {
    if (!this._isCellFree(x, y)) {
      return this._throwException('ячейка уже занята');
    }

    return this._updateBoard(x, y);
  }

  createComputerMove() {
    this._updateBoard(0, 0, {
      symbol: this._computerMoveSymbol,
    });
  }

  _updateBoard(x, y, config = {}) {
    const { symbol = this._userMoveSymbol } = config;
    this._board[x][y] = symbol;
  }

  _isCellFree(x, y) {
    return !this._board[x][y];
  }

  _throwException(msg) {
    throw new Error(msg);
  }
}
