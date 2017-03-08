
/**
 * Periodic time interval test start
 */
QUnit.module('Unit | Utility | chart utils');

// the year I didn't get what I wanted for xmas
var startDate = new Date(1990, 11, 25);

QUnit.test('getPeriodicTimeInterval returns year if > 12 months and <= 25 years', function (assert) {
  let result = esriUtils.field.getPeriodicTimeInterval(startDate, new Date(2005, 11, 25));
  assert.equal(result, 'year');
});

QUnit.test('getPeriodicTimeInterval returns month if > 31 days and <= 12 months', function (assert) {
  let result = esriUtils.field.getPeriodicTimeInterval(startDate, new Date(1991, 8, 24));
  assert.equal(result, 'month');
});

QUnit.test('getPeriodicTimeInterval returns day if > 24 hours and <= 21 days', function (assert) {
  let result = esriUtils.field.getPeriodicTimeInterval(startDate, new Date(1991, 0, 6));
  assert.equal(result, 'day');
});

QUnit.test('getPeriodicTimeInterval returns hour if > 30 minutes and <= 24 hours', function (assert) {
  let result = esriUtils.field.getPeriodicTimeInterval(startDate, new Date(1990, 11, 25, 23, 59));
  assert.equal(result, 'hour');
});

QUnit.test('getPeriodicTimeInterval returns minute if > 30 seconds and <= 30 minutes', function (assert) {
  let result = esriUtils.field.getPeriodicTimeInterval(startDate, new Date(1990, 11, 25, 0, 29));
  assert.equal(result, 'minute');
});

QUnit.test('getPeriodicTimeInterval returns second if > 1 second and <= 30 seconds', function (assert) {
  let result = esriUtils.field.getPeriodicTimeInterval(startDate, new Date(1990, 11, 25, 0, 0, 29));
  assert.equal(result, 'second');
});

QUnit.test('getPeriodicTimeInterval returns null if < 1 second', function (assert) {
  let result = esriUtils.field.getPeriodicTimeInterval(startDate, new Date(1990, 11, 25, 0, 0, 0, 500));
  assert.equal(result, null);
});

/**
 * shouldChartAttribute tests start
 */

QUnit.test('shouldChartAttribute returns false if no stats', function (assert) {
  let result = esriUtils.field.shouldChartAttribute('esriFieldTypeString', undefined);
  assert.notOk(result);
  // TODO: test other field types here?
});

QUnit.test('shouldChartAttribute returns false if duration <= 0', function (assert) {
  const stats = {
    duration: 0
  };
  let result = esriUtils.field.shouldChartAttribute('esriFieldTypeString', stats);
  assert.notOk(result);
  // TODO: test other field types/counts here?
});

QUnit.test('shouldChartAttribute returns false if count === 0', function (assert) {
  const stats = {
    count: 0,
    duration: 543
  };
  let result = esriUtils.field.shouldChartAttribute('esriFieldTypeString', stats);
  assert.notOk(result);
  // TODO: test other field types/durations here?
});

QUnit.test('shouldChartAttribute returns false for date/time fields that have supportsSqlExpression=false', function (assert) {
  const stats = {
    count: 1234,
    duration: 543
  };
  const options = {
    advancedQueryCapabilities: {
      supportsSqlExpression: false
    }
  };
  let result = esriUtils.field.shouldChartAttribute('esriFieldTypeDate', stats, options);
  assert.notOk(result);
});

QUnit.test('shouldChartAttribute returns true for date/time fields that have supportsSqlExpression=true && pass timeHeuristics', function (assert) {
  const stats = {
    count: 1234,
    duration: 543,
    min: startDate,
    max: new Date(2005, 11, 25)
  };
  const options = {
    advancedQueryCapabilities: {
      supportsSqlExpression: true
    }
  };
  let result = esriUtils.field.shouldChartAttribute('esriFieldTypeDate', stats, options);
  assert.ok(result);
});

QUnit.test(`shouldChartAttribute returns true for date/time fields that do not have supportsSqlExpression,
  but that have a maxRecordCount < 10000 && recordCount < maxRecordCount && pass timeHeuristics`, function (assert) {
  const stats = {
    count: 1234,
    duration: 543,
    min: startDate,
    max: new Date(2005, 11, 25)
  };
  const options = {
    maxRecordCount: 6000,
    recordCount: 5000
  };
  let result = esriUtils.field.shouldChartAttribute('esriFieldTypeDate', stats, options);
  assert.ok(result);
});

QUnit.test(`shouldChartAttribute returns false when recordCount exceeds 10000`, function (assert) {
  const stats = {
    count: 1234,
    duration: 543,
    min: startDate,
    max: new Date(2005, 11, 25)
  };
  const options = {
    maxRecordCount: 50000,
    recordCount: 10001
  };
  let result = esriUtils.field.shouldChartAttribute('esriFieldTypeDate', stats, options);
  assert.notOk(result);
});

QUnit.test(`shouldChartAttribute returns false when recordCount exceeds maxRecordCount`, function (assert) {
  const stats = {
    count: 1234,
    duration: 543,
    min: startDate,
    max: new Date(2005, 11, 25)
  };
  const options = {
    maxRecordCount: 1000,
    recordCount: 5000
  };
  let result = esriUtils.field.shouldChartAttribute('esriFieldTypeDate', stats, options);
  assert.notOk(result);
});

QUnit.test('shouldChartAttribute returns true for string field w/ duration > 0 and count < 20', function (assert) {
  const stats = {
    count: 20,
    duration: 543
  };
  let result = esriUtils.field.shouldChartAttribute('esriFieldTypeString', stats);
  assert.ok(result);
});

QUnit.test('shouldChartAttribute returns true for numeric field w/ duration > 0 and count < 0', function (assert) {
  const stats = {
    count: 1234,
    duration: 543
  };
  // integer
  let result = esriUtils.field.shouldChartAttribute('esriFieldTypeInteger', stats);
  assert.ok(result);
  // double
  result = esriUtils.field.shouldChartAttribute('esriFieldTypeDouble', stats);
  assert.ok(result);
});
