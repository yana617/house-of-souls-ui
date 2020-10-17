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

module.exports = {
  daysOfWeek,
  parseDate,
};
