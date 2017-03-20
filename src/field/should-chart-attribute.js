import getPeriodicTimeInterval from '../date/get-periodic-time-interval';
import isNumericType from './is-numeric-type';

/**
 * Should a chart attribute be allowed to be chartable
 * @param  {string} fieldType What is the field type?
 * @param  {object} stats     The stats object as passed in
 * @param  {object} options   Options (maxCount, advancedQueryCapabilities)
 * @return {boolean}           Yes/no on chartability
 */
export default function shouldChartAttribute (fieldType, stats, options) {
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
    allEmptyVals: stats.max === 0 && stats.min === 0,
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
    return heuristics.durationBool && heuristics.notEmptyBool && !heuristics.allEmptyVals;
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
