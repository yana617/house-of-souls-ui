import axios from 'axios';

const usersMock = {
  volunteers: [{
    id: 1,
    name: 'Яна',
    surname: 'Сидорова',
    phone: '+375 29 3355013',
    egida_nick: null,
    addition: {
      delya: false,
      key: true,
    },
  }, {
    id: 2,
    name: 'Олег',
    surname: 'Стадник',
    phone: '+375 29 3874694',
    egida_nick: 'hiiii12',
    addition: {
      delya: false,
      key: true,
    },
  }, {
    id: 3,
    name: 'Дарья',
    surname: 'Шатрова',
    phone: '+375 29 9284739',
    egida_nick: 'DashaHIFPMI',
    addition: {
      delya: false,
      key: true,
    },
  }, {
    id: 4,
    name: 'Кирилл',
    surname: 'Домиц',
    phone: '+375 29 2974463',
    egida_nick: null,
    addition: {
      delya: true,
      key: true,
    },
  }, {
    id: 2,
    name: 'Олег',
    surname: 'Стадник',
    phone: '+375 29 3874694',
    egida_nick: 'hiiii12',
    addition: {
      delya: false,
      key: true,
    },
  }, {
    id: 3,
    name: 'Дарья',
    surname: 'Шатрова',
    phone: '+375 29 9284739',
    egida_nick: 'DashaHIFPMI',
    addition: {
      delya: false,
      key: true,
    },
  }, {
    id: 4,
    name: 'Кирилл',
    surname: 'Домиц',
    phone: '+375 29 2974463',
    egida_nick: null,
    addition: {
      delya: true,
      key: true,
    },
  }, {
    id: 2,
    name: 'Олег',
    surname: 'Стадник',
    phone: '+375 29 3874694',
    egida_nick: 'hiiii12',
    addition: {
      delya: false,
      key: true,
    },
  }, {
    id: 3,
    name: 'Дарья',
    surname: 'Шатрова',
    phone: '+375 29 9284739',
    egida_nick: 'DashaHIFPMI',
    addition: {
      delya: false,
      key: true,
    },
  }, {
    id: 4,
    name: 'Кирилл',
    surname: 'Домиц',
    phone: '+375 29 2974463',
    egida_nick: null,
    addition: {
      delya: true,
      key: true,
    },
  }, {
    id: 2,
    name: 'Олег',
    surname: 'Стадник',
    phone: '+375 29 3874694',
    egida_nick: 'hiiii12',
    addition: {
      delya: false,
      key: true,
    },
  }, {
    id: 3,
    name: 'Дарья',
    surname: 'Шатрова',
    phone: '+375 29 9284739',
    egida_nick: 'DashaHIFPMI',
    addition: {
      delya: false,
      key: true,
    },
  }, {
    id: 4,
    name: 'Кирилл',
    surname: 'Домиц',
    phone: '+375 29 2974463',
    egida_nick: null,
    addition: {
      delya: true,
      key: true,
    },
  }, {
    id: 2,
    name: 'Олег',
    surname: 'Стадник',
    phone: '+375 29 3874694',
    egida_nick: 'hiiii12',
    addition: {
      delya: false,
      key: true,
    },
  }, {
    id: 3,
    name: 'Дарья',
    surname: 'Шатрова',
    phone: '+375 29 9284739',
    egida_nick: 'DashaHIFPMI',
    addition: {
      delya: false,
      key: true,
    },
  }],
  total: 100,
};

const userMock = {
  id: 1,
  name: 'Yana',
  surname: 'Sidorova',
  phone: '375293355013',
};

export default {
  getVolunteers: async (params) => {
    // TO-DO: Remove with mocks
    console.log('params', params);
    const limit = parseInt(process.env.VUE_APP_LIMIT, 10);
    await axios.get('https://jsonplaceholder.typicode.com/todos/1', { params: { limit, ...params } });
    return usersMock;
  },
  login: async (body) => {
    // TO-DO: Remove mocks
    await axios.post('https://jsonplaceholder.typicode.com/posts', body);
    return userMock;
  },
  register: async (body) => {
    // TO-DO: Remove mocks
    await axios.post('https://jsonplaceholder.typicode.com/posts', body);
    return userMock;
  },
};
