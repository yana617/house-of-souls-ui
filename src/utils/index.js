export const randomIntNumber = (max = 10000) => Math.round(Math.random() * max);

export const randomStringNumber = (max = 10000) => this.randomIntNumber(max).toString();

export const randomElement = (arr) => arr[this.randomIntNumber(arr.length - 1)];

export const randomIntNumberFromTo = (min, max) => Math.floor(Math.random() * (max - min)) + min;
