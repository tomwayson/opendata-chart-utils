
QUnit.module('getPeriodicTimeInterval');

// the year I didn't get what I wanted for xmas
var startDate = new Date(1990, 11, 25);

QUnit.test('getPeriodicTimeInterval returns year if > 12 months and <= 25 years', function (assert) {
  let result = opendataChartUtils.field.getPeriodicTimeInterval(startDate, new Date(2005, 11, 25));
  assert.equal(result, 'year');
});

QUnit.test('getPeriodicTimeInterval returns month if > 31 days and <= 12 months', function (assert) {
  let result = opendataChartUtils.field.getPeriodicTimeInterval(startDate, new Date(1991, 8, 24));
  assert.equal(result, 'month');
});

QUnit.test('getPeriodicTimeInterval returns day if > 24 hours and <= 21 days', function (assert) {
  let result = opendataChartUtils.field.getPeriodicTimeInterval(startDate, new Date(1991, 0, 6));
  assert.equal(result, 'day');
});

QUnit.test('getPeriodicTimeInterval returns hour if > 30 minutes and <= 24 hours', function (assert) {
  let result = opendataChartUtils.field.getPeriodicTimeInterval(startDate, new Date(1990, 11, 25, 23, 59));
  assert.equal(result, 'hour');
});

QUnit.test('getPeriodicTimeInterval returns minute if > 30 seconds and <= 30 minutes', function (assert) {
  let result = opendataChartUtils.field.getPeriodicTimeInterval(startDate, new Date(1990, 11, 25, 0, 29));
  assert.equal(result, 'minute');
});

QUnit.test('getPeriodicTimeInterval returns second if > 1 second and <= 30 seconds', function (assert) {
  let result = opendataChartUtils.field.getPeriodicTimeInterval(startDate, new Date(1990, 11, 25, 0, 0, 29));
  assert.equal(result, 'second');
});

QUnit.test('getPeriodicTimeInterval returns null if < 1 second', function (assert) {
  let result = opendataChartUtils.field.getPeriodicTimeInterval(startDate, new Date(1990, 11, 25, 0, 0, 0, 500));
  assert.equal(result, null);
});
