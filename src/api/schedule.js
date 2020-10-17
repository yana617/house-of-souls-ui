import axios from 'axios';

const scheduleMock = [{
  date: '2020-10-12T06:00:00Z',
  morning: [{
    apply_id: 123,
    user: {
      id: 1,
      name: 'Яна',
      surname: 'Сидорова',
      egida_nick: null,
      key: true,
      delya: false,
    },
    enter_time: '8.30',
    additionalPeople: 2,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }, {
    apply_id: 2,
    user: {
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      key: false,
      delya: false,
    },
    enter_time: null,
    additionalPeople: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    apply_id: 2,
    user: {
      name: 'Лариса',
      surname: 'Качинская',
      egida_nick: null,
      key: true,
      delya: true,
    },
    enter_time: null,
    additionalPeople: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    apply_id: 2,
    user: {
      name: 'Тамара',
      surname: 'Николаевна',
      egida_nick: null,
      key: true,
      delya: true,
    },
    enter_time: null,
    additionalPeople: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    apply_id: 2,
    user: {
      name: 'Даша',
      surname: 'Келлер',
      egida_nick: null,
      key: false,
      delya: false,
    },
    enter_time: null,
    additionalPeople: null,
    comment: 'Придется уйти до 12, работа',
  }],
  evening: [],
}, {
  date: '2020-10-13T06:00:00Z',
  morning: [],
  evening: [{
    apply_id: 3,
    user: {
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      key: false,
      delya: true,
    },
    enter_time: null,
    additionalPeople: null,
    comment: null,
  }],
}, {
  date: '2020-10-14T06:00:00Z',
  morning: [{
    apply_id: 123,
    user: {
      id: 1,
      name: 'Yana',
      surname: 'Sidorova',
      egida_nick: 'JanaSidorova',
      key: true,
      delya: false,
    },
    enter_time: '8.30',
    additionalPeople: null,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }, {
    apply_id: 2,
    user: {
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      key: false,
      delya: false,
    },
    enter_time: null,
    additionalPeople: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    apply_id: 123,
    user: {
      id: 1,
      name: 'Yana',
      surname: 'Sidorova',
      egida_nick: 'JanaSidorova',
      key: true,
      delya: false,
    },
    enter_time: '8.30',
    additionalPeople: 2,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }, {
    apply_id: 2,
    user: {
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      key: false,
      delya: false,
    },
    enter_time: null,
    additionalPeople: null,
    comment: 'Придется уйти до 12, работа',
  }],
  evening: [{
    apply_id: 3,
    user: {
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      key: false,
      delya: true,
    },
    enter_time: null,
    additionalPeople: 1,
    comment: null,
  }],
}, {
  date: '2020-10-15T06:00:00Z',
  morning: [],
  evening: [{
    apply_id: 3,
    user: {
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      key: false,
      delya: true,
    },
    enter_time: null,
    additionalPeople: null,
    comment: null,
  }],
}, {
  date: '2020-10-16T06:00:00Z',
  morning: [],
  evening: [{
    apply_id: 3,
    user: {
      name: 'Ксения',
      surname: 'Василевская',
      egida_nick: null,
      key: true,
      delya: true,
    },
    enter_time: null,
    additionalPeople: null,
    comment: null,
  }],
}, {
  date: '2020-10-17T06:00:00Z',
  morning: [],
  evening: [{
    apply_id: 3,
    user: {
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      key: false,
      delya: true,
    },
    enter_time: null,
    additionalPeople: 1,
    comment: null,
  }],
}, {
  date: '2020-10-18T06:00:00Z',
  morning: [],
  evening: [{
    apply_id: 123,
    user: {
      id: 1,
      name: 'Yana',
      surname: 'Sidorova',
      egida_nick: 'JanaSidorova',
      key: true,
      delya: false,
    },
    enter_time: '8.30',
    additionalPeople: null,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }, {
    apply_id: 2,
    user: {
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      key: false,
      delya: false,
    },
    enter_time: null,
    additionalPeople: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    apply_id: 123,
    user: {
      id: 1,
      name: 'Yana',
      surname: 'Sidorova',
      egida_nick: 'JanaSidorova',
      key: true,
      delya: false,
    },
    enter_time: '8.30',
    additionalPeople: null,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }, {
    apply_id: 2,
    user: {
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      key: false,
      delya: false,
    },
    enter_time: null,
    additionalPeople: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    apply_id: 123,
    user: {
      id: 1,
      name: 'Yana',
      surname: 'Sidorova',
      egida_nick: 'JanaSidorova',
      key: true,
      delya: false,
    },
    enter_time: '8.30',
    additionalPeople: null,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }, {
    apply_id: 2,
    user: {
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      key: false,
      delya: false,
    },
    enter_time: null,
    additionalPeople: null,
    comment: 'Придется уйти до 12, работа',
  }],
}];

export default {
  getSchedule: async (params) => {
    // TO-DO: Remove with mocks
    await axios.get('https://jsonplaceholder.typicode.com/todos/1', { params });
    return scheduleMock;
  },
};
