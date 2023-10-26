import * as Ease from '../src/ease';

describe('ease.js', function() {

  describe('Ease.linear', function() {
    it('should ease a value from left to right', function() {
      expect(Ease.linear(0, 100)).toBeCloseTo(100);
      expect(Ease.linear(0.25, 100)).toBeCloseTo(100);
      expect(Ease.linear(0.5, 100)).toBeCloseTo(100);
      expect(Ease.linear(0.75, 100)).toBeCloseTo(100);
      expect(Ease.linear(1, 100)).toBeCloseTo(100);
    });
  });

  describe('Ease.sineinout', function() {
    it('should ease a value from left to right', function() {
      expect(Ease.sineinout(0, 100)).toBeCloseTo(0);
      expect(Ease.sineinout(0.25, 100)).toBeCloseTo(50);
      expect(Ease.sineinout(0.5, 100)).toBeCloseTo(100);
      expect(Ease.sineinout(0.75, 100)).toBeCloseTo(50);
      expect(Ease.sineinout(1, 100)).toBeCloseTo(0);
    });
  });

  describe('Ease.sinein', function() {
    it('should ease a value from left to right', function() {
      expect(Ease.sinein(0, 100)).toBeCloseTo(0);
      expect(Ease.sinein(0.25, 100)).toBeCloseTo(14.644660940672626);
      expect(Ease.sinein(0.5, 100)).toBeCloseTo(50);
      expect(Ease.sinein(0.75, 100)).toBeCloseTo(85.35533905932738);
      expect(Ease.sinein(1, 100)).toBeCloseTo(100);
    });
  });

  describe('Ease.sineout', function() {
    it('should ease a value from left to right', function() {
      expect(Ease.sineout(0, 100)).toBeCloseTo(100);
      expect(Ease.sineout(0.25, 100)).toBeCloseTo(85.35533905932738);
      expect(Ease.sineout(0.5, 100)).toBeCloseTo(50);
      expect(Ease.sineout(0.75, 100)).toBeCloseTo(14.644660940672626);
      expect(Ease.sineout(1, 100)).toBeCloseTo(0);
    });
  });

  describe('Easing', function() {
    it('should return a function if passed a ease function name', function() {
      expect(Ease['linear']).toEqual(Ease.linear);
      expect(Ease['sinein']).toEqual(Ease.sinein);
      expect(Ease['sineout']).toEqual(Ease.sineout);
      expect(Ease['sineinout']).toEqual(Ease.sineinout);
    });
  });

});
