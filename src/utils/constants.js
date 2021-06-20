exports.MODAL = {
  LOGIN: 'login',
  REGISTRATION: 'registration',
  ADDITIONAL_FIELD: 'additional-field',
  NOTICE: 'notice',
};

exports.volunteersColumns = [
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

exports.claimsColumns = [
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
