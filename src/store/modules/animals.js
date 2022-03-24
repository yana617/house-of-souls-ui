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
    const result = await animals.getAnimals(params);
    commit(SET_ANIMALS_LIST, result);
  },
  getAnimalById: async ({ commit }, params = {}) => {
    const result = await animals.getAnimalById(params);
    commit(SET_ANIMAL_DATA, result);
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
