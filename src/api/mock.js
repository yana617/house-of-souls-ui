/* eslint-disable max-len */
import { randomIntNumber, randomElement } from '../utils';

const primitiveMocks = {
  names: ['Яна', 'Олег', 'Никита', 'Аня'],
  surnames: ['Маненко', 'Стадник', 'Стасенко', 'Хохо'],
  egida_nicks: ['JavaSidorova', null, null],
  phones: ['+375293355013', '+375299284739', '+375292960171'],
  arrival_time: ['8.30', '17.00', null],
  comments: ['Буду только к 19.00', 'Новенькие со мной - в первый-первый раз', null],
};

const generateUserAdditionalField = ({ id = 1, additionalFieldTemplateId = 1 } = {}) => ({
  id,
  additional_field_template_id: additionalFieldTemplateId,
  value: Math.random() > 0.5,
});

const generateUser = () => {
  const userId = randomIntNumber();

  return {
    id: userId,
    name: randomElement(primitiveMocks.names),
    surname: randomElement(primitiveMocks.surnames),
    egida_nick: randomElement(primitiveMocks.egida_nicks),
    phone: randomElement(primitiveMocks.phones),
  };
};

const generateUserClaim = () => {
  const user = generateUser();
  const claimId = randomIntNumber();

  return {
    id: claimId,
    arrival_time: randomElement(primitiveMocks.arrival_time),
    additional_people: randomIntNumber(2),
    comment: randomElement(primitiveMocks.comments),
    user: {
      ...user,
      user_additional_fields: [
        generateUserAdditionalField({ id: randomIntNumber(), additionalFieldTemplateId: 1 }),
        generateUserAdditionalField({ id: randomIntNumber(), additionalFieldTemplateId: 2 }),
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

const noticesIdsMock = [randomIntNumber().toString(), randomIntNumber().toString(), randomIntNumber().toString()];

const generateNotice = (id) => ({
  _id: id,
  authorized: Math.random() > 0.5,
  title: 'Информация для незарегистрированных пользователей',
  description: 'Кто сколько может, кидайте в копилку или на нашу карту.',
});

const additionalFieldsMock = [{
  id: 1,
  icon: 'https://image.flaticon.com/icons/png/512/91/91544.png',
  label: 'Деля',
  description: 'Вы можете выгулять Делю? Собака с характером, на каждой смене нужен хоть один человек кто с ней дружит.',
}, {
  id: 2,
  icon: 'https://cdn0.iconfinder.com/data/icons/mix-of-simple-vol-2/57/icon298-512.png',
  label: 'Ключ',
  description: 'Есть ли у вас ключ от домика? Чтобы не оказалось, что у всех на смене нет ключа.',
}];

const volunteersMock = {
  volunteers: Array(15).fill(null).map(generateUser),
  total: 100,
};

export default {
  generateUser,
  generateSchedule,
  additionalFieldsMock,
  volunteersMock,
  noticesIdsMock,
  generateNotice,
};
