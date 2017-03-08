/* global moment */
/**
 * How to get Periodic time intervals
 *
  * @param {date} startDate - Starting date
  * @param {date} endDate - Ending date
  * @returns {string} or {null} - Returns type of time interval or null
 */
export default function getPeriodicTimeInterval (startDate, endDate) {
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
