import { expect } from 'chai';

import {
  describe, it,
  afterEach, beforeEach,
} from 'mocha';

import jsdom from 'jsdom';
import sinon from 'sinon';

import Game from '../src/Game';
import DomController from '../src/DomController';

const { JSDOM } = jsdom;
const dom = new JSDOM('<html><body id="root"></body></html>');

global.window = dom.window;
global.document = dom.window.document;

const createGame = board => new Game(board);
const createInstance = (game = {}) => (
  new DomController({
    game,
    root: '#root',
  })
);

afterEach(() => {
  document.body.innerHTML = '';
});

beforeEach(() => {
  window.alert = sinon.spy();
  window.confirm = sinon.spy();
});

describe('DOM controller', () => {
  it('Создаётся пустая таблица', () => {
    const domController = createInstance();

    domController.createTable();

    expect(document.querySelectorAll('table').length).to.equal(1);
  });

  it('Создаётся таблица с 3 рядами и с 3 колонками', () => {
    const domController = createInstance();

    domController.createTable(3, 3);

    expect(document.querySelectorAll('table').length).to.equal(1);
    expect(document.querySelectorAll('tr').length).to.equal(3);
    expect(document.querySelectorAll('td').length).to.equal(9);
  });

  it('Помнит индексы последней нажатой ячейки', () => {
    const domController = createInstance();

    domController.createTable(3, 3);
    document.querySelector('table td').click();

    expect(domController.lastClickedIndices).to.deep.equal([0, 0]);
  });

  it('Делает ход пользователя при клике в ячейке', () => {
    const gameMock = { acceptUserMove: sinon.spy() };
    const domController = createInstance(gameMock);

    domController.createTable(3, 3);
    document.querySelector('table td').click();

    expect(domController.game.acceptUserMove.called).to.be.true;
  });

  it('Проверяет инициализацию таблицы по состоянию игры', () => {
    const game = createGame();
    const domController = createInstance(game);

    domController.init();

    expect(document.querySelectorAll('table').length).to.equal(1);
    expect(document.querySelectorAll('tr').length).to.equal(3);
    expect(document.querySelectorAll('td').length).to.equal(9);
  });

  it('Выводит Alert если пользователь кликает в занятую ячейку', () => {
    const game = createGame();
    const domController = createInstance(game);

    domController.init();
    document.querySelector('table td').click();
    document.querySelector('table td').click();

    expect(window.alert.called).to.be.true;
  });

  it('Перерисовывает таблицу при клике по ячейке', () => {
    const game = createGame();
    const domController = createInstance(game);

    domController.init();
    document.querySelector('table td').click();
    const text = document.querySelector('table td').textContent;

    expect(text).to.be.equal('×');
  });

  it('Компьютер ходит сразу после хода пользователя', () => {
    const game = createGame();
    const domController = createInstance(game);

    domController.init();
    document.querySelector('table td').click();
    const text = document.querySelector('table').textContent;

    expect(text.indexOf('o') > -1).to.be.true;
  });

  it('Показывает текст с поздравлением победителя', () => {
    const game = createGame([
      ['×', '×', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    const domController = createInstance(game);

    domController.init();
    document.querySelector('table tr:nth-child(1) td:nth-child(3)').click();

    const status = document.querySelector('#status');
    expect(status.textContent).to.equal('user won!');
  });

  it('Показывает кнопку для очистки доски если кто-то побеждает', () => {
    const game = createGame([
      ['×', '×', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    const domController = createInstance(game);

    domController.init();
    document.querySelector('table tr:nth-child(1) td:nth-child(3)').click();

    const button = document.querySelectorAll('button');
    expect(button.length).to.equal(1);
  });

  it('Очищает доску при клике на кнопку очистки', () => {
    const game = createGame([
      ['×', '×', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    const domController = createInstance(game);

    domController.init();
    document.querySelector('table tr:nth-child(1) td:nth-child(3)').click();
    document.querySelector('button').click();

    expect(document.querySelector('table').textContent).to.equal('');
    expect(document.querySelectorAll('button').length).to.equal(0);
  });
});
