import { backgroundReducer } from './background-reducer';
import { CELL_SIZE } from './background-config';

test('empty state', () => {
  const state = backgroundReducer(undefined, {type: 'init'});
  expect(state.size).toEqual([0, 0]);
  expect(state.gameOfLife.length).toEqual(0);
  expect(state.gameOfLifePrev.length).toEqual(0);
  expect(state.bitmap.length).toEqual(0);
});

test('resize', () => {
  const initialState = backgroundReducer(undefined, {type: 'init'});
  const event = {
    type: 'BACKGROUND_RESIZE',
    size: [2, 2],
  }
  const state = backgroundReducer(initialState, event);
  expect(state.size).toEqual([2, 2]);
  expect(state.gameOfLife.length).toEqual(4);
  expect(state.gameOfLifePrev.length).toEqual(4);
  expect(state.bitmap.length).toEqual(4 * CELL_SIZE ** 2);
});

test('resize with existing data', () => {
  const initialState = {
    size: [1, 1],
    gameOfLife: new Uint8Array([1]),
    gameOfLifePrev: new Uint8Array([1]),
    bitmap: new Uint32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
  };
  const event = {
    type: 'BACKGROUND_RESIZE',
    size: [2, 2],
  }
  const state = backgroundReducer(initialState, event);
  expect(state.size).toEqual([2, 2]);
  expect(state.gameOfLife[0]).toEqual(1);
  expect(state.gameOfLifePrev[0]).toEqual(1);
  expect(state.bitmap[15]).toEqual(16);
});

test('downsizing', () => {
  const initialState = {
    size: [2, 2],
    gameOfLife: new Uint8Array([1, 2, 3, 4]),
    gameOfLifePrev: new Uint8Array([1, 2, 3, 4]),
    bitmap: new Uint32Array(4 * CELL_SIZE ** 2),
  };
  const event = {
    type: 'BACKGROUND_RESIZE',
    size: [1, 1],
  }
  const state = backgroundReducer(initialState, event);
  expect(state.size).toEqual([1, 1]);
  expect(state.gameOfLife[0]).toEqual(1);
  expect(state.gameOfLifePrev[0]).toEqual(1);
  expect(state.bitmap[15]).toEqual(0);
});

test.skip('init cells', () => {
  const initialState = {
    size: [10, 10],
    gameOfLife: new Uint8Array(10 * 10),
    gameOfLifePrev: new Uint8Array(10 * 10),
    bitmap: new Uint32Array(),
  };
  const event = {
    type: 'BACKGROUND_CELLS_INIT',
  }
  const state = backgroundReducer(initialState, event);
  expect(state.gameOfLife.some(e => e === 1)).toBe(true);
  expect(state.gameOfLife.every(e => e === 1 || e === 0)).toBe(true);
});
