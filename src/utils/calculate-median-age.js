export const calculateMedianAge = (data) => {
  const allAges = [];

  data.forEach((item) => {
    for (let i = 0; i < item.count; i++) {
      if (item.age === 'меньше 1 года') {
        allAges.push(0.5);
      } else {
        const ageNumber = parseInt(item.age.match(/\d+/)[0]);
        allAges.push(ageNumber);
      }
    }
  });

  if (allAges.length === 0) {
    return null;
  }

  allAges.sort((a, b) => a - b);

  const middleIndex = Math.floor(allAges.length / 2);

  if (allAges.length % 2 === 0) {
    return (allAges[middleIndex - 1] + allAges[middleIndex]) / 2;
  } else {
    return allAges[middleIndex];
  }
};
