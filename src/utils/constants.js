const MODAL = {
  LOGIN: 'login',
  REGISTRATION: 'registration',
  ADDITIONAL_FIELD: 'additional-field',
  NOTICE: 'notice',
};

const volunteersColumns = [
  {
    title: 'Создано',
    dataIndex: 'createdAt',
    key: 'createdAt',
    slots: { customRender: 'createdAt' },
  },
  {
    title: 'Имя Фамилия',
    dataIndex: 'name',
    key: 'name',
    slots: { customRender: 'name' },
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Дополнительные поля',
    dataIndex: 'userAdditionalFields',
    key: 'userAdditionalFields',
    slots: { customRender: 'userAdditionalFields' },
  },
  {
    title: 'Действия',
    key: 'action',
    slots: { customRender: 'action' },
  },
];

const claimsColumns = [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    slots: { customRender: 'date' },
  },
  {
    title: 'С вами',
    dataIndex: 'additionalPeople',
    key: 'additionalPeople',
    slots: { customRender: 'additionalPeople' },
  },
  {
    title: 'Время',
    dataIndex: 'typeOfTime',
    key: 'typeOfTime',
    slots: { customRender: 'typeOfTime' },
  },
];

const claimsRatingColumns = [
  {
    title: 'Место',
    dataIndex: 'place',
    key: 'place',
    slots: { customRender: 'place' },
    width: 70,
    align: 'center',
  },
  {
    title: 'Имя',
    dataIndex: 'fullName',
    key: 'fullName',
    slots: { customRender: 'fullName' },
    align: 'left',
  },
  {
    title: 'Посещений',
    dataIndex: 'claimsCount',
    key: 'claimsCount',
    width: 100,
    align: 'center',
  },
];

const claimTimeDescription = {
  morning: 'Смена обычно проходит с 09.00 до 13.00.',
  evening: 'Смена обычно проходит с 17.00 до 21-22.00.',
};
const claimFormLabels = {
  arrivalTime: 'Примерное прибытие на смену (если известно)',
  additionalPeople: 'С вами будут еще люди? Укажите, пожалуйста, сколько.',
  comment: 'Комментарий',
  questionable: 'Под вопросом',
};
const claimFormDescriptions = {
  questionable: 'Если вы не уверены что у вас получится приехать, отметьте пожалуйста',
  comment: 'Если вы отклоняетесь от этого времени - предупредите в комментарии пожалуйста!',
};

const animalTypes = {
  dog: 'Собаки',
  cat: 'Коты',
};

const animalSex = {
  male: 'Мальчик',
  female: 'Девочка',
};

const sterilizedTranslates = {
  male: {
    title: 'Кастрация',
    description: 'Кастрирован',
  },
  female: {
    title: 'Стерилизация',
    description: 'Стерилизована',
  },
};

const animalStatus = {
  homeless: 'Ищет Дом',
  at_home: 'Дома 🎉',
  died: 'На радуге 😢',
  lost: 'Потерялся',
  preparation: 'Подготовка к поиску дома',
};

const placeTranslates = {
  main_home: 'Главный дом',
  bitovka: 'Бытовка',
  cat_home: 'Кошачий дом',
  aviary: 'Вольер',
  on_temporary_hold: 'На временной передержке',
};

const curators = {
  dog: {
    name: 'Тамара',
    phones: ['+375(29) 322-61-55', '+375(33) 66-11-625'],
  },
  cat: {
    name: 'Ирина',
    phones: ['+375(44) 772-72-65', '+375(29) 775-61-72'],
  },
};

export {
  MODAL,
  volunteersColumns,
  claimsColumns,
  claimTimeDescription,
  claimFormLabels,
  claimFormDescriptions,
  claimsRatingColumns,
  animalTypes,
  animalSex,
  sterilizedTranslates,
  animalStatus,
  placeTranslates,
  curators,
};
