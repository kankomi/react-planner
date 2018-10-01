import moment from 'moment';
import business from 'moment-business';

export function workdaysInMonth(month, year) {
  let start = moment(`01.${month + 1}.${year}`, 'DD.MM.YYYY');
  let end = moment(start).add(start.daysInMonth(), 'days');

  return business.weekDays(start, end);
}
