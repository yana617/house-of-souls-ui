import { documentsApi } from '@/api/documents';
import notifications from '@/utils/notifications';

const state = () => ({});

const getters = {};

const actions = {
  uploadDocuments: async (_, files = []) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(i + 1, files[i]);
    }

    const response = await documentsApi.uploadDocuments(formData);
    if (response.success) {
      return response.documents;
    }

    notifications.error(response.message || 'Не удалось загрузить файлы');
    return [];
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
