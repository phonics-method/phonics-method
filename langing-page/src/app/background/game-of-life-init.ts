type InitCellArgs = {
  size: [number, number],
  board: Uint8Array,
  magicNumber: number,
};

export const initCells = ({size, board, magicNumber}: InitCellArgs) => {
  const [width, height] = size;
  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      board[y * width + x] = (x ^ y) % magicNumber ? 0 : 1;
    }
  }
};
