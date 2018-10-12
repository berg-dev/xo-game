export default class Game {
  constructor() {
    this._userName = 'user';
    this._computerName = 'computer';
    this._userMoveSymbol = '×';
    this._computerMoveSymbol = 'o';
    this._fieldSize = 3;
    this._history = [];
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

    this._updateHistory(this._userName, x, y);
    this._updateBoard(x, y);
    return false;
  }

  createComputerMove() {
    if (this._getFreeCellsCount() === 0) {
      return this._throwException('Нет доступных ячеек');
    }
    const [x, y] = this._getFreeRandomCoordinates();

    this._updateHistory(this._computerName, x, y);
    this._updateBoard(x, y, {
      symbol: this._computerMoveSymbol,
    });
    return false;
  }

  getMoveHistory() {
    return this._history;
  }

  isWinner(player) {
    const symbol = this._getSymbolForPlayer(player);
    const range = [...Array(this._fieldSize).keys()];
    const isEqual = this._checkCellEqual(symbol);

    const horizontal = range.reduce((res, i) => (
      (isEqual(i, 0) && isEqual(i, 1) && isEqual(i, 2)) || res
    ), false);

    return horizontal;
  }

  _updateBoard(x, y, config = {}) {
    const { symbol = this._userMoveSymbol } = config;
    this._board[x][y] = symbol;
  }

  _updateHistory(turn, x, y) {
    this._history.push({ turn, x, y });
  }

  _isCellFree(x, y) {
    return !this._board[x][y];
  }

  _getRandomCoordinate() {
    return Math.floor(Math.random() * (this._fieldSize - 0));
  }

  /* eslint-disable */
  _throwException(msg) {
    throw new Error(msg);
  }
  /* eslint-enable */

  _getFreeRandomCoordinates() {
    let x = this._getRandomCoordinate();
    let y = this._getRandomCoordinate();
    let freeCells = !!this._board[x][y];

    while (freeCells) {
      x = this._getRandomCoordinate();
      y = this._getRandomCoordinate();
      freeCells = !!this._board[x][y];
    }

    return [x, y];
  }

  _getFreeCellsCount() {
    return this._board.reduce((total, row) => (
      row.reduce((count, el) => (el === '' ? count + 1 : count), total)
    ), 0);
  }

  _getSymbolForPlayer(player) {
    return player === this._userName
      ? this._userMoveSymbol
      : this._computerMoveSymbol;
  }

  _checkCellEqual(symbol) {
    return (i, j) => this._board[i][j] === symbol;
  }
}
