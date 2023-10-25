/************************************************
 * @file  Sine Wave functions
 * @author Keaton Conrad
 ************************************************/


const sine = (x: number) => Math.sin(x);

const sign = (x: number) => {
  if (x === 0 || isNaN(x)) return x;
  return x > 0 ? 1 : -1;
};

const square = (x: number) => sign(Math.sin(x * Math.PI * 2));
const sawtooth = (x: number) => (x - Math.floor(x + 0.5)) * 2;
const triangle = (x: number) => Math.abs(sawtooth(x));

export {
  sine,
  sign,
  square,
  sawtooth,
  triangle,
};