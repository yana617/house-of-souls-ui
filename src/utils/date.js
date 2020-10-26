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

const parseDate = (date) => {
  const options = { day: 'numeric', month: 'long' };
  const jsDate = new Date(date);
  return jsDate.toLocaleDateString('ru-RU', options);
};

const getPrevMondayString = () => {
  const prevMonday = new Date();
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + (WEEK_LENGTH - 1)) % WEEK_LENGTH));
  prevMonday.setHours(6);
  return prevMonday.toISOString().slice(0, 10);
};

const getNextMondayString = () => {
  const nextMonday = new Date();
  nextMonday.setDate(nextMonday.getDate() + ((WEEK_LENGTH - nextMonday.getDay()) % WEEK_LENGTH) + 1);
  nextMonday.setHours(6);
  return nextMonday.toISOString().slice(0, 10);
};

const getInTwoWeeksMondayString = () => {
  const inTwoWeeksMonday = new Date();
  inTwoWeeksMonday.setDate(inTwoWeeksMonday.getDate() + ((WEEK_LENGTH - inTwoWeeksMonday.getDay()) % WEEK_LENGTH)
    + 1 + WEEK_LENGTH);
  inTwoWeeksMonday.setHours(6);
  return inTwoWeeksMonday.toISOString().slice(0, 10);
};

module.exports = {
  daysOfWeek,
  parseDate,
  getPrevMondayString,
  getNextMondayString,
  getInTwoWeeksMondayString,
};
