import AnimalAge from './enums/AnimalAge';
import AnimalPlace from './enums/AnimalPlace';
import AnimalType from './enums/AnimalType';
import Filters from './enums/Filters';

export const isFilterVisible = ({
  filterName,
  forVolunteersOnly,
  routeQuery,
  hasViewAnimalPermission,
}) => {
  if (forVolunteersOnly && !hasViewAnimalPermission) {
    return false;
  }

  if (filterName === Filters.HEIGHT) {
    const { type, age } = routeQuery;
    return type === AnimalType.DOG && age === AnimalAge.OVER_YEAR;
  }

  if (filterName === Filters.ROOM) {
    const { place } = routeQuery;
    return place && place !== AnimalPlace.ON_TEMPORARY_HOLD;
  }

  return true;
};
