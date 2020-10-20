import axios from 'axios';

const scheduleMock = [{
  date: '2020-10-12T06:00:00Z',
  morning: [{
    id: 123,
    user: {
      id: 1,
      name: 'Яна',
      surname: 'Сидорова',
      egida_nick: null,
      phone: '+375293355013',
      user_additional_fields: [{
        id: 1,
        additional_field_template_id: 1,
        value: true,
      }, {
        id: 2,
        additional_field_template_id: 2,
        value: true,
      }],
    },
    arrival_time: '8.30',
    additional_people: 2,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }, {
    id: 2,
    user: {
      id: 2,
      name: 'Олег',
      surname: 'Стадник',
      egida_nick: null,
      phone: '+375293767493',
      user_additional_fields: [{
        id: 3,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 4,
        additional_field_template_id: 2,
        value: true,
      }],
    },
    arrival_time: null,
    additional_people: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    id: 2,
    user: {
      id: 3,
      name: 'Лариса',
      surname: 'Качинская',
      phone: '+375293767493',
      egida_nick: null,
      user_additional_fields: [{
        id: 5,
        additional_field_template_id: 1,
        value: true,
      }, {
        id: 6,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: null,
    additional_people: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    id: 2,
    user: {
      id: 4,
      name: 'Тамара',
      surname: 'Николаевна',
      phone: '+375293767493',
      egida_nick: null,
      user_additional_fields: [{
        id: 7,
        additional_field_template_id: 1,
        value: true,
      }, {
        id: 8,
        additional_field_template_id: 2,
        value: true,
      }],
    },
    arrival_time: null,
    additional_people: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    id: 2,
    user: {
      id: 5,
      name: 'Даша',
      surname: 'Келлер',
      phone: '+375293767493',
      egida_nick: null,
      user_additional_fields: [{
        id: 9,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 10,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: null,
    additional_people: null,
    comment: 'Придется уйти до 12, работа',
  }],
  evening: [],
}, {
  date: '2020-10-13T06:00:00Z',
  morning: [],
  evening: [{
    id: 3,
    user: {
      id: 2,
      name: 'Олег',
      surname: 'Стадник',
      phone: '+375293767493',
      egida_nick: null,
      user_additional_fields: [{
        id: 11,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 12,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: null,
    additional_people: null,
    comment: null,
  }],
}, {
  date: '2020-10-14T06:00:00Z',
  morning: [{
    id: 123,
    user: {
      id: 1,
      name: 'Yana',
      surname: 'Sidorova',
      egida_nick: 'JanaSidorova',
      phone: '+375293767493',
      user_additional_fields: [{
        id: 13,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 14,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: '8.30',
    additional_people: null,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }, {
    id: 2,
    user: {
      id: 2,
      name: 'Олег',
      surname: 'Стадник',
      phone: '+375293767493',
      egida_nick: null,
      user_additional_fields: [{
        id: 15,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 16,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: null,
    additional_people: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    id: 123,
    user: {
      id: 1,
      name: 'Yana',
      surname: 'Sidorova',
      egida_nick: 'JanaSidorova',
      phone: '+375293767493',
      user_additional_fields: [{
        id: 17,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 18,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: '8.30',
    additional_people: 2,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }],
  evening: [{
    id: 3,
    user: {
      id: 2,
      name: 'Олег',
      surname: 'Стадник',
      phone: '+375293767493',
      egida_nick: null,
      user_additional_fields: [{
        id: 19,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 20,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: null,
    additional_people: 1,
    comment: null,
  }],
}, {
  date: '2020-10-15T06:00:00Z',
  morning: [],
  evening: [{
    id: 3,
    user: {
      id: 2,
      name: 'Олег',
      surname: 'Стадник',
      phone: '+375293767493',
      egida_nick: null,
      user_additional_fields: [{
        id: 21,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 22,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: null,
    additional_people: null,
    comment: null,
  }],
}, {
  date: '2020-10-16T06:00:00Z',
  morning: [],
  evening: [],
}, {
  date: '2020-10-17T06:00:00Z',
  morning: [],
  evening: [],
}, {
  date: '2020-10-18T06:00:00Z',
  morning: [],
  evening: [{
    id: 123,
    user: {
      id: 1,
      name: 'Yana',
      surname: 'Sidorova',
      egida_nick: 'JanaSidorova',
      phone: '+375293767493',
      user_additional_fields: [{
        id: 23,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 24,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: '8.30',
    additional_people: null,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }, {
    id: 2,
    user: {
      id: 2,
      name: 'Олег',
      surname: 'Стадник',
      phone: '+375293767493',
      egida_nick: null,
      user_additional_fields: [{
        id: 25,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 26,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: null,
    additional_people: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    id: 2,
    user: {
      id: 2,
      name: 'Олег',
      phone: '+375293767493',
      surname: 'Стадник',
      egida_nick: null,
      user_additional_fields: [{
        id: 27,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 28,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: null,
    additional_people: null,
    comment: 'Придется уйти до 12, работа',
  }, {
    id: 123,
    user: {
      id: 1,
      name: 'Yana',
      surname: 'Sidorova',
      egida_nick: 'JanaSidorova',
      phone: '+375293767493',
      user_additional_fields: [{
        id: 29,
        additional_field_template_id: 1,
        value: false,
      }, {
        id: 30,
        additional_field_template_id: 2,
        value: false,
      }],
    },
    arrival_time: '8.30',
    additional_people: null,
    comment: 'Могу завезти кого-нибудь на петровщину после смены. Двое новеньких со мной - в первый раз.',
  }],
}];

export default {
  getSchedule: async (params) => {
    // TO-DO: Remove with mocks
    await axios.get('https://jsonplaceholder.typicode.com/todos/1', { params });
    return scheduleMock;
  },
};
