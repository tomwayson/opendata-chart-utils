import isDate from 'date-fns/is_date';
import isAfter from 'date-fns/is_after';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import differenceInMonths from 'date-fns/difference_in_months';

/**
 * How to get Periodic time intervals
 *
  * @param {date} startDate - Starting date
  * @param {date} endDate - Ending date
  * @returns {string} or {null} - Returns type of time interval or null
 */
export default function getPeriodicTimeInterval (startDate, endDate) {
  // if either date is invalid return null
  if (!isDate(startDate) || !isDate(endDate)) {
    return null;
  }
  // if the start date is after the end date return null
  if (isAfter(startDate, endDate)) {
    return null;
  }
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = 12;
  const seconds = differenceInSeconds(endDate, startDate);
  console.log('seconds', seconds);
  if (seconds <= 1) {
    return null;
  }
  if (seconds <= 30) {
    return 'second';
  } else if (seconds <= (30 * minute)) {
    return 'minute';
  } else if (seconds <= (24 * hour)) {
    return 'hour';
  } else if (seconds <= (29 * day)) {
    return 'day';
  } else {
    const months = differenceInMonths(endDate, startDate);
    if (months <= 12) {
      return 'month';
    } else if (months <= (25 * year)) {
      return 'year';
    } else {
      return null;
    }
  }
}
