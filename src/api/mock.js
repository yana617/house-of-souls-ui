/* eslint-disable max-len */
import { randomIntNumber, randomElement } from '@/utils';
import { randomDate } from '@/utils/date';

const primitiveMocks = {
  names: ['Яна', 'Олег', 'Аня', 'Гюнель', 'Александра'],
  surnames: ['Маненко', 'Стадник', 'Василевская', 'Стасенко', 'Агаева'],
  phones: ['+375293355013', '+375299284739', '+375292960171'],
  arrival_time: ['8.30', '17.00', null],
  comments: ['Буду только к 19.00', 'Новенькие со мной - в первый-первый раз', null],
  type: ['morning', 'evening'],
};

const generateBirthday = () => randomDate(new Date(1980, 1, 1), new Date(2010, 1, 1));

const generateUserAdditionalField = ({ _id = '1', additionalFieldTemplateId = '1' } = {}) => ({
  _id,
  additional_field_template_id: additionalFieldTemplateId,
  value: Math.random() > 0.5,
});

const generateUser = () => {
  const userId = randomIntNumber().toString();

  return {
    _id: userId,
    createdAt: (new Date()).toISOString(),
    name: randomElement(primitiveMocks.names),
    surname: randomElement(primitiveMocks.surnames),
    phone: randomElement(primitiveMocks.phones),
    birthday: generateBirthday().toISOString(),
    userAdditionalFields: [
      generateUserAdditionalField({ _id: randomIntNumber().toString(), additionalFieldTemplateId: '1' }),
      generateUserAdditionalField({ _id: randomIntNumber().toString(), additionalFieldTemplateId: '2' }),
    ],
  };
};

const generateUserClaim = (from, to) => {
  const user = generateUser();
  const claimId = randomIntNumber().toString();

  return {
    id: claimId,
    date: randomDate(new Date(from), new Date(to)),
    type: randomElement(primitiveMocks.type),
    arrival_time: randomElement(primitiveMocks.arrival_time),
    additional_people: randomIntNumber(1),
    comment: randomElement(primitiveMocks.comments),
    questionable: Math.random() > 0.5,
    user: {
      ...user,
      user_additional_fields: [
        generateUserAdditionalField({ _id: randomIntNumber().toString(), additionalFieldTemplateId: '1' }),
        generateUserAdditionalField({ _id: randomIntNumber().toString(), additionalFieldTemplateId: '2' }),
      ],
    },
  };
};

const generateClaims = (from, to) => Array(30).fill(null).map(() => generateUserClaim(from, to));

const additionalFieldsMock = [{
  _id: '1',
  icon: 'https://image.flaticon.com/icons/png/512/91/91544.png',
  label: 'Деля',
  description: 'Вы можете выгулять Делю? Собака с характером, на каждой смене нужен хоть один человек кто с ней дружит.',
}, {
  _id: '2',
  icon: 'https://cdn0.iconfinder.com/data/icons/mix-of-simple-vol-2/57/icon298-512.png',
  label: 'Ключ',
  description: 'Есть ли у вас ключ от домика? Чтобы не оказалось, что у всех на смене нет ключа.',
}];

const usersMock = {
  users: Array(15).fill(null).map(generateUser),
  total: 100,
};

export default {
  generateUser,
  generateClaims,
  additionalFieldsMock,
  usersMock,
};
