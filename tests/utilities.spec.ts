import { degreesToRadians } from "../src/utilities";

describe('utilities.js', function() {

  describe('degreesToRadians', function() {
    it('should convert radians to degrees' , function() {
      expect(degreesToRadians(0)).toBeCloseTo(0);
      expect(degreesToRadians(90)).toBeCloseTo(Math.PI * 0.5);
      expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
      expect(degreesToRadians(270)).toBeCloseTo(Math.PI * 1.5);
      expect(degreesToRadians(360)).toBeCloseTo(Math.PI * 2);
  });
});
});