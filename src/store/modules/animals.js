import animals from '../../api/animals';

const SET_ANIMALS_LIST = 'SET_ANIMALS_LIST';
const SET_ANIMAL_DATA = 'SET_ANIMAL_DATA';

const state = () => ({
  list: [],
  data: {},
});

const getters = {};

const actions = {
  getAnimals: async ({ commit }, params = {}) => {
    const response = await animals.getAnimals(params);

    if (response.success) {
      commit(SET_ANIMALS_LIST, response.data);
    }
  },
  getAnimalById: async ({ commit }, params = {}) => {
    const response = await animals.getAnimalById(params);

    if (response.success) {
      commit(SET_ANIMAL_DATA, response.data);
    }
  },
};

const mutations = {
  [SET_ANIMALS_LIST](state, result) {
    state.list = result;
  },
  [SET_ANIMAL_DATA](state, result) {
    state.data[result.id] = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
