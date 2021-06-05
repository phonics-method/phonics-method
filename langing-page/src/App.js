import './App.css';
import {/* useState, */useEffect, useRef } from 'react';
//import loader from "@assemblyscript/loader"; // or require

/*
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
*/
const useCanvasAnimation = draw => {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const canvasRef = useRef(null)
  useEffect(() => {
/*loader.instantiate(
  // Binary to instantiate
  fetch("optimized.wasm"), // or fs.readFileSync
                           // or fs.promises.readFile
                           // or just a buffer
  // Additional imports
  { }
).then(({ exports }) => {
  console.log(exports.add(3, 4))
*/
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
//    context.imageSmoothingEnabled= false;

    const animate = time => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        draw(context, deltaTime, exports)
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(requestRef.current)
//  })
  }, [draw])
  return canvasRef
}

const Background = () => {
  const cellSize = 4;
  const magicNumber = 9;
  const {width, height} = {width: 1024, height: 1024};//useWindowSize();
  const canvasRef = useCanvasAnimation((context, i, exports) => {
    const cells = new Uint32Array(Math.ceil(width / cellSize) * Math.ceil(height / cellSize));
    const imageData = context.createImageData(width, height);
    const buf = new ArrayBuffer(imageData.data.length);
    const buf8 = new Uint8ClampedArray(buf);
    const data = new Uint32Array(buf);

    for (let y = 0; y < height / cellSize; ++y) {
      for (let x = 0; x < width / cellSize; ++x) {
      const color = (x ^ y) % magicNumber ? 0 : 255;
      const val =
          (255 << 24) |
          (color << 16) |
          (color << 8) |
          color;
        cells[y * Math.floor(width / cellSize) + x] = val;
      }
    }
    console.log(data.length)
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
         data[y * width + x] = cells[Math.floor(y / cellSize) * Math.floor(width / cellSize) + Math.floor(x / cellSize)];
      }
    }
    imageData.data.set(buf8);
    context.putImageData(imageData, 0, 0);
  });
  return (
    <canvas ref={canvasRef} width={width} height={height}></canvas>
  );
}

const App = () => {
  return (
    <Background></Background>
  );
}

export default App;
