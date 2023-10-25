/* @flow */
/************************************************
 * @file  Left to right easing functions
 * @author Keaton Conrad
 ************************************************/

const linear = (percent: number, amplitude: number) => amplitude * percent;

const sinein = (percent: number, amplitude: number) => amplitude * (Math.sin(percent * Math.PI - HALFPI) + 1) * 0.5;
const sineout = (percent: number, amplitude: number) => amplitude * (Math.sin(percent * Math.PI + HALFPI) + 1) * 0.5;
const sineinout = (percent: number, amplitude: number) => amplitude * (Math.sin(percent * PI2 - HALFPI) + 1) * 0.5;

const exponentialin = (percent: number, amplitude: number) => amplitude * Math.pow(2, 10 * (percent - 1));
const exponentialout = (percent: number, amplitude: number) => amplitude * (-Math.pow(2, -10 * percent) + 1);
const exponentialinout = (percent: number, amplitude: number) => {
  percent /= 0.5;
  if (percent < 1) {
    return amplitude / 2 * Math.pow(2, 10 * (percent - 1));
  }
  percent--;
  return amplitude / 2 * (-Math.pow(2, -10 * percent) + 2);
}

const circularin = (percent: number, amplitude: number) => amplitude * (1 - Math.sqrt(1 - percent * percent));
const circularout = (percent: number, amplitude: number) => amplitude * Math.sqrt(1 - (--percent * percent));
const circularinout = (percent: number, amplitude: number) => {
  percent /= 0.5;
  if (percent < 1) {
    return -amplitude / 2 * (Math.sqrt(1 - percent * percent) - 1);
  }
  percent -= 2;
  return amplitude / 2 * (Math.sqrt(1 - percent * percent) + 1);
}

const elasticin = (percent: number, amplitude: number) => {
  var s, a = 0.1,
    p = 0.4;
  if (percent === 0) {
    return 0;
  }
  if (percent === 1) {
    return amplitude;
  }
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = p * Math.asin(1 / a) / PI2;
  }
  percent -= 1;
  return -(a * Math.pow(2, 10 * percent) * Math.sin((percent - s) * PI2 / p));
}

const elasticout = (percent: number, amplitude: number) => {
  var s, a = 0.1,
    p = 0.4;
  if (percent === 0) {
    return 0;
  }
  if (percent === 1) {
    return amplitude;
  }
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = p * Math.asin(1 / a) / PI2;
  }
  return (a * Math.pow(2, -10 * percent) * Math.sin((percent - s) * PI2 / p) + amplitude);
}

const elasticinout = (percent: number, amplitude: number) => {
  var s, a = 0.1,
    p = 0.4;
  if (percent === 0) {
    return 0;
  }
  if (percent === 1) {
    return amplitude;
  }
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = p * Math.asin(1 / a) / PI2;
  }
  percent *= 2;
  if (percent < 1) {
    return -0.5 * (a * Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent - s) * PI2 / p));
  }
  return a * Math.pow(2, -10 * (percent -= 1)) * Math.sin((percent - s) * PI2 / p) * 0.5 + amplitude;
}

const backin = (percent: number, amplitude: number) => amplitude * percent * percent * ((1.70158 + 1) * percent - 1.70158);
const backout = (percent: number, amplitude: number) => amplitude * ((percent -= 1) * percent * ((1.70158 + 1) * percent + 1.70158) + 1);
const backinout = (percent: number, amplitude: number) => {
  var s = 1.70158;
  if ((percent /= 0.5) < 1) {
    return amplitude / 2 * (percent * percent * (((s *= (1.525)) + 1) * percent - s));
  }
  return amplitude / 2 * ((percent -= 2) * percent * (((s *= (1.525)) + 1) * percent + s) + 2);
}

const bouncein = (percent: number, amplitude: number) => amplitude - bounceout(1 - percent, amplitude);
const bounceout = (percent: number, amplitude: number) => {
  if (percent < (1 / 2.75)) {
    return amplitude * (7.5625 * percent * percent);
  } else if (percent < (2 / 2.75)) {
    return amplitude * (7.5625 * (percent -= (1.5 / 2.75)) * percent + 0.75);
  } else if (percent < (2.5 / 2.75)) {
    return amplitude * (7.5625 * (percent -= (2.25 / 2.75)) * percent + 0.9375);
  } else {
    return amplitude * (7.5625 * (percent -= (2.625 / 2.75)) * percent + 0.984375);
  }
}
const bounceinout = (percent: number, amplitude: number) => {
  if (percent < 0.5) {
    return bouncein(percent * 2, amplitude) * 0.5;
  }
  return bounceout(percent * 2 - 1, amplitude) * 0.5 + amplitude * 0.5;
}

export {
  linear,
  sinein,
  sineout,
  sineinout,
  exponentialin,
  exponentialout,
  exponentialinout,
  circularin,
  circularout,
  circularinout,
  elasticin,
  elasticout,
  elasticinout,
  backin,
  backout,
  backinout,
  bouncein,
  bounceout,
  bounceinout,
}