"use strict";
/************************************************
 * @file  Sine Wave functions
 * @author Keaton Conrad
 ************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.triangle = exports.sawtooth = exports.square = exports.sign = exports.sine = void 0;
const sine = (x) => Math.sin(x);
exports.sine = sine;
const sign = (x) => {
    if (x === 0 || isNaN(x))
        return x;
    return x > 0 ? 1 : -1;
};
exports.sign = sign;
const square = (x) => sign(Math.sin(x * Math.PI * 2));
exports.square = square;
const sawtooth = (x) => (x - Math.floor(x + 0.5)) * 2;
exports.sawtooth = sawtooth;
const triangle = (x) => Math.abs(sawtooth(x));
exports.triangle = triangle;
