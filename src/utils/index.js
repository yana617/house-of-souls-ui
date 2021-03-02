exports.randomIntNumber = (max = 10000) => Math.round(Math.random() * max);

exports.randomElement = (arr) => arr[this.randomIntNumber(arr.length - 1)];
