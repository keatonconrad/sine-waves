"use strict";
/* @flow */
/************************************************
 * @file  Left to right easing functions
 * @author Keaton Conrad
 ************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.bounceinout = exports.bounceout = exports.bouncein = exports.backinout = exports.backout = exports.backin = exports.elasticinout = exports.elasticout = exports.elasticin = exports.circularinout = exports.circularout = exports.circularin = exports.exponentialinout = exports.exponentialout = exports.exponentialin = exports.sineinout = exports.sineout = exports.sinein = exports.linear = void 0;
const constants_1 = require("./constants");
const linear = (percent, amplitude) => amplitude;
exports.linear = linear;
const sinein = (percent, amplitude) => amplitude * (Math.sin(percent * Math.PI - constants_1.HALFPI) + 1) * 0.5;
exports.sinein = sinein;
const sineout = (percent, amplitude) => amplitude * (Math.sin(percent * Math.PI + constants_1.HALFPI) + 1) * 0.5;
exports.sineout = sineout;
const sineinout = (percent, amplitude) => amplitude * (Math.sin(percent * constants_1.PI2 - constants_1.HALFPI) + 1) * 0.5;
exports.sineinout = sineinout;
const exponentialin = (percent, amplitude) => amplitude * Math.pow(2, 10 * (percent - 1));
exports.exponentialin = exponentialin;
const exponentialout = (percent, amplitude) => amplitude * (-Math.pow(2, -10 * percent) + 1);
exports.exponentialout = exponentialout;
const exponentialinout = (percent, amplitude) => {
    percent /= 0.5;
    if (percent < 1) {
        return amplitude / 2 * Math.pow(2, 10 * (percent - 1));
    }
    percent--;
    return amplitude / 2 * (-Math.pow(2, -10 * percent) + 2);
};
exports.exponentialinout = exponentialinout;
const circularin = (percent, amplitude) => amplitude * (1 - Math.sqrt(1 - percent * percent));
exports.circularin = circularin;
const circularout = (percent, amplitude) => amplitude * Math.sqrt(1 - (--percent * percent));
exports.circularout = circularout;
const circularinout = (percent, amplitude) => {
    percent /= 0.5;
    if (percent < 1) {
        return -amplitude / 2 * (Math.sqrt(1 - percent * percent) - 1);
    }
    percent -= 2;
    return amplitude / 2 * (Math.sqrt(1 - percent * percent) + 1);
};
exports.circularinout = circularinout;
const elasticin = (percent, amplitude) => {
    var s, a = 0.1, p = 0.4;
    if (percent === 0) {
        return 0;
    }
    if (percent === 1) {
        return amplitude;
    }
    if (!a || a < 1) {
        a = 1;
        s = p / 4;
    }
    else {
        s = p * Math.asin(1 / a) / constants_1.PI2;
    }
    percent -= 1;
    return -(a * Math.pow(2, 10 * percent) * Math.sin((percent - s) * constants_1.PI2 / p));
};
exports.elasticin = elasticin;
const elasticout = (percent, amplitude) => {
    var s, a = 0.1, p = 0.4;
    if (percent === 0) {
        return 0;
    }
    if (percent === 1) {
        return amplitude;
    }
    if (!a || a < 1) {
        a = 1;
        s = p / 4;
    }
    else {
        s = p * Math.asin(1 / a) / constants_1.PI2;
    }
    return (a * Math.pow(2, -10 * percent) * Math.sin((percent - s) * constants_1.PI2 / p) + amplitude);
};
exports.elasticout = elasticout;
const elasticinout = (percent, amplitude) => {
    var s, a = 0.1, p = 0.4;
    if (percent === 0) {
        return 0;
    }
    if (percent === 1) {
        return amplitude;
    }
    if (!a || a < 1) {
        a = 1;
        s = p / 4;
    }
    else {
        s = p * Math.asin(1 / a) / constants_1.PI2;
    }
    percent *= 2;
    if (percent < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent - s) * constants_1.PI2 / p));
    }
    return a * Math.pow(2, -10 * (percent -= 1)) * Math.sin((percent - s) * constants_1.PI2 / p) * 0.5 + amplitude;
};
exports.elasticinout = elasticinout;
const backin = (percent, amplitude) => amplitude * percent * percent * ((1.70158 + 1) * percent - 1.70158);
exports.backin = backin;
const backout = (percent, amplitude) => amplitude * ((percent -= 1) * percent * ((1.70158 + 1) * percent + 1.70158) + 1);
exports.backout = backout;
const backinout = (percent, amplitude) => {
    var s = 1.70158;
    if ((percent /= 0.5) < 1) {
        return amplitude / 2 * (percent * percent * (((s *= (1.525)) + 1) * percent - s));
    }
    return amplitude / 2 * ((percent -= 2) * percent * (((s *= (1.525)) + 1) * percent + s) + 2);
};
exports.backinout = backinout;
const bouncein = (percent, amplitude) => amplitude - bounceout(1 - percent, amplitude);
exports.bouncein = bouncein;
const bounceout = (percent, amplitude) => {
    if (percent < (1 / 2.75)) {
        return amplitude * (7.5625 * percent * percent);
    }
    else if (percent < (2 / 2.75)) {
        return amplitude * (7.5625 * (percent -= (1.5 / 2.75)) * percent + 0.75);
    }
    else if (percent < (2.5 / 2.75)) {
        return amplitude * (7.5625 * (percent -= (2.25 / 2.75)) * percent + 0.9375);
    }
    else {
        return amplitude * (7.5625 * (percent -= (2.625 / 2.75)) * percent + 0.984375);
    }
};
exports.bounceout = bounceout;
const bounceinout = (percent, amplitude) => {
    if (percent < 0.5) {
        return bouncein(percent * 2, amplitude) * 0.5;
    }
    return bounceout(percent * 2 - 1, amplitude) * 0.5 + amplitude * 0.5;
};
exports.bounceinout = bounceinout;
