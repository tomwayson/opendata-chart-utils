import isNumericType from '../../src/field/is-numeric-type';

/* global describe, it, expect */
describe('isNumericType', function () {
  it('returns true for numeric types', function () {
    const types = ['esriFieldTypeSmallInteger', 'esriFieldTypeInteger', 'esriFieldTypeSingle', 'esriFieldTypeDouble'];
    types.forEach(function (type) {
      expect(isNumericType(type)).toBe(true);
    });
  });

  it('returns false for non-numeric types', function () {
    const types = ['esriFieldTypeString',
      'esriFieldTypeDate',
      'esriFieldTypeOID', 'esriFieldTypeGlobalID',
      'esriFieldTypeGeometry', 'esriFieldTypeBlob', 'esriFieldTypeRaster', 'esriFieldTypeGUID', 'esriFieldTypeXML'];
    types.forEach(function (type) {
      expect(isNumericType(type)).toBe(false);
    });
  });
});
