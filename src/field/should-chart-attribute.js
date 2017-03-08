/* global moment */
import isNumericType from './is-numeric-type';

/**
 * Should a chart attribute be allowed to be chartable
 * @param  {string} fieldType What is the field type?
 * @param  {object} stats     The stats object as passed in
 * @param  {object} options   Options (maxCount, advancedQueryCapabilities)
 * @return {boolean}           Yes/no on chartability
 */
export function shouldChartAttribute (fieldType, stats, options) {
  // set default options
  let defaultOptions = {
    maxCount: 20,
    maxRecordCount: 10001,
    recordCount: 10002,
    advancedQueryCapabilities: false
  };
  // Merge defaults and actual options object
  let internalOptions = Object.assign({}, defaultOptions, options);

  // If stats are undefined just exit immediately
  if (!stats) {
    return false;
  }

  // Declare our Heuristics
  const heuristics = {
    fieldType,
    durationBool: stats.duration > 0,
    countBool: stats.count <= internalOptions.maxCount,
    notEmptyBool: stats.count > 0,
    notAllEmptyVals: stats.max !== 0 && stats.min !== 0,
    sqlExpressionBool: !!internalOptions.advancedQueryCapabilities && internalOptions.advancedQueryCapabilities.supportsSqlExpression,
    maxRecordCountBool: recordCountBool(internalOptions.recordCount, internalOptions.maxRecordCount),
    timeIntervalBool: !!getPeriodicTimeInterval(stats.min, stats.max)
  };

  return evaluatedHeuristics(heuristics);
}

// Determine if it can be charted...

function evaluatedHeuristics (heuristics) {
  if (isNumericType(heuristics.fieldType)) {
    // If numeric check that duration is greater than 0 and count is greater than 0
    return heuristics.durationBool && heuristics.notEmptyBool && heuristics.notAllEmptyVals;
  } else if (heuristics.fieldType === 'esriFieldTypeString') {
    // If string check that duration is greater than 0 and count is greater than 0
    // and that count is less than or equal to maxCount
    return heuristics.countBool && heuristics.durationBool && heuristics.notEmptyBool;
  } else if (heuristics.fieldType === 'esriFieldTypeDate') {
    // If date check that duration is greater than 0 and count is greater than 0
    // and that sqlExpressions are supported
    return heuristics.notEmptyBool && heuristics.durationBool &&
      (heuristics.sqlExpressionBool || heuristics.maxRecordCountBool) &&
      heuristics.timeIntervalBool;
  }

  return false;
}

// return maxRecordCount boolean
function recordCountBool (recordCount, maxRecordCount) {
  return recordCount <= maxRecordCount && recordCount <= 10000;
}

/**
 * How to get Periodic time intervals
 *
  * @param {date} startDate - Starting date
  * @param {date} endDate - Ending date
  * @returns {string} or {null} - Returns type of time interval or null
 */

export function getPeriodicTimeInterval (startDate, endDate) {
   // Make our start / ends be wrapped in moment for comparison logic
  const start = moment(startDate);
  const end = moment(endDate);

  if (!shouldCalcDates(startDate, endDate)) { return null; }

  if (calcDiffInDates(end, start, 'year') <= 25 && calcDiffInDates(end, start, 'month') > 12) {
    return 'year';
  } else if (calcDiffInDates(end, start, 'month') <= 12 && calcDiffInDates(end, start, 'day') > 31) {
    return 'month';
  } else if (calcDiffInDates(end, start, 'day') <= 31 && calcDiffInDates(end, start, 'hour') > 24) {
    return 'day';
  } else if (calcDiffInDates(end, start, 'hour') <= 24 && calcDiffInDates(end, start, 'minute') > 30) {
    return 'hour';
  } else if (calcDiffInDates(end, start, 'minute') <= 30 && calcDiffInDates(end, start, 'second') > 30) {
    return 'minute';
  } else if (calcDiffInDates(end, start, 'second') <= 30 && calcDiffInDates(end, start, 'second') > 1) {
    return 'second';
  }

  return null;
}

// Determine the differences in dates. True is needed to calc as a float.
function calcDiffInDates (end, start, measureOfTime) {
  return end.diff(start, measureOfTime, true);
}

// Should we calc a time interval even?
function shouldCalcDates (start, end) {
  // if either date is invalid return null
  if (!validDate(start) || !validDate(end)) { return null; }
  // if the start date is after the end date return null
  if (!startDateAfterEndDate(start, end)) { return null; }
  return true;
}

// Is the date valid? new Date() because moment doesn't recognize datetime objects otherwise
function validDate (date) {
  return moment.isDate(new Date(date));
}

// Is the start date after the end date?
function startDateAfterEndDate (start, end) {
  return moment(start).isBefore(end);
}
