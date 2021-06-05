import { Observable } from 'rxjs';
import { configureStore } from '@reduxjs/toolkit'
import { createStore } from 'redux'

interface CoreStore<ALL_STATE, ALL_EVENT> {
  state$: Observable<ALL_STATE>;
  send(event: ALL_EVENT): void;
}

type Reducer<ALL_STATE, ALL_EVENT> = (
  state: ALL_STATE[keyof ALL_STATE] | undefined,
  action: ALL_EVENT
) => ALL_STATE[keyof ALL_STATE];

type ReducerObject<ALL_STATE extends Record<string, any>, ALL_EVENT> = {
  [k: keyof ALL_STATE]: Reducer<ALL_STATE, ALL_EVENT>;
}

export const createCoreStore =
  <STATE, EVENT> (reducer: ReducerObject<STATE, EVENT>):
    CoreStore<STATE, EVENT> => {
      const store = configureStore({ reducer });
      return {
        state$: new Observable(subscriber => {
          subscriber.next(store.getState());
          store.subscribe(() => {
            subscriber.next(store.getState());
          });
        }),
        send: (action) => {
          store.dispatch(action);
        }
      };
    };

