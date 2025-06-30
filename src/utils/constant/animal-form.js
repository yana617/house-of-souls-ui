import AnimalPlace from '../enums/AnimalPlace';
import AnimalStatus from '../enums/AnimalStatus';
import AnimalType from '../enums/AnimalType';
import translates from '../translates/index';

export const TYPE_OPTIONS = [
  {
    label: 'Собака',
    value: AnimalType.DOG,
  },
  {
    label: 'Кот',
    value: AnimalType.CAT,
  },
  {
    label: 'Другое',
    value: AnimalType.OTHER,
  },
];

export const PLACE_OPTIONS = [
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
];

export const ROOM_OPTIONS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
];

export const STATUS_OPTIONS = [
  { label: translates[AnimalStatus.HOMELESS], value: AnimalStatus.HOMELESS },
  { label: translates[AnimalStatus.ADOPTED], value: AnimalStatus.ADOPTED },
  { label: translates[AnimalStatus.DIED], value: AnimalStatus.DIED },
  { label: translates[AnimalStatus.LOST], value: AnimalStatus.LOST },
  { label: translates[AnimalStatus.PREPARATION], value: AnimalStatus.PREPARATION },
  { label: translates[AnimalStatus.ON_PROBATION], value: AnimalStatus.ON_PROBATION },
];
