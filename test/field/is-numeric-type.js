QUnit.module('is numeric field type');

QUnit.test('it returns true for numeric types', function (assert) {
  var types = ['esriFieldTypeSmallInteger', 'esriFieldTypeInteger', 'esriFieldTypeSingle', 'esriFieldTypeDouble'];
  types.forEach(function (type) {
    assert.ok(arcgisChartUtils.field.isNumericType(type), type + ' should be numeric');
  });
});

QUnit.test('it returns fals for non-numeric types', function (assert) {
  var types = ['esriFieldTypeString',
    'esriFieldTypeDate',
    'esriFieldTypeOID', 'esriFieldTypeGlobalID',
    'esriFieldTypeGeometry', 'esriFieldTypeBlob', 'esriFieldTypeRaster', 'esriFieldTypeGUID', 'esriFieldTypeXML'];
  types.forEach(function (type) {
    assert.notOk(arcgisChartUtils.field.isNumericType(type), type + ' should not be numeric');
  });
});
