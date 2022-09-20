import { randomIntNumber, randomElement, randomIntNumberFromTo } from '@/utils';
import { randomDate } from '@/utils/date';

const primitiveMocks = {
  names: ['Яна', 'Аня', 'Гюнель', 'Александра'],
  surnames: ['Маненко', 'Крусник', 'Василевская', 'Стасенко', 'Агаева'],
  phones: ['+375293355013', '+375299284739', '+375292960171'],
  arrival_time: ['8.30', '17.00', null],
  comments: ['Буду только к 19.00', 'Новенькие со мной - в первый-первый раз', null],
  type: ['morning', 'evening'],
  animalType: ['cat', 'dog'],
  place: ['main_home', 'cat_home', 'bitovka', 'on_temporary_hold', 'aviary'],
  status: ['homeless', 'at_home', 'died', 'lost', 'preparation'],
};

const generateAnimalBirthday = () => randomDate(new Date(2015, 1, 1), new Date(2022, 1, 1));
const generateAnimalSecondBirthday = () => randomDate(new Date(2019, 1, 1), new Date(2022, 3, 1));

const generateAnimal = () => ({
  id: '1',
  name: 'Эшли',
  type: randomElement(primitiveMocks.animalType),
  photos: [
    'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg',
  ],
  sex: randomElement(['female', 'male']),
  birthday: generateAnimalBirthday().toISOString(),
  place: randomElement(primitiveMocks.place),
  room: randomElement([randomIntNumber(4), null]),
  secondBirthday: generateAnimalSecondBirthday(),
  description: 'Подобрали возле приюта',
  status: randomElement(primitiveMocks.status),
  sterilized: Math.random() > 0.5,
  height: 40,
  curator_id: '1',
});

const generateCurator = () => ({
  name: randomElement(primitiveMocks.names),
  phone: `37529${randomIntNumberFromTo(1111111, 9999999)}`,
});

const lastMedicalItem = {
  date: new Date().toISOString(),
  drugName: 'Nobivac DHPPI',
};

export default {
  generateAnimal,
  generateCurator,
  lastMedicalItem,
};
