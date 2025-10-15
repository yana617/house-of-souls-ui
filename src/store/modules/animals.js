import { animalsApi } from '../../api/animals';

const SET_ANIMALS_LIST = 'SET_ANIMALS_LIST';
const SET_ANIMALS_SHORT_LIST = 'SET_ANIMALS_SHORT_LIST';
const SET_ANIMAL_DATA = 'SET_ANIMAL_DATA';
const SET_ERRORS = 'SET_ERRORS';

const state = () => ({
  shortList: [],
  list: [],
  total: 0,
  current: {},
  errors: [],
});

const getters = {};

const actions = {
  getAnimals: async ({ commit }, params = {}) => {
    const response = await animalsApi.getAnimals(params);

    if (response.success) {
      commit(SET_ANIMALS_LIST, response.data);
    }
  },

  getAnimalsShort: async ({ commit }) => {
    const response = await animalsApi.getAnimalsShort();

    if (response.success) {
      commit(SET_ANIMALS_SHORT_LIST, response.data);
    }
  },

  getAnimalById: async ({ commit }, params = {}) => {
    const response = await animalsApi.getAnimalById(params);

    if (response.success) {
      commit(SET_ANIMAL_DATA, response.data);
    }
  },
  clearAnimal: async ({ commit }) => {
    commit(SET_ANIMAL_DATA, {});
  },

  createAnimal: async ({ commit }, body = {}) => {
    const response = await animalsApi.createAnimal(body);
    if (response.success) {
      commit(SET_ERRORS, []);
    } else if (response.errors) {
      commit(SET_ERRORS, response.errors);
    }
  },

  updateAnimal: async ({ commit }, { id, body = {} }) => {
    const response = await animalsApi.updateAnimal(id, body);
    if (response.success) {
      commit(SET_ERRORS, []);
    } else if (response.errors) {
      commit(SET_ERRORS, response.errors);
    }
  },

  uploadImages: async (_, { id, body = {} }) => {
    await animalsApi.uploadImages(id, body);
  },

  deleteImage: async (_, { id, imageId }) => {
    await animalsApi.deleteImage(id, imageId);
  },

  updateImageOrder: async (_, { id, imageId, body = {} }) => {
    await animalsApi.updateImageOrder(id, imageId, body);
  },

  deleteAnimal: async (_, { id }) => {
    await animalsApi.deleteAnimal(id);
  },
};

const mutations = {
  [SET_ANIMALS_LIST](state, result) {
    state.list = result.animals;
    state.total = result.total;
  },
  [SET_ANIMALS_SHORT_LIST](state, result) {
    state.shortList = result.animals;
  },
  [SET_ANIMAL_DATA](state, result) {
    state.current = result;
  },
  [SET_ERRORS](state, errors) {
    state.errors = errors;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
