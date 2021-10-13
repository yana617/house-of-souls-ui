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

export {
  MODAL,
  volunteersColumns,
  claimsColumns,
  claimTimeDescription,
  claimFormLabels,
  claimFormDescriptions,
};
