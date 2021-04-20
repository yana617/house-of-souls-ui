const WEEK_LENGTH = 7;

const daysOfWeek = {
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
  0: 'Воскресенье',
};

const DEFAULT_HOURS = 6;
const DATE_LENGTH = 10;

const calculateAge = (birthdayDate) => {
  const birthday = new Date(birthdayDate);
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const parseDateAndTime = (date) => {
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const jsDate = new Date(date);
  return jsDate.toLocaleDateString('ru-RU', options);
};

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
  parseDateAndTime,
  parseDate,
  getPrevMondayString,
  getNextMondayString,
  getInTwoWeeksMondayString,
  calculateAge,
  randomDate,
};
