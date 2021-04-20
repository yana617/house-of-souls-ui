/* eslint-disable max-len */
import { randomIntNumber, randomStringNumber, randomElement } from '@/utils';
import { randomDate } from '../utils/date';

const primitiveMocks = {
  names: ['Яна', 'Олег', 'Аня', 'Гюнель', 'Александра'],
  surnames: ['Маненко', 'Стадник', 'Василевская', 'Стасенко', 'Агаева'],
  phones: ['+375293355013', '+375299284739', '+375292960171'],
  arrival_time: ['8.30', '17.00', null],
  comments: ['Буду только к 19.00', 'Новенькие со мной - в первый-первый раз', null],
};

const generateBirthday = () => randomDate(new Date(1980, 1, 1), new Date(2010, 1, 1));

const generateUserAdditionalField = ({ additionalFieldTemplateId = '1', userId = '1' } = {}) => ({
  _id: randomStringNumber(),
  user_id: userId,
  additional_field_template_id: additionalFieldTemplateId,
  value: Math.random() > 0.5,
});

const generateUser = () => {
  const userId = randomStringNumber();

  return {
    _id: userId,
    createdAt: (new Date()).toISOString(),
    name: randomElement(primitiveMocks.names),
    surname: randomElement(primitiveMocks.surnames),
    phone: randomElement(primitiveMocks.phones),
    birthday: generateBirthday().toISOString(),
    userAdditionalFields: [
      generateUserAdditionalField({ additionalFieldTemplateId: '1' }),
      generateUserAdditionalField({ additionalFieldTemplateId: '2' }),
    ],
  };
};

const generateUserClaim = () => {
  const user = generateUser();
  const claimId = randomStringNumber();

  return {
    _id: claimId,
    arrival_time: randomElement(primitiveMocks.arrival_time),
    additional_people: randomIntNumber(2),
    comment: randomElement(primitiveMocks.comments),
    user: {
      ...user,
      user_additional_fields: [
        generateUserAdditionalField({ additionalFieldTemplateId: '1' }),
        generateUserAdditionalField({ additionalFieldTemplateId: '2' }),
      ],
    },
  };
};

const generateScheduleDay = () => ({
  date: new Date(),
  morning: Array(randomIntNumber(5)).fill(null).map(generateUserClaim),
  evening: Array(randomIntNumber(5)).fill(null).map(generateUserClaim),
});

const generateSchedule = () => Array(7).fill(null).map(generateScheduleDay);

const usersMock = {
  users: Array(15).fill(null).map(generateUser),
  total: 100,
};

export default {
  generateUser,
  generateSchedule,
  usersMock,
};
