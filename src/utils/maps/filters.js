import AnimalSex from '../enums/AnimalSex';
import AnimalStatus from '../enums/AnimalStatus';
import AnimalPlace from '../enums/AnimalPlace';
import AnimalType from '../enums/AnimalType';
import DogHeight from '../enums/DogHeight';
import Filters from '../enums/Filters';
import translates from '../translates/index';
import AnimalAge from '../enums/AnimalAge';

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
      {
        label: translates[AnimalPlace.MAIN_HOUSE],
        value: AnimalPlace.MAIN_HOUSE,
      },
      {
        label: translates[AnimalPlace.QUARANTINE_HOUSE],
        value: AnimalPlace.QUARANTINE_HOUSE,
      },
      {
        label: translates[AnimalPlace.CAT_HOUSE],
        value: AnimalPlace.CAT_HOUSE,
      },
      {
        label: translates[AnimalPlace.AVIARY],
        value: AnimalPlace.AVIARY,
      },
      {
        label: translates[AnimalPlace.ON_TEMPORARY_HOLD],
        value: AnimalPlace.ON_TEMPORARY_HOLD,
      },
    ],
  },
  {
    forVolunteersOnly: true,
    title: translates[Filters.ROOM],
    filterName: Filters.ROOM,
    options: [
      allOption,
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '7', value: '7' },
    ],
  },
  {
    forVolunteersOnly: true,
    title: translates[Filters.STATUS],
    filterName: Filters.STATUS,
    options: [
      { label: translates[AnimalStatus.HOMELESS], value: AnimalStatus.HOMELESS },
      { label: translates[AnimalStatus.ADOPTED], value: AnimalStatus.ADOPTED },
      { label: translates[AnimalStatus.DIED], value: AnimalStatus.DIED },
      { label: translates[AnimalStatus.LOST], value: AnimalStatus.LOST },
      { label: translates[AnimalStatus.PREPARATION], value: AnimalStatus.PREPARATION },
      { label: translates[AnimalStatus.ON_PROBATION], value: AnimalStatus.ON_PROBATION },
    ],
  },
];
