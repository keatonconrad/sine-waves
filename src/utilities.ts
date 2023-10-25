/**
 * Create a clone of an object
 */
const shallowClone = (src: { [key: string]: any }) => {
  const dest: { [key: string]: any } = {};
  for (const i in src) {
    if (src.hasOwnProperty(i)) {
      dest[i] = src[i];
    }
  }
  return dest;
};

/**
 * Basic Extend Function
 */
const defaults = (dest: { [key: string]: any }, src: { [key: string]: any } = {}) => {
  if (typeof dest !== 'object' || dest === null) {
    src = {};
  }
  const clone = shallowClone(dest);
  for (const i in src) {
    if (src.hasOwnProperty(i)) {
      clone[i] = src[i];
    }
  }
  return clone;
};

/**
 * Convert degrees to radians for rotation function
 */
const degreesToRadians = (degrees: any) => {
  if (typeof degrees !== 'number') {
    throw new TypeError('Degrees is not a number');
  }
  return degrees * (Math.PI / 180);
};

/**
 * You can either directly specify an easing function, use a built-in function
 * or default to the basic SineInOut
 */
const getFn = (obj: { [key: string]: any }, name: string | Function, def: string) => {
  if (typeof name === 'function') {
    return name;
  } else if (typeof name === 'string' && typeof obj[name.toLowerCase()] === 'function') {
    return obj[name.toLowerCase()];
  } else {
    return obj[def];
  }
};

export {
  shallowClone,
  defaults,
  degreesToRadians,
  getFn
};
