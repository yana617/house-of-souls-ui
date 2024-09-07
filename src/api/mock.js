import { randomElement, randomIntNumberFromTo } from '@/utils';

const primitiveMocks = {
  names: ['Яна', 'Аня', 'Гюнель', 'Александра'],
  surnames: ['Маненко', 'Крусник', 'Василевская', 'Стасенко', 'Агаева'],
  phones: ['+375293355013', '+375299284739', '+375292960171'],
  arrival_time: ['8.30', '17.00', null],
  comments: ['Буду только к 19.00', 'Новенькие со мной - в первый-первый раз', null],
  type: ['morning', 'evening'],
  animalNames: ['Эшли', 'Бруня', 'Соня', 'Криспи', 'Граф', 'Ненси', 'Клякса'],
};

const generateCurator = () => ({
  name: randomElement(primitiveMocks.names),
  phone: `37529${randomIntNumberFromTo(1111111, 9999999)}`,
});

const lastMedicalItem = {
  date: new Date().toISOString(),
  drugName: 'Nobivac DHPPI',
};

export default {
  generateCurator,
  lastMedicalItem,
};
