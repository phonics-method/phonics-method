import { Observable } from 'rxjs';
import { marbles, fakeSchedulers } from "rxjs-marbles/jest";
import { createCoreStore } from './store';

type TestState = number;

interface TestEvent {
  type: 'INCREMENT'
};

beforeEach(() => jest.useFakeTimers());


test('store has inital state', marbles(m => {
  const initialState: TestState = 0;
  const coreStore = createCoreStore<TestState, TestEvent>({
    count: (state = initialState, action) => {
      return action.type === 'INCREMENT' ? state + 1 : state;
    }
  });
  m.expect(coreStore.state$).toBeObservable(m.cold('0', {'0': { count: 0 }}));
}));

test('store has incremented state', marbles(m => {
  const initialState: TestState = 0;
  const coreStore = createCoreStore<TestState, TestEvent>({
    count: (state = initialState, action) => {
      return action.type === 'INCREMENT' ? state + 1 : state;
    }
  });
  coreStore.send({type: 'INCREMENT'});
  m.expect(coreStore.state$).toBeObservable(m.cold('1', {'1': { count: 1 }}));
}));
