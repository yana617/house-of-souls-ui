const computeHeightRangeTranslate = (height) => {
  if (height <= 38) {
    return 'маленький';
  }
  if (height > 38 && height <= 50) {
    return 'средний';
  }
  return 'большой';
};

const computeMonthTranslate = (count) => {
  if (count === 0) {
    return 'меньше месяца';
  }
  if (count === 1) {
    return 'месяц';
  }
  if (count >= 2 && count <= 4) {
    return 'месяца';
  }
  return 'месяцев';
};

const computeYearTranslate = (count) => {
  if (count === 0) {
    return 'меньше года';
  }
  if (count === 1) {
    return 'год';
  }
  if (count >= 2 && count <= 4) {
    return 'года';
  }
  return 'лет';
};

export {
  computeHeightRangeTranslate,
  computeMonthTranslate,
  computeYearTranslate,
};
