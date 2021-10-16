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

const MS_IN_DAY_AMOUNT = 1000 * 60 * 60 * 24;

const typeOfTime = {
  morning: 'Утро',
  evening: 'Вечер',
};

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

const getWeekDatesRange = (diffFromCurrent = 0) => {
  const target = new Date(Date.now() + WEEK_LENGTH * diffFromCurrent * MS_IN_DAY_AMOUNT);
  const from = target.setDate(target.getDate() - (target.getDay() || WEEK_LENGTH) + 1);
  const to = target.setDate(target.getDate() + WEEK_LENGTH - 1);

  return { from: new Date(from).toISOString(), to: new Date(to).toISOString() };
};

const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const weekDayOfDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', { weekday: 'long' }).format(date);
};

export {
  MS_IN_DAY_AMOUNT,
  daysOfWeek,
  typeOfTime,
  parseDateAndTime,
  parseDate,
  calculateAge,
  randomDate,
  getWeekDatesRange,
  weekDayOfDate,
};
