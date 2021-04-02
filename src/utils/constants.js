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
