import { CELL_SIZE } from './background-config';

interface BackgroundState {
  size: [number, number];
  gameOfLife: Uint8Array;
  gameOfLifePrev: Uint8Array;
  bitmap: Uint32Array;
}

interface BackgroundTurnEvent {
  type: 'BACKGROUND_TURN';
  duration: number;
}

interface BackgroundResizeEvent {
  type: 'BACKGROUND_RESIZE';
  size: [number, number];
}

type BackgroundEvent =
  | BackgroundTurnEvent
  | BackgroundResizeEvent
  ;

const initialState: BackgroundState = {
  size: [0, 0],
  gameOfLife: new Uint8Array(0),
  gameOfLifePrev: new Uint8Array(0),
  bitmap: new Uint32Array(0),
}

export const backgroundReducer =
  (state: BackgroundState = initialState, event: BackgroundEvent):
    BackgroundState => {
      switch (event.type) {
        case 'BACKGROUND_RESIZE':
          const cellCount = event.size[0] * event.size[1];
          const gameOfLife =
            resizeTypedArray<Uint8Array>(state.gameOfLife, cellCount);
          const gameOfLifePrev =
            resizeTypedArray<Uint8Array>(state.gameOfLifePrev, cellCount);
          const bitmap =
            resizeTypedArray<Uint32Array>(state.bitmap ,cellCount * CELL_SIZE ** 2);
          return {
            size: [...event.size],
            gameOfLife,
            gameOfLifePrev,
            bitmap,
          }
        default:
          return state;
      }
    }

type TypedArray = ArrayLike<any> & {
    BYTES_PER_ELEMENT: number;
    set(array: ArrayLike<number>, offset?: number): void;
    subarray(begin: number, end?: number): TypedArray;
    slice(start?: number, end?: number): TypedArray;
};
type TypedArrayConstructor<T> = {
    new (): T;
    new (size: number): T;
    new (buffer: ArrayBuffer): T;
    BYTES_PER_ELEMENT: number;
}

const resizeTypedArray =
    <T extends TypedArray>(array: T, newLength: number): T => {
      if (newLength < array.length) {
        return array.subarray(0, newLength) as T;
      }
      const newArray = new (array.constructor as TypedArrayConstructor<T>)(newLength);
      newArray.set(array);
      return newArray;
}
