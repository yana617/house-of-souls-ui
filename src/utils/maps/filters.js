import AnimalSex from '../enums/AnimalSex';
import AnimalType from '../enums/AnimalType';
import DogHeight from '../enums/DogHeight';
import Filters from '../enums/Filters';
import translates from '../translates/index';
import AnimalAge from '../enums/AnimalAge';
import { PLACE_OPTIONS, ROOM_OPTIONS, STATUS_OPTIONS } from '../constant/animal-form';

const allOption = {
  label: 'Все',
  value: 'all',
};

export default [
  {
    title: translates[Filters.TYPE],
    filterName: Filters.TYPE,
    options: [
      allOption,
      {
        label: translates[AnimalType.DOG].many,
        value: AnimalType.DOG,
      },
      {
        label: translates[AnimalType.CAT].many,
        value: AnimalType.CAT,
      },
    ],
  },
  {
    title: translates[Filters.SEX],
    filterName: Filters.SEX,
    options: [
      allOption,
      {
        label: 'Мальчик',
        value: AnimalSex.MALE,
      },
      {
        label: 'Девочка',
        value: AnimalSex.FEMALE,
      },
    ],
  },
  {
    title: translates[Filters.AGE],
    filterName: Filters.AGE,
    options: [
      allOption,
      {
        label: translates[AnimalAge.UNDER_YEAR],
        value: AnimalAge.UNDER_YEAR,
      },
      {
        label: translates[AnimalAge.OVER_YEAR],
        value: AnimalAge.OVER_YEAR,
      },
    ],
  },
  {
    title: translates[Filters.HEIGHT],
    filterName: Filters.HEIGHT,
    options: [
      allOption,
      {
        label: translates[DogHeight.SMALL],
        value: DogHeight.SMALL,
      },
      {
        label: translates[DogHeight.MEDIUM],
        value: DogHeight.MEDIUM,
      },
      {
        label: translates[DogHeight.BIG],
        value: DogHeight.BIG,
      },
    ],
  },
  {
    forVolunteersOnly: true,
    title: translates[Filters.STERILIZED]?.title?.[AnimalSex.MALE],
    filterName: Filters.STERILIZED,
    options: [
      allOption,
      {
        label: 'Кастрированы',
        value: 'true',
      },
      {
        label: 'Не кастрированы',
        value: 'false',
      },
    ],
  },
  {
    forVolunteersOnly: true,
    title: translates[Filters.PLACE],
    filterName: Filters.PLACE,
    options: [
      allOption,
      ...PLACE_OPTIONS,
    ],
  },
  {
    forVolunteersOnly: true,
    title: translates[Filters.ROOM],
    filterName: Filters.ROOM,
    options: [
      allOption,
      ...ROOM_OPTIONS,
    ],
  },
  {
    forVolunteersOnly: true,
    title: translates[Filters.STATUS],
    filterName: Filters.STATUS,
    options: STATUS_OPTIONS,
  },
];
