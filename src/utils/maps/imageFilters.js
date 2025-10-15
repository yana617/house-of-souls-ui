import AnimalAge from '../enums/AnimalAge';

export default [{
  type: 'dog',
  age: AnimalAge.OVER_YEAR,
  labelShort: 'Собаки',
  labelLong: 'Собаки от 1 года',
  image: 'dog-filter.webp',
}, {
  type: 'dog',
  age: AnimalAge.UNDER_YEAR,
  labelShort: 'Щенки',
  labelLong: 'Щенки до 1 года',
  image: 'puppy-filter.webp',
}, {
  type: 'cat',
  age: AnimalAge.OVER_YEAR,
  labelShort: 'Коты',
  labelLong: 'Коты от 1 года',
  image: 'cat-filter.webp',
}, {
  type: 'cat',
  age: AnimalAge.UNDER_YEAR,
  labelShort: 'Котята',
  labelLong: 'Котята до 1 года',
  image: 'kitten-filter.webp',
}];
