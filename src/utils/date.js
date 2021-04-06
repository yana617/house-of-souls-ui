const WEEK_LENGTH = 7;

const daysOfWeek = {
  1: 'ПН',
  2: 'ВТ',
  3: 'СР',
  4: 'ЧТ',
  5: 'ПТ',
  6: 'СБ',
  0: 'ВС',
};

const typeOfTime = {
  morning: 'Утро',
  evening: 'Вечер',
};

const DEFAULT_HOURS = 6;
const DATE_LENGTH = 10;

const parseDate = (date) => {
  const options = { day: 'numeric', month: 'long' };
  const jsDate = new Date(date);
  return jsDate.toLocaleDateString('ru-RU', options);
};

const getPrevMondayString = () => {
  const prevMonday = new Date();
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + (WEEK_LENGTH - 1)) % WEEK_LENGTH));
  prevMonday.setHours(DEFAULT_HOURS);
  return prevMonday.toISOString().slice(0, DATE_LENGTH);
};

const getNextMondayString = () => {
  const nextMonday = new Date();
  nextMonday.setDate(nextMonday.getDate() + ((WEEK_LENGTH - nextMonday.getDay()) % WEEK_LENGTH) + 1);
  nextMonday.setHours(DEFAULT_HOURS);
  return nextMonday.toISOString().slice(0, DATE_LENGTH);
};

const getInTwoWeeksMondayString = () => {
  const inTwoWeeksMonday = new Date();
  inTwoWeeksMonday.setDate(inTwoWeeksMonday.getDate() + ((WEEK_LENGTH - inTwoWeeksMonday.getDay()) % WEEK_LENGTH)
    + 1 + WEEK_LENGTH);
  inTwoWeeksMonday.setHours(DEFAULT_HOURS);
  return inTwoWeeksMonday.toISOString().slice(0, DATE_LENGTH);
};

const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

module.exports = {
  daysOfWeek,
  typeOfTime,
  parseDate,
  getPrevMondayString,
  getNextMondayString,
  getInTwoWeeksMondayString,
  randomDate,
};
