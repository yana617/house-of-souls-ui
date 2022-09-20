exports.randomIntNumber = (max = 10000) => Math.round(Math.random() * max);

exports.randomStringNumber = (max = 10000) => this.randomIntNumber(max).toString();

exports.randomElement = (arr) => arr[this.randomIntNumber(arr.length - 1)];

exports.randomIntNumberFromTo = (min, max) => Math.floor(Math.random() * (max - min)) + min;
