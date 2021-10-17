import { MS_IN_DAY_AMOUNT } from '@/utils/date';

const getDayMock = (date) => ({
  date,
  morning: [],
  evening: [],
});

const generateDatesRange = (fromTimeStamp, toTimeStamp) => {
  const fromTimeStampMiddle = new Date(fromTimeStamp);
  const iterateDate = new Date(fromTimeStampMiddle);
  const range = [];

  do {
    const middleOfDay = new Date(iterateDate).setHours(12);
    range.push(getDayMock(new Date(middleOfDay)));
  } while (iterateDate.setHours(24) <= toTimeStamp);

  return range;
};

const mapClaims = (response) => {
  const { from, to, claims } = response;

  const fromTimeStamp = new Date(from).setHours(0, 0, 0, 0);
  const toTimeStamp = new Date(to).setHours(23, 59, 59, 0);

  return {
    from,
    to,
    claims: claims.reduce((result, claim) => {
      const currentDate = new Date(claim.date);
      const currentTimeStamp = currentDate.setHours(6, 0, 0, 0);

      if (currentTimeStamp > toTimeStamp || currentTimeStamp < fromTimeStamp) return result;

      const dayIndex = Math.floor((currentTimeStamp - fromTimeStamp) / MS_IN_DAY_AMOUNT);
      const day = result[dayIndex];
      const current = [];

      current[dayIndex] = {
        ...day,
        [claim.type]: [
          ...day[claim.type],
          claim,
        ],
      };

      return Object.assign([], result, current);
    }, generateDatesRange(fromTimeStamp, toTimeStamp)),
  };
};

// result structure:
// [{ date: String, morning: [claims], evening: [claims] }]

export default mapClaims;
