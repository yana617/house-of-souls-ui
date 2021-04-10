/* eslint-disable max-len */
import { randomIntNumber, randomStringNumber, randomElement } from '../utils';

const primitiveMocks = {
  names: ['Яна', 'Олег', 'Никита', 'Аня'],
  surnames: ['Маненко', 'Стадник', 'Стасенко', 'Хохо'],
  egida_nicks: ['JavaSidorova', null, null],
  phones: ['+375293355013', '+375299284739', '+375292960171'],
  arrival_time: ['8.30', '17.00', null],
  comments: ['Буду только к 19.00', 'Новенькие со мной - в первый-первый раз', null],
};

const generateUserAdditionalField = ({ _id = 1, additionalFieldTemplateId = 1, userId = '1' } = {}) => ({
  _id,
  user_id: userId,
  additional_field_template_id: additionalFieldTemplateId,
  value: Math.random() > 0.5,
});

const generateUser = () => {
  const userId = randomStringNumber();

  return {
    _id: userId,
    name: randomElement(primitiveMocks.names),
    surname: randomElement(primitiveMocks.surnames),
    egida_nick: randomElement(primitiveMocks.egida_nicks),
    phone: randomElement(primitiveMocks.phones),
  };
};

const generateUserClaim = () => {
  const user = generateUser();
  const claimId = randomStringNumber();

  return {
    _id: claimId,
    arrival_time: randomElement(primitiveMocks.arrival_time),
    additional_people: randomStringNumber(2),
    comment: randomElement(primitiveMocks.comments),
    user: {
      ...user,
      user_additional_fields: [
        generateUserAdditionalField({ _id: randomStringNumber(), additionalFieldTemplateId: '1' }),
        generateUserAdditionalField({ _id: randomStringNumber(), additionalFieldTemplateId: '2' }),
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

const noticesIdsMock = [randomStringNumber(), randomStringNumber(), randomStringNumber()];

const generateNotice = (id) => ({
  _id: id,
  authorized: Math.random() > 0.5,
  title: 'Информация для незарегистрированных пользователей',
  description: 'Кто сколько может, кидайте в копилку или на нашу карту.',
});

const volunteersMock = {
  volunteers: Array(15).fill(null).map(generateUser),
  total: 100,
};

export default {
  generateUser,
  generateSchedule,
  volunteersMock,
  noticesIdsMock,
  generateNotice,
};
