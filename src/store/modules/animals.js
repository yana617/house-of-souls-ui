import animals from '../../api/animals';

const SET_ANIMALS_LIST = 'SET_ANIMALS_LIST';
const SET_ANIMAL_DATA = 'SET_ANIMAL_DATA';

const state = () => ({
  list: [],
  total: 0,
  current: {},
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
    state.list = result.animals;
    state.total = result.total;
  },
  [SET_ANIMAL_DATA](state, result) {
    state.current = result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
