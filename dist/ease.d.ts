/************************************************
 * @file  Left to right easing functions
 * @author Keaton Conrad
 ************************************************/
declare const linear: (percent: number, amplitude: number) => number;
declare const sinein: (percent: number, amplitude: number) => number;
declare const sineout: (percent: number, amplitude: number) => number;
declare const sineinout: (percent: number, amplitude: number) => number;
declare const exponentialin: (percent: number, amplitude: number) => number;
declare const exponentialout: (percent: number, amplitude: number) => number;
declare const exponentialinout: (percent: number, amplitude: number) => number;
declare const circularin: (percent: number, amplitude: number) => number;
declare const circularout: (percent: number, amplitude: number) => number;
declare const circularinout: (percent: number, amplitude: number) => number;
declare const elasticin: (percent: number, amplitude: number) => number;
declare const elasticout: (percent: number, amplitude: number) => number;
declare const elasticinout: (percent: number, amplitude: number) => number;
declare const backin: (percent: number, amplitude: number) => number;
declare const backout: (percent: number, amplitude: number) => number;
declare const backinout: (percent: number, amplitude: number) => number;
declare const bouncein: (percent: number, amplitude: number) => number;
declare const bounceout: (percent: number, amplitude: number) => number;
declare const bounceinout: (percent: number, amplitude: number) => number;
export { linear, sinein, sineout, sineinout, exponentialin, exponentialout, exponentialinout, circularin, circularout, circularinout, elasticin, elasticout, elasticinout, backin, backout, backinout, bouncein, bounceout, bounceinout, };
