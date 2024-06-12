import AnimalStatus from '../enums/AnimalStatus';
import Filters from '../enums/Filters';
import AnimalSex from '../enums/AnimalSex';
import AnimalPlace from '../enums/AnimalPlace';
import DogHeight from '../enums/DogHeight';
import AnimalType from '../enums/AnimalType';
import AnimalAge from '../enums/AnimalAge';

export default {
  RU: {
    [AnimalStatus.HOMELESS]: 'Ищет Дом',
    [AnimalStatus.ADOPTED]: 'Дома 🎉',
    [AnimalStatus.DIED]: 'На радуге 😢',
    [AnimalStatus.LOST]: 'Потерялся',
    [AnimalStatus.PREPARATION]: 'Подготовка к поиску дома',

    [AnimalSex.FEMALE]: 'Девочка',
    [AnimalSex.MALE]: 'Мальчик',

    [Filters.AGE]: 'Возраст',
    [Filters.HEIGHT]: 'Рост',
    [Filters.PLACE]: 'Расположение',
    [Filters.ROOM]: 'Комната',
    [Filters.SEX]: 'Пол',
    [Filters.STATUS]: 'Статус',
    [Filters.STERILIZED]: {
      title: {
        [AnimalSex.FEMALE]: 'Стерилизация',
        [AnimalSex.MALE]: 'Кастрация',
      },
      one: {
        [AnimalSex.FEMALE]: 'Стерилизована',
        [AnimalSex.MALE]: 'Кастрирован',
      },
      many: {
        [AnimalSex.FEMALE]: 'Стерилизованы',
        [AnimalSex.MALE]: 'Кастрированы',
      },
    },
    [Filters.TYPE]: 'Категория',

    [AnimalPlace.MAIN_HOUSE]: 'Главный дом',
    [AnimalPlace.CHANGE_HOUSE]: 'Бытовка',
    [AnimalPlace.CAT_HOUSE]: 'Кошачий дом',
    [AnimalPlace.AVIARY]: 'Вольер',
    [AnimalPlace.ON_TEMPORARY_HOLD]: 'На временной передержке',

    [AnimalType.CAT]: {
      one: 'Кот',
      many: 'Коты',
    },
    [AnimalType.DOG]: {
      one: 'Собака',
      many: 'Собаки',
    },

    [DogHeight.SMALL]: 'Маленькие (до 38 см)',
    [DogHeight.MEDIUM]: 'Средние (от 39 до 50 см)',
    [DogHeight.BIG]: 'Большие (от 51 см)',

    [AnimalAge.OVER_YEAR]: 'От 1 года',
    [AnimalAge.UNDER_YEAR]: 'До 1 года',
  },
  EN: {

  },
};
